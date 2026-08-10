"use client";

import React, { useState } from "react";
import ApplyModal from "@/components/ui/ApplyModal";
import VacancyCard, { VacancyType } from "@/components/ui/VacancyCard";

const vacancies: VacancyType[] = [
  {
    id: "event-crew",
    title: "EVENT CREW",
    employmentType: "Freelance",
    qualifications: [
      "Pria/Wanita usia 18–25 tahun",
      "Berpenampilan menarik dan memiliki sikap yang baik",
      "Tidak memiliki pengalaman dipersilakan melamar (pengalaman di bidang IT menjadi nilai tambah)",
      "Memiliki kendaraan pribadi",
      "Mampu mengendarai mobil menjadi nilai tambah",
      "Memiliki kemampuan komunikasi dan public speaking yang baik",
      "Bersedia bekerja sesuai jadwal event",
      "Gaji dibayarkan per event",
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
      <section className="py-16 text-center">
        <h2 className="font-serif text-3xl font-bold text-gray-900">
          Open Recruitment
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-gray-500">
          Kami sedang membuka kesempatan untuk bergabung bersama tim kami. Yuk,
          jadi bagian dari perjalanan kami.
        </p>

        <div className="mx-auto mt-10 flex max-w-5xl flex-wrap justify-center gap-6 px-4">
          {vacancies.map((vacancy) => (
            <VacancyCard
              key={vacancy.id}
              vacancy={vacancy}
              onApply={handleApply}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            />
          ))}
        </div>
      </section>

      <ApplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        vacancyTitle={selectedVacancy?.title}
      />
    </>
  );
}
