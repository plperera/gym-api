-- CreateTable
CREATE TABLE "sessions" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,
    "isactived" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" SERIAL NOT NULL,
    "tipo" VARCHAR(255) NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,
    "isactived" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categoriasProduto" (
    "id" SERIAL NOT NULL,
    "produtoid" INTEGER NOT NULL,
    "categoriaid" INTEGER NOT NULL,

    CONSTRAINT "categoriasProduto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "imagensProduto" (
    "id" SERIAL NOT NULL,
    "produtoid" INTEGER NOT NULL,
    "imageurl" VARCHAR(255) NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,
    "isactived" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "imagensProduto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produtos" (
    "id" SERIAL NOT NULL,
    "createdbyuserid" INTEGER NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "rate" INTEGER NOT NULL,
    "descricao" TEXT,
    "largura" INTEGER NOT NULL,
    "altura" INTEGER NOT NULL,
    "comprimento" INTEGER NOT NULL,
    "peso" INTEGER NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(3) NOT NULL,
    "isactived" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sessions_token_key" ON "sessions"("token");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "categorias_tipo_key" ON "categorias"("tipo");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "categoriasProduto" ADD CONSTRAINT "categoriasProduto_categoriaid_fkey" FOREIGN KEY ("categoriaid") REFERENCES "categorias"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "categoriasProduto" ADD CONSTRAINT "categoriasProduto_produtoid_fkey" FOREIGN KEY ("produtoid") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "imagensProduto" ADD CONSTRAINT "imagensProduto_produtoid_fkey" FOREIGN KEY ("produtoid") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_createdbyuserid_fkey" FOREIGN KEY ("createdbyuserid") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
