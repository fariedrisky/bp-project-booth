import React from "react";
import Image from "next/image";
import { heroBackground } from "@/data/images/heroImages";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { cn } from "@/lib/utils";
import type { ServiceType } from "@/components/ui/ServiceCard";

const wideAngleTypes: ServiceType[] = [
  {
    id: "wide-angle-unlimited",
    title: "Wide Angle Unlimited Polaroid",
    description:
      "Wide Angle Booth dengan format Polaroid dan memiliki fitur boomerang & GIF",
    duration: "4 Jam",
    type: "Wide Angle",
    image: "/assets/images/services/2r.jpg",
    price: 5000000,
    features: [
      "Lighting Pro",
      "Guest Book",
      "Custom Template",
      "Media Sharing File",
      "Unlimited Boomerang & GIF",
    ],
  },
];

export const WideAngleBooth = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src={heroBackground}
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          priority
          className="opacity-20 mix-blend-lighten"
        />
      </div>
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <h2 className="font-serif text-2xl font-bold md:text-3xl">
          Wide Angle Booth
        </h2>
        <p className="mt-2 text-gray-600">
          Booth dengan sudut lebar yang sempurna untuk mengabadikan momen
          bersama
        </p>
      </div>
      <div className="mx-auto grid max-w-[400px] grid-cols-1 gap-6">
        {wideAngleTypes.map((booth) => (
          <div key={booth.id} className="mx-auto w-full max-w-[389px]">
            <ServiceCard service={booth} variant="wideangle" />
          </div>
        ))}
      </div>
    </div>
  );
};
