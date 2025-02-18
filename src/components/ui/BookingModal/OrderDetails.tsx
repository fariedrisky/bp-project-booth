import React from "react";
import { Input } from "../Input";
import Label from "../Label";
import Select from "../Select";
import { SectionProps } from "./types";

interface OrderDetailsSectionProps extends SectionProps {
  onOpenTemplatePreview: () => void;
}

export default function OrderDetails({
  formData,
  setFormData,
  errors,
  isSubmitting,
  service,
  setErrors,
  onOpenTemplatePreview,
}: OrderDetailsSectionProps) {
  return (
    <>
      <div className="space-y-1">
        <Label className="block text-sm font-medium text-gray-700">
          Paket Dipilih
        </Label>
        <Input
          value={`${service.title}${service.selectedDuration ? ` - Durasi ${service.selectedDuration.label}` : ""}${service.selectedPrint ? ` - Cetak ${service.selectedPrint.label}` : ""}`}
          disabled
          className="h-9 w-full cursor-not-allowed border border-gray-200 bg-gray-50"
        />
      </div>

      {/* Template Selection - Show only if service has template options */}
      {service.templateOptions && service.templateOptions.length > 0 && (
        <div className="space-y-1">
          <Label className="block text-sm font-medium text-gray-700">
            Template yang dipilih
          </Label>
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
            <div className="w-full sm:w-2/3">
              <Select
                options={service.templateOptions}
                value={formData.templateOption}
                onChange={(value) => {
                  setFormData((prev) => ({
                    ...prev,
                    templateOption: value,
                  }));
                  if (errors.templateOption) {
                    setErrors((prev) => ({
                      ...prev,
                      templateOption: "",
                    }));
                  }
                }}
                placeholder="Pilih template"
                className={errors.templateOption ? "border-red-500" : ""}
                disabled={isSubmitting}
              />
              {errors.templateOption && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.templateOption}
                </p>
              )}
            </div>

            <div className="flex w-full items-center justify-center sm:w-1/3">
              <button
                type="button"
                onClick={onOpenTemplatePreview}
                className="flex w-full items-center justify-center border border-gray-200 bg-gray-50 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Lihat Template
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
