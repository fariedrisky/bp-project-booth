import { prisma } from "@/lib/prisma";
import ImagePreview from "@/components/ui/ImagePreview";
import Link from "next/link";
import { Pencil, Plus, Trash2 } from "lucide-react";

export default async function CareersDashboard() {
  const vacancies = await prisma.vacancy.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Careers</h1>

          <p className="mt-1 text-sm text-gray-500">
            Kelola lowongan pekerjaan yang ditampilkan pada halaman careers.
          </p>
        </div>

        <Link
          href="/dashboard/careers/create"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Tambah Vacancy
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Image
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Title
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Employment Type
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Qualifications
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {vacancies.length > 0 ? (
                vacancies.map((vacancy) => (
                  <tr key={vacancy.id} className="transition hover:bg-gray-50">
                    {/* IMAGE */}
                    <td className="px-6 py-4">
                      {vacancy.image ? (
                        <ImagePreview src={vacancy.image} alt={vacancy.title} />
                      ) : (
                        <div className="flex h-16 w-24 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                          No Image
                        </div>
                      )}
                    </td>

                    {/* TITLE */}
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">
                        {vacancy.title}
                      </div>
                    </td>

                    {/* EMPLOYMENT TYPE */}
                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                        {vacancy.employmentType}
                      </span>
                    </td>

                    {/* QUALIFICATIONS */}
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {vacancy.qualifications.length} kualifikasi
                      </span>
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-4">
                      {vacancy.isActive ? (
                        <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500">
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* ACTION */}
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        {/* EDIT */}
                        <Link
                          href={`/dashboard/careers/${vacancy.id}/edit`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>

                        {/* DELETE */}
                        <Link
                          href={`/dashboard/careers/${vacancy.id}/delete`}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="space-y-2">
                      <p className="font-medium text-gray-900">
                        Belum ada vacancy
                      </p>

                      <p className="text-sm text-gray-500">
                        Tambahkan lowongan pertama kamu.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Total */}
      <div className="text-sm text-gray-500">
        Total {vacancies.length} vacancy
      </div>
    </div>
  );
}
