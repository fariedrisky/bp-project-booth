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
  // Calculate minimum DP amount (50% of total price)
  const calculateMinDpAmount = () => {
    if (!service.totalPrice) return "0";

    const halfPrice = Math.ceil(service.totalPrice / 2);
    return halfPrice.toString();
  };

  // Handle changes during typing - allow any value during input
  const handleDpAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\./g, ""); // Hapus titik dari input

    if (!isNaN(Number(rawValue))) {
      setFormData((prev) => ({
        ...prev,
        dpAmount: rawValue, // Simpan nilai tanpa titik
      }));
    }
  };

  // Validate minimum amount on blur (when user finishes typing)
  const handleDpAmountBlur = () => {
    const minDpAmount = calculateMinDpAmount();

    if (formData.dpAmount) {
      const numericValue = Number(formData.dpAmount);

      // If value is below minimum, set to minimum
      if (numericValue < Number(minDpAmount)) {
        setFormData((prev) => ({
          ...prev,
          dpAmount: minDpAmount,
        }));
      }
    } else {
      // If field is empty, set to minimum
      setFormData((prev) => ({
        ...prev,
        dpAmount: minDpAmount,
      }));
    }

    // Clear error if it exists
    if (errors.dpAmount) {
      setErrors((prev) => ({
        ...prev,
        dpAmount: "",
      }));
    }
  };

  // Format tampilan dengan titik setiap 3 digit
  const formattedDpAmount = formData.dpAmount
    ? formData.dpAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    : "";

  // Initialize with default 50% when switching to DP payment type
  const handlePaymentTypeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      paymentType: value,
      dpAmount: value === "dp" ? calculateMinDpAmount() : "", // Set nilai 50% saat memilih DP
    }));

    if (errors.paymentType) {
      setErrors((prev) => ({ ...prev, paymentType: "" }));
    }
  };

  return (
    <>
      <div className="space-y-1">
        <Label className="block text-sm font-medium text-gray-700">
          Jenis Pembayaran
        </Label>
        <Select
          options={paymentOptions}
          value={formData.paymentType}
          onChange={handlePaymentTypeChange}
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
            {formData.paymentType === "full"
              ? "Harga"
              : "Jumlah Uang Muka (DP) Minimal 50%"}
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
                onBlur={handleDpAmountBlur} // Validasi nilai minimum saat focus hilang
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
