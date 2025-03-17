import React, { useState, useEffect } from "react";
import { Input } from "../Input";
import Label from "../Label";
import DatePicker from "../DatePicker";
import TimePicker from "../TimePicker";
import { SectionProps } from "./types";

export default function EventDetails({
  formData,
  setFormData,
  errors,
  isSubmitting,
  setErrors,
}: SectionProps) {
  const [showLocationNotice, setShowLocationNotice] = useState(false);
  
  useEffect(() => {
    // Check if location doesn't include Banda Aceh or Medan
    if (formData.eventLocation && formData.eventLocation.trim() !== "") {
      const location = formData.eventLocation.toLowerCase();
      const isBandaAcehOrMedan = 
        location.includes("banda aceh") || 
        location.includes("medan");
      
      setShowLocationNotice(!isBandaAcehOrMedan);
    } else {
      setShowLocationNotice(false);
    }
  }, [formData.eventLocation]);

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

  const handleDateChange = (date: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      eventDate: date,
    }));
    if (errors.eventDate) {
      setErrors((prev) => ({
        ...prev,
        eventDate: "",
      }));
    }
  };

  const handleTimeChange = (date: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      eventTime: date,
    }));
    if (errors.eventTime) {
      setErrors((prev) => ({
        ...prev,
        eventTime: "",
      }));
    }
  };

  return (
    <>
      <div className="space-y-1">
        <Label className="block text-sm font-medium text-gray-700">
          Tanggal Acara
        </Label>
        <DatePicker
          value={formData.eventDate}
          onChange={handleDateChange}
          minDate={new Date()}
          placeholder="Pilih tanggal acara"
          error={errors.eventDate}
          className={errors.eventDate ? "border-red-500" : ""}
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-1">
        <Label className="block text-sm font-medium text-gray-700">
          Jam Acara
        </Label>
        <TimePicker
          value={formData.eventTime}
          onChange={handleTimeChange}
          placeholder="Pilih jam acara"
        />
        {errors.eventTime && (
          <p className="text-sm text-red-500">{errors.eventTime}</p>
        )}
      </div>

      <div className="space-y-1">
        <Label className="block text-sm font-medium text-gray-700">
          Lokasi Acara
        </Label>
        <Input
          name="eventLocation"
          value={formData.eventLocation}
          onChange={handleInputChange}
          placeholder="Masukkan lokasi acara"
          className={`h-9 w-full ${
            errors.eventLocation ? "border-red-500" : "border-gray-200"
          }`}
          disabled={isSubmitting}
        />
        {errors.eventLocation && (
          <p className="text-sm text-red-500">{errors.eventLocation}</p>
        )}
        {showLocationNotice && (
          <p className="mt-2 text-xs text-red-500 text-justify">
          Untuk perjalanan ke luar kota selain Banda Aceh dan Medan, akan ada tambahan biaya akomodasi dan transportasi. Besaran biaya akan diinformasikan lebih lanjut.
          </p>
        )}
      </div>
    </>
  );
}