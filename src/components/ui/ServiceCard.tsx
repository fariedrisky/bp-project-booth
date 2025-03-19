import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import { cn } from "@/lib/utils";
import Select from "@/components/ui/Select";

export interface DurationOption {
  value: string;
  label: string;
  price?: number;
}

export interface PrintOption {
  value: string;
  label: string;
  price: number;
}

export interface ServiceType {
  id: string;
  title: string;
  description: string;
  size?: string;
  type?: string;
  image: string[];
  durationOptions?: DurationOption[];
  printOptions?: PrintOption[];
  features: string[];
  price?: number;
  selectedDuration?: DurationOption;
  selectedPrint?: PrintOption;
  totalPrice?: number;
  templateImage?: string[];
  templateOptions?: { value: string; label: string }[];
}

export type BoothVariant =
  | "basic"
  | "mini"
  | "180"
  | "spin360"
  | "wideangle"
  | "phone";

interface ServiceCardProps {
  service: ServiceType;
  variant?: BoothVariant | undefined;
  className?: string;
  onBookNow: (service: ServiceType) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  variant = "basic",
  className = "",
  onBookNow,
}) => {
  const [selectedPrint, setSelectedPrint] = useState(
    service.printOptions?.[0]?.value,
  );
  const [selectedDuration, setSelectedDuration] = useState(
    service.durationOptions?.[0]?.value,
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isUnlimited, setIsUnlimited] = useState(false);

  // Set default duration to the longest one when unlimited print is selected
  useEffect(() => {
    if (selectedPrint === "unlimited" && service.durationOptions) {
      // Find the longest duration (assuming the last one is the longest)
      const longestDuration =
        service.durationOptions[service.durationOptions.length - 1].value;
      setSelectedDuration(longestDuration);
      setIsUnlimited(true);
    } else {
      setIsUnlimited(false);
    }
  }, [selectedPrint, service.durationOptions]);

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    if (service.image.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === service.image.length - 1 ? 0 : prevIndex + 1,
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [service.image.length]);

  const currentPrintOption = service.printOptions?.find(
    (option) => option.value === selectedPrint,
  );
  const currentDurationOption = service.durationOptions?.find(
    (option) => option.value === selectedDuration,
  );

  // Calculate base price from duration option (if multiple) or print option
  const basePrice =
    service.durationOptions && service.durationOptions.length > 1
      ? currentDurationOption?.price
      : service.price || service.printOptions?.[0]?.price || 0;

  const handleBookNow = () => {
    onBookNow({
      ...service,
      selectedDuration: currentDurationOption,
      selectedPrint: currentPrintOption,
      totalPrice: (isUnlimited ? currentPrintOption?.price : basePrice) || 0,
    });
  };

  const renderSpecifications = () => {
    if (!service.durationOptions) return null;

    return (
      <>
        <Separator className="my-2 bg-gray-200 sm:my-3" />
        <div
          className={cn(
            ["basic", "180", "wideangle", "spin360"].includes(variant)
              ? "h-auto"
              : "pb-0",
          )}
        >
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div>
              <span className="text-sm font-medium text-gray-600 sm:text-base">
                Durasi
              </span>
              {service.durationOptions.length > 1 ? (
                <div>
                  <Select
                    options={service.durationOptions}
                    value={selectedDuration}
                    onChange={setSelectedDuration}
                    className="mt-1"
                    disabled={isUnlimited}
                  />
                  {isUnlimited && (
                    <p className="mt-1 text-xs italic text-gray-500">
                      Durasi tetap 4 jam dengan paket unlimited
                    </p>
                  )}
                </div>
              ) : (
                <p className="mt-0.5 text-sm sm:mt-1 sm:text-base">
                  {service.durationOptions[0].label}
                </p>
              )}
            </div>

            <div>
              <span className="text-sm font-medium text-gray-600 sm:text-base">
                Cetak
              </span>
              {service.printOptions ? (
                <Select
                  options={service.printOptions}
                  value={selectedPrint}
                  onChange={setSelectedPrint}
                  className="mt-1"
                />
              ) : (
                <p className="mt-0.5 text-sm sm:mt-1 sm:text-base">-</p>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <Card
      className={cn(
        "group mx-auto flex h-full max-w-[520px] flex-col overflow-hidden shadow-sm transition-all hover:shadow-md",
        className,
      )}
    >
      <CardHeader className="p-0">
        <div className="relative aspect-[1/1] w-full overflow-hidden">
          {service.image.map((img, index) => (
            <Image
              key={`${img}-${index}`}
              src={img}
              alt={`${service.title} - Image ${index + 1}`}
              fill
              className={`bg-[#181818] object-contain transition-opacity duration-500 ${
                currentImageIndex === index ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              quality={100}
              priority={index === 0}
            />
          ))}
        </div>
      </CardHeader>

      <CardContent className="flex flex-grow flex-col p-4 sm:p-6">
        <div className="h-auto sm:h-20">
          <h3 className="line-clamp-1 font-serif text-lg font-semibold sm:text-2xl">
            {service.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-gray-600 sm:text-base">
            {service.description}
          </p>
        </div>

        {renderSpecifications()}

        <Separator className="my-3 bg-gray-200 sm:my-4" />

        <div className="h-auto min-h-[150px]">
          <h4 className="text-sm font-medium text-gray-600 sm:text-base">
            Fitur:
          </h4>
          <div className="grid grid-cols-2 gap-1">
            {service.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center rounded border border-gray-200 px-2 py-1"
              >
                <span className="mr-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent"></span>
                <span className="overflow-hidden text-xs text-gray-600">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t bg-gray-50 p-4 sm:p-6">
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
          <div>
            <p className="text-xs text-gray-600 sm:text-sm">Mulai dari</p>
            <p className="font-serif text-xl font-bold sm:text-2xl">
              Rp{" "}
              {(
                (isUnlimited ? currentPrintOption?.price : basePrice) || 0
              ).toLocaleString("id-ID")}
            </p>
          </div>
          <Button
            variant="default"
            className="h-10 w-full px-6 font-medium shadow-sm !transition-colors !duration-300 hover:bg-accent/90 sm:w-auto"
            onClick={handleBookNow}
          >
            Book Now
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
