"use client";

import { toggleVacancy } from "./action";

export default function ToggleVacancyButton({
  id,
  isActive,
}: {
  id: number;
  isActive: boolean;
}) {
  async function handleToggle() {
    const formData = new FormData();

    formData.append("id", id.toString());

    await toggleVacancy(formData);
  }

  return (
    <form action={handleToggle}>
      <button
        type="submit"
        className={
          isActive ? "text-sm text-green-600" : "text-sm text-gray-400"
        }
      >
        {isActive ? "Aktif" : "Nonaktif"}
      </button>
    </form>
  );
}
