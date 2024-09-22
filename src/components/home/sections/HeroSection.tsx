// HeroSection.tsx
"use client";

import React from "react";
import Image from "next/image";
import hero from "../../../../public/assets/images/hero.png";
import client1 from "../../../../public/assets/images/client1.png";
import client2 from "../../../../public/assets/images/client2.png";
import client3 from "../../../../public/assets/images/client3.png";
import client4 from "../../../../public/assets/images/client4.png";
import { motion } from "framer-motion";

const images = [client1, client2, client3, client4]; // Daftar gambar

const Carousel = () => {
  return (
    <div className="relative flex h-60 w-60 items-center justify-center">
      <motion.div
        className="relative flex h-full w-full items-center justify-center"
        style={{ perspective: "600px" }}
      >
        <motion.div
          className="relative flex h-full w-full items-center justify-center"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: 360 }}
          transition={{ duration: 12, ease: "linear", repeat: Infinity }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {images.map((src, index) => (
            <motion.div
              key={index}
              className="absolute flex h-full w-full items-center justify-center"
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateY(${index * (360 / images.length)}deg) translateZ(${130 + index * 30}px)`,
              }}
            >
              <div className="relative h-40 w-80">
                <Image
                  src={src}
                  alt={`Client ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg border border-gray-400 shadow-lg"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default function HeroSection() {
  return (
    <section
      id="hero-section"
      className="relative flex h-screen w-full flex-col lg:flex-row"
    >
      <Image
        src={hero}
        alt="Hero Image"
        layout="fill"
        objectFit="cover"
        priority
        style={{
          backgroundBlendMode: "lighten",
          opacity: "20%",
          zIndex: 0,
        }}
      />
      {/* Konten Hero */}
      <div className="z-20 flex flex-1 items-start justify-center px-4 pt-20 sm:px-8 sm:pt-24 md:pt-28 lg:items-center lg:px-16 lg:pt-0">
        <div
          className="w-full max-w-md p-6 text-center sm:max-w-lg sm:p-8 md:max-w-xl lg:max-w-2xl lg:text-left"
          style={{
            background:
              "linear-gradient(to right, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0))",
          }}
        >
          <div className="mb-4">
            <span className="inline-block rounded-full bg-[#D4A163] bg-opacity-10 px-3 py-1 text-xs text-[#C78D4E] sm:px-4 sm:py-2 sm:text-sm">
              Professional Photo Booth Service
            </span>
          </div>
          <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Hadir Mengabadikan <br />
            Setiap <span className="text-[#C78D4E]">Momen</span>
          </h1>
          <p className="mx-auto mb-6 max-w-sm text-sm text-gray-200 sm:max-w-md sm:text-base lg:mx-0">
            Photo booth modern yang menghadirkan kenangan tak terlupakan di
            setiap acara Anda
          </p>
          <div className="flex flex-col justify-center space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0 lg:justify-start">
            <button className="bg-[#C78D4E] px-4 py-2 text-sm font-bold text-white transition duration-300 hover:bg-[#A57841] sm:px-6">
              Lihat Produk
            </button>
            <button className="flex items-center justify-center border border-white bg-transparent px-4 py-2 text-sm font-bold text-white transition duration-300 hover:bg-white hover:bg-opacity-20 sm:px-6">
              Kontak Kami <span className="ml-2">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Carousel 3D */}
      <div className="flex flex-1 items-center justify-center">
        <Carousel />
      </div>
    </section>
  );
}
