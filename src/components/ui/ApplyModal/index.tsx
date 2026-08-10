"use client";

import React, { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import { X } from "lucide-react";
import { ApplicationFormData, ApplicationFormErrors } from "./types";
import { validateApplicationForm } from "./utils";

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  vacancyTitle?: string;
}

type Step = "info" | "form";

const initialFormData: ApplicationFormData = {
  fullName: "",
  email: "",
  phoneNumber: "",
  cvLink: "",
};

export default function ApplyModal({
  isOpen,
  onClose,
  vacancyTitle,
}: ApplyModalProps) {
  const [step, setStep] = useState<Step>("info");
  const [formData, setFormData] =
    useState<ApplicationFormData>(initialFormData);
  const [errors, setErrors] = useState<ApplicationFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Reset internal state every time the modal is freshly opened
  useEffect(() => {
    if (isOpen) {
      setStep("info");
      setFormData(initialFormData);
      setErrors({});
      setSubmitStatus("idle");
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ApplicationFormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleOpenForm = () => setStep("form");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateApplicationForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          position: vacancyTitle ?? "",
        }),
      });

      if (!response.ok) {
        throw new Error("Gagal mengirim lamaran. Silakan coba lagi.");
      }

      setSubmitStatus("success");
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative p-6">
        <button
          onClick={onClose}
          className="absolute -right-2 -top-2 p-1 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        {step === "info" ? (
          <>
            <div className="mb-4">
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                {vacancyTitle || "Open Recruitment"}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Bergabunglah bersama tim kami dan kembangkan kariermu.
              </p>
            </div>

            <div className="space-y-3 text-sm text-gray-700">
              <p>
                Jika kamu tertarik untuk menjadi bagian dari tim kami, silakan
                daftarkan dirimu dengan menekan tombol di bawah ini. Siapkan CV
                dalam format PDF dan unggah ke Google Drive dengan akses
                &ldquo;Anyone with the link&rdquo; sebelum mendaftar.
              </p>
            </div>

            <div className="!mt-8 flex justify-end">
              <Button
                type="button"
                onClick={handleOpenForm}
                className="bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent/90"
              >
                Daftar Sekarang
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                Form Pendaftaran
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {vacancyTitle
                  ? `Silakan isi data diri Anda untuk melamar posisi ${vacancyTitle}.`
                  : "Silakan isi data diri Anda untuk melamar posisi ini."}
              </p>
            </div>

            {submitStatus === "success" ? (
              <div className="space-y-4 py-4 text-center">
                <p className="text-sm text-gray-700">
                  Lamaran Anda berhasil dikirim. Tim HR kami akan menghubungi
                  Anda melalui email jika Anda lolos ke tahap selanjutnya.
                </p>
                <Button
                  type="button"
                  onClick={onClose}
                  className="bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent/90"
                >
                  Tutup
                </Button>
              </div>
            ) : (
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
                    Nomor Telepon (WhatsApp)
                  </Label>
                  <Input
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Contoh: 08123456789"
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
                    Link CV (Google Drive)
                  </Label>
                  <Input
                    name="cvLink"
                    value={formData.cvLink}
                    onChange={handleInputChange}
                    placeholder="https://drive.google.com/..."
                    className={`h-9 w-full ${
                      errors.cvLink ? "border-red-500" : "border-gray-200"
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.cvLink && (
                    <p className="text-sm text-red-500">{errors.cvLink}</p>
                  )}
                  <p className="text-xs text-gray-400">
                    Pastikan link dapat diakses publik (Anyone with the link).
                  </p>
                </div>

                {submitStatus === "error" && (
                  <p className="text-sm text-red-500">
                    Terjadi kesalahan saat mengirim lamaran. Silakan coba lagi.
                  </p>
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
                    {isSubmitting ? "Mengirim..." : "Kirim Lamaran"}
                  </Button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </Modal>
  );
}
