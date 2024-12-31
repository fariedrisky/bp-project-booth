import React from "react";
import Image from "next/image";
import { heroBackground } from "@/data/images/heroImages";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { cn } from "@/lib/utils";
import type { ServiceType } from "@/components/ui/ServiceCard";

const booth180Types: ServiceType[] = [
  {
    id: "180-6cam",
    title: "Camera 180° (6 Kamera)",
    description:
      "Efek foto dengan sudut pandang 180° yang futuristik menggunakan 6 kamera",
    duration: "4 Jam",
    type: "6 Kamera",
    image: "/assets/images/services/camera-180.jpg",
    price: 8000000,
    features: [
      "Time Freeze Video",
      "Custom Template",
      "Media Sharing File",
      "Props",
      "4 Jam Durasi Acara",
    ],
  },
];

const Booth180 = () => {
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
          180° Booth
        </h2>
        <p className="mt-2 text-gray-600">
          Efek foto dengan sudut pandang 180° yang futuristik menggunakan
          multiple kamera
        </p>
      </div>
      <div className="mx-auto grid max-w-[400px] grid-cols-1 gap-6">
        {booth180Types.map((booth) => (
          <div key={booth.id} className="mx-auto w-full max-w-[389px]">
            <ServiceCard service={booth} variant="180" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Booth180;
