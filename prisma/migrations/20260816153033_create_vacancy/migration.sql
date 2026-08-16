/*
  Warnings:

  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hero` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HomeImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HomeSection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PhotoboxSection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Service` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Client";

-- DropTable
DROP TABLE "Hero";

-- DropTable
DROP TABLE "HomeImage";

-- DropTable
DROP TABLE "HomeSection";

-- DropTable
DROP TABLE "PhotoboxSection";

-- DropTable
DROP TABLE "Service";

-- CreateTable
CREATE TABLE "Vacancy" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "employmentType" TEXT NOT NULL,
    "image" TEXT,
    "qualifications" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vacancy_pkey" PRIMARY KEY ("id")
);
