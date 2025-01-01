import React from "react";
import Image from "next/image";
import { heroBackground } from "@/data/images/heroImages";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { cn } from "@/lib/utils";
import type { ServiceType } from "@/components/ui/ServiceCard";

const spin360Types: ServiceType[] = [
  {
    id: "spin-360",
    title: "Spin 360°",
    description:
      "Booth terpopuler dengan fitur video 360° menggunakan iPhone dan GoPro",
    duration: "3-4 Jam",
    image: "/assets/images/services/spin-360.jpg",
    durationOptions: [
      // Menggunakan durationOptions untuk pilihan durasi
      {
        value: "3h",
        label: "3 Jam",
        price: 2000000,
      },
      {
        value: "4h",
        label: "4 Jam",
        price: 2500000,
      },
    ],
    features: [
      "Lighting",
      "Device iPhone",
      "Custom Template",
      "Media Sharing File",
      "Props",
    ],
  },
  {
    id: "spin-360-bundle",
    title: "Spin 360° + 2R",
    description: "Bundling package Spin 360° dengan cetak foto 2R",
    duration: "4 Jam",
    image: "/assets/images/services/spin-360-2r.jpg",
    printOptions: [
      {
        value: "400",
        label: "400 lembar",
        price: 4000000,
      },
      {
        value: "unlimited",
        label: "Unlimited",
        price: 5000000,
      },
    ],
    features: [
      "Lighting",
      "Device iPhone",
      "Custom Template",
      "Media Sharing File",
      "Props",
    ],
  },
];

const Spin360 = () => {
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
        <h2 className="font-serif text-2xl font-bold md:text-3xl">Spin 360°</h2>
        <p className="mt-2 text-gray-600">
          Booth terpopuler dengan fitur video 360° menggunakan iPhone dan GoPro
        </p>
      </div>
      <div className="mx-auto grid max-w-[800px] grid-cols-1 gap-4 md:grid-cols-2">
        {spin360Types.map((booth) => (
          <div key={booth.id} className="mx-auto w-full max-w-[389px]">
            <ServiceCard service={booth} variant="spin360" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Spin360;
