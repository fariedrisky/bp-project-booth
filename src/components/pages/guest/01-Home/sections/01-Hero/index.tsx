"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, textTyping } from "@/animation/motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  }, []);

  const scrollToServices = () => {
    const servicesSection = document.getElementById("our-service");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero-section"
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/40 to-black/90"></div>

      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full scale-105 transform-gpu object-cover opacity-40"
        style={{
          filter: "saturate(1.2) contrast(1.1)",
          animation: "slowZoom 40s infinite alternate ease-in-out",
        }}
      >
        <source src="/assets/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Content Section */}
      <div className="relative z-20 flex h-full w-full items-center justify-center px-4 sm:px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="w-full max-w-4xl"
        >
          {/* Badge */}
          <div className="text-center">
            <motion.div
              variants={fadeInUp}
              className="mb-4 inline-block rounded-full bg-gradient-to-r from-accent/80 to-accent px-5 py-2 backdrop-blur-md sm:mb-6 sm:px-6 sm:py-3"
            >
              <span className="text-xs font-medium tracking-wide text-white sm:text-sm md:text-base">
                Gak Cuma Poto
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeInUp}
              className="mb-4 font-serif text-4xl font-bold leading-tight text-white sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl"
            >
              Hadir Mengabadikan Setiap{" "}
              <span className="relative italic text-accent">
                Momen
                <span className="absolute -bottom-1 left-0 h-[3px] w-full bg-accent/30"></span>
              </span>
            </motion.h1>
          </div>

          {/* Main Description */}
          <motion.p
            variants={fadeInUp}
            className="mb-6 text-justify text-sm text-gray-200 sm:text-base md:mb-8 md:text-lg"
          >
            "Gak Cuma Poto" adalah lebih dari sekadar tagline—ini adalah janji
            pengalaman. Di BP Projectbooth, kami tidak hanya menyediakan layanan
            photobooth biasa. Kami menghadirkan momen, menciptakan kenangan, dan
            menyulap setiap jepretan jadi cerita. Mulai dari konsep kreatif,
            properti unik, hingga interaksi seru di booth, semua kami rancang
            untuk bikin acara kamu makin hidup.
          </motion.p>

          {/* Caption */}
          <motion.p
            variants={fadeInUp}
            className="mb-8 text-center text-xs italic text-gray-300 sm:text-sm"
          >
            Karena buat kami, setiap klik bukan cuma foto. Itu adalah ekspresi,
            keseruan, dan bagian dari momen yang layak dikenang
          </motion.p>

          {/* Buttons */}
          <div className="text-center">
            <motion.div
              variants={fadeInUp}
              className="flex flex-col items-center justify-center space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0 md:space-x-6"
            >
              <Button
                onClick={scrollToServices}
                className="group relative w-full !bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:!bg-accent/90 sm:w-auto sm:px-8 sm:py-3 sm:text-base"
              >
                <span className="relative z-10">Lihat Produk</span>
                <span className="absolute bottom-0 left-0 h-full w-0 bg-white/20 transition-all duration-300 group-hover:w-full"></span>
              </Button>

              <Link
                href="https://wa.me/6285157316767"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button className="group relative flex w-full items-center justify-center border border-white/30 bg-transparent px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition duration-300 hover:border-white hover:bg-white/10 sm:px-8 sm:py-3 sm:text-base">
                  Kontak Kami
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Decorative line */}
          <motion.div
            variants={fadeInUp}
            className="absolute -bottom-10 left-1/2 h-[1px] w-[150px] -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/50 to-transparent sm:w-[200px]"
          ></motion.div>
        </motion.div>
      </div>

      {/* Noise overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[url('/assets/images/noise-pattern.png')] opacity-30 mix-blend-soft-light"></div>

      {/* Animation keyframes */}
      <style jsx global>{`
        @keyframes slowZoom {
          from {
            transform: scale(1.05);
          }
          to {
            transform: scale(1.15);
          }
        }
      `}</style>
    </section>
  );
}
