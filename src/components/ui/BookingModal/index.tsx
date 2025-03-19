import React, { useState } from "react";
import { Modal } from "../Modal";
import { Button } from "../Button";
import { X } from "lucide-react";
import { BookingModalProps, FormData } from "./types";
import PersonalInfo from "./PersonalInfo";
import EventDetails from "./EventDetails";
import OrderDetails from "./OrderDetails";
import Payment from "./Payment";
import TemplatePreview from "./TemplatePreview";
import { formatWhatsAppMessage, validateForm } from "./utils";

const initialFormData: FormData = {
  fullName: "",
  phoneNumber: "",
  email: "",
  eventDate: null,
  openBoothTime: null,
  eventLocation: "",
  paymentType: "",
  dpAmount: "",
  templateOption: "",
};

export default function BookingModal({
  isOpen,
  onClose,
  service,
}: BookingModalProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTemplatePreview, setShowTemplatePreview] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm(formData, service, setErrors) || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionData = {
        ...formData,
        selectedProduct: service.title,
      };

      // Format WhatsApp message
      const whatsappMessage = formatWhatsAppMessage(submissionData, service);

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

  return (
    <>
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
            {/* Personal Information Section */}
            <PersonalInfo
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
              service={service}
              isSubmitting={isSubmitting}
            />

            {/* Event Details Section */}
            <EventDetails
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
              service={service}
              isSubmitting={isSubmitting}
            />

            {/* Order Details Section */}
            <OrderDetails
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
              service={service}
              isSubmitting={isSubmitting}
              onOpenTemplatePreview={() => setShowTemplatePreview(true)}
            />

            {/* Payment Section */}
            <Payment
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              setErrors={setErrors}
              service={service}
              isSubmitting={isSubmitting}
            />

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

      {/* Template preview lightbox */}
      <TemplatePreview
        isOpen={showTemplatePreview}
        onClose={() => setShowTemplatePreview(false)}
        service={service}
      />
    </>
  );
}
