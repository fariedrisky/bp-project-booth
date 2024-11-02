'use client'
import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    id: 1,
    title: "Basic Booth",
    description:
      "Basic Booth biasa digunakan pada event, wedding dan beberapa acara lainnya. Tersedia dalam ukuran 2R, 4R, polaroid.",
    price: 1500000,
    image: "",
    hours: 3,
    prints: "Unlimited",
    additionalInfo: "Tersedia ukuran 2R, 4R, Polaroid",
  },
  {
    id: 2,
    title: "Mini Booth",
    description:
      "Booth yang digunakan dalam acara skala kecil, dan dapat disesuaikan dengan budget. Disertai boomerang dan GIF fitur tentunya.",
    price: 1000000,
    image: "",
    hours: 2,
    prints: "100 prints",
    additionalInfo: "Include Boomerang & GIF",
  },
  {
    id: 3,
    title: "180 Booth",
    description:
      "Menggunakan 6 sampai 12 kamera untuk mendapatkan 180° sudut pandang yang akan membuat foto kamu menjadi lebih kekinian, dinamis, serta futuristik.",
    price: 3500000,
    image: "",
    hours: 4,
    prints: "Unlimited",
    additionalInfo: "6-12 Camera Setup",
  },
  {
    id: 4,
    title: "Spin 360",
    description:
      "Menggunakan device iphone dan GOPRO untuk mendapatkan trend 360 videbooth yang lagi digemari sekarang. Dengan tambahan properti keren buat video kamu menjadi lebih kekinian.",
    price: 2500000,
    image: "",
    hours: 3,
    prints: "Digital Files",
    additionalInfo: "iPhone + GoPro Setup",
  },
];

const Service = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="mb-12 text-center text-3xl font-bold">Our Services</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <Card
            key={service.id}
            className="overflow-hidden transition-shadow hover:shadow-lg"
          >
            <CardHeader className="p-0">
              <div className="relative h-48 w-full">
                <Image
                  src={service.image}
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
                  <span className="font-medium">{service.hours} Hours</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Prints</span>
                  <span className="font-medium">{service.prints}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Features</span>
                  <span className="font-medium">{service.additionalInfo}</span>
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
  );
};

export default Service;
