/*
  Warnings:

  - You are about to drop the column `createdat` on the `categorias` table. All the data in the column will be lost.
  - You are about to drop the column `isactived` on the `categorias` table. All the data in the column will be lost.
  - You are about to drop the column `updatedat` on the `categorias` table. All the data in the column will be lost.
  - You are about to drop the column `categoriaid` on the `categoriasProduto` table. All the data in the column will be lost.
  - You are about to drop the column `produtoid` on the `categoriasProduto` table. All the data in the column will be lost.
  - You are about to drop the column `createdat` on the `imagensProduto` table. All the data in the column will be lost.
  - You are about to drop the column `imageurl` on the `imagensProduto` table. All the data in the column will be lost.
  - You are about to drop the column `isactived` on the `imagensProduto` table. All the data in the column will be lost.
  - You are about to drop the column `updatedat` on the `imagensProduto` table. All the data in the column will be lost.
  - You are about to drop the column `createdat` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `createdbyuserid` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `isactived` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `updatedat` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `userid` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `createdat` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `isactived` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedat` on the `users` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `categorias` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoriaId` to the `categoriasProduto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `produtoId` to the `categoriasProduto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `imagensProduto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `imagensProduto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdByUserid` to the `produtos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `produtos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "categoriasProduto" DROP CONSTRAINT "categoriasProduto_categoriaid_fkey";

-- DropForeignKey
ALTER TABLE "categoriasProduto" DROP CONSTRAINT "categoriasProduto_produtoid_fkey";

-- DropForeignKey
ALTER TABLE "produtos" DROP CONSTRAINT "produtos_createdbyuserid_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_userid_fkey";

-- AlterTable
ALTER TABLE "categorias" DROP COLUMN "createdat",
DROP COLUMN "isactived",
DROP COLUMN "updatedat",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isActived" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "categoriasProduto" DROP COLUMN "categoriaid",
DROP COLUMN "produtoid",
ADD COLUMN     "categoriaId" INTEGER NOT NULL,
ADD COLUMN     "produtoId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "imagensProduto" DROP COLUMN "createdat",
DROP COLUMN "imageurl",
DROP COLUMN "isactived",
DROP COLUMN "updatedat",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "imageUrl" VARCHAR(255) NOT NULL,
ADD COLUMN     "isActived" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "createdat",
DROP COLUMN "createdbyuserid",
DROP COLUMN "isactived",
DROP COLUMN "updatedat",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdByUserid" INTEGER NOT NULL,
ADD COLUMN     "isActived" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "userid",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdat",
DROP COLUMN "isactived",
DROP COLUMN "updatedat",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isActived" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "categoriasProduto" ADD CONSTRAINT "categoriasProduto_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "categoriasProduto" ADD CONSTRAINT "categoriasProduto_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_createdByUserid_fkey" FOREIGN KEY ("createdByUserid") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
