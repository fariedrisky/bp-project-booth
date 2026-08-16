import Link from "next/link";
import { notFound } from "next/navigation";
import { PrismaClient } from "@/generated/prisma/client";
import EditVacancyForm from "./EditVacancyForm";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditVacancyPage({ params }: Props) {
  const { id } = await params;

  const vacancy = await prisma.vacancy.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!vacancy) {
    notFound();
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Edit Vacancy</h1>
          <p className="mt-1 text-sm text-gray-500">
            Ubah informasi lowongan pekerjaan.
          </p>
        </div>

        <Link
          href="/dashboard/careers"
          className="rounded-md border px-4 py-2 text-sm hover:bg-gray-50"
        >
          Kembali
        </Link>
      </div>

      <EditVacancyForm vacancy={vacancy} />
    </div>
  );
}
