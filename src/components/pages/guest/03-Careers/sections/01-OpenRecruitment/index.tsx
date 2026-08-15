"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
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
        className="flex min-h-[60vh] flex-col justify-center px-4 pb-16 pt-32 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="w-full">
          <h2 className="font-serif text-3xl font-bold text-white">
            Open Recruitment
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-white/70">
            {vacancies.length > 0
              ? "Kami sedang membuka kesempatan untuk bergabung bersama tim kami. Yuk, jadi bagian dari perjalanan kami."
              : "Saat ini belum ada lowongan yang dibuka. Ditunggu saja ya, akan kami umumkan di sini begitu ada kesempatan baru bergabung bersama tim kami."}
          </p>
        </motion.div>

        {vacancies.length > 0 ? (
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
        ) : (
          <motion.div
            variants={fadeInUp}
            className="mx-auto mt-10 flex max-w-md flex-col items-center gap-4 rounded border border-dashed border-gray-300 bg-gray-50 px-8 py-16"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
              <Briefcase className="h-6 w-6 text-accent" />
            </div>
            <p className="text-sm text-gray-500">
              Belum ada posisi yang dibuka saat ini. Silakan cek kembali secara
              berkala, atau follow Instagram kami untuk update terbaru seputar
              lowongan kerja.
            </p>
          </motion.div>
        )}
      </motion.section>

      <ApplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        vacancyTitle={selectedVacancy?.title}
      />
    </>
  );
}
