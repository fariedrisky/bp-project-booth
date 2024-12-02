"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { heroBackground } from "@/data/images/heroImages";
import { logowhite } from "@/data/images/logo";
import { slideInFromLeftWithBounce } from "@/utils/motion";

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
        className="container mx-auto flex flex-col items-center px-4"
        initial="offscreen"
        animate="onscreen"
        variants={slideInFromLeftWithBounce(0.2)}
      >
        <h2 className="mb-8 text-2xl font-bold">
          <Image
            src={logowhite}
            alt="BP Project Booth"
            width={467}
            height={65}
            className="mx-auto"
          />
        </h2>

        <div className="max-w-5xl space-y-6 text-justify text-2xl leading-relaxed">
          <p>
            Bp Project Booth merupakan sebuah perusahaan yang bergerak di bidang
            Photo Booth, yang proses operasinya dikendalikan oleh teknologi
            modern dan masa kini.
          </p>

          <p>
            Didirikan pada tahun 2018, sudah berulang kali mampu memenuhi
            permintaan sesuai ekspektasi konsumen sampai sekarang ini.
          </p>

          <p>
            Tidak hanya pada event skala besar seperti Wedding atau
            Brand/Corporate, Bp Booth juga bisa menyesuaikan operasinya pada
            event skala kecil seperti Birthday Party, Bridal Shower, Engagement,
            dsb.
          </p>

          <p>
            Kehadiran Photo Booth menjadi warna tersendiri di dalam suatu acara.
            Selain dapat mengabadikan momen kebahagiaan dalam bentuk gambar,
            tentu citra acara tersebut menjadi lebih berkesan bagi penyelenggara
            acara maupun tamu.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
