"use client";

import { FaCircleCheck } from "react-icons/fa6";
import Image from "next/image";
import React from "react";

import OurClientsMarquee from "../../animations/OurClientsMarquee";
import { motion } from "framer-motion";
import {
  slideInFromBottom,
  slideInFromLeftWithBounce,
  fadeInUp,
  staggerContainer,
} from "@/animation/motion";

export default function Bp() {
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
              <Image
                src="/assets/images/bp-client.jpg"
                alt="BP Project Booth"
                width={500}
                height={500}
                loading="lazy"
              />
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
