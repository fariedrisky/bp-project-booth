import React from "react";
import { Input } from "../Input";
import Label from "../Label";
import Select from "../Select";
import { SectionProps } from "./types";

const paymentOptions = [
  { value: "full", label: "Pembayaran Penuh (Full)" },
  { value: "dp", label: "Uang Muka (DP)" },
];

export default function Payment({
  formData,
  setFormData,
  errors,
  isSubmitting,
  service,
  setErrors,
}: SectionProps) {
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
    <>
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
                className={`h-9 w-full ${
                  errors.dpAmount ? "border-red-500" : "border-gray-200"
                }`}
                disabled={isSubmitting}
              />
              {errors.dpAmount && (
                <p className="text-sm text-red-500">{errors.dpAmount}</p>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
