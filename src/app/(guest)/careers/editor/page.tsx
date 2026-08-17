import { prisma } from "@/lib/prisma";

import RecruitmentContent from "@/components/pages/guest/03-Careers/sections/01-OpenRecruitment/RecruitmentContent";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CareersEditor() {
  const vacancies = await prisma.vacancy.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log(
    "[CareersEditor] vacancies:",
    vacancies.map((vacancy) => ({
      id: vacancy.id.toString(),
      title: vacancy.title,
      isActive: vacancy.isActive,
    })),
  );

  const vacancyData = vacancies.map((vacancy) => ({
    id: vacancy.id.toString(),
    title: vacancy.title,
    employmentType: vacancy.employmentType,
    image: vacancy.image ?? "",
    qualifications: vacancy.qualifications,
  }));

  return <RecruitmentContent vacancies={vacancyData} editable />;
}
