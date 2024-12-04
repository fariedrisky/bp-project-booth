import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export interface MiniBoothType {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: string;
  image: string;
  price: number;
  features: string[];
}

export interface MiniBoothCardProps {
  booth: MiniBoothType;
}

export const MiniBoothCard: React.FC<MiniBoothCardProps> = ({ booth }) => {
  return (
    <Card className="group flex h-full flex-col overflow-hidden shadow-sm transition-all hover:shadow-md">
      <CardHeader className="p-0">
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={booth.image}
            alt={booth.title}
            fill
            className="rounded-t-lg object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            quality={100}
          />
        </div>
      </CardHeader>

      <CardContent className="flex flex-grow flex-col p-4 sm:p-6">
        {/* Header Section */}
        <div className="h-auto sm:h-24">
          <h3 className="line-clamp-1 font-serif text-lg font-semibold sm:text-2xl">
            {booth.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-gray-600 sm:text-base">
            {booth.description}
          </p>
        </div>

        <Separator className="my-3 bg-gray-200 sm:my-4" />

        {/* Specifications Section */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div>
            <span className="text-sm font-medium text-gray-600 sm:text-base">
              Durasi
            </span>
            <p className="mt-0.5 text-sm sm:mt-1 sm:text-base">
              {booth.duration}
            </p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600 sm:text-base">
              Tipe
            </span>
            <p className="mt-0.5 text-sm sm:mt-1 sm:text-base">{booth.type}</p>
          </div>
        </div>

        <Separator className="my-3 bg-gray-200 sm:my-4" />

        {/* Features Section */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-600 sm:text-base">
            Fitur:
          </h4>
          <div className="mt-2 grid gap-2">
            {booth.features.map((feature, index) => (
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
              Rp {booth.price.toLocaleString("id-ID")}
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

export default MiniBoothCard;
