"use client";

import { useTransition } from "react";
import { deleteVacancy } from "@/actions/vacancy";

type Props = {
  id: number;
};

export default function DeleteVacancyButton({ id }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    const confirmed = window.confirm("Yakin ingin menghapus vacancy ini?");

    if (!confirmed) return;

    startTransition(async () => {
      try {
        await deleteVacancy(id);
      } catch (error) {
        console.error(error);
        alert("Gagal menghapus vacancy.");
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="rounded-md border border-red-200 px-3 py-2 text-sm text-red-500 hover:bg-red-50 disabled:opacity-50"
    >
      {isPending ? "Menghapus..." : "Delete"}
    </button>
  );
}
