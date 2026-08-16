"use client";

import { useState } from "react";
import Link from "next/link";
import { createVacancy } from "@/actions/vacancy";

export default function CreateVacancyForm() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [qualifications, setQualifications] = useState([""]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addQualification = () => {
    setQualifications((prev) => [...prev, ""]);
  };

  const removeQualification = (index: number) => {
    setQualifications((prev) =>
      prev.filter((_, itemIndex) => itemIndex !== index),
    );
  };

  const updateQualification = (index: number, value: string) => {
    setQualifications((prev) =>
      prev.map((item, itemIndex) => (itemIndex === index ? value : item)),
    );
  };

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

  return (
    <form
      action={async (formData) => {
        setIsSubmitting(true);

        try {
          await createVacancy(formData);
        } catch (error) {
          console.error(error);

          alert(
            error instanceof Error ? error.message : "Gagal membuat vacancy.",
          );

          setIsSubmitting(false);
        }
      }}
      className="max-w-3xl space-y-6 rounded-lg border bg-white p-6"
    >
      {/* TITLE */}

      <div>
        <label htmlFor="title" className="mb-2 block text-sm font-medium">
          Title
        </label>

        <input
          id="title"
          name="title"
          type="text"
          placeholder="EVENT CREW"
          required
          className="w-full rounded-md border px-3 py-2 outline-none focus:border-black"
        />
      </div>

      {/* EMPLOYMENT TYPE */}

      <div>
        <label
          htmlFor="employmentType"
          className="mb-2 block text-sm font-medium"
        >
          Employment Type
        </label>

        <select
          id="employmentType"
          name="employmentType"
          defaultValue="Freelance"
          className="w-full rounded-md border px-3 py-2 outline-none focus:border-black"
        >
          <option value="Freelance">Freelance</option>

          <option value="Full Time">Full Time</option>

          <option value="Part Time">Part Time</option>

          <option value="Internship">Internship</option>

          <option value="Contract">Contract</option>
        </select>
      </div>

      {/* IMAGE */}

      <div>
        <label htmlFor="imageFile" className="mb-2 block text-sm font-medium">
          Image
        </label>

        <label
          htmlFor="imageFile"
          className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center transition hover:border-gray-500 hover:bg-gray-100"
        >
          <div className="text-sm font-medium text-gray-700">
            {imageFile ? imageFile.name : "Klik untuk upload image"}
          </div>

          <div className="mt-1 text-xs text-gray-500">
            JPG, JPEG, PNG, WEBP — maksimal 5 MB
          </div>
        </label>

        <input
          id="imageFile"
          name="imageFile"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          required
          onChange={handleImageChange}
          className="hidden"
        />

        {/* IMAGE PREVIEW */}

        {preview && (
          <div className="mt-4">
            <p className="mb-2 text-sm font-medium">Preview</p>

            <div className="relative h-56 w-full overflow-hidden rounded-lg border bg-gray-100">
              <img
                src={preview}
                alt="Preview vacancy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        )}
      </div>

      {/* QUALIFICATIONS */}

      <div>
        <div className="mb-3 flex items-center justify-between">
          <label className="text-sm font-medium">Qualifications</label>

          <button
            type="button"
            onClick={addQualification}
            className="rounded-md border px-3 py-1.5 text-sm transition hover:bg-gray-50"
          >
            + Tambah
          </button>
        </div>

        <div className="space-y-3">
          {qualifications.map((qualification, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                name="qualifications"
                value={qualification}
                onChange={(e) => updateQualification(index, e.target.value)}
                placeholder={`Kualifikasi ${index + 1}`}
                className="flex-1 rounded-md border px-3 py-2 outline-none focus:border-black"
              />

              {qualifications.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQualification(index)}
                  className="rounded-md border px-3 text-red-500 transition hover:bg-red-50"
                >
                  Hapus
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ACTION */}

      <div className="flex justify-end gap-3 border-t pt-6">
        <Link
          href="/dashboard/careers"
          className="rounded-md border px-5 py-2.5 text-sm transition hover:bg-gray-50"
        >
          Batal
        </Link>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Menyimpan..." : "Create Vacancy"}
        </button>
      </div>
    </form>
  );
}
