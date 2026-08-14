"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/animation/motion";
import ApplyModal from "@/components/ui/ApplyModal";
import VacancyCard, { VacancyType } from "@/components/ui/VacancyCard";

const vacancies: VacancyType[] = [
  {
    id: "event-crew",
    title: "EVENT CREW",
    employmentType: "Freelance",
    image: "/assets/images/careers/crew-event.png",
    qualifications: [
      "Pria/Wanita, usia maksimal 25 tahun",
      "Bersemangat belajar dan siap berkembang bersama",
      "Menyukai dunia event & hospitality",
      "Bertanggung jawab serta mampu bekerja dalam tim",
      "Memiliki kendaraan pribadi (diutamakan dapat mengemudi)",
      "Mampu mengoperasikan komputer/laptop menjadi nilai tambah",
      "Terbuka untuk mahasiswa aktif",
    ],
  },
];

export default function OpenRecruitment() {
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
      <motion.section
        className="py-16 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp}>
          <h2 className="font-serif text-3xl font-bold text-gray-900">
            Open Recruitment
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-gray-500">
            Kami sedang membuka kesempatan untuk bergabung bersama tim kami.
            Yuk, jadi bagian dari perjalanan kami.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto mt-10 flex max-w-5xl flex-wrap justify-center gap-6 px-4"
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
      </motion.section>

      <ApplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        vacancyTitle={selectedVacancy?.title}
      />
    </>
  );
}
