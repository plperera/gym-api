import { conflictError, requestError, unauthorizedError } from "@/errors"
import authRepository from "@/repositories/auth-repository"
import userRepository from "@/repositories/user-respository"
import httpStatus from "http-status"
import { newCategoryBody } from "@/schemas/newCategorySCHEMA"
import categoryRepository from "@/repositories/category-repository"
import { categorias } from "@prisma/client"
import productRepository from "@/repositories/product-repository"
import { newProductBody } from "@/schemas/newProductSCHEMA"


async function verifyName(name: string){
    try {
        const hasProduct = await productRepository.findByName(name)
        return hasProduct
    } catch (error) {
        return error
    }
}
async function create({body , userId }: {body: newProductBody, userId: number}){
    
    const { categorias, imagens } = body

    if (categorias.length === 0 || imagens.length === 0){
        return undefined
    }

    const newProduct = await productRepository.create({ body , userId: 2})

    categorias.map( async (e) => {
        const response = await productRepository.createProductCategory({ productId: newProduct.id, categoryId: e.id})
        console.log(response)
    })
    
    imagens.map( async (e) => {
        const response = await productRepository.createProductImage({imageName: e.nome, productId: newProduct.id})
        console.log(response)
    })
    
    return newProduct
    
}
async function getAllProducts(){
    const allProducts = await productRepository.findAll()
    return allProducts
}
async function changeProductStatus(body:{ id: number, nome: string, newStatus: boolean }){
    try {
        const putResponse = await productRepository.changeActiveStatus(body)
        return putResponse
    } catch (error) {
        return error
    }

}
const productService = {
    verifyName,
    create,
    getAllProducts,
    changeProductStatus
}

export default productService