import React, { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export interface DurationOption {
  value: string;
  label: string;
  price: number;
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
  duration?: string;
  image: string;
  durationOptions?: DurationOption[];
  printOptions?: PrintOption[];
  features: string[];
  price?: number;
}

type BoothVariant =
  | "basic"
  | "mini"
  | "180"
  | "spin360"
  | "wideangle"
  | "phone";

interface ServiceCardProps {
  service: ServiceType;
  variant?: BoothVariant;
  className?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  variant = "basic",
  className = "",
}) => {
  const [selectedPrint, setSelectedPrint] = useState(
    service.printOptions?.[0]?.value,
  );
  const [selectedDuration, setSelectedDuration] = useState(
    service.durationOptions?.[0]?.value,
  );

  const currentPrintOption = service.printOptions?.find(
    (option) => option.value === selectedPrint,
  );
  const currentDurationOption = service.durationOptions?.find(
    (option) => option.value === selectedDuration,
  );

  const renderSpecifications = () => {
    if (!service.duration) return null;

    return (
      <>
        <Separator className="my-3 bg-gray-200 sm:my-4" />
        <div
          className={cn(
            "space-y-3",
            ["basic", "180", "wideangle", "spin360"].includes(variant)
              ? "h-auto sm:h-32 sm:space-y-4"
              : "pb-0",
          )}
        >
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div>
              {service.durationOptions ? (
                <div>
                  <span className="text-sm font-medium text-gray-600 sm:text-base">
                    Durasi
                  </span>
                  <Select
                    value={selectedDuration}
                    onValueChange={setSelectedDuration}
                  >
                    <SelectTrigger className="mt-1 w-full text-sm sm:text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {service.durationOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="text-sm sm:text-base"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <>
                  <span className="text-sm font-medium text-gray-600 sm:text-base">
                    Durasi
                  </span>
                  <p className="mt-0.5 text-sm sm:mt-1 sm:text-base">
                    {service.duration}
                  </p>
                </>
              )}
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600 sm:text-base">
                Tipe
              </span>
              <p className="mt-0.5 text-sm sm:mt-1 sm:text-base">
                {service.type}
              </p>
            </div>
          </div>

          <div>
            <span className="text-sm font-medium text-gray-600 sm:text-base">
              Cetak
            </span>
            {service.printOptions ? (
              <Select value={selectedPrint} onValueChange={setSelectedPrint}>
                <SelectTrigger className="mt-1 w-full text-sm sm:text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {service.printOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="text-sm sm:text-base"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <p className="mt-0.5 text-sm sm:mt-1 sm:text-base">-</p>
            )}
          </div>
        </div>
      </>
    );
  };

  const getVariantSpecificStyles = (variant: BoothVariant) => {
    switch (variant) {
      case "mini":
      case "phone":
        return "sm:h-auto";
      case "spin360":
        return "sm:h-40";
      default:
        return "sm:h-48";
    }
  };

  return (
    <Card
      className={cn(
        "group flex h-full flex-col overflow-hidden shadow-sm transition-all hover:shadow-md",
        className,
      )}
    >
      <CardHeader className="p-0">
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="rounded-t-lg object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            quality={100}
          />
        </div>
      </CardHeader>

      <CardContent className="flex flex-grow flex-col p-4 sm:p-6">
        <div className="h-auto sm:h-24">
          <h3 className="line-clamp-1 font-serif text-lg font-semibold sm:text-2xl">
            {service.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-gray-600 sm:text-base">
            {service.description}
          </p>
        </div>

        {renderSpecifications()}

        <Separator className="my-3 bg-gray-200 sm:my-4" />

        <div className={cn("h-auto", getVariantSpecificStyles(variant))}>
          <h4 className="text-sm font-medium text-gray-600 sm:text-base">
            Fitur:
          </h4>
          <div className="mt-2 grid gap-2">
            {service.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                <span className="line-clamp-1 text-sm text-gray-600 sm:text-base">
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
                currentDurationOption?.price ||
                currentPrintOption?.price ||
                service.price ||
                0
              ).toLocaleString("id-ID")}
            </p>
          </div>
          <Button
            variant="default"
            className="h-10 w-full px-6 font-medium shadow-sm hover:bg-accent/90 sm:w-auto"
          >
            Book Now
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
