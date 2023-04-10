/*
  Warnings:

  - You are about to drop the column `createdAt` on the `imagensProduto` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `imagensProduto` table. All the data in the column will be lost.
  - You are about to drop the column `isActived` on the `imagensProduto` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `imagensProduto` table. All the data in the column will be lost.
  - Added the required column `imageRef` to the `imagensProduto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "imagensProduto" DROP COLUMN "createdAt",
DROP COLUMN "imageUrl",
DROP COLUMN "isActived",
DROP COLUMN "updatedAt",
ADD COLUMN     "imageRef" TEXT NOT NULL;
