"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { heroBackground } from "@/data/images/heroImages";
import { logowhite } from "@/data/images/logo";
import {
  slideInFromLeftWithBounce,
  staggerContainer,
  textTyping,
} from "@/animation/motion";

export default function Introducing() {
  const paragraphs = [
    "Bp Project Booth adalah perusahaan yang bergerak di bidang Photo Booth dengan memanfaatkan teknologi modern. Kami hadir untuk memberikan pengalaman berbeda di setiap acara. Fokus kami adalah menjaga setiap detail agar menciptakan momen berkesan.",
    "Sejak 2018, Bp Booth telah melayani berbagai klien dengan beragam kebutuhan acara. Kami selalu berkomitmen memberikan hasil terbaik dan memenuhi ekspektasi pelanggan. Pengalaman kami menjadi modal utama dalam menghadapi tantangan di setiap proyek.",
    "Layanan kami mencakup acara besar dan kecil seperti pernikahan, acara perusahaan, dan ulang tahun. Fleksibilitas ini memungkinkan kami menyesuaikan konsep dengan tema acara yang berbeda. Kami selalu berusaha memberikan layanan personal dan sesuai kebutuhan klien.",
    "Photo Booth yang kami sediakan menambah nilai estetika dan memperkuat identitas acara. Foto yang dihasilkan menjadi kenang-kenangan yang tak ternilai. Kehadiran Photo Booth menciptakan interaksi dan kesan mendalam bagi tamu dan penyelenggara.",
  ];

  return (
    <section
      id="bp-section"
      className="relative min-h-screen w-full pb-16 pt-24 text-secondary md:pt-32"
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 -z-10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src={heroBackground}
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          priority
          className="opacity-20 mix-blend-lighten"
        />
      </motion.div>

      {/* Content with motion effect */}
      <motion.div
        className="container mx-auto flex flex-col items-center px-4 sm:px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.div
          className="mb-8 mt-8 sm:mb-12"
          variants={slideInFromLeftWithBounce(0.2)}
        >
          <Image
            src={logowhite}
            alt="BP Project Booth"
            width={150}
            className="mx-auto sm:w-[200px]"
          />
        </motion.div>

        <motion.div
          className="max-w-5xl space-y-4 text-justify text-base leading-relaxed sm:space-y-6 sm:text-lg lg:text-xl"
          variants={staggerContainer}
        >
          {paragraphs.map((paragraph, index) => (
            <motion.div
              key={index}
              className="overflow-hidden"
              variants={staggerContainer}
            >
              <motion.p
                variants={textTyping}
                custom={index}
                className="whitespace-pre-wrap px-1 sm:px-0"
              >
                {paragraph}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
