/*
  Warnings:

  - You are about to drop the column `produtoid` on the `imagensProduto` table. All the data in the column will be lost.
  - Added the required column `produtoId` to the `imagensProduto` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "imagensProduto" DROP CONSTRAINT "imagensProduto_produtoid_fkey";

-- AlterTable
ALTER TABLE "imagensProduto" DROP COLUMN "produtoid",
ADD COLUMN     "produtoId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "imagensProduto" ADD CONSTRAINT "imagensProduto_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
