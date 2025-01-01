import React from "react";
import { motion } from "framer-motion";
import { ServiceCard } from "@/components/ui/ServiceCard";
import boothTypes from "./data";
import { fadeInUp, staggerContainer } from "@/animation/motion";

const BasicBooth: React.FC = () => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="container mx-auto px-4 py-8"
    >
      <motion.div
        variants={fadeInUp}
        className="mx-auto mb-8 max-w-2xl text-center"
      >
        <h2 className="font-serif text-2xl font-bold md:text-3xl">
          Basic Booth
        </h2>
        <p className="mt-2 text-gray-600">
          Cocok untuk event besar dan kecil, dengan ukuran foto 2R, 4R, dan
          Polaroid.
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="mx-auto grid max-w-[800px] grid-cols-1 gap-6 sm:grid-cols-2"
      >
        {boothTypes.map((booth) => (
          <motion.div
            key={booth.id}
            variants={fadeInUp}
            whileHover={{ y: -10 }}
            className="relative mx-auto w-full max-w-[450px] overflow-hidden shadow-lg"
          >
            <ServiceCard service={booth} variant="basic" />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default BasicBooth;
