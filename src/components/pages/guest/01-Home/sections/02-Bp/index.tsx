"use client";

import { FaCircleCheck } from "react-icons/fa6";
import Image from "next/image";
import React, { useState, useEffect } from "react";

import OurClientsMarquee from "../../animations/OurClientsMarquee";
import { motion } from "framer-motion";
import {
  slideInFromBottom,
  slideInFromLeftWithBounce,
  slideInFromRightWithBounce,
  fadeInUp,
  staggerContainer,
} from "@/animation/motion";

// Fungsi untuk mengacak array (algoritma Fisher-Yates shuffle)
const shuffleArray = (array: string[]): string[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Fungsi untuk mendapatkan gambar dari direktori
const getImagesFromDirectory = async (
  directoryPath: string,
): Promise<string[]> => {
  try {
    // Fetch daftar gambar dari API route
    const response = await fetch(
      `/api/get-images?directory=${encodeURIComponent(directoryPath)}`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch images: ${response.statusText}`);
    }

    const data = await response.json();

    // Langsung acak gambar setelah mendapatkannya
    return shuffleArray(data.images);
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
};

export default function Bp() {
  const [homeImages, setHomeImages] = useState<string[]>([]);
  const [photoboxImages, setPhotoboxImages] = useState<string[]>([]);
  const [currentHomeImageIndex, setCurrentHomeImageIndex] = useState(0);
  const [currentPhotoboxImageIndex, setCurrentPhotoboxImageIndex] = useState(0);
  const [isHomeLoading, setIsHomeLoading] = useState(true);
  const [isPhotoboxLoading, setIsPhotoboxLoading] = useState(true);

  useEffect(() => {
    // Muat gambar home ketika komponen dipasang
    const loadHomeImages = async () => {
      try {
        // Dapatkan gambar yang sudah diacak dari API
        const imageFiles = await getImagesFromDirectory("/assets/images/home");

        if (imageFiles.length === 0) {
          console.warn("No images found in the home directory");
          setIsHomeLoading(false);
          return;
        }

        setHomeImages(imageFiles);
        setIsHomeLoading(false);
      } catch (error) {
        console.error("Failed to load home images:", error);
        setIsHomeLoading(false);
      }
    };

    // Muat gambar photobox ketika komponen dipasang
    const loadPhotoboxImages = async () => {
      try {
        // Dapatkan gambar yang sudah diacak dari API
        const imageFiles = await getImagesFromDirectory(
          "/assets/images/photobox",
        );

        if (imageFiles.length === 0) {
          console.warn("No images found in the photobox directory");
          setIsPhotoboxLoading(false);
          return;
        }

        setPhotoboxImages(imageFiles);
        setIsPhotoboxLoading(false);
      } catch (error) {
        console.error("Failed to load photobox images:", error);
        setIsPhotoboxLoading(false);
      }
    };

    loadHomeImages();
    loadPhotoboxImages();
  }, []);

  useEffect(() => {
    // Ganti gambar home setiap 4 detik
    if (homeImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentHomeImageIndex(
          (prevIndex) => (prevIndex + 1) % homeImages.length,
        );
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [homeImages]);

  useEffect(() => {
    // Ganti gambar photobox setiap 4 detik
    if (photoboxImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentPhotoboxImageIndex(
          (prevIndex) => (prevIndex + 1) % photoboxImages.length,
        );
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [photoboxImages]);

  return (
    <>
      <motion.section
        id="bp-section"
        className="bg-foreground py-8 md:py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto flex flex-col items-center px-4 md:flex-row">
          {/* Image Column - Keep current desktop size */}
          <motion.div
            className="mb-8 w-full md:mb-0 md:w-[38%] xl:w-[36%]"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
            variants={slideInFromLeftWithBounce(0.2)}
          >
            <div className="relative mx-auto w-full">
              {isHomeLoading ? (
                // Loading state with responsive height
                <div className="flex h-[400px] w-full items-center justify-center bg-gray-200">
                  <span>Loading...</span>
                </div>
              ) : homeImages.length > 0 ? (
                // Image carousel with exact proportions matching screenshot
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  {homeImages.map((image, index) => (
                    <div
                      key={image}
                      className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${
                        index === currentHomeImageIndex
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`BP Project Booth ${index + 1}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 38vw, 450px"
                        priority={index === 0}
                        loading={index === 0 ? "eager" : "lazy"}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                // Fallback if no images
                <div className="flex h-[400px] w-full items-center justify-center rounded bg-gray-100">
                  <span>No images available</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Text Column - Adjusted to match current layout */}
          <div className="w-full !text-primary md:w-[62%] md:pl-12 lg:pl-16 xl:w-[64%]">
            <motion.h2
              className="tracking-wid mb-2 text-base uppercase"
              variants={fadeInUp}
            >
              BP PROJECT BOOTH
            </motion.h2>
            <motion.h3 className="mb-4 text-3xl font-bold" variants={fadeInUp}>
              Solusi Photobooth Kekinian untuk Semua Acara Kamu
            </motion.h3>
            <motion.p className="mb-6 text-justify" variants={fadeInUp}>
              Sejak 2018, BP Project Booth telah hadir dengan pengalaman
              photobooth berkualitas premium menggunakan teknologi canggih,
              menciptakan momen spesial di berbagai acara, mulai dari
              pernikahan, acara perusahaan, hingga event-event besar.
            </motion.p>
            <motion.ul
              className="mb-8 space-y-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                "Kualitas terbaik dengan hasil maksimal",
                "Totalitas dalam setiap proyek",
                "Tim profesional yang berpengalaman",
                "Desain template eksklusif sesuai tema acara kamu",
                "Teknologi modern untuk pengalaman photo booth terbaik",
                "Layanan fleksibel untuk berbagai jenis event",
                "Support teknis penuh selama acara berlangsung",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-center font-medium"
                  variants={fadeInUp}
                >
                  <FaCircleCheck className="mr-2" />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>

        {/* Photobox Section */}
        <div className="container mx-auto mt-20 flex flex-col items-center px-4 md:flex-row-reverse">
          {/* Image Column - New carousel for photobox */}
          <motion.div
            className="mb-8 w-full md:mb-0 md:w-[38%] xl:w-[36%]"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
            variants={slideInFromRightWithBounce(0.2)}
          >
            <div className="relative mx-auto w-full">
              {isPhotoboxLoading ? (
                // Loading state with responsive height
                <div className="flex h-[400px] w-full items-center justify-center bg-gray-200">
                  <span>Loading...</span>
                </div>
              ) : photoboxImages.length > 0 ? (
                // Image carousel with exact proportions matching screenshot
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  {photoboxImages.map((image, index) => (
                    <div
                      key={image}
                      className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${
                        index === currentPhotoboxImageIndex
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`Photobox ${index + 1}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 38vw, 450px"
                        priority={index === 0}
                        loading={index === 0 ? "eager" : "lazy"}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                // Fallback if no images
                <div className="flex h-[400px] w-full items-center justify-center rounded bg-gray-100">
                  <span>No images available</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Text Column for Photobox */}
          <div className="w-full !text-primary md:w-[62%] md:pr-12 lg:pr-16 xl:w-[64%]">
            <motion.h2
              className="tracking-wid mb-2 text-base uppercase"
              variants={fadeInUp}
            >
              PHOTOBOX
            </motion.h2>
            <motion.h3 className="mb-4 text-3xl font-bold" variants={fadeInUp}>
              Jadikan photobox pencetak duit untuk kamu, dari photobox jadi cuan
              besar!
            </motion.h3>
            <motion.p className="mb-6 text-justify" variants={fadeInUp}>
              Gabung kemitraan photobox BP Projectbooth—brand yang udah
              dipercaya di berbagai event. Kami siap bantu kamu mulai dari nol
              sampai jepret pertama!
            </motion.p>
            <motion.h4 className="mb-3 text-lg font-medium" variants={fadeInUp}>
              Keunggulan photobox kami:
            </motion.h4>
            <motion.ul
              className="mb-8 space-y-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                "Mudah dioperasikan tanpa perlu keahlian khusus",
                "Bisa disesuaikan dengan berbagai tema dan desain frame",
                "Foto langsung cetak dalam hitungan detik",
                "Menambah keseruan dan interaksi bagi tamu acara",
                "Tersedia layanan maintenance dan upgrade",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-center font-medium"
                  variants={fadeInUp}
                >
                  <FaCircleCheck className="mr-2" />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
            <motion.div className="mt-6" variants={fadeInUp}>
              <button
                className="hover:bg-primary-dark rounded-lg bg-primary px-6 py-3 font-bold text-white transition-colors"
                onClick={() => {
                  const whatsappMessage = encodeURIComponent(
                    "Halo, saya tertarik dengan bisnis photobox BP Projectbooth dan ingin konsultasi lebih lanjut.",
                  );
                  window.open(
                    `https://wa.me/6285157316767?text=${whatsappMessage}`,
                    "_blank",
                  );
                }}
              >
                Ayo Konsultasikan Sekarang
              </button>
            </motion.div>
          </div>
        </div>

        <motion.div
          id="our-client"
          className="bg-foreground py-8 md:py-10"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true }}
          variants={slideInFromBottom(0.3)}
        >
          <h2 className="mb-6 text-center text-2xl font-bold text-primary md:mb-8">
            Our Clients
          </h2>
          <OurClientsMarquee />
        </motion.div>
      </motion.section>
    </>
  );
}
