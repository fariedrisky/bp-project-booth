import React from "react";
import { motion } from "framer-motion";
import { ServiceCard } from "@/components/ui/ServiceCard";
import phoneBoothTypes from "./data";
import { fadeInUp, staggerContainer } from "@/animation/motion";

export const PhoneBooth = () => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="container mx-auto px-4"
    >
      <motion.div
        variants={fadeInUp}
        className="mx-auto mb-8 max-w-2xl text-center"
      >
        <h2 className="font-serif text-2xl font-bold md:text-3xl">
          Phone Booth
        </h2>
        <p className="mt-2 text-gray-600">
          Booth sederhana untuk mengabadikan pesan video
        </p>
      </motion.div>
      <motion.div
        variants={staggerContainer}
        className="mx-auto grid max-w-[400px] grid-cols-1 gap-6"
      >
        {phoneBoothTypes.map((booth) => (
          <motion.div
            key={booth.id}
            variants={fadeInUp}
            whileHover={{ y: -10 }}
            className="mx-auto w-full max-w-[389px]"
          >
            <ServiceCard service={booth} variant="phone" />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};
