/*
  Warnings:

  - A unique constraint covering the columns `[title,topic]` on the table `Problem` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Problem_title_gfgUrl_leetcodeUrl_key";

-- CreateIndex
CREATE UNIQUE INDEX "Problem_title_topic_key" ON "Problem"("title", "topic");
