/*
  Warnings:

  - You are about to alter the column `tag` on the `myprojects` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(200)`.
  - You are about to alter the column `category` on the `myprojects` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(200)`.

*/
-- AlterTable
ALTER TABLE "myprojects" ALTER COLUMN "tag" SET NOT NULL,
ALTER COLUMN "tag" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "category" SET NOT NULL,
ALTER COLUMN "category" SET DATA TYPE VARCHAR(200);
