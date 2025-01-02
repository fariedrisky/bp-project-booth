import React, { useState, useRef, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  format,
  isValid,
  parse,
  startOfToday,
  isAfter,
  isBefore,
  isSameDay,
  addMonths,
  subMonths,
  setDefaultOptions,
} from "date-fns";
import { id } from "date-fns/locale";
import { cn } from "@/lib/utils";

// Set default locale to Indonesian
setDefaultOptions({ locale: id });

interface DatePickerProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
  > {
  label?: string;
  error?: string;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  placeholder?: string;
  className?: string;
}

const DAYS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  error,
  value,
  onChange,
  minDate,
  maxDate,
  disabledDates = [],
  placeholder = "Pilih tanggal",
  className,
  disabled,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(value || startOfToday());
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isDateDisabled = (date: Date) => {
    return (
      (minDate && isBefore(date, minDate)) ||
      (maxDate && isAfter(date, maxDate)) ||
      disabledDates.some((disabledDate) => isSameDay(date, disabledDate))
    );
  };

  const handleDateSelect = (date: Date) => {
    if (!isDateDisabled(date)) {
      onChange?.(date);
      setIsOpen(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateStr = e.target.value;
    const parsedDate = parse(dateStr, "EEEE, d MMMM yyyy", new Date(), {
      locale: id,
    });

    if (isValid(parsedDate) && !isDateDisabled(parsedDate)) {
      onChange?.(parsedDate);
    } else {
      onChange?.(null);
    }
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setViewDate(
      direction === "prev" ? subMonths(viewDate, 1) : addMonths(viewDate, 1),
    );
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: Array<{ date: Date; isCurrentMonth: boolean }> = [];

    // Add days from previous month
    for (let i = 0; i < startingDay; i++) {
      const prevDate = new Date(year, month, -startingDay + i + 1);
      days.push({ date: prevDate, isCurrentMonth: false });
    }

    // Add days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }

    // Add days from next month
    const remainingDays = 42 - days.length; // 42 = 6 rows × 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }

    return days;
  };

  return (
    <div className={cn("relative w-full", className)}>
      {label && (
        <label className="mb-1 block text-xs font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type="text"
          readOnly
          value={
            value ? format(value, "EEEE, d MMMM yyyy", { locale: id }) : ""
          }
          placeholder={placeholder}
          className="h-9 w-full cursor-pointer border border-gray-300 px-3 py-1.5 pr-8 text-sm text-primary focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
          onClick={() => !disabled && setIsOpen(true)}
          disabled={disabled}
          {...props}
        />
        <CalendarIcon className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      </div>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}

      {isOpen && !disabled && (
        <div
          ref={calendarRef}
          className="absolute z-10 mt-1 w-64 bg-white p-3 shadow-lg ring-1 ring-black ring-opacity-5"
        >
          {/* Calendar Header */}
          <div className="mb-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigateMonth("prev")}
              className="p-0.5 hover:bg-gray-100"
            >
              <ChevronLeft className="h-4 w-4 text-gray-600" />
            </button>
            <h2 className="text-sm font-medium text-primary">
              {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
            </h2>
            <button
              type="button"
              onClick={() => navigateMonth("next")}
              className="p-0.5 hover:bg-gray-100"
            >
              <ChevronRight className="h-4 w-4 text-gray-600" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-0.5">
            {/* Day headers */}
            {DAYS.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-gray-500"
              >
                {day}
              </div>
            ))}

            {/* Calendar days */}
            {getDaysInMonth(viewDate).map(({ date, isCurrentMonth }, index) => {
              const isSelected = value ? isSameDay(date, value) : false;
              const isDisabled = isDateDisabled(date);
              const isToday = isSameDay(date, startOfToday());

              return (
                <button
                  key={index}
                  onClick={() => handleDateSelect(date)}
                  disabled={isDisabled || !isCurrentMonth}
                  className={cn(
                    "flex h-7 w-7 items-center justify-center text-xs",
                    isCurrentMonth ? "text-gray-900" : "text-gray-400",
                    !isDisabled &&
                      !isSelected &&
                      isCurrentMonth &&
                      "hover:bg-gray-100",
                    isSelected && "bg-blue-500 text-white",
                    isDisabled && "cursor-not-allowed opacity-50",
                    isToday && !isSelected && "border border-blue-500",
                  )}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
