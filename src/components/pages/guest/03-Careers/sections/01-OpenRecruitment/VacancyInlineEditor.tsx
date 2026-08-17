"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check, ImagePlus, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";

import ConfirmDialog from "@/components/ui/ConfirmDialog";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/Card";

import { Separator } from "@/components/ui/Separator";
import { cn } from "@/lib/utils";

import { VacancyType } from "@/components/ui/VacancyCard";

interface VacancyInlineEditorProps {
  vacancy: VacancyType;
  isNew?: boolean;

  onChange: (vacancy: VacancyType) => void;
  onCancel: () => void;
  onDelete: () => void;

  onCreateSuccess: (vacancy: VacancyType) => void;
  onUpdateSuccess: (vacancy: VacancyType) => void;
}

export default function VacancyInlineEditor({
  vacancy,
  isNew = false,
  onChange,
  onCancel,
  onDelete,
  onCreateSuccess,
  onUpdateSuccess,
}: VacancyInlineEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imagePreview, setImagePreview] = useState(vacancy.image ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  /*
   * =====================================================
   * AUTO RESIZE TEXTAREA
   * =====================================================
   *
   * Setiap textarea mengikuti tinggi isi.
   *
   * Jadi jika teks:
   *
   * "Memiliki kendaraan pribadi (diutamakan
   * dapat mengemudi)"
   *
   * maka seluruh teks tetap terlihat.
   */

  const resizeTextareas = () => {
    requestAnimationFrame(() => {
      const textareas = document.querySelectorAll<HTMLTextAreaElement>(
        `[data-vacancy-editor="${vacancy.id}"]`,
      );

      textareas.forEach((textarea) => {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      });
    });
  };

  useEffect(() => {
    resizeTextareas();
  }, [vacancy.id, vacancy.qualifications]);

  /*
   * =====================================================
   * UPDATE FIELD
   * =====================================================
   */

  const updateField = <K extends keyof VacancyType>(
    field: K,
    value: VacancyType[K],
  ) => {
    onChange({
      ...vacancy,
      [field]: value,
    });
  };

  /*
   * =====================================================
   * QUALIFICATION
   * =====================================================
   */

  const updateQualification = (index: number, value: string) => {
    const qualifications = [...vacancy.qualifications];

    qualifications[index] = value;

    updateField("qualifications", qualifications);
  };

  const addQualification = (index?: number) => {
    const qualifications = [...vacancy.qualifications];

    const position = index === undefined ? qualifications.length : index + 1;

    qualifications.splice(position, 0, "");

    updateField("qualifications", qualifications);
  };

  const removeQualification = (index: number) => {
    const qualifications = vacancy.qualifications.filter(
      (_, itemIndex) => itemIndex !== index,
    );

    updateField(
      "qualifications",
      qualifications.length > 0 ? qualifications : [""],
    );
  };

  /*
   * =====================================================
   * KEYBOARD QUALIFICATION
   * =====================================================
   */

  const handleQualificationKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
    index: number,
  ) => {
    /*
     * ENTER
     *
     * Buat qualification baru.
     */

    if (event.key === "Enter") {
      event.preventDefault();

      addQualification(index);

      requestAnimationFrame(() => {
        const nextInput = document.querySelector<HTMLTextAreaElement>(
          `[data-vacancy-editor="${vacancy.id}"][data-qualification-index="${index + 1}"]`,
        );

        nextInput?.focus();
      });

      return;
    }

    /*
     * BACKSPACE PADA INPUT KOSONG
     *
     * Hapus qualification tersebut.
     */

    if (
      event.key === "Backspace" &&
      vacancy.qualifications[index] === "" &&
      vacancy.qualifications.length > 1
    ) {
      event.preventDefault();

      removeQualification(index);

      requestAnimationFrame(() => {
        const previousInput = document.querySelector<HTMLTextAreaElement>(
          `[data-vacancy-editor="${vacancy.id}"][data-qualification-index="${Math.max(
            0,
            index - 1,
          )}"]`,
        );

        previousInput?.focus();
      });
    }
  };

  /*
   * =====================================================
   * IMAGE UPLOAD
   * =====================================================
   */

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");

    const objectUrl = URL.createObjectURL(file);

    setImagePreview(objectUrl);

    try {
      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Gagal upload image.");
      }

      updateField("image", data.url);

      setImagePreview(data.url);

      toast.success("Image berhasil diupload.");
    } catch (error) {
      console.error("Upload image error:", error);

      setImagePreview(vacancy.image ?? "");

      const message =
        error instanceof Error ? error.message : "Gagal upload image.";

      setError(message);

      toast.error(message);
    } finally {
      event.target.value = "";
    }
  };

  /*
   * =====================================================
   * NORMALIZE API DATA
   * =====================================================
   */

  const normalizeVacancy = (data: any, fallback: VacancyType): VacancyType => {
    return {
      id: String(data.id),
      title: String(data.title ?? fallback.title),
      employmentType: String(
        data.employmentType ?? fallback.employmentType ?? "",
      ),
      image: data.image ?? fallback.image ?? "",
      qualifications: Array.isArray(data.qualifications)
        ? data.qualifications.map((item: unknown) => String(item))
        : fallback.qualifications,
    };
  };

  /*
   * =====================================================
   * SAVE
   * =====================================================
   */

  const handleSave = async () => {
    setError("");

    const title = vacancy.title.trim();

    const employmentType = vacancy.employmentType?.trim() ?? "";

    const qualifications = vacancy.qualifications
      .map((item) => item.trim())
      .filter(Boolean);

    if (!title) {
      setError("Title vacancy wajib diisi.");
      return;
    }

    if (!employmentType) {
      setError("Employment type wajib diisi.");
      return;
    }

    if (qualifications.length === 0) {
      setError("Minimal satu kualifikasi wajib diisi.");
      return;
    }

    setIsSaving(true);

    try {
      /*
       * =================================================
       * CREATE
       * =================================================
       */

      if (isNew) {
        const response = await fetch("/api/vacancies", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
          body: JSON.stringify({
            title,
            employmentType,
            image: vacancy.image || null,
            qualifications,
          }),
          cache: "no-store",
        });

        const data = await response.json();

        console.log("POST /api/vacancies response:", data);

        if (!response.ok) {
          throw new Error(data?.message || "Gagal membuat vacancy.");
        }

        const createdVacancy = normalizeVacancy(data, {
          ...vacancy,
          title,
          employmentType,
          qualifications,
        });

        console.log("Created vacancy:", createdVacancy);

        onCreateSuccess(createdVacancy);

        toast.success("Vacancy berhasil dibuat.");

        return;
      }

      /*
       * =================================================
       * UPDATE
       * =================================================
       */

      const response = await fetch(`/api/vacancies/${vacancy.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({
          title,
          employmentType,
          image: vacancy.image || null,
          qualifications,
        }),
        cache: "no-store",
      });

      const data = await response.json();

      console.log("PUT /api/vacancies response:", data);

      if (!response.ok) {
        throw new Error(data?.message || "Gagal mengubah vacancy.");
      }

      const updatedVacancy = normalizeVacancy(data, {
        ...vacancy,
        title,
        employmentType,
        qualifications,
      });

      console.log("Updated vacancy:", updatedVacancy);

      onUpdateSuccess(updatedVacancy);

      toast.success("Perubahan vacancy berhasil disimpan.");
    } catch (error) {
      console.error("Save vacancy error:", error);

      const message =
        error instanceof Error ? error.message : "Terjadi kesalahan.";

      setError(message);

      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  /*
   * =====================================================
   * DELETE CLICK
   * =====================================================
   */

  const handleDeleteClick = () => {
    if (isNew) {
      onDelete();

      toast.info("Draft vacancy dibatalkan.");

      return;
    }

    setShowDeleteDialog(true);
  };

  /*
   * =====================================================
   * CONFIRM DELETE
   * =====================================================
   */

  const handleConfirmDelete = async () => {
    if (isNew) {
      onDelete();
      setShowDeleteDialog(false);
      return;
    }

    setError("");
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/vacancies/${vacancy.id}`, {
        method: "DELETE",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Gagal menghapus vacancy.");
      }

      onDelete();

      setShowDeleteDialog(false);

      toast.success("Vacancy berhasil dihapus.");
    } catch (error) {
      console.error("Delete vacancy error:", error);

      const message =
        error instanceof Error ? error.message : "Gagal menghapus vacancy.";

      setError(message);

      toast.error(message);
    } finally {
      setIsDeleting(false);
    }
  };

  /*
   * =====================================================
   * RENDER
   * =====================================================
   */

  return (
    <>
      <Card
        className={cn(
          /*
           * Sama seperti VacancyCard:
           * - max width 480px
           * - flex column
           * - tidak menggunakan h-full
           * - tidak overflow-hidden agar content editor
           *   tidak terpotong
           */
          "mx-auto flex w-full max-w-[480px] flex-col overflow-visible border-2 border-dashed border-accent bg-white shadow-md",
        )}
      >
        {/* =================================================
            IMAGE
        ================================================= */}

        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-[inherit] bg-gray-100">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt={vacancy.title || "Vacancy"}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-gray-400">
              <ImagePlus className="h-10 w-10" />

              <span className="text-sm">Belum ada image</span>
            </div>
          )}

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isSaving || isDeleting}
            className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-md bg-black/80 px-3 py-2 text-xs font-medium text-white backdrop-blur transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ImagePlus className="h-4 w-4" />
            Upload Image
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        {/* =================================================
            HEADER
        ================================================= */}

        <CardHeader className="p-4 pb-0 sm:p-6 sm:pb-0">
          {vacancy.employmentType && (
            <div className="mb-2 text-left">
              <select
                value={vacancy.employmentType ?? ""}
                onChange={(event) =>
                  updateField("employmentType", event.target.value)
                }
                disabled={isSaving || isDeleting}
                className="inline-block w-fit rounded-full border-0 bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent outline-none disabled:opacity-50"
              >
                <option value="Freelance">Freelance</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
          )}

          <input
            type="text"
            value={vacancy.title}
            onChange={(event) => updateField("title", event.target.value)}
            disabled={isSaving || isDeleting}
            placeholder="EVENT CREW"
            className="w-full border-0 bg-transparent px-0 py-0 text-center font-serif text-lg font-semibold outline-none sm:text-2xl"
          />
        </CardHeader>

        {/* =================================================
            CONTENT
        ================================================= */}

        <CardContent className="flex flex-col p-4 pt-3 sm:p-6 sm:pt-4">
          <Separator className="mb-3 bg-gray-200 sm:mb-4" />

          {/*
           * SAMA DENGAN VACANCYCARD
           */}

          <h4 className="text-left text-sm font-medium text-gray-600 sm:text-base">
            Kualifikasi:
          </h4>

          {/*
           * SAMA DENGAN:
           *
           * <ul className="mt-2 space-y-2 text-left">
           *
           * Editor dibuat tetap menggunakan layout
           * yang sama.
           */}

          <div className="mt-2 space-y-2 text-left">
            {vacancy.qualifications.map((qualification, index) => (
              <div
                key={`${vacancy.id}-qualification-${index}`}
                className="group flex items-start gap-2"
              >
                {/*
                 * BULLET SAMA DENGAN VACANCYCARD
                 */}

                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />

                {/*
                 * TEXTAREA
                 *
                 * Font SAMA dengan VacancyCard:
                 *
                 * text-sm
                 * leading-relaxed
                 *
                 * sm tidak diubah menjadi text-base
                 * karena VacancyCard tetap text-sm.
                 *
                 * Height otomatis mengikuti isi.
                 */}

                <textarea
                  rows={1}
                  value={qualification}
                  data-vacancy-editor={vacancy.id}
                  data-qualification-index={index}
                  onChange={(event) =>
                    updateQualification(index, event.target.value)
                  }
                  onKeyDown={(event) =>
                    handleQualificationKeyDown(event, index)
                  }
                  disabled={isSaving || isDeleting}
                  placeholder="Tulis kualifikasi..."
                  className="m-0 min-h-[24px] min-w-0 flex-1 resize-none overflow-hidden border-0 bg-transparent p-0 text-sm leading-relaxed text-gray-600 outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 disabled:opacity-50"
                  onInput={(event) => {
                    const target = event.currentTarget;

                    target.style.height = "auto";
                    target.style.height = `${target.scrollHeight}px`;
                  }}
                />

                {/*
                 * DELETE QUALIFICATION
                 */}

                {vacancy.qualifications.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQualification(index)}
                    disabled={isSaving || isDeleting}
                    aria-label="Hapus kualifikasi"
                    className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded text-gray-300 opacity-0 transition hover:text-red-500 disabled:pointer-events-none group-hover:opacity-100"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* =================================================
              ADD QUALIFICATION
          ================================================= */}

          <button
            type="button"
            onClick={() => addQualification()}
            disabled={isSaving || isDeleting}
            className="mt-4 flex w-fit items-center gap-1.5 text-xs font-medium text-accent transition hover:opacity-70 disabled:opacity-50 sm:text-sm"
          >
            <Plus className="h-3.5 w-3.5" />
            Tambah Kualifikasi
          </button>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-left text-xs text-red-600">
              {error}
            </p>
          )}
        </CardContent>

        {/* =================================================
            FOOTER
        ================================================= */}

        <CardFooter className="flex flex-wrap justify-between gap-2 border-t bg-gray-50 p-4 sm:p-6">
          <button
            type="button"
            onClick={handleDeleteClick}
            disabled={isSaving || isDeleting}
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs font-medium text-red-500 transition hover:bg-red-50 disabled:opacity-50 sm:text-sm"
          >
            <Trash2 className="h-4 w-4" />

            {isNew ? "Batalkan" : "Hapus"}
          </button>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={isSaving || isDeleting}
              className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-xs font-medium text-gray-600 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
            >
              <X className="h-4 w-4" />
              Batal
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving || isDeleting}
              className="inline-flex items-center gap-2 rounded-md bg-black px-4 py-2 text-xs font-medium text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
            >
              <Check className="h-4 w-4" />

              {isSaving
                ? "Menyimpan..."
                : isNew
                  ? "Simpan Vacancy"
                  : "Simpan Perubahan"}
            </button>
          </div>
        </CardFooter>
      </Card>

      {/* =====================================================
          CONFIRM DELETE
      ===================================================== */}

      <ConfirmDialog
        open={showDeleteDialog}
        title="Hapus Vacancy?"
        description={`Vacancy "${vacancy.title || "ini"}" akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Ya, Hapus"
        cancelText="Batal"
        loading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          if (!isDeleting) {
            setShowDeleteDialog(false);
          }
        }}
      />
    </>
  );
}
