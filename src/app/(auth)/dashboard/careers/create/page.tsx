import Link from "next/link";
import CreateVacancyForm from "./CreateVacancyForm";

export default function CreateVacancyPage() {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Create Vacancy</h1>
          <p className="mt-1 text-sm text-gray-500">
            Tambahkan lowongan pekerjaan baru.
          </p>
        </div>

        <Link
          href="/dashboard/careers"
          className="rounded-md border px-4 py-2 text-sm transition hover:bg-gray-50"
        >
          Kembali
        </Link>
      </div>

      <CreateVacancyForm />
    </div>
  );
}
