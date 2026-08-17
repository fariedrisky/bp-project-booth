"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Pencil, Plus } from "lucide-react";

import { fadeInUp, staggerContainer } from "@/animation/motion";

import ApplyModal from "@/components/ui/ApplyModal";
import VacancyCard, { VacancyType } from "@/components/ui/VacancyCard";

import VacancyInlineEditor from "./VacancyInlineEditor";

type RecruitmentContentProps = {
  vacancies: VacancyType[];
  editable?: boolean;
};

export default function RecruitmentContent({
  vacancies: initialVacancies,
  editable = false,
}: RecruitmentContentProps) {
  /*
   * ============================
   * VACANCIES
   * ============================
   *
   * Data awal berasal dari server.
   *
   * Setelah itu seluruh perubahan
   * create / update / delete
   * dikelola melalui state lokal.
   */
  const [vacancies, setVacancies] = useState<VacancyType[]>(initialVacancies);

  /*
   * ============================
   * DRAFT VACANCY
   * ============================
   */

  const [draftVacancy, setDraftVacancy] = useState<VacancyType | null>(null);

  /*
   * ============================
   * EDITING
   * ============================
   */

  const [editingId, setEditingId] = useState<string | null>(null);

  /*
   * ============================
   * APPLY MODAL
   * ============================
   */

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedVacancy, setSelectedVacancy] = useState<VacancyType | null>(
    null,
  );

  /*
   * ============================
   * APPLY
   * ============================
   */

  const handleApply = (vacancy: VacancyType) => {
    if (editable) return;

    setSelectedVacancy(vacancy);
    setIsModalOpen(true);
  };

  /*
   * ============================
   * EDIT EXISTING
   * ============================
   */

  const handleEdit = (vacancy: VacancyType) => {
    if (!editable) return;

    if (editingId !== null) {
      return;
    }

    if (draftVacancy !== null) {
      return;
    }

    setEditingId(vacancy.id);

    requestAnimationFrame(() => {
      setTimeout(() => {
        document.getElementById(`vacancy-${vacancy.id}`)?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 50);
    });
  };

  /*
   * ============================
   * UPDATE LOCAL
   * ============================
   *
   * Dipanggil setiap kali user
   * mengubah field pada editor.
   *
   * Ini membuat state parent
   * selalu mengikuti editor.
   */

  const handleUpdateLocal = (updatedVacancy: VacancyType) => {
    setVacancies((current) =>
      current.map((vacancy) =>
        vacancy.id === updatedVacancy.id ? updatedVacancy : vacancy,
      ),
    );
  };

  /*
   * ============================
   * CREATE VACANCY
   * ============================
   */

  const handleCreateVacancy = () => {
    if (!editable) return;

    if (editingId !== null || draftVacancy !== null) {
      return;
    }

    const newVacancy: VacancyType = {
      id: `draft-${Date.now()}`,
      title: "",
      employmentType: "Freelance",
      image: "",
      qualifications: [""],
    };

    setDraftVacancy(newVacancy);

    setEditingId(newVacancy.id);

    requestAnimationFrame(() => {
      setTimeout(() => {
        document
          .getElementById(`vacancy-draft-${newVacancy.id}`)
          ?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
      }, 100);
    });
  };

  /*
   * ============================
   * UPDATE DRAFT
   * ============================
   */

  const handleUpdateDraft = (updatedVacancy: VacancyType) => {
    setDraftVacancy(updatedVacancy);
  };

  /*
   * ============================
   * CANCEL DRAFT
   * ============================
   */

  const handleCancelDraft = () => {
    setDraftVacancy(null);
    setEditingId(null);
  };

  /*
   * ============================
   * CREATE SUCCESS
   * ============================
   *
   * API mengembalikan vacancy
   * yang benar-benar sudah dibuat
   * di database.
   *
   * Langsung masukkan ke state.
   * Tidak perlu refresh.
   */

  const handleCreateSuccess = (createdVacancy: VacancyType) => {
    setVacancies((current) => [createdVacancy, ...current]);

    setDraftVacancy(null);
    setEditingId(null);
  };

  /*
   * ============================
   * UPDATE SUCCESS
   * ============================
   *
   * API mengembalikan data terbaru
   * dari database.
   *
   * Replace vacancy lama
   * dengan data terbaru.
   */

  const handleUpdateSuccess = (updatedVacancy: VacancyType) => {
    setVacancies((current) =>
      current.map((vacancy) =>
        vacancy.id === updatedVacancy.id ? updatedVacancy : vacancy,
      ),
    );

    setEditingId(null);
  };

  /*
   * ============================
   * DELETE EXISTING
   * ============================
   */

  const handleDeleteExisting = (id: string) => {
    setVacancies((current) => current.filter((vacancy) => vacancy.id !== id));

    setEditingId(null);
  };

  /*
   * ============================
   * RENDER
   * ============================
   */

  return (
    <>
      <motion.section
        className="flex min-h-[60vh] flex-col justify-center px-4 pb-16 pt-32 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        {/* HEADER */}

        <motion.div variants={fadeInUp} className="w-full">
          <h2 className="font-serif text-3xl font-bold text-white">
            Open Recruitment
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm text-white/70">
            {vacancies.length > 0 || draftVacancy !== null
              ? "Kami sedang membuka kesempatan untuk bergabung bersama tim kami. Yuk, jadi bagian dari perjalanan kami."
              : "Saat ini belum ada lowongan yang dibuka. Ditunggu saja ya, akan kami umumkan di sini begitu ada kesempatan baru bergabung bersama tim kami."}
          </p>

          {/* TAMBAH VACANCY */}

          {editable && (
            <button
              type="button"
              onClick={handleCreateVacancy}
              disabled={editingId !== null || draftVacancy !== null}
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
              Tambah Vacancy
            </button>
          )}
        </motion.div>

        {/* VACANCY GRID */}

        {vacancies.length > 0 || draftVacancy !== null ? (
          <motion.div
            className="mx-auto mt-10 flex w-full max-w-5xl flex-wrap justify-center gap-6"
            variants={staggerContainer}
          >
            {/* EXISTING VACANCIES */}

            {vacancies.map((vacancy) => {
              const isEditing = editable && editingId === vacancy.id;

              return (
                <motion.div
                  key={vacancy.id}
                  id={`vacancy-${vacancy.id}`}
                  variants={fadeInUp}
                  className="relative w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                >
                  {isEditing ? (
                    <VacancyInlineEditor
                      vacancy={vacancy}
                      isNew={false}
                      onChange={handleUpdateLocal}
                      onCancel={() => setEditingId(null)}
                      onDelete={() => handleDeleteExisting(vacancy.id)}
                      onCreateSuccess={handleCreateSuccess}
                      onUpdateSuccess={handleUpdateSuccess}
                    />
                  ) : (
                    <>
                      {/* EDIT BUTTON */}

                      {editable && (
                        <button
                          type="button"
                          onClick={() => handleEdit(vacancy)}
                          aria-label={`Edit ${vacancy.title}`}
                          disabled={editingId !== null}
                          className="absolute right-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/80 text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                      )}

                      <VacancyCard
                        vacancy={vacancy}
                        onApply={handleApply}
                        disabled={editable}
                      />
                    </>
                  )}
                </motion.div>
              );
            })}

            {/* DRAFT VACANCY */}

            {editable && draftVacancy !== null && (
              <motion.div
                key={draftVacancy.id}
                id={`vacancy-draft-${draftVacancy.id}`}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="relative w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <VacancyInlineEditor
                  vacancy={draftVacancy}
                  isNew
                  onChange={handleUpdateDraft}
                  onCancel={handleCancelDraft}
                  onDelete={handleCancelDraft}
                  onCreateSuccess={handleCreateSuccess}
                  onUpdateSuccess={handleUpdateSuccess}
                />
              </motion.div>
            )}
          </motion.div>
        ) : (
          /* EMPTY STATE */

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

            {editable && (
              <button
                type="button"
                onClick={handleCreateVacancy}
                disabled={editingId !== null || draftVacancy !== null}
                className="inline-flex items-center gap-2 rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Plus className="h-4 w-4" />
                Tambah Vacancy
              </button>
            )}
          </motion.div>
        )}
      </motion.section>

      {/* APPLY MODAL */}

      {!editable && (
        <ApplyModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          vacancyTitle={selectedVacancy?.title}
        />
      )}
    </>
  );
}
