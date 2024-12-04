import React from "react";
import Image from "next/image";
import { heroBackground } from "@/data/images/heroImages";
import { BoothCard } from "./BoothCard";
import { cn } from "@/lib/utils";

const boothTypes = [
  {
    id: "2r",
    title: "2R",
    description: "Basic Booth dengan ukuran 2R, cocok untuk berbagai acara",
    size: "2R",
    duration: "4 Jam",
    image: "/assets/images/services/2r.jpg",
    printOptions: [
      {
        value: "300",
        label: "300 lembar",
        price: 2000000,
      },
      {
        value: "unlimited",
        label: "Unlimited",
        price: 3500000,
      },
    ],
    features: [
      "Unlimited Boomerang dan GIF",
      "Custom Template",
      "Frame Luar",
      "Include Guest Book",
      "Media Sharing File (Barcode Support)",
    ],
  },
  {
    id: "polaroid",
    title: "Polaroid",
    description: "Basic Booth dengan format Polaroid yang klasik",
    size: "Polaroid",
    duration: "4 Jam",
    image: "/assets/images/services/2r.jpg",
    printOptions: [
      {
        value: "300",
        label: "300 lembar",
        price: 2000000,
      },
      {
        value: "unlimited",
        label: "Unlimited",
        price: 3500000,
      },
    ],
    features: [
      "Unlimited Boomerang dan GIF",
      "Custom Template",
      "Frame Luar",
      "Include Guest Book",
      "Media Sharing File (Barcode Support)",
    ],
  },
  {
    id: "4r-portrait",
    title: "4R Portrait",
    description: "Basic Booth ukuran 4R format portrait",
    size: "4R Portrait",
    duration: "4 Jam",
    image: "/assets/images/services/2r.jpg",
    printOptions: [
      {
        value: "400",
        label: "400 lembar",
        price: 3500000,
      },
      {
        value: "unlimited",
        label: "Unlimited",
        price: 4500000,
      },
    ],
    features: [
      "Unlimited Boomerang dan GIF",
      "Custom Template",
      "Frame Luar",
      "Media Sharing File (Barcode Support)",
    ],
  },
];

const BasicBooth = () => {
  return (
    <section className="py-8">
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
            Basic Booth
          </h2>
          <p className="mt-2 text-gray-600">
            Cocok untuk event besar dan kecil, dengan ukuran foto 2R, 4R, dan
            Polaroid.
          </p>
        </div>
        <div
          className={cn(
            "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
            "lg:[&:has(>:nth-child(2):last-child)]:mx-auto lg:[&:has(>:nth-child(2):last-child)]:max-w-[800px] lg:[&:has(>:nth-child(2):last-child)]:grid-cols-2",
          )}
        >
          {boothTypes.map((booth) => (
            <BoothCard key={booth.id} booth={booth} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BasicBooth;
