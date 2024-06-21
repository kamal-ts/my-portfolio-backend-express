/*
  Warnings:

  - You are about to drop the column `image` on the `myprojects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "myprojects" DROP COLUMN "image";

-- CreateTable
CREATE TABLE "images" (
    "public_id" VARCHAR(100) NOT NULL,
    "secure_url" VARCHAR(100) NOT NULL,
    "format" VARCHAR(5) NOT NULL,
    "display_name" VARCHAR(100) NOT NULL,
    "resource_type" VARCHAR(10) NOT NULL,
    "my_project_id" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "images_public_id_key" ON "images"("public_id");

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_my_project_id_fkey" FOREIGN KEY ("my_project_id") REFERENCES "myprojects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
