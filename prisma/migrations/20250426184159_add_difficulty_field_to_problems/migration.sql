/*
  Warnings:

  - Added the required column `difficulty` to the `Problem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "difficulty" TEXT NOT NULL;
