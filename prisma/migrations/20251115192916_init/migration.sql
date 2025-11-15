/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "TaskType" ADD VALUE 'TWITTER';
ALTER TYPE "TaskType" ADD VALUE 'DISCORD';
ALTER TYPE "TaskType" ADD VALUE 'CUSTOM';

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "joinUrl" TEXT,
ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Task_slug_key" ON "Task"("slug");
