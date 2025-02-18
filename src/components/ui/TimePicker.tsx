import React, { useState, useRef, useEffect } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimePickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  className?: string;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
}

const TimePicker: React.FC<TimePickerProps> = ({
  value = null,
  onChange,
  className,
  placeholder,
  label,
  error,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedHour, setSelectedHour] = useState(
    value ? value.getHours() : 0,
  );
  const [selectedMinute, setSelectedMinute] = useState(
    value ? value.getMinutes() : 0,
  );
  const [isSelectingHour, setIsSelectingHour] = useState(true);
  const [manualHour, setManualHour] = useState(
    selectedHour.toString().padStart(2, "0"),
  );
  const [manualMinute, setManualMinute] = useState(
    selectedMinute.toString().padStart(2, "0"),
  );
  const clockRef = useRef<HTMLDivElement>(null);

  const handleTimeChange = (hours: number, minutes: number) => {
    setManualHour(hours.toString().padStart(2, "0"));
    setManualMinute(minutes.toString().padStart(2, "0"));
    const newDate = new Date();
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    onChange?.(newDate);
  };

  const calculateHandPosition = (
    value: number,
    isHour: boolean = true,
    is24Hour: boolean = false,
  ) => {
    // Handle khusus untuk jam 00 dan 12
    if (isHour && (value === 0 || value === 12)) {
      return {
        x: 100,
        y: value === 0 ? 40 : 25,
      };
    }

    // Hitung angle dan radius
    const divisor = isHour ? 12 : 60;
    const radius = isHour && !is24Hour ? 75 : 60;
    const angle = ((value % divisor) / divisor) * 2 * Math.PI - Math.PI / 2;

    return {
      x: 100 + radius * Math.cos(angle),
      y: 100 + radius * Math.sin(angle),
    };
  };
  const calculateMarkerPosition = (minute: number, isLong: boolean = false) => {
    const angle = (minute / 60) * 2 * Math.PI - Math.PI / 2;
    const outerRadius = 90; // Increased outer radius
    const innerRadius = isLong ? 78 : 84; // Adjusted inner radius for better spacing
    return {
      x1: 100 + innerRadius * Math.cos(angle),
      y1: 100 + innerRadius * Math.sin(angle),
      x2: 100 + outerRadius * Math.cos(angle),
      y2: 100 + outerRadius * Math.sin(angle),
      isSelected: minute === selectedMinute,
    };
  };

  const calculateNumberPosition = (value: number, isHour: boolean = true) => {
    let angle;
    let radius;

    if (isHour) {
      angle = ((value % 12) / 12) * 2 * Math.PI - Math.PI / 2;
      radius = value > 12 ? 60 : 75; // Different radius for 24-hour format
    } else {
      angle = (value / 60) * 2 * Math.PI - Math.PI / 2;
      radius = 65; // Adjusted radius for minutes to avoid overlap
    }

    return {
      x: 100 + radius * Math.cos(angle),
      y: 100 + radius * Math.sin(angle),
    };
  };

  const handleClockClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - 100;
    const y = e.clientY - rect.top - 100;
    const angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    const normalizedAngle = angle < 0 ? angle + 360 : angle;

    if (!isSelectingHour) {
      const minute = Math.round(normalizedAngle / 6) % 60;
      setSelectedMinute(minute);
      handleTimeChange(selectedHour, minute);
    } else {
      const distance = Math.sqrt(x * x + y * y);
      const isInner = distance < 75;
      const hourValue = Math.round(normalizedAngle / 30) % 12;

      let finalHour;
      if (isInner) {
        // Handle lingkaran dalam (13-24/00)
        if (hourValue === 0) {
          finalHour = 0; // Set ke 00:00
        } else {
          finalHour = hourValue + 12;
        }
      } else {
        // Handle lingkaran luar (1-12)
        finalHour = hourValue === 0 ? 12 : hourValue;
      }

      setSelectedHour(finalHour);
      handleTimeChange(finalHour, selectedMinute);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        clockRef.current &&
        !clockRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleHourInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 2);
    setManualHour(val);
    const num = parseInt(val);
    if (!isNaN(num) && num >= 0 && num <= 23) {
      setSelectedHour(num);
      handleTimeChange(num, selectedMinute);
    }
  };

  const handleMinuteInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 2);
    setManualMinute(val);
    const num = parseInt(val);
    if (!isNaN(num) && num >= 0 && num <= 59) {
      setSelectedMinute(num);
      handleTimeChange(selectedHour, num);
    }
  };

  return (
    <div className={cn("relative", className)} ref={clockRef}>
      {label && (
        <label className="mb-1 block text-xs font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type="text"
          readOnly
          value={value ? `${manualHour}:${manualMinute}` : ""}
          placeholder={placeholder}
          className="h-9 w-full cursor-pointer border border-gray-300 px-3 py-1.5 pr-8 text-sm text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:cursor-not-allowed disabled:bg-gray-100"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
        />
        <Clock className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}

      {isOpen && !disabled && (
        <div className="absolute z-50 mt-2 rounded-lg bg-white p-4 shadow-lg">
          <div className="mb-4 flex justify-center space-x-1 text-2xl">
            <input
              type="text"
              inputMode="numeric"
              value={manualHour}
              onChange={handleHourInput}
              onBlur={() =>
                setManualHour(selectedHour.toString().padStart(2, "0"))
              }
              className={cn(
                "w-12 cursor-pointer rounded px-2 text-center",
                isSelectingHour ? "bg-blue-100 text-blue-500" : "text-gray-600",
              )}
              onClick={() => setIsSelectingHour(true)}
            />
            <span className="text-gray-900">:</span>
            <input
              type="text"
              inputMode="numeric"
              value={manualMinute}
              onChange={handleMinuteInput}
              onBlur={() =>
                setManualMinute(selectedMinute.toString().padStart(2, "0"))
              }
              className={cn(
                "w-12 cursor-pointer rounded px-2 text-center",
                !isSelectingHour
                  ? "bg-blue-100 text-blue-500"
                  : "text-gray-600",
              )}
              onClick={() => setIsSelectingHour(false)}
            />
          </div>

          <svg
            width="200"
            height="200"
            onClick={handleClockClick}
            className="cursor-pointer"
          >
            <circle cx="100" cy="100" r="90" fill="#f3f4f6" />

            {/* Minute markers */}
            {!isSelectingHour &&
              Array.from({ length: 60 }, (_, i) => {
                const marker = calculateMarkerPosition(i, i % 5 === 0);
                return (
                  <line
                    key={i}
                    x1={marker.x1}
                    y1={marker.y1}
                    x2={marker.x2}
                    y2={marker.y2}
                    stroke={
                      marker.isSelected
                        ? "#3b82f6"
                        : i % 5 === 0
                          ? "#6b7280"
                          : "#9ca3af"
                    }
                    strokeWidth={i % 5 === 0 ? "2" : "1"}
                    opacity={i % 5 === 0 ? "1" : "0.5"}
                  />
                );
              })}

            {/* Update the hour number highlighting logic */}
            {isSelectingHour ? (
              <>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => {
                  const pos = calculateNumberPosition(hour);
                  // Perhatikan perubahan di sini - hapus selectedHour === 0
                  const isSelected = selectedHour === hour;
                  return (
                    <text
                      key={hour}
                      x={pos.x}
                      y={pos.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className={cn(
                        "text-sm",
                        isSelected
                          ? "fill-blue-500 font-bold"
                          : "fill-gray-600",
                      )}
                    >
                      {hour}
                    </text>
                  );
                })}
                {Array.from({ length: 12 }, (_, i) => i + 13).map((hour) => {
                  const displayHour = hour === 24 ? "00" : hour.toString();
                  const pos = calculateNumberPosition(hour);
                  const isSelected = selectedHour === (hour === 24 ? 0 : hour);
                  return (
                    <text
                      key={hour}
                      x={pos.x}
                      y={pos.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className={cn(
                        "text-xs",
                        isSelected
                          ? "fill-blue-500 font-bold"
                          : "fill-gray-400",
                      )}
                    >
                      {displayHour}
                    </text>
                  );
                })}
              </>
            ) : (
              <>
                {/* Minute numbers */}
                {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => {
                  const pos = calculateNumberPosition(minute, false);
                  return (
                    <text
                      key={minute}
                      x={pos.x}
                      y={pos.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className={cn(
                        "text-sm",
                        selectedMinute === minute
                          ? "fill-blue-500 font-bold"
                          : "fill-gray-600",
                      )}
                    >
                      {minute.toString().padStart(2, "0")}
                    </text>
                  );
                })}
              </>
            )}

            {/* Clock hand */}
            <line
              x1="100"
              y1="100"
              x2={
                isSelectingHour
                  ? calculateHandPosition(
                      selectedHour,
                      true,
                      selectedHour >= 12,
                    ).x
                  : calculateHandPosition(selectedMinute, false).x
              }
              y2={
                isSelectingHour
                  ? calculateHandPosition(
                      selectedHour,
                      true,
                      selectedHour >= 12,
                    ).y
                  : calculateHandPosition(selectedMinute, false).y
              }
              stroke="#3b82f6"
              strokeWidth="2"
            />
            <circle cx="100" cy="100" r="4" fill="#3b82f6" />
          </svg>

          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => setIsOpen(false)}
              className="rounded px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleTimeChange(selectedHour, selectedMinute);
                setIsOpen(false);
              }}
              className="rounded bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePicker;
