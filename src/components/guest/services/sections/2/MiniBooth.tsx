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

const miniBoothServices = [
  {
    id: 1,
    title: "Mirror Booth Unlimited",
    description: "Self Service Mode dengan fitur boomerang dan GIF",
    price: 4000000,
    prints: "Unlimited",
    features: "Self Service Mode",
    additionalInfo: "Include Boomerang & GIF",
  },
  {
    id: 2,
    title: "Karaoke Booth",
    description: "Booth karaoke untuk memeriahkan acara",
    price: 2500000,
    prints: "Digital Files",
    features: "Karaoke System",
    additionalInfo: "Include Audio Recording",
  },
];

const MiniBooth = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-3xl font-bold text-center font-serif">Mini Booth</h2>
        <p className="mb-8 text-gray-600 text-center">
          Solusi untuk acara kecil dengan fitur boomerang dan GIF.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {miniBoothServices.map((service) => (
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
                    <span className="text-gray-600">Features</span>
                    <span className="font-medium">{service.features}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Additional Info</span>
                    <span className="font-medium">
                      {service.additionalInfo}
                    </span>
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

export default MiniBooth;
