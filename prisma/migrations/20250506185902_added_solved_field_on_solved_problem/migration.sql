/*
  Warnings:

  - Added the required column `solved` to the `SolvedProblem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SolvedProblem" ADD COLUMN     "solved" BOOLEAN NOT NULL;
