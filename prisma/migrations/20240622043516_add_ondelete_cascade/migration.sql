-- DropForeignKey
ALTER TABLE "images" DROP CONSTRAINT "images_my_project_id_fkey";

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_my_project_id_fkey" FOREIGN KEY ("my_project_id") REFERENCES "myprojects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
