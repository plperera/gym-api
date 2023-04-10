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
    
    const newProduct = await productRepository.create({ body , userId: 2})

    const { categorias } = body

    categorias.map( async (e) => {
        await productRepository.createProductCategory({ productId: newProduct.id, categoryId: e.id})
    })

    return newProduct
    
}
const productService = {
    verifyName,
    create
}

export default productService