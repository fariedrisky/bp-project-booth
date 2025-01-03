import React, { useState } from "react";
import { Modal } from "./modal";
import { Input } from "./input";
import Select from "./select";
import { Button } from "./button";
import { ServiceType } from "./ServiceCard";
import { X } from "lucide-react";
import Label from "./label";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";

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
    eventTime: null as Date | null,
    eventLocation: "",
    paymentType: "",
    dpAmount: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatTanggal = (date: Date): string => {
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatWaktu = (date: Date): string => {
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatWhatsAppMessage = (
    data: typeof formData & { selectedProduct: string },
  ) => {
    const priceInfo =
      data.paymentType === "full"
        ? `Harga: Rp ${Number(service.totalPrice)?.toLocaleString("id-ID")}`
        : `Uang Muka: Rp ${
            data.dpAmount
              ? Number(data.dpAmount).toLocaleString("id-ID") // Menggunakan toLocaleString untuk format dengan titik
              : ""
          }`;

    return encodeURIComponent(`
*Permintaan Pemesanan Baru*
------------------------
*Data Pemesan:*
Nama Lengkap: ${data.fullName}
Telepon: ${data.phoneNumber}
Email: ${data.email}

*Detail Acara:*
Tanggal: ${data.eventDate ? formatTanggal(data.eventDate) : ""}
Jam: ${data.eventTime ? formatWaktu(data.eventTime) : ""}
Lokasi: ${data.eventLocation}

*Detail Paket:*
Paket Dipilih: ${data.selectedProduct}
Durasi: ${service.selectedDuration?.label || "4 Jam"}
Cetak: ${service.selectedPrint?.label || "-"}

Jenis Pembayaran: ${data.paymentType === "full" ? "Pembayaran Penuh (Full)" : "Uang Muka (DP)"}
${priceInfo}
`);
  };

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

      // Format WhatsApp message
      const whatsappMessage = formatWhatsAppMessage(submissionData);

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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName) newErrors.fullName = "Nama lengkap wajib diisi";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Nomor telepon wajib diisi";
    if (!formData.email) newErrors.email = "Email wajib diisi";
    if (!formData.eventDate) newErrors.eventDate = "Tanggal acara wajib diisi";
    if (!formData.eventTime) newErrors.eventTime = "Jam acara wajib diisi";
    if (!formData.eventLocation)
      newErrors.eventLocation = "Lokasi acara wajib diisi";
    if (!formData.paymentType)
      newErrors.paymentType = "Jenis pembayaran wajib diisi";

    if (formData.paymentType === "dp" && !formData.dpAmount) {
      newErrors.dpAmount = "Jumlah uang muka wajib diisi";
    } else if (formData.paymentType === "dp") {
      const dpValue = parseInt(formData.dpAmount);
      const minimumDp = service.totalPrice! * 0.3;
      if (isNaN(dpValue) || dpValue <= 0) {
        newErrors.dpAmount = "Jumlah uang muka harus lebih dari 0";
      } else if (dpValue < minimumDp) {
        newErrors.dpAmount = `Uang muka minimal 30% dari harga total (Rp ${Math.ceil(minimumDp).toLocaleString("id-ID")})`;
      } else if (dpValue >= service.totalPrice!) {
        newErrors.dpAmount = "Jumlah uang muka harus kurang dari harga total";
      }
    }

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

  const handleTimeChange = (date: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      eventTime: date,
    }));
    if (errors.eventTime) {
      setErrors((prev) => ({
        ...prev,
        eventTime: "",
      }));
    }
  };

  const paymentOptions = [
    { value: "full", label: "Pembayaran Penuh (Full)" },
    { value: "dp", label: "Uang Muka (DP)" },
  ];

  const handleDpAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\./g, ""); // Hapus titik dari input
    if (!isNaN(Number(rawValue))) {
      setFormData((prev) => ({
        ...prev,
        dpAmount: rawValue, // Simpan nilai tanpa titik
      }));
    }
  };

  // Format tampilan dengan titik setiap 3 digit
  const formattedDpAmount = formData.dpAmount
    ? formData.dpAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    : "";

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
          </div>

          <div className="space-y-1">
            <Label className="block text-sm font-medium text-gray-700">
              Jam Acara
            </Label>
            <TimePicker
              value={formData.eventTime}
              onChange={handleTimeChange}
              placeholder="Pilih jam acara"
            />
            {errors.eventTime && (
              <p className="text-sm text-red-500">{errors.eventTime}</p>
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
              value={`${service.title}${service.selectedDuration ? ` - Durasi ${service.selectedDuration.label}` : ""}${service.selectedPrint ? ` - ${service.selectedPrint.label || "Cetak"}` : ""}`}
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
                setFormData((prev) => ({
                  ...prev,
                  paymentType: value,
                  dpAmount: "", // Reset DP amount when changing payment type
                }));
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

          {formData.paymentType && (
            <div className="space-y-1">
              <Label className="block text-sm font-medium text-gray-700">
                {formData.paymentType === "full" ? "Harga" : "Jumlah Uang Muka"}
              </Label>
              {formData.paymentType === "full" ? (
                <Input
                  value={`Rp ${service.totalPrice?.toLocaleString("id-ID")}`}
                  disabled
                  className="h-9 w-full cursor-not-allowed border border-gray-200 bg-gray-50"
                />
              ) : (
                <>
                  <Input
                    inputMode="numeric"
                    name="dpAmount"
                    value={formattedDpAmount} // Tampilkan angka dengan format
                    onChange={handleDpAmountChange} // Simpan angka mentah ke state
                    placeholder="Masukkan jumlah uang muka"
                    className={`h-9 w-full ${errors.dpAmount ? "border-red-500" : "border-gray-200"}`}
                    disabled={isSubmitting}
                  />
                  {errors.dpAmount && (
                    <p className="text-sm text-red-500">{errors.dpAmount}</p>
                  )}
                </>
              )}
            </div>
          )}

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
