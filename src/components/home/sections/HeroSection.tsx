"use client";

import React from "react";
import Image from "next/image";
import { heroBackground, heroClient } from "@/helpers/heroImages";
import { motion } from "framer-motion";
import { slideInFromBottom } from "@/utils/motion";

export default function HeroSection() {
  return (
    <section
      id="hero-section"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Image */}
      <Image
        src={heroBackground}
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        priority
        style={{
          backgroundBlendMode: "lighten",
          opacity: "20%",
          zIndex: -2,
        }}
      />

      {/* Hero Client Image */}
      <motion.div
        className="absolute right-[-50px] z-[-1] hidden -translate-y-1/2 transform lg:block"
        initial="offscreen"
        whileInView="onscreen"
        variants={slideInFromBottom(0.3)}
      >
        <div className="relative h-[125vh] w-[800px] overflow-hidden">
          <Image
            src={heroClient}
            alt="Hero Client"
            className="rotate-6 object-cover" // Ubah dari object-contain menjadi object-cover
            style={{
              filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
              width: "800px", // Mengunci lebar
              height: "125vh", // Mengunci tinggi
            }}
          />
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="relative h-full w-full">
        <div className="flex h-full items-center justify-center px-4 lg:justify-start lg:px-16">
          <motion.div
            className="w-full max-w-md p-6 text-center sm:max-w-lg sm:p-8 md:max-w-xl lg:max-w-2xl lg:text-left"
            style={{
              background:
                "linear-gradient(to right, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0))",
            }}
            initial="offscreen"
            whileInView="onscreen"
            variants={slideInFromBottom(0.3)}
          >
            <div className="mb-4">
              <span className="inline-block rounded-full bg-accent bg-opacity-10 px-3 py-1 text-xs text-accent sm:px-4 sm:py-2 sm:text-sm">
                Professional Photo Booth Service
              </span>
            </div>
            <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
              Hadir Mengabadikan <br />
              Setiap <span className="text-accent">Momen</span>
            </h1>
            <p className="mx-auto mb-6 max-w-sm text-sm text-gray-200 sm:max-w-md sm:text-base lg:mx-0">
              Photo booth modern yang menghadirkan kenangan tak terlupakan di
              setiap acara Anda
            </p>
            <div className="flex flex-col justify-center space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0 lg:justify-start">
              <button className="bg-accent px-4 py-2 text-sm font-bold text-white transition duration-300 hover:bg-accent sm:px-6">
                Lihat Produk
              </button>
              <button className="flex items-center justify-center border border-white bg-transparent px-4 py-2 text-sm font-bold text-white transition duration-300 hover:bg-white hover:bg-opacity-20 sm:px-6">
                Kontak Kami <span className="ml-2">→</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
