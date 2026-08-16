import { prisma } from "@/lib/prisma";
import RecruitmentContent from "./RecruitmentContent";

export default async function OpenRecruitment() {
  const vacancies = await prisma.vacancy.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const vacancyData = vacancies.map((vacancy) => ({
    id: vacancy.id.toString(),
    title: vacancy.title,
    employmentType: vacancy.employmentType,
    image: vacancy.image ?? "",
    qualifications: vacancy.qualifications,
  }));

  return <RecruitmentContent vacancies={vacancyData} />;
}
