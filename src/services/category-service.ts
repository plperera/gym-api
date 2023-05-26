import { conflictError, notFoundError, requestError, unauthorizedError } from "@/errors"
import authRepository from "@/repositories/auth-repository"
import userRepository from "@/repositories/user-respository"
import httpStatus from "http-status"
import { newCategoryBody } from "@/schemas/newCategorySCHEMA"
import categoryRepository from "@/repositories/category-repository"
import { categorias } from "@prisma/client"
import { updateCategoryBody } from "@/schemas/updateCategorySCHEMA"


async function verify(type: string){
    try {
        const hasCategory = await categoryRepository.findByType(type)

        return hasCategory

    } catch (error) {
        return error
    }

}
async function verifyById(id: number){
    try {
        const hasCategory = await categoryRepository.find(id)

        return hasCategory

    } catch (error) {
        return error
    }

}
async function create(type: string){
    try {

        const newCategory = await categoryRepository.create(type)
        return newCategory

    } catch (error) {
        return error
    }

}
async function getAllValidCategories(){
    try {

        const allCategories = await categoryRepository.findAllValid()
        return allCategories

    } catch (error) {
        return error
    }

}
async function deleteCategory(id: number){
    try {

        await categoryRepository.removeProductCategory(id)
        await categoryRepository.deleteCategory(id)
        return 

    } catch (error) {
        return error
    }

}
async function changeActiveStatusByType({type, newStatus}:{type: string, newStatus: boolean}){
    try {

        const putResponse = await categoryRepository.changeActiveStatusByType({type, newStatus})
        return putResponse

    } catch (error) {
        return error
    }

}
async function updateCategory({ type, id }: updateCategoryBody){
    try {

        const hasCategory = await categoryRepository.find(id)

        if(!hasCategory) {
            throw notFoundError()
        }

        const result = await categoryRepository.update({ type, id })

        return result

    } catch (error) {
        return error
    }

}
const categoryService = {
    verify,
    create,
    deleteCategory,
    getAllValidCategories,
    changeActiveStatusByType,
    updateCategory,
    verifyById
}

export default categoryService