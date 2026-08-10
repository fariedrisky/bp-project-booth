"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ServiceCard, ServiceType } from "@/components/ui/ServiceCard";
import BookingModal from "@/components/ui/BookingModal";
import booth180Types from "./data";
import { fadeInUp, staggerContainer } from "@/animation/motion";

export default function Booth180() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceType | null>(
    null,
  );

  const handleBookNow = (service: ServiceType) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <div className="py-24">
      {" "}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto px-4 py-12"
      >
        <motion.div
          variants={fadeInUp}
          className="mx-auto mb-8 max-w-2xl text-center"
        >
          <h2 className="font-serif text-2xl font-bold md:text-3xl">
            180° Booth
          </h2>
          <p className="mt-2 text-gray-600">
            Efek foto dengan sudut pandang 180° yang futuristik menggunakan
            multiple kamera
          </p>
        </motion.div>
        <motion.div
          variants={staggerContainer}
          className="mx-auto grid max-w-[400px] grid-cols-1 gap-6"
        >
          {booth180Types.map((booth) => (
            <motion.div
              key={booth.id}
              variants={fadeInUp}
              className="mx-auto w-full max-w-[389px]"
            >
              <ServiceCard
                service={booth}
                variant="180"
                onBookNow={handleBookNow}
              />
            </motion.div>
          ))}
        </motion.div>

        {selectedService && (
          <BookingModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedService(null);
            }}
            service={selectedService}
          />
        )}
      </motion.div>
    </div>
  );
}
