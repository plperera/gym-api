import { prisma } from "@/config";
import { newCategoryBody } from "@/schemas/newCategorySCHEMA";
import { newProductBody } from "@/schemas/newProductSCHEMA";

async function findByName(name: string) {
    return prisma.produtos.findFirst({
        where:{
            nome: name
        }
    });
}
async function create({body, userId}:{body: newProductBody, userId: number}) {
    return prisma.produtos.create({
        data: {
            createdByUserid: userId,
            nome: body.nome,
            rate: Number(body.rate),
            descricao: (body.descricao),
            largura: Number(body.largura),
            altura: Number(body.altura),
            comprimento: Number(body.comprimento),
            peso: Number(body.peso)
          },
    });
}
async function createProductCategory({ productId, categoryId }: { productId: number, categoryId: number }) {
    return prisma.categoriasProduto.create({
        data: {
            produtoId: productId,
            categoriaId: categoryId
        },
    });
}
async function createProductImage({imageName, productId}: {imageName: string, productId: number}) {
    return prisma.imagensProduto.create({
        data: {
            produtoId: productId,
            imageRef: imageName
        },
    });
}
async function findAll() {
    return prisma.produtos.findMany({
        include: {
            categoriasProduto: {
              include: {
                categorias: true,
              },
            },
            imagensProduto: true,
        },
        where: {
            isActived: true
        }
    });
}
async function findById(productId: number) {
    return prisma.produtos.findFirst({
        include: {
            categoriasProduto: {
              include: {
                categorias: true,
              },
            },
            imagensProduto: true,
        },
        where: {
            id: productId
        }
    });
}
async function changeActiveStatus(body:{ id: number, nome: string, newStatus: boolean }) {
    return prisma.produtos.updateMany({
        where: {
          AND: [
            {
              id: body.id,
            },
            {
              nome: body.nome,
            },
          ],
        },
        data: {
          isActived: body.newStatus,
        },
    });
}


const productRepository = {
    findByName,
    create,
    createProductCategory,
    createProductImage,
    findAll,
    changeActiveStatus,
    findById
}

export default productRepository