import { conflictError, requestError, unauthorizedError } from "@/errors"
import authRepository from "@/repositories/auth-repository"
import userRepository from "@/repositories/user-respository"
import httpStatus from "http-status"
import { newCategoryBody } from "@/schemas/newCategorySCHEMA"
import categoryRepository from "@/repositories/category-repository"
import { categorias } from "@prisma/client"


async function verify(type: string){
    try {
        const hasCategory = await categoryRepository.findByType(type)

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
async function deleteByType(type: string){
    try {

        const deleteResponse = await categoryRepository.deleteByType(type)
        return deleteResponse

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
const categoryService = {
    verify,
    create,
    getAllValidCategories,
    deleteByType,
    changeActiveStatusByType
}

export default categoryService