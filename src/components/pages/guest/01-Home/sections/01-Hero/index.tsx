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
      videoRef.current.playbackRate = 0.8; // Sedikit diperlambat untuk efek yang lebih elegan
    }
  }, []);

  // Function to scroll to the Our Service section
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
      {/* Overlay gradient untuk memperindah background video */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/40 to-black/90"></div>

      {/* Background Video dengan efek zoom yang halus */}
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

      {/* Content Section di tengah */}
      <div className="relative z-20 flex h-full w-full items-center justify-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-4xl px-6 pt-0 text-center"
        >
          <motion.div
            variants={fadeInUp}
            className="mb-6 inline-block rounded-full bg-opacity-10 bg-gradient-to-r from-accent/80 to-accent px-6 py-3 backdrop-blur-md"
          >
            <span className="text-sm font-medium tracking-wide text-white sm:text-base">
              Professional Photo Booth Service
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="mb-6 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl"
          >
            <motion.span custom={0} variants={textTyping}>
              Hadir Mengabadikan <br />
            </motion.span>
            <motion.span custom={1} variants={textTyping}>
              Setiap{" "}
              <span className="relative italic text-accent">
                Momen
                <span className="absolute -bottom-1 left-0 h-[3px] w-full bg-accent/30"></span>
              </span>
            </motion.span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mx-auto mb-10 max-w-xl text-base text-gray-200 sm:text-lg"
          >
            Photo booth modern yang menghadirkan kenangan tak terlupakan di
            setiap acara Anda dengan teknologi terkini dan desain yang elegan
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0"
          >
            <Button
              onClick={scrollToServices}
              className="group relative !bg-accent px-8 py-3 text-base font-semibold text-white transition-all duration-300 hover:!bg-accent/90 sm:px-10"
            >
              <span className="relative z-10">Lihat Produk</span>
              <span className="absolute bottom-0 left-0 h-full w-0 bg-white/20 transition-all duration-300 group-hover:w-full"></span>
            </Button>

            <Link
              href="https://wa.me/6285157316767"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="group relative flex w-full items-center justify-center border border-white/30 bg-transparent px-8 py-3 text-base font-semibold text-white backdrop-blur-sm transition duration-300 hover:border-white hover:bg-white/10 sm:px-10">
                Kontak Kami
              </Button>
            </Link>
          </motion.div>

          {/* Ornamen dekoratif */}
          <motion.div
            variants={fadeInUp}
            className="absolute -bottom-10 left-1/2 h-[1px] w-[200px] -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/50 to-transparent"
          ></motion.div>
        </motion.div>
      </div>

      {/* Particles overlay effect */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[url('/assets/images/noise-pattern.png')] opacity-30 mix-blend-soft-light"></div>
    </section>
  );
}

{
  /* Tambahkan keyframes untuk efek zoom lambat */
}
<style jsx global>{`
  @keyframes slowZoom {
    from {
      transform: scale(1.05);
    }
    to {
      transform: scale(1.15);
    }
  }
`}</style>;
