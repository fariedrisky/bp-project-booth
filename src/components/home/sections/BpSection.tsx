"use client";

import { PlayCircle } from "lucide-react";
import { FaCircleCheck } from "react-icons/fa6";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import OurClientsMarquee from "../animations/OurClientsMarquee";

export default function BpSection() {
  return (
    <>
      <section id="bp-section" className="bg-foreground py-16">
        <div className="container mx-auto flex flex-col items-center px-4 md:flex-row">
          <div className="mb-8 md:mb-0 md:w-1/2">
            <div className="relative">
              <Image
                src="/assets/images/bp-image.png"
                alt="BP Project Booth"
                width={500}
                height={500}
                className="rounded-lg"
                loading="lazy"
              />
              <div className="bg-brown-500 absolute bottom-4 left-4 flex items-center rounded-full px-4 py-2 text-white">
                <PlayCircle className="mr-2" size={24} />
                <span className="text-xl font-bold">2,820+</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 md:pl-12">
            <h2 className="mb-2 text-base uppercase tracking-wider text-primary">
              BP PROJECT BOOTH
            </h2>
            <h3 className="mb-4 text-3xl font-bold">
              Lebih dari 5+ Tahun Melayani Berbagai Brand Ternama
            </h3>
            <p className="mb-6 text-gray-600">
              Sejak 2018, Bp Project Booth telah memberikan layanan photo booth
              modern dengan teknologi canggih untuk berbagai acara skala besar
              dan kecil.
            </p>
            <ul className="mb-8 space-y-2">
              {[
                "Quality Control System",
                "100% Satisfaction Guarantee",
                "Commitment to Customer",
                "Highly Professional",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center font-medium text-stone-500"
                >
                  <FaCircleCheck className="mr-2 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <Button className="rounded-none bg-primary px-10 text-white">
              Call Us Now
            </Button>
          </div>
        </div>
        <div id="our-client" className="bg-foreground py-10">
          <h2 className="mb-8 text-center text-2xl font-bold">Our Clients</h2>
          <OurClientsMarquee />
        </div>
      </section>
    </>
  );
}
