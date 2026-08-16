"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import ApplyModal from "@/components/ui/ApplyModal";
import VacancyCard, { VacancyType } from "@/components/ui/VacancyCard";
import { fadeInUp, staggerContainer } from "@/animation/motion";

export default function VacancyList({
  vacancies,
}: {
  vacancies: VacancyType[];
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedVacancy, setSelectedVacancy] = useState<VacancyType | null>(
    null,
  );

  const handleApply = (vacancy: VacancyType) => {
    setSelectedVacancy(vacancy);
    setIsModalOpen(true);
  };

  return (
    <>
      <motion.div
        className="mx-auto mt-10 flex w-full max-w-5xl flex-wrap justify-center gap-6"
        variants={staggerContainer}
      >
        {vacancies.map((vacancy) => (
          <motion.div
            key={vacancy.id}
            variants={fadeInUp}
            className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
          >
            <VacancyCard vacancy={vacancy} onApply={handleApply} />
          </motion.div>
        ))}
      </motion.div>

      <ApplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        vacancyTitle={selectedVacancy?.title}
      />
    </>
  );
}
