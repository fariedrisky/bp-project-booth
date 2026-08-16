"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { updateVacancy } from "@/actions/vacancy";

type Vacancy = {
  id: number;
  title: string;
  employmentType: string;
  image: string | null;
  qualifications: string[];
};

type Props = {
  vacancy: Vacancy;
};

export default function EditVacancyForm({ vacancy }: Props) {
  const [image, setImage] = useState(vacancy.image ?? "");

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [preview, setPreview] = useState(vacancy.image ?? "");

  const [qualifications, setQualifications] = useState<string[]>(
    vacancy.qualifications.length > 0 ? vacancy.qualifications : [""],
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    return () => {
      if (preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

    if (!allowedTypes.includes(file.type)) {
      alert("Format image harus JPG, JPEG, PNG, atau WEBP.");

      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran image maksimal 5 MB.");

      event.target.value = "";
      return;
    }

    setImageFile(file);

    const previewUrl = URL.createObjectURL(file);

    setPreview(previewUrl);
  };

  const addQualification = () => {
    setQualifications((prev) => [...prev, ""]);
  };

  const removeQualification = (index: number) => {
    setQualifications((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQualification = (index: number, value: string) => {
    setQualifications((prev) =>
      prev.map((item, i) => (i === index ? value : item)),
    );
  };

  return (
    <form
      action={async (formData) => {
        setIsSubmitting(true);

        try {
          await updateVacancy(vacancy.id, formData);
        } catch (error) {
          console.error(error);

          alert(
            error instanceof Error
              ? error.message
              : "Gagal menyimpan perubahan.",
          );

          setIsSubmitting(false);
        }
      }}
      className="w-full max-w-4xl space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      {/* TITLE */}

      <div className="space-y-2">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-900"
        >
          Nama Posisi
        </label>

        <input
          id="title"
          name="title"
          type="text"
          defaultValue={vacancy.title}
          required
          className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
          placeholder="Contoh: Event Crew"
        />
      </div>

      {/* EMPLOYMENT TYPE */}

      <div className="space-y-2">
        <label
          htmlFor="employmentType"
          className="block text-sm font-medium text-gray-900"
        >
          Tipe Pekerjaan
        </label>

        <select
          id="employmentType"
          name="employmentType"
          defaultValue={vacancy.employmentType}
          className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-black focus:ring-1 focus:ring-black"
        >
          <option value="Freelance">Freelance</option>

          <option value="Full Time">Full Time</option>

          <option value="Part Time">Part Time</option>

          <option value="Internship">Internship</option>

          <option value="Contract">Contract</option>
        </select>
      </div>

      {/* IMAGE */}

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-900">
          Image Vacancy
        </label>

        {/* Current / Preview */}

        {preview && (
          <div>
            <p className="mb-2 text-sm text-gray-600">Preview Image</p>

            <div className="relative h-64 w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
              <img
                src={preview}
                alt={vacancy.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Upload */}

        <div>
          <label
            htmlFor="imageFile"
            className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-8 text-center transition hover:border-gray-500 hover:bg-gray-100"
          >
            <span className="text-sm font-medium text-gray-700">
              {imageFile ? imageFile.name : "Klik untuk upload image baru"}
            </span>

            <span className="mt-1 text-xs text-gray-500">
              JPG, JPEG, PNG, WEBP — maksimal 5 MB
            </span>
          </label>

          <input
            id="imageFile"
            name="imageFile"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* Current image URL */}

        <input type="hidden" name="currentImage" value={image} />
      </div>

      {/* QUALIFICATIONS */}

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-900">
            Qualifications
          </label>

          <button
            type="button"
            onClick={addQualification}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            + Tambah
          </button>
        </div>

        <div className="space-y-3">
          {qualifications.map((qualification, index) => (
            <div key={index} className="flex w-full items-center gap-3">
              <input
                type="text"
                name="qualifications"
                value={qualification}
                onChange={(e) => updateQualification(index, e.target.value)}
                className="block min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black"
                placeholder={`Kualifikasi ${index + 1}`}
              />

              {qualifications.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQualification(index)}
                  className="shrink-0 rounded-lg border border-red-200 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50"
                >
                  Hapus
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ACTION */}

      <div className="flex items-center justify-end gap-3 border-t border-gray-200 pt-6">
        <Link
          href="/dashboard/careers"
          className="rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Batal
        </Link>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
      </div>
    </form>
  );
}
