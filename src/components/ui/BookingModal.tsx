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

  const generatePDF = (data: typeof formData & { selectedProduct: string }) => {
    const doc = new jsPDF();

    // Add company logo or header
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 0);
    doc.text("Booking Details", 20, 20);

    // Add booking information
    doc.setFontSize(12);
    let yPosition = 40;

    // Add current date
    const currentDate = new Date().toLocaleDateString();
    doc.text(`Booking Date: ${currentDate}`, 20, yPosition);
    yPosition += 10;

    // Add horizontal line
    doc.setLineWidth(0.5);
    doc.line(20, yPosition, 190, yPosition);
    yPosition += 10;

    // Customer Details Section
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold"); // Fixed: Specified font family
    doc.text("Customer Details", 20, yPosition);
    doc.setFont("helvetica", "normal"); // Fixed: Specified font family
    doc.setFontSize(12);
    yPosition += 10;

    const content = [
      ["Full Name:", data.fullName],
      ["Phone Number:", data.phoneNumber],
      ["Email:", data.email],
      [
        "Event Date:",
        data.eventDate ? data.eventDate.toLocaleDateString() : "",
      ],
      ["Event Location:", data.eventLocation],
      ["Selected Package:", data.selectedProduct],
      ["Payment Type:", data.paymentType],
    ];

    content.forEach(([label, value]) => {
      doc.text(`${label} ${value}`, 20, yPosition);
      yPosition += 10;
    });

    // Add footer
    doc.setFontSize(10);
    doc.text("Thank you for your booking!", 20, 270);
    doc.text(
      "For any inquiries, please contact us at: +62 851-5731-6767",
      20,
      280,
    );

    // Save the PDF
    doc.save("booking-details.pdf");
  };

  const formatWhatsAppMessage = (
    data: typeof formData & { selectedProduct: string },
  ) => {
    return encodeURIComponent(`
*New Booking Request*
------------------------
*Customer Details:*
👤 Full Name: ${data.fullName}
📱 Phone: ${data.phoneNumber}
📧 Email: ${data.email}

*Event Details:*
📅 Date: ${data.eventDate ? data.eventDate.toLocaleDateString() : ""}
📍 Location: ${data.eventLocation}

*Package Details:*
📦 Selected Package: ${data.selectedProduct}
💳 Payment Type: ${data.paymentType}

Thank you for your booking! We will contact you shortly to confirm the details.
`);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone number is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.eventDate) newErrors.eventDate = "Event date is required";
    if (!formData.eventLocation)
      newErrors.eventLocation = "Event location is required";
    if (!formData.paymentType)
      newErrors.paymentType = "Payment type is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone number validation (Indonesian format)
    const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
    if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid Indonesian phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const submissionData = {
        ...formData,
        selectedProduct: service.title,
      };

      // Generate PDF
      generatePDF(submissionData);

      // Open WhatsApp with pre-filled message
      const whatsappMessage = formatWhatsAppMessage(submissionData);
      window.open(
        `https://wa.me/6285157316767?text=${whatsappMessage}`,
        "_blank",
      );

      console.log("Form submitted:", submissionData);
      onClose();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
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
    { value: "full", label: "Full Payment" },
    { value: "dp", label: "Down Payment (DP)" },
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
            Please fill in your details to book this service
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label className="block text-sm font-medium text-gray-700">
              Full Name
            </Label>
            <Input
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className={`h-9 w-full ${
                errors.fullName ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.fullName && (
              <p className="text-sm text-red-500">{errors.fullName}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label className="block text-sm font-medium text-gray-700">
              Phone Number
            </Label>
            <Input
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter your phone number (e.g., 0812345678)"
              className={`h-9 w-full ${
                errors.phoneNumber ? "border-red-500" : "border-gray-200"
              }`}
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
              placeholder="Enter your email"
              className={`h-9 w-full ${
                errors.email ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label className="block text-sm font-medium text-gray-700">
              Event Date
            </Label>
            <DatePicker
              value={formData.eventDate}
              onChange={handleDateChange}
              minDate={new Date()}
              placeholder="Select event date"
              error={errors.eventDate}
              className={errors.eventDate ? "border-red-500" : ""}
            />
          </div>

          <div className="space-y-1">
            <Label className="block text-sm font-medium text-gray-700">
              Event Location
            </Label>
            <Input
              name="eventLocation"
              value={formData.eventLocation}
              onChange={handleInputChange}
              placeholder="Enter event location"
              className={`h-9 w-full ${
                errors.eventLocation ? "border-red-500" : "border-gray-200"
              }`}
            />
            {errors.eventLocation && (
              <p className="text-sm text-red-500">{errors.eventLocation}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label className="block text-sm font-medium text-gray-700">
              Selected Package
            </Label>
            <Input
              value={service.title}
              disabled
              className="h-9 w-full cursor-not-allowed border border-gray-200 bg-gray-50"
            />
          </div>

          <div className="space-y-1">
            <Label className="block text-sm font-medium text-gray-700">
              Payment Type
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
              placeholder="Select payment type"
              className={errors.paymentType ? "border-red-500" : ""}
            />
            {errors.paymentType && (
              <p className="text-sm text-red-500">{errors.paymentType}</p>
            )}
          </div>

          <div className="!mt-10 flex justify-end gap-3">
            <Button
              type="button"
              onClick={onClose}
              className="border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent/90"
            >
              Submit Booking
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default BookingModal;
