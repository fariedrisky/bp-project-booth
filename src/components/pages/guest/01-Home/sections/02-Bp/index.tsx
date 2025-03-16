"use client";

import { FaCircleCheck } from "react-icons/fa6";
import Image from "next/image";
import React, { useState, useEffect } from "react";

import OurClientsMarquee from "../../animations/OurClientsMarquee";
import { motion } from "framer-motion";
import {
  slideInFromBottom,
  slideInFromLeftWithBounce,
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
const getImagesFromDirectory = async (directoryPath: string): Promise<string[]> => {
  try {
    // Fetch daftar gambar dari API route
    const response = await fetch(`/api/get-images?directory=${encodeURIComponent(directoryPath)}`);
    
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
  const [images, setImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Muat gambar ketika komponen dipasang
    const loadImages = async () => {
      try {
        // Dapatkan gambar yang sudah diacak dari API
        const imageFiles = await getImagesFromDirectory("/assets/images/home");
        
        if (imageFiles.length === 0) {
          console.warn("No images found in the directory");
          setIsLoading(false);
          return;
        }
        
        setImages(imageFiles);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load images:", error);
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

  useEffect(() => {
    // Ganti gambar setiap 4 detik
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [images]);

  return (
    <>
      <motion.section
        id="bp-section"
        className="bg-foreground py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto flex flex-col items-center px-4 md:flex-row">
          <motion.div
            className="mb-8 md:mb-0 md:w-1/2"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
            variants={slideInFromLeftWithBounce(0.2)}
          >
             <div className="relative">
              {isLoading ? (
                // Loading state
                <div className="flex h-[500px] w-[500px] items-center justify-center bg-gray-200">
                  <span>Loading...</span>
                </div>
              ) : (
                // Image carousel with fade transition
                <div className="relative h-[700px] w-[500px] overflow-hidden">
                {images.map((image, index) => (
                  <Image
                    key={image}
                    src={image}
                    alt={`BP Project Booth ${index + 1}`}
                    width={500}
                    height={700}
                    loading="lazy"
                    className={`absolute left-0 top-0 h-[700px] w-[500px] object-cover transition-opacity duration-1000 ${
                      index === currentImageIndex ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              </div>
              )}
            </div>
          </motion.div>
          <div className="!text-primary md:w-1/2 md:pl-12">
            <motion.h2
              className="tracking-wid mb-2 text-base uppercase"
              variants={fadeInUp}
            >
              BP PROJECT BOOTH
            </motion.h2>
            <motion.h3 className="mb-4 text-3xl font-bold" variants={fadeInUp}>
              Lebih dari 5+ Tahun Melayani Berbagai Brand Ternama
            </motion.h3>
            <motion.p className="mb-6" variants={fadeInUp}>
              Sejak 2018, Bp Project Booth telah memberikan layanan photo booth
              modern dengan teknologi canggih untuk berbagai acara skala besar
              dan kecil.
            </motion.p>
            <motion.ul
              className="mb-8 space-y-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              {[
                "Quality Control System",
                "100% Satisfaction Guarantee",
                "Commitment to Customer",
                "Highly Professional",
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
        <motion.div
          id="our-client"
          className="bg-foreground py-10"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true }}
          variants={slideInFromBottom(0.3)}
        >
          <h2 className="mb-8 text-center text-2xl font-bold text-primary">
            Our Clients
          </h2>
          <OurClientsMarquee />
        </motion.div>
      </motion.section>
    </>
  );
}