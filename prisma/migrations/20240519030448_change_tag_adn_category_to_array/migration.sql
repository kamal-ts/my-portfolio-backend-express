/*
  Warnings:

  - You are about to drop the column `username` on the `blogs` table. All the data in the column will be lost.
  - The `tag` column on the `blogs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `category` column on the `blogs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `username` on the `myprojects` table. All the data in the column will be lost.
  - The `tag` column on the `myprojects` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `category` column on the `myprojects` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `author` to the `blogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author` to the `myprojects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "blogs" DROP CONSTRAINT "blogs_username_fkey";

-- DropForeignKey
ALTER TABLE "myprojects" DROP CONSTRAINT "myprojects_username_fkey";

-- AlterTable
ALTER TABLE "blogs" DROP COLUMN "username",
ADD COLUMN     "author" TEXT NOT NULL,
DROP COLUMN "tag",
ADD COLUMN     "tag" TEXT[],
DROP COLUMN "category",
ADD COLUMN     "category" VARCHAR(100)[];

-- AlterTable
ALTER TABLE "myprojects" DROP COLUMN "username",
ADD COLUMN     "author" TEXT NOT NULL,
DROP COLUMN "tag",
ADD COLUMN     "tag" TEXT[],
DROP COLUMN "category",
ADD COLUMN     "category" VARCHAR(100)[],
ALTER COLUMN "link_web" DROP NOT NULL,
ALTER COLUMN "image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "token" DROP NOT NULL,
ALTER COLUMN "token" SET DEFAULT 'Unknown';

-- AddForeignKey
ALTER TABLE "myprojects" ADD CONSTRAINT "myprojects_author_fkey" FOREIGN KEY ("author") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_author_fkey" FOREIGN KEY ("author") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
