"use client";

import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Pencil, Plus } from "lucide-react";

import ApplyModal from "@/components/ui/ApplyModal";
import VacancyCard, { VacancyType } from "@/components/ui/VacancyCard";

import VacancyInlineEditor from "./VacancyInlineEditor";

type RecruitmentContentProps = {
  editable?: boolean;
};

export default function RecruitmentContent({
  editable = false,
}: RecruitmentContentProps) {
  /*
   * =====================================================
   * VACANCIES
   * =====================================================
   */
  const [vacancies, setVacancies] = useState<VacancyType[]>([]);

  /*
   * =====================================================
   * INITIAL LOADING
   * =====================================================
   *
   * Loading hanya digunakan saat pertama kali
   * mengambil data vacancy.
   *
   * Setelah CREATE / UPDATE / DELETE,
   * loading tidak akan muncul lagi.
   */
  const [isLoading, setIsLoading] = useState(true);

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
   * FETCH VACANCIES
   * =====================================================
   *
   * initial = true
   * → tampilkan loading.
   *
   * initial = false
   * → fetch di background tanpa mengubah loading.
   */
  const fetchVacancies = useCallback(async (initial = false) => {
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

      /*
       * Hanya kosongkan state ketika
       * initial fetch gagal.
       *
       * Kalau background refresh gagal,
       * data yang sedang tampil tetap dipertahankan.
       */
      if (initial) {
        setVacancies([]);
      }
    } finally {
      if (initial) {
        setIsLoading(false);
      }
    }
  }, []);

  /*
   * =====================================================
   * INITIAL FETCH
   * =====================================================
   */
  useEffect(() => {
    fetchVacancies(true);
  }, [fetchVacancies]);

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

    if (editingId !== null) return;

    if (draftVacancy !== null) return;

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
   * Ketika user sedang mengetik,
   * card/editor langsung mengikuti state.
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
   *
   * Card langsung dimasukkan ke state.
   *
   * Tidak perlu menunggu GET selesai.
   */
  const handleCreateSuccess = async (createdVacancy: VacancyType) => {
    /*
     * Tambahkan vacancy baru langsung ke UI.
     */
    setVacancies((current) => {
      const exists = current.some(
        (item) => String(item.id) === String(createdVacancy.id),
      );

      if (exists) {
        return current.map((item) =>
          String(item.id) === String(createdVacancy.id) ? createdVacancy : item,
        );
      }

      return [...current, createdVacancy];
    });

    /*
     * Tutup editor.
     */
    setDraftVacancy(null);
    setEditingId(null);

    /*
     * Sinkronisasi dengan API.
     *
     * Tidak mengaktifkan loading.
     */
    await fetchVacancies(false);
  };

  /*
   * =====================================================
   * UPDATE SUCCESS
   * =====================================================
   */
  const handleUpdateSuccess = async (updatedVacancy: VacancyType) => {
    /*
     * Update UI langsung.
     */
    setVacancies((current) =>
      current.map((item) =>
        String(item.id) === String(updatedVacancy.id) ? updatedVacancy : item,
      ),
    );

    /*
     * Tutup editor.
     */
    setEditingId(null);

    /*
     * Sinkronisasi background.
     */
    await fetchVacancies(false);
  };

  /*
   * =====================================================
   * DELETE SUCCESS
   * =====================================================
   */
  const handleDeleteExisting = async (vacancyId?: string) => {
    /*
     * Hapus langsung dari UI.
     */
    if (vacancyId) {
      setVacancies((current) =>
        current.filter((item) => String(item.id) !== String(vacancyId)),
      );
    }

    setEditingId(null);

    /*
     * Sinkronisasi background.
     */
    await fetchVacancies(false);
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
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: -4,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full"
        >
          <h2 className="font-serif text-3xl font-bold text-white">
            Open Recruitment
          </h2>

          {/*
           * Jangan tampilkan text ketika loading.
           */}
          {!isLoading && (
            <motion.p
              initial={{
                opacity: 0,
                y: -4,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.45,
                delay: 0.05,
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
            <motion.div
              initial={{
                opacity: 0,
                y: -3,
              }}
              animate={{
                opacity: isLoading ? 0 : 1,
                y: isLoading ? -3 : 0,
              }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
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
            </motion.div>
          )}
        </motion.div>

        {/* =================================================
            VACANCY AREA
        ================================================= */}

        <div className="mx-auto mt-10 min-h-[300px] w-full max-w-5xl">
          <AnimatePresence initial={false}>
            {isLoading ? (
              /*
               * =================================================
               * LOADING
               * =================================================
               *
               * Sengaja kosong.
               * Tidak ada text.
               * Tidak ada spinner.
               */
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
                  duration: 0.4,
                  ease: "easeOut",
                }}
                className="min-h-[300px] w-full"
              />
            ) : vacancies.length > 0 || draftVacancy !== null ? (
              /*
               * =================================================
               * VACANCIES
               * =================================================
               */
              <motion.div
                key="vacancies"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
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
                      layout
                      initial={{
                        opacity: 0,
                        y: -6,
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
                        layout: {
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1],
                        },
                        opacity: {
                          duration: 0.5,
                          ease: "easeOut",
                        },
                        y: {
                          duration: 0.55,
                          ease: [0.22, 1, 0.36, 1],
                        },
                        delay: index * 0.045,
                      }}
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

                {/* =================================================
                    DRAFT VACANCY
                ================================================= */}

                {editable && draftVacancy !== null && (
                  <motion.div
                    key={draftVacancy.id}
                    id={`vacancy-draft-${draftVacancy.id}`}
                    layout
                    initial={{
                      opacity: 0,
                      y: -6,
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
                      layout: {
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      },
                      opacity: {
                        duration: 0.5,
                        ease: "easeOut",
                      },
                      y: {
                        duration: 0.55,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }}
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
              /*
               * =================================================
               * EMPTY STATE
               * =================================================
               */

              <motion.div
                key="empty"
                initial={{
                  opacity: 0,
                  y: -6,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mx-auto flex max-w-md flex-col items-center gap-4 rounded border border-dashed border-gray-300 bg-gray-50 px-8 py-16"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                  <Briefcase className="h-6 w-6 text-accent" />
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
