import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Check } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const Select = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  className = "",
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleSelect = (option: SelectOption) => {
    if (option.disabled) return;
    setSelectedValue(option.value);
    onChange?.(option.value);
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  return (
    <div ref={selectRef} className={`relative w-full ${className}`}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`flex h-9 w-full items-center justify-between border border-gray-200 bg-white px-3 py-2 text-sm transition-colors ${disabled ? "cursor-not-allowed opacity-50" : "hover:border-gray-300"} focus:outline-none focus:ring-1 focus:ring-accent`}
        disabled={disabled}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto border border-gray-200 bg-white py-1 shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option)}
              disabled={option.disabled}
              className={`flex w-full items-center px-3 py-2 text-sm ${
                option.disabled
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              } ${
                selectedValue === option.value
                  ? "bg-accent/10 text-accent"
                  : "text-gray-900"
              } ${!option.disabled && "hover:bg-gray-100"} focus:bg-gray-100 focus:outline-none`}
            >
              <div className="flex w-6 items-center">
                {selectedValue === option.value && (
                  <Check className="h-4 w-4" />
                )}
              </div>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
