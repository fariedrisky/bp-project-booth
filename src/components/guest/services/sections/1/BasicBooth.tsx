"use client";
import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const basicBoothServices = [
  {
    id: 1,
    title: "2R 300 lembar",
    description: "Basic Booth dengan ukuran 2R, cocok untuk berbagai acara",
    price: 2000000,
    prints: "300 lembar",
    size: "2R",
    duration: "3 Hours",
  },
  {
    id: 2,
    title: "2R Unlimited",
    description: "Basic Booth dengan ukuran 2R tanpa batasan jumlah cetak",
    price: 3500000,
    prints: "Unlimited",
    size: "2R",
    duration: "3 Hours",
  },
  {
    id: 3,
    title: "Polaroid 300 lembar",
    description: "Basic Booth dengan format Polaroid yang klasik",
    price: 2000000,
    prints: "300 lembar",
    size: "Polaroid",
    duration: "3 Hours",
  },
  {
    id: 4,
    title: "Polaroid Unlimited",
    description: "Basic Booth format Polaroid dengan cetak tanpa batas",
    price: 3500000,
    prints: "Unlimited",
    size: "Polaroid",
    duration: "3 Hours",
  },
  {
    id: 5,
    title: "4R Portrait 400 lembar",
    description: "Basic Booth ukuran 4R format portrait",
    price: 3500000,
    prints: "400 lembar",
    size: "4R Portrait",
    duration: "3 Hours",
  },
  {
    id: 6,
    title: "4R Portrait Unlimited",
    description: "Basic Booth 4R Portrait tanpa batasan cetak",
    price: 4500000,
    prints: "Unlimited",
    size: "4R Portrait",
    duration: "3 Hours",
  },
  {
    id: 7,
    title: "4R Landscape 400 lembar",
    description: "Basic Booth ukuran 4R format landscape",
    price: 3500000,
    prints: "400 lembar",
    size: "4R Landscape",
    duration: "3 Hours",
  },
  {
    id: 8,
    title: "4R Landscape Unlimited",
    description: "Basic Booth 4R Landscape tanpa batasan cetak",
    price: 4500000,
    prints: "Unlimited",
    size: "4R Landscape",
    duration: "3 Hours",
  },
];

const BasicBooth = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center font-serif text-3xl font-bold">
          Basic Booth
        </h2>
        <p className="mb-8 text-center text-gray-600">
          Cocok untuk event besar dan kecil, dengan ukuran foto 2R, 4R,
          Polaroid.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {basicBoothServices.map((service) => (
            <Card
              key={service.id}
              className="overflow-hidden transition-shadow hover:shadow-lg"
            >
              <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                  <Image
                    src="/api/placeholder/400/320"
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
              </CardHeader>

              <CardContent className="p-4">
                <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
                <p className="mb-4 line-clamp-3 text-sm text-gray-600">
                  {service.description}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{service.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Prints</span>
                    <span className="font-medium">{service.prints}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Size</span>
                    <span className="font-medium">{service.size}</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="border-t p-4">
                <div className="w-full space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">
                      Rp {service.price.toLocaleString("id-ID")}
                    </span>
                    <Button variant="outline" size="sm">
                      Book Now
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BasicBooth;
