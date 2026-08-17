"use client";

import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pencil, Plus } from "lucide-react";

import { fadeInUp, staggerContainer } from "@/animation/motion";

import ApplyModal from "@/components/ui/ApplyModal";
import VacancyCard, { VacancyType } from "@/components/ui/VacancyCard";

import VacancyInlineEditor from "./VacancyInlineEditor";

type RecruitmentContentProps = {
  vacancies?: VacancyType[];
  editable?: boolean;
};

export default function RecruitmentContent({
  vacancies: initialVacancies,
  editable = false,
}: RecruitmentContentProps) {
  /*
   * =====================================================
   * VACANCIES
   * =====================================================
   *
   * Jika data dikirim dari server (CareersEditor),
   * langsung gunakan data tersebut.
   *
   * Jika tidak ada data dari server,
   * data akan diambil melalui API.
   */

  const [vacancies, setVacancies] = useState<VacancyType[]>(
    initialVacancies ?? [],
  );

  /*
   * =====================================================
   * LOADING
   * =====================================================
   *
   * Kalau initialVacancies tersedia,
   * tidak perlu loading karena data sudah ada
   * dari server.
   */

  const [isLoading, setIsLoading] = useState(initialVacancies === undefined);

  /*
   * =====================================================
   * DRAFT VACANCY
   * =====================================================
   */

  const [draftVacancy, setDraftVacancy] = useState<VacancyType | null>(null);

  /*
   * =====================================================
   * EDITING
   * =====================================================
   */

  const [editingId, setEditingId] = useState<string | null>(null);

  /*
   * =====================================================
   * APPLY MODAL
   * =====================================================
   */

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedVacancy, setSelectedVacancy] = useState<VacancyType | null>(
    null,
  );

  /*
   * =====================================================
   * SYNC SERVER DATA
   * =====================================================
   *
   * Jika parent/server memberikan data baru,
   * state lokal ikut diperbarui.
   */

  useEffect(() => {
    if (initialVacancies !== undefined) {
      setVacancies(initialVacancies);
      setIsLoading(false);
    }
  }, [initialVacancies]);

  /*
   * =====================================================
   * GET VACANCIES
   * =====================================================
   *
   * Digunakan untuk guest page atau
   * refresh data setelah create/update/delete.
   */

  const fetchVacancies = useCallback(async () => {
    try {
      const response = await fetch("/api/vacancies", {
        method: "GET",
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Gagal mengambil vacancy.");
      }

      const vacancyData: VacancyType[] = Array.isArray(data)
        ? data.map((vacancy) => ({
            id: String(vacancy.id),
            title: vacancy.title ?? "",
            employmentType: vacancy.employmentType ?? "",
            image: vacancy.image ?? "",
            qualifications: Array.isArray(vacancy.qualifications)
              ? vacancy.qualifications
              : [],
          }))
        : [];

      setVacancies(vacancyData);
    } catch (error) {
      console.error("Fetch vacancies error:", error);

      setVacancies([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /*
   * =====================================================
   * INITIAL FETCH
   * =====================================================
   *
   * Kalau initialVacancies belum diberikan,
   * ambil dari API.
   *
   * Kalau initialVacancies sudah diberikan dari
   * CareersEditor, jangan fetch lagi.
   */

  useEffect(() => {
    if (initialVacancies === undefined) {
      fetchVacancies();
    }
  }, [initialVacancies, fetchVacancies]);

  /*
   * =====================================================
   * APPLY
   * =====================================================
   */

  const handleApply = (vacancy: VacancyType) => {
    if (editable) return;

    setSelectedVacancy(vacancy);
    setIsModalOpen(true);
  };

  /*
   * =====================================================
   * EDIT
   * =====================================================
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
   * =====================================================
   * UPDATE LOCAL
   * =====================================================
   *
   * Saat sedang mengetik di editor,
   * card langsung mengikuti perubahan.
   */

  const handleUpdateLocal = (updatedVacancy: VacancyType) => {
    setVacancies((current) =>
      current.map((vacancy) =>
        String(vacancy.id) === String(updatedVacancy.id)
          ? updatedVacancy
          : vacancy,
      ),
    );
  };

  /*
   * =====================================================
   * CREATE DRAFT
   * =====================================================
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
   * =====================================================
   * UPDATE DRAFT
   * =====================================================
   */

  const handleUpdateDraft = (updatedVacancy: VacancyType) => {
    setDraftVacancy(updatedVacancy);
  };

  /*
   * =====================================================
   * CANCEL DRAFT
   * =====================================================
   */

  const handleCancelDraft = () => {
    setDraftVacancy(null);
    setEditingId(null);
  };

  /*
   * =====================================================
   * CREATE SUCCESS
   * =====================================================
   */

  const handleCreateSuccess = async (createdVacancy?: VacancyType) => {
    console.log("Vacancy created:", createdVacancy);

    /*
     * Tutup draft terlebih dahulu.
     */

    setDraftVacancy(null);
    setEditingId(null);

    /*
     * Ambil data terbaru dari API.
     */

    await fetchVacancies();
  };

  /*
   * =====================================================
   * UPDATE SUCCESS
   * =====================================================
   */

  const handleUpdateSuccess = async (updatedVacancy?: VacancyType) => {
    console.log("Vacancy updated:", updatedVacancy);

    setEditingId(null);

    await fetchVacancies();
  };

  /*
   * =====================================================
   * DELETE SUCCESS
   * =====================================================
   */

  const handleDeleteExisting = async () => {
    setEditingId(null);

    await fetchVacancies();
  };

  /*
   * =====================================================
   * RENDER
   * =====================================================
   */

  return (
    <>
      <motion.section
        className="flex min-h-[60vh] flex-col justify-center px-4 pb-16 pt-32 text-center"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <motion.div variants={fadeInUp} className="w-full">
          <h2 className="font-serif text-3xl font-bold text-white">
            Open Recruitment
          </h2>

          {/* 
            Jangan tampilkan text kosong saat loading.
            Header tetap stabil.
          */}

          {!isLoading && (
            <motion.p
              initial={{
                opacity: 0,
                y: -6,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mx-auto mt-2 max-w-xl text-sm text-white/70"
            >
              {vacancies.length > 0 || draftVacancy !== null
                ? "Kami sedang membuka kesempatan untuk bergabung bersama tim kami. Yuk, jadi bagian dari perjalanan kami."
                : "Saat ini belum ada lowongan yang dibuka. Ditunggu saja ya, akan kami umumkan di sini begitu ada kesempatan baru bergabung bersama tim kami."}
            </motion.p>
          )}

          {/* TAMBAH VACANCY */}

          {editable && (
            <button
              type="button"
              onClick={handleCreateVacancy}
              disabled={
                editingId !== null || draftVacancy !== null || isLoading
              }
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus className="h-4 w-4" />
              Tambah Vacancy
            </button>
          )}
        </motion.div>

        {/* =================================================
            VACANCY AREA
        ================================================= */}

        <div className="mx-auto mt-10 min-h-[300px] w-full max-w-5xl">
          <AnimatePresence mode="wait">
            {/* =================================================
                LOADING
            ================================================= */}

            {isLoading ? (
              <motion.div
                key="loading"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="min-h-[300px] w-full"
              />
            ) : vacancies.length > 0 || draftVacancy !== null ? (
              /* =================================================
                 VACANCIES
              ================================================= */

              <motion.div
                key="vacancies"
                initial={{
                  opacity: 0,
                  y: -10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 6,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex w-full flex-wrap justify-center gap-6"
              >
                {/* =================================================
                    EXISTING VACANCIES
                ================================================= */}

                {vacancies.map((vacancy, index) => {
                  const isEditing = editable && editingId === vacancy.id;

                  return (
                    <motion.div
                      key={vacancy.id}
                      id={`vacancy-${vacancy.id}`}
                      initial={{
                        opacity: 0,
                        y: -8,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -4,
                      }}
                      transition={{
                        duration: 0.45,
                        delay: index * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      layout
                      className="relative w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                    >
                      {isEditing ? (
                        <VacancyInlineEditor
                          vacancy={vacancy}
                          isNew={false}
                          onChange={handleUpdateLocal}
                          onCancel={() => setEditingId(null)}
                          onDelete={handleDeleteExisting}
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

                {/* =================================================
                    DRAFT VACANCY
                ================================================= */}

                {editable && draftVacancy !== null && (
                  <motion.div
                    key={draftVacancy.id}
                    id={`vacancy-draft-${draftVacancy.id}`}
                    initial={{
                      opacity: 0,
                      y: -8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -4,
                    }}
                    transition={{
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    layout
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
              /* =================================================
                 EMPTY STATE
              ================================================= */

              <motion.div
                key="empty"
                initial={{
                  opacity: 0,
                  y: -8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mx-auto flex max-w-md flex-col items-center gap-4 rounded border border-dashed border-gray-300 bg-gray-50 px-8 py-16"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-accent"
                  >
                    <rect width="20" height="14" x="2" y="7" rx="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </div>

                <p className="text-sm text-gray-500">
                  Belum ada posisi yang dibuka saat ini. Silakan cek kembali
                  secara berkala, atau follow Instagram kami untuk update
                  terbaru seputar lowongan kerja.
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
          </AnimatePresence>
        </div>
      </motion.section>

      {/* =================================================
          APPLY MODAL
      ================================================= */}

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
