/*
  Warnings:

  - The `image` column on the `myprojects` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "myprojects" DROP COLUMN "image",
ADD COLUMN     "image" VARCHAR(100)[];
