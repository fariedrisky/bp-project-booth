"use client";
import Image from "next/image";
import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { heroBackground } from "@/data/images/heroImages";
import { logowhite } from "@/data/images/logo";
import {
  slideInFromLeftWithBounce,
  staggerContainer,
} from "@/animation/motion";

// Constants
const TYPING_SPEED = 25; // milliseconds per character
const PARAGRAPH_PAUSE = 800; // milliseconds between paragraphs

// TypeWriter Animation Component
const TypewriterAnimation = (): JSX.Element => {
  // Content paragraphs - defined with useMemo to fix ESLint warning
  const paragraphs = useMemo(
    () => [
      "Bp Project Booth adalah perusahaan yang bergerak di bidang Photo Booth dengan memanfaatkan teknologi modern. Kami hadir untuk memberikan pengalaman berbeda di setiap acara. Fokus kami adalah menjaga setiap detail agar menciptakan momen berkesan.",
      "Sejak 2018, Bp Booth telah melayani berbagai klien dengan beragam kebutuhan acara. Kami selalu berkomitmen memberikan hasil terbaik dan memenuhi ekspektasi pelanggan. Pengalaman kami menjadi modal utama dalam menghadapi tantangan di setiap proyek.",
      "Layanan kami mencakup acara besar dan kecil seperti pernikahan, acara perusahaan, dan ulang tahun. Fleksibilitas ini memungkinkan kami menyesuaikan konsep dengan tema acara yang berbeda. Kami selalu berusaha memberikan layanan personal dan sesuai kebutuhan klien.",
      "Photo Booth yang kami sediakan menambah nilai estetika dan memperkuat identitas acara. Foto yang dihasilkan menjadi kenang-kenangan yang tak ternilai. Kehadiran Photo Booth menciptakan interaksi dan kesan mendalam bagi tamu dan penyelenggara.",
    ],
    [],
  );

  // State management
  const [displayedText, setDisplayedText] = useState<string[]>(
    Array(paragraphs.length).fill(""),
  );
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState<number>(0);
  const [currentCharIndex, setCurrentCharIndex] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);

  // Typewriter animation effect
  useEffect(() => {
    // Stop if animation is complete
    if (isComplete) return;

    // Check if all paragraphs are complete
    if (currentParagraphIndex >= paragraphs.length) {
      setIsComplete(true);
      return;
    }

    const currentParagraph = paragraphs[currentParagraphIndex];

    // Handle typing characters within current paragraph
    if (currentCharIndex < currentParagraph.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prevText) => {
          const newText = [...prevText];
          newText[currentParagraphIndex] = currentParagraph.substring(
            0,
            currentCharIndex + 1,
          );
          return newText;
        });
        setCurrentCharIndex((prevIndex) => prevIndex + 1);
      }, TYPING_SPEED);

      return () => clearTimeout(timer);
    }
    // Handle moving to next paragraph
    else {
      const pauseTimer = setTimeout(() => {
        setCurrentParagraphIndex((prevIndex) => prevIndex + 1);
        setCurrentCharIndex(0);
      }, PARAGRAPH_PAUSE);

      return () => clearTimeout(pauseTimer);
    }
  }, [currentParagraphIndex, currentCharIndex, isComplete, paragraphs]);

  // Render paragraphs with typewriter effect
  return (
    <div className="max-w-5xl space-y-4 text-justify text-base leading-relaxed sm:space-y-6 sm:text-lg lg:text-xl">
      {displayedText.map((text, index) => (
        <div key={index} className="overflow-hidden">
          <p className="whitespace-pre-wrap px-1 sm:px-0">
            {text}
            {index === currentParagraphIndex && !isComplete && (
              <span className="animate-blink inline-block h-5 w-1 bg-secondary"></span>
            )}
          </p>
        </div>
      ))}
    </div>
  );
};

// Main Component
export default function Introducing(): JSX.Element {
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

      {/* Content Container */}
      <motion.div
        className="container mx-auto flex flex-col items-center px-4 sm:px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        {/* Logo Animation */}
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

        {/* Typewriter Text Animation */}
        <motion.div variants={staggerContainer}>
          <TypewriterAnimation />
        </motion.div>
      </motion.div>

      {/* Cursor Blink Animation */}
      <style jsx global>{`
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        .animate-blink {
          animation: blink 0.8s infinite;
        }
      `}</style>
    </section>
  );
}
