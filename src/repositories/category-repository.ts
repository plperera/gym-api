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
async function deleteByType(type: string) {
    return prisma.categorias.delete({
        where:{
            tipo: type
        }
    });
}
async function changeActiveStatusByType({type, newStatus}:{type: string, newStatus: boolean}) {
    return prisma.categorias.update({
        where: {
            tipo: type,
          },
          data: {
            isActived: newStatus,
          },
    });
}

const categoryRepository = {
    findByType,
    create,
    findAllValid,
    deleteByType,
    changeActiveStatusByType
}

export default categoryRepository