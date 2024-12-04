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

// Wide Angle Booth Component
const wideAngleServices = [
  {
    id: 1,
    title: "Wide Angle Booth",
    description: "Booth dengan sudut lebar untuk foto group yang lebih luas",
    price: 5000000,
    prints: "Unlimited Polaroid Size",
    features: "Wide Angle Setup",
    additionalInfo: "Group Photography Optimized",
  },
];

export const WideAngleBooth = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-3xl font-bold">Wide Angle Booth</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {wideAngleServices.map((service) => (
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
                    <span className="text-gray-600">Prints</span>
                    <span className="font-medium">{service.prints}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Features</span>
                    <span className="font-medium">{service.features}</span>
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
