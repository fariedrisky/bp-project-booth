"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { heroBackground } from "@/data/images/heroImages";
import { logowhite } from "@/data/images/logo";
import { slideInFromLeftWithBounce } from "@/utils/motion"; // Pastikan path ini benar

export default function IntroSection() {
  return (
    <section
      id="bp-section"
      className="relative flex min-h-screen items-center justify-center py-16 text-secondary"
    >
      {/* Background Image */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src={heroBackground}
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          priority
          className="opacity-20 mix-blend-lighten"
        />
      </div>

      {/* Content with motion effect */}
      <motion.div
        className="container mx-auto flex flex-col items-center px-4 text-center"
        initial="offscreen"
        animate="onscreen"
        variants={slideInFromLeftWithBounce(0.2)} // Delay 0.2 seconds
      >
        <h2 className="mb-4 text-2xl font-bold">
          <Image
            src={logowhite}
            alt="BP Project Booth"
            width={467}
            height={65}
            className="mx-auto"
          />
        </h2>
        <p className="max-w-4xl text-xl leading-relaxed">
          Bp Project Booth adalah perusahaan yang bergerak di bidang photo
          booth, dengan proses operasi yang didukung oleh teknologi modern.
          Didirikan pada tahun 2018, kami telah berulang kali berhasil memenuhi
          permintaan konsumen sesuai ekspektasi hingga saat ini. Tidak hanya
          melayani event skala besar, Bp Project Booth juga menyesuaikan layanan
          kami untuk event skala kecil seperti pesta ulang tahun, bridal shower,
          dan pertunangan. Kehadiran photo booth memberikan nuansa yang unik
          dalam setiap acara. Selain mengabadikan momen bahagia dalam bentuk
          gambar, kehadiran kami turut meningkatkan citra acara, menjadikannya
          lebih berkesan bagi penyelenggara dan tamu.
        </p>
      </motion.div>
    </section>
  );
}
