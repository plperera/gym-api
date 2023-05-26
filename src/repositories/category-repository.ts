import { prisma } from "@/config";
import { updateCategoryBody } from "@/schemas/updateCategorySCHEMA";
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
async function find(id: number) {
    return prisma.categorias.findFirst({
        where:{
            id: id
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
async function update({type, id}: updateCategoryBody) {
    return prisma.categorias.update({
        where: {
            id: id,
          },
          data: {
            tipo: type,
          },
    });
}
async function removeProductCategory(id: number) {
    return prisma.categoriasProduto.deleteMany({
        where: {
            id: id,
        }
    });
}
async function deleteCategory(id: number) {
    return prisma.categorias.delete({
        where: {
            id: id,
        }
    });
}

const categoryRepository = {
    findByType,
    find,
    create,
    update,
    findAllValid,
    deleteByType,
    changeActiveStatusByType,
    removeProductCategory,
    deleteCategory
}

export default categoryRepository