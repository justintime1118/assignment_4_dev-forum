/*
  Warnings:

  - You are about to drop the column `name` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Forums` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `encryptedPassword` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comments" ALTER COLUMN "content" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Forums" ALTER COLUMN "name" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Posts" ALTER COLUMN "title" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "name",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "encryptedPassword" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Forums_name_key" ON "Forums"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
