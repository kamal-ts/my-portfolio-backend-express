/*
  Warnings:

  - You are about to alter the column `link_web` on the `myprojects` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `link_git` on the `myprojects` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `image` on the `myprojects` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `author` on the `myprojects` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `tag` on the `myprojects` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.

*/
-- DropForeignKey
ALTER TABLE "myprojects" DROP CONSTRAINT "myprojects_author_fkey";

-- AlterTable
ALTER TABLE "myprojects" ALTER COLUMN "link_web" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "link_git" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "image" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "author" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "tag" SET DATA TYPE VARCHAR(100)[];

-- AddForeignKey
ALTER TABLE "myprojects" ADD CONSTRAINT "myprojects_author_fkey" FOREIGN KEY ("author") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
