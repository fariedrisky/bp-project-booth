import React from "react";
import { Input } from "../Input";
import Label from "../Label";
import { SectionProps } from "./types";

export default function PersonalInfo({
  formData,
  setFormData,
  errors,
  isSubmitting,
  setErrors,
}: SectionProps) {
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

  return (
    <>
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
        <Label className="block text-sm font-medium text-gray-700">Email</Label>
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
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>
    </>
  );
}
