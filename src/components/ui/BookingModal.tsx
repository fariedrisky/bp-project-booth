import React, { useState } from "react";
import { Modal } from "./modal";
import { Input } from "./input";
import Select from "./select";
import { Button } from "./button";
import { ServiceType } from "./ServiceCard";
import { X } from "lucide-react";
import Label from "./label";
import DatePicker from "./DatePicker";
import jsPDF from "jspdf";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceType;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  service,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    eventDate: null as Date | null,
    eventLocation: "",
    paymentType: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const generatePDF = async (
    data: typeof formData & { selectedProduct: string },
  ) => {
    const doc = new jsPDF();

    // Add company logo or header
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.text("Detail Pemesanan", 20, 20);

    // Add booking information
    doc.setFontSize(12);
    let yPosition = 40;

    // Add current date
    const currentDate = new Date().toLocaleDateString("id-ID");
    doc.text(`Tanggal Pemesanan: ${currentDate}`, 20, yPosition);
    yPosition += 10;

    // Add horizontal line
    doc.setLineWidth(0.5);
    doc.line(20, yPosition, 190, yPosition);
    yPosition += 10;

    // Customer Details Section
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Data Pemesan", 20, yPosition);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    yPosition += 10;

    const content = [
      ["Nama Lengkap:", data.fullName],
      ["Nomor Telepon:", data.phoneNumber],
      ["Email:", data.email],
      [
        "Tanggal Acara:",
        data.eventDate ? data.eventDate.toLocaleDateString("id-ID") : "",
      ],
      ["Lokasi Acara:", data.eventLocation],
      ["Paket Dipilih:", data.selectedProduct],
      [
        "Jenis Pembayaran:",
        data.paymentType === "full" ? "Pembayaran Penuh" : "Uang Muka (DP)",
      ],
    ];

    content.forEach(([label, value]) => {
      doc.text(`${label} ${value}`, 20, yPosition);
      yPosition += 10;
    });

    // Add footer
    doc.setFontSize(10);
    doc.text("Terima kasih atas pemesanan Anda!", 20, 270);
    doc.text(
      "Untuk pertanyaan lebih lanjut, silakan hubungi kami di: +62 851-5731-6767",
      20,
      280,
    );

    // Convert PDF to blob with proper type
    const pdfBlob = new Blob([doc.output("blob")], { type: "application/pdf" });

    // Create FormData with proper filename
    const formDataObj = new FormData();
    const filename = `pemesanan-${data.fullName.replace(/\s+/g, "-")}.pdf`;
    formDataObj.append("file", pdfBlob, filename);

    try {
      const response = await fetch("/api/upload-pdf", {
        method: "POST",
        body: formDataObj,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to upload PDF");
      }

      const { fileUrl } = await response.json();
      return fileUrl;
    } catch (error) {
      console.error("Error uploading PDF:", error);
      throw new Error("Gagal mengunggah dokumen pemesanan. Silakan coba lagi.");
    }
  };

  // Update your handleSubmit function to handle errors better
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionData = {
        ...formData,
        selectedProduct: service.title,
      };

      // Generate and upload PDF
      const pdfUrl = await generatePDF(submissionData);

      // Format WhatsApp message with PDF URL
      const whatsappMessage = formatWhatsAppMessage({
        ...submissionData,
        pdfUrl,
      });

      // Open WhatsApp with pre-filled message
      window.open(
        `https://wa.me/6285157316767?text=${whatsappMessage}`,
        "_blank",
      );

      onClose();
    } catch (error) {
      console.error("Error during submission:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat mengirim data. Silakan coba lagi.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatWhatsAppMessage = (
    data: typeof formData & { selectedProduct: string; pdfUrl: string },
  ) => {
    return encodeURIComponent(`
*Permintaan Pemesanan Baru*
------------------------
*Data Pemesan:*
👤 Nama Lengkap: ${data.fullName}
📱 Telepon: ${data.phoneNumber}
📧 Email: ${data.email}

*Detail Acara:*
📅 Tanggal: ${data.eventDate ? data.eventDate.toLocaleDateString("id-ID") : ""}
📍 Lokasi: ${data.eventLocation}

*Detail Paket:*
📦 Paket Dipilih: ${data.selectedProduct}
💳 Jenis Pembayaran: ${data.paymentType === "full" ? "Pembayaran Penuh" : "Uang Muka (DP)"}

📎 Detail Pemesanan (PDF): ${data.pdfUrl}

Terima kasih atas pemesanan Anda! Kami akan segera menghubungi Anda untuk konfirmasi lebih lanjut.
`);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName) newErrors.fullName = "Nama lengkap wajib diisi";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Nomor telepon wajib diisi";
    if (!formData.email) newErrors.email = "Email wajib diisi";
    if (!formData.eventDate) newErrors.eventDate = "Tanggal acara wajib diisi";
    if (!formData.eventLocation)
      newErrors.eventLocation = "Lokasi acara wajib diisi";
    if (!formData.paymentType)
      newErrors.paymentType = "Jenis pembayaran wajib diisi";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Masukkan alamat email yang valid";
    }

    // Phone number validation (Indonesian format)
    const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
    if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber =
        "Masukkan nomor telepon yang valid (format: 08xxxxxxxxxx)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      eventDate: date,
    }));
    if (errors.eventDate) {
      setErrors((prev) => ({
        ...prev,
        eventDate: "",
      }));
    }
  };

  const paymentOptions = [
    { value: "full", label: "Pembayaran Penuh" },
    { value: "dp", label: "Uang Muka (DP)" },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative p-6">
        <button
          onClick={onClose}
          className="absolute -right-2 -top-2 p-1 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6">
          <h2 className="font-serif text-2xl font-bold text-gray-900">
            {service.title}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Silakan isi data diri Anda untuk melakukan pemesanan
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label className="block text-sm font-medium text-gray-700">
              Nama Lengkap
            </Label>
            <Input
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Masukkan nama lengkap"
              className={`h-9 w-full ${
                errors.fullName ? "border-red-500" : "border-gray-200"
              }`}
              disabled={isSubmitting}
            />
            {errors.fullName && (
              <p className="text-sm text-red-500">{errors.fullName}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label className="block text-sm font-medium text-gray-700">
              Nomor Telepon
            </Label>
            <Input
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Masukkan nomor telepon (contoh: 08123456789)"
              className={`h-9 w-full ${
                errors.phoneNumber ? "border-red-500" : "border-gray-200"
              }`}
              disabled={isSubmitting}
            />
            {errors.phoneNumber && (
              <p className="text-sm text-red-500">{errors.phoneNumber}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label className="block text-sm font-medium text-gray-700">
              Email
            </Label>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Masukkan alamat email"
              className={`h-9 w-full ${
                errors.email ? "border-red-500" : "border-gray-200"
              }`}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label className="block text-sm font-medium text-gray-700">
              Tanggal Acara
            </Label>
            <DatePicker
              value={formData.eventDate}
              onChange={handleDateChange}
              minDate={new Date()}
              placeholder="Pilih tanggal acara"
              error={errors.eventDate}
              className={errors.eventDate ? "border-red-500" : ""}
              disabled={isSubmitting}
            />
            {errors.eventDate && (
              <p className="text-sm text-red-500">{errors.eventDate}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label className="block text-sm font-medium text-gray-700">
              Lokasi Acara
            </Label>
            <Input
              name="eventLocation"
              value={formData.eventLocation}
              onChange={handleInputChange}
              placeholder="Masukkan lokasi acara"
              className={`h-9 w-full ${
                errors.eventLocation ? "border-red-500" : "border-gray-200"
              }`}
              disabled={isSubmitting}
            />
            {errors.eventLocation && (
              <p className="text-sm text-red-500">{errors.eventLocation}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label className="block text-sm font-medium text-gray-700">
              Paket Dipilih
            </Label>
            <Input
              value={service.title}
              disabled
              className="h-9 w-full cursor-not-allowed border border-gray-200 bg-gray-50"
            />
          </div>

          <div className="space-y-1">
            <Label className="block text-sm font-medium text-gray-700">
              Jenis Pembayaran
            </Label>
            <Select
              options={paymentOptions}
              value={formData.paymentType}
              onChange={(value) => {
                setFormData((prev) => ({ ...prev, paymentType: value }));
                if (errors.paymentType) {
                  setErrors((prev) => ({ ...prev, paymentType: "" }));
                }
              }}
              placeholder="Pilih jenis pembayaran"
              className={errors.paymentType ? "border-red-500" : ""}
              disabled={isSubmitting}
            />
            {errors.paymentType && (
              <p className="text-sm text-red-500">{errors.paymentType}</p>
            )}
          </div>

          <div className="!mt-10 flex justify-end gap-3">
            <Button
              type="button"
              onClick={onClose}
              className="border border-gray-200 bg-white px-4 py-2 text-sm font-medium !text-primary hover:bg-gray-50"
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button
              type="submit"
              className="bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent/90 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Memproses..." : "Kirim Pemesanan"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default BookingModal;
