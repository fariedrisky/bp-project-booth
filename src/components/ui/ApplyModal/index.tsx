"use client";

import React, { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Select from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Checkbox";
import { X, Trash2 } from "lucide-react";
import {
  ApplicationFormData,
  ApplicationFormErrors,
  EDUCATION_OPTIONS,
  GENDER_OPTIONS,
  createEmptyExperience,
} from "./types";
import { validateApplicationForm } from "./utils";

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  vacancyTitle?: string;
}

const initialFormData: ApplicationFormData = {
  fullName: "",
  dateOfBirth: "",
  gender: "",
  lastEducation: "",
  isCurrentlyStudying: false,
  currentStudyProgram: "",
  hasNoWorkExperience: false,
  workExperiences: [],
  email: "",
  phoneNumber: "",
};

export default function ApplyModal({
  isOpen,
  onClose,
  vacancyTitle,
}: ApplyModalProps) {
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
      setFormData(initialFormData);
      setErrors({});
      setSubmitStatus("idle");
    }
  }, [isOpen]);

  const clearError = (field: keyof ApplicationFormErrors) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    clearError(name as keyof ApplicationFormErrors);
  };

  // --- Pendidikan & status studi ---
  const handleToggleStudying = () => {
    setFormData((prev) => ({
      ...prev,
      isCurrentlyStudying: !prev.isCurrentlyStudying,
      currentStudyProgram: !prev.isCurrentlyStudying
        ? prev.currentStudyProgram
        : "",
    }));
    clearError("currentStudyProgram");
  };

  // --- Pengalaman kerja ---
  const handleToggleNoExperience = () => {
    setFormData((prev) => {
      const nextHasNoExperience = !prev.hasNoWorkExperience;
      return {
        ...prev,
        hasNoWorkExperience: nextHasNoExperience,
        workExperiences: nextHasNoExperience
          ? []
          : prev.workExperiences.length > 0
            ? prev.workExperiences
            : [createEmptyExperience()],
      };
    });
    clearError("workExperiences");
  };

  const handleAddExperience = () => {
    setFormData((prev) => ({
      ...prev,
      workExperiences: [...prev.workExperiences, createEmptyExperience()],
    }));
  };

  const handleRemoveExperience = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      workExperiences: prev.workExperiences.filter((exp) => exp.id !== id),
    }));
  };

  const handleExperienceFieldChange = (
    id: string,
    field:
      | "companyName"
      | "position"
      | "jobDescription"
      | "startYear"
      | "endYear",
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      workExperiences: prev.workExperiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp,
      ),
    }));
    clearError("workExperiences");
  };

  const handleToggleExperienceCurrent = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      workExperiences: prev.workExperiences.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              isCurrent: !exp.isCurrent,
              endYear: !exp.isCurrent ? "" : exp.endYear,
            }
          : exp,
      ),
    }));
    clearError("workExperiences");
  };

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
              Lamaran Anda berhasil dikirim. Tim HR kami akan menghubungi Anda
              melalui email jika Anda lolos ke tahap selanjutnya.
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
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ===== Data Diri ===== */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Data Diri
              </h3>

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

              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="w-full space-y-1 sm:w-1/2">
                  <Label className="block text-sm font-medium text-gray-700">
                    Tanggal Lahir
                  </Label>
                  <Input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    max={new Date().toISOString().split("T")[0]}
                    className={`h-9 w-full ${
                      errors.dateOfBirth ? "border-red-500" : "border-gray-200"
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-sm text-red-500">{errors.dateOfBirth}</p>
                  )}
                </div>

                <div className="w-full space-y-1 sm:w-1/2">
                  <Label className="block text-sm font-medium text-gray-700">
                    Jenis Kelamin
                  </Label>
                  <Select
                    options={GENDER_OPTIONS}
                    value={formData.gender}
                    onChange={(value) => {
                      setFormData((prev) => ({
                        ...prev,
                        gender: value as ApplicationFormData["gender"],
                      }));
                      clearError("gender");
                    }}
                    placeholder="Pilih jenis kelamin"
                    className={errors.gender ? "border-red-500" : ""}
                    disabled={isSubmitting}
                  />
                  {errors.gender && (
                    <p className="text-sm text-red-500">{errors.gender}</p>
                  )}
                </div>
              </div>
            </div>

            {/* ===== Pendidikan ===== */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Pendidikan
              </h3>

              <div className="space-y-1">
                <Label className="block text-sm font-medium text-gray-700">
                  Pendidikan Terakhir
                </Label>
                <Select
                  options={EDUCATION_OPTIONS}
                  value={formData.lastEducation}
                  onChange={(value) => {
                    setFormData((prev) => ({
                      ...prev,
                      lastEducation:
                        value as ApplicationFormData["lastEducation"],
                    }));
                    clearError("lastEducation");
                  }}
                  placeholder="Pilih pendidikan terakhir"
                  className={errors.lastEducation ? "border-red-500" : ""}
                  disabled={isSubmitting}
                />
                {errors.lastEducation && (
                  <p className="text-sm text-red-500">{errors.lastEducation}</p>
                )}
              </div>

              <Checkbox
                checked={formData.isCurrentlyStudying}
                onCheckedChange={handleToggleStudying}
                disabled={isSubmitting}
                label="Saat ini sedang berkuliah/sekolah (posisi ini freelance, boleh sambil studi)"
              />

              {formData.isCurrentlyStudying && (
                <div className="space-y-1">
                  <Label className="block text-sm font-medium text-gray-700">
                    Sedang Studi Apa
                  </Label>
                  <Input
                    name="currentStudyProgram"
                    value={formData.currentStudyProgram}
                    onChange={handleInputChange}
                    placeholder="Contoh: S1 Manajemen, Universitas Syiah Kuala"
                    className={`h-9 w-full ${
                      errors.currentStudyProgram
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.currentStudyProgram && (
                    <p className="text-sm text-red-500">
                      {errors.currentStudyProgram}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* ===== Pengalaman Kerja ===== */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Pengalaman Kerja
              </h3>

              <Checkbox
                checked={formData.hasNoWorkExperience}
                onCheckedChange={handleToggleNoExperience}
                disabled={isSubmitting}
                label="Tidak memiliki pengalaman kerja"
              />

              {!formData.hasNoWorkExperience && (
                <div className="space-y-3">
                  {formData.workExperiences.map((exp, idx) => (
                    <div
                      key={exp.id}
                      className="space-y-2 rounded border border-gray-200 p-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-500">
                          Pengalaman {idx + 1}
                        </span>
                        {formData.workExperiences.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveExperience(exp.id)}
                            className="rounded p-1 text-red-500 hover:bg-red-50"
                            disabled={isSubmitting}
                            aria-label="Hapus pengalaman ini"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>

                      <Input
                        value={exp.companyName}
                        onChange={(e) =>
                          handleExperienceFieldChange(
                            exp.id,
                            "companyName",
                            e.target.value,
                          )
                        }
                        placeholder="Nama perusahaan / tempat kerja"
                        className="h-9 w-full border-gray-200"
                        disabled={isSubmitting}
                      />
                      <Input
                        value={exp.position}
                        onChange={(e) =>
                          handleExperienceFieldChange(
                            exp.id,
                            "position",
                            e.target.value,
                          )
                        }
                        placeholder="Posisi / jabatan"
                        className="h-9 w-full border-gray-200"
                        disabled={isSubmitting}
                      />

                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          inputMode="numeric"
                          value={exp.startYear}
                          onChange={(e) =>
                            handleExperienceFieldChange(
                              exp.id,
                              "startYear",
                              e.target.value,
                            )
                          }
                          placeholder="Tahun mulai"
                          min={1970}
                          max={new Date().getFullYear()}
                          className="h-9 w-full border-gray-200"
                          disabled={isSubmitting}
                        />
                        <span className="text-sm text-gray-400">—</span>
                        <Input
                          type="number"
                          inputMode="numeric"
                          value={exp.isCurrent ? "" : exp.endYear}
                          onChange={(e) =>
                            handleExperienceFieldChange(
                              exp.id,
                              "endYear",
                              e.target.value,
                            )
                          }
                          placeholder={
                            exp.isCurrent ? "Sekarang" : "Tahun selesai"
                          }
                          min={1970}
                          max={new Date().getFullYear()}
                          disabled={isSubmitting || exp.isCurrent}
                          className="h-9 w-full border-gray-200 disabled:bg-gray-50"
                        />
                      </div>

                      <Checkbox
                        checked={exp.isCurrent}
                        onCheckedChange={() =>
                          handleToggleExperienceCurrent(exp.id)
                        }
                        disabled={isSubmitting}
                        label="Saat ini masih bekerja di sini"
                      />
                      <textarea
                        value={exp.jobDescription}
                        onChange={(e) =>
                          handleExperienceFieldChange(
                            exp.id,
                            "jobDescription",
                            e.target.value,
                          )
                        }
                        placeholder="Tugas dan tanggung jawab yang dikerjakan"
                        rows={3}
                        disabled={isSubmitting}
                        className="w-full rounded border border-gray-200 px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:border-accent focus:outline-none disabled:bg-gray-50"
                      />
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={handleAddExperience}
                    disabled={isSubmitting}
                    className="text-sm font-medium text-accent hover:underline"
                  >
                    + Tambah Pengalaman Lain
                  </button>
                </div>
              )}

              {errors.workExperiences && (
                <p className="text-sm text-red-500">{errors.workExperiences}</p>
              )}
            </div>

            {/* ===== Kontak ===== */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Kontak
              </h3>

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
      </div>
    </Modal>
  );
}
