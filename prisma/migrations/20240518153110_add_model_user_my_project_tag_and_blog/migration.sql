-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "name" VARCHAR NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "token" VARCHAR(100) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "myprojects" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tag" TEXT NOT NULL,
    "category" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "link_web" VARCHAR(255) NOT NULL,
    "link_git" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "myprojects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "title" VARCHAR(100) NOT NULL,
    "color_body" VARCHAR(100) NOT NULL,
    "color_text" VARCHAR NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("title")
);

-- CreateTable
CREATE TABLE "blogs" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "category" VARCHAR(100) NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "myprojects" ADD CONSTRAINT "myprojects_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_username_fkey" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
