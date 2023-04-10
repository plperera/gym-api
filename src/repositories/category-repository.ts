import { prisma } from "@/config";
import { newCategoryBody } from "@/schemas/newCategorySCHEMA";

async function findByType(type: string) {
    return prisma.categorias.findFirst({
        where:{
            tipo: type
        }
    });
}
async function create(type: string) {
    return prisma.categorias.create({
        data: {
            tipo: type
        }
    });
}
async function findAllValid() {
    return prisma.categorias.findMany({
        where:{
            isActived: true
        }
    });
}

const categoryRepository = {
    findByType,
    create,
    findAllValid
}

export default categoryRepository