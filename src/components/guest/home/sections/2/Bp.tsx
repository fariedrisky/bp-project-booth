"use client";

import { FaCircleCheck } from "react-icons/fa6";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import OurClientsMarquee from "../../animations/OurClientsMarquee";

export default function Bp() {
  return (
    <>
      <section id="bp-section" className="bg-foreground py-16">
        <div className="container mx-auto flex flex-col items-center px-4 md:flex-row">
          <div className="mb-8 md:mb-0 md:w-1/2">
            <div className="relative">
              <Image
                src="/assets/images/bp-client.jpg"
                alt="BP Project Booth"
                width={500}
                height={500}
                className="rounded-lg"
                loading="lazy"
              />
            </div>
          </div>
          <div className="!text-primary md:w-1/2 md:pl-12">
            <h2 className="tracking-wid mb-2 text-base uppercase">
              BP PROJECT BOOTH
            </h2>
            <h3 className="mb-4 text-3xl font-bold">
              Lebih dari 5+ Tahun Melayani Berbagai Brand Ternama
            </h3>
            <p className="mb-6">
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
                <li key={index} className="flex items-center font-medium">
                  <FaCircleCheck className="mr-2" />
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
          <h2 className="mb-8 text-center text-2xl font-bold text-primary">
            Our Clients
          </h2>
          <OurClientsMarquee />
        </div>
      </section>
    </>
  );
}
