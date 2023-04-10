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


const productRepository = {
    findByName,
    create,
    createProductCategory
}

export default productRepository