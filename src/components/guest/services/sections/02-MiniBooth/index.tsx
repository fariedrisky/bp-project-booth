import React from "react";
import Image from "next/image";
import { heroBackground } from "@/data/images/heroImages";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { cn } from "@/lib/utils";
import type { ServiceType } from "@/components/ui/ServiceCard";

const miniBoothTypes: ServiceType[] = [
  {
    id: "mirror-booth",
    title: "Mirror Booth Unlimited",
    description: "Self Service Mode dengan fitur lengkap untuk acara kecil",
    duration: "4 Jam",
    type: "Mirror",
    image: "/assets/images/services/2r.jpg",
    price: 4000000,
    features: [
      "Self Service Mode",
      "Unlimited Boomerang dan GIF",
      "Custom Template",
      "Frame Luar",
      "Include Guest Book",
      "Media Sharing File (Barcode Support)",
    ],
  },
  {
    id: "karaoke-booth",
    title: "Karaoke Booth",
    description: "Media hiburan karaoke dengan fitur rekam video",
    duration: "4 Jam",
    type: "Karaoke",
    image: "/assets/images/services/2r.jpg",
    price: 2500000,
    features: [
      "Sound Set",
      "Lighting",
      "Device Camera Record",
      "Custom Template",
      "Media Sharing File",
      "Props",
    ],
  },
];

const MiniBooth = () => {
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
          Mini Booth
        </h2>
        <p className="mt-2 text-gray-600">
          Solusi untuk acara kecil dengan fitur boomerang dan GIF.
        </p>
      </div>
      <div className="mx-auto grid max-w-[800px] grid-cols-1 gap-6 md:grid-cols-2">
        {miniBoothTypes.map((booth) => (
          <div key={booth.id} className="mx-auto w-full max-w-[389px]">
            <ServiceCard service={booth} variant="mini" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniBooth;
