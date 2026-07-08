/*
  Warnings:

  - You are about to drop the column `type` on the `GalleryItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GalleryItem" DROP COLUMN "type",
ADD COLUMN     "descriptin" TEXT;

-- DropEnum
DROP TYPE "GalleryType";
