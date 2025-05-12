/*
  Warnings:

  - A unique constraint covering the columns `[title,gfgUrl,leetcodeUrl]` on the table `Problem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `topic` to the `Problem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Problem" ADD COLUMN     "topic" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Problem_title_gfgUrl_leetcodeUrl_key" ON "Problem"("title", "gfgUrl", "leetcodeUrl");
