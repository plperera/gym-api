import { conflictError, notFoundError, requestError, unauthorizedError } from "@/errors"
import authRepository from "@/repositories/auth-repository"
import userRepository from "@/repositories/user-respository"
import httpStatus, { BAD_REQUEST } from "http-status"
import { newCategoryBody } from "@/schemas/newCategorySCHEMA"
import categoryRepository from "@/repositories/category-repository"
import { categorias } from "@prisma/client"
import productRepository from "@/repositories/product-repository"
import { newProductBody } from "@/schemas/newProductSCHEMA"
import { putProductBody } from "@/schemas/putProduct"


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

    const newProduct = await productRepository.create({ body , userId })

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
async function getProductById(productId: number){
    const allProducts = await productRepository.findById(productId)
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
async function putProduct(body: putProductBody){
    const newImages: string[] = []
    body.imagens.forEach(e => {
        if (e?.nome !== undefined){
            newImages.push(e.nome)
        }
    })

    const hasProduct = await productRepository.findById(body.id)

    if (!hasProduct) {
        throw notFoundError()
    }

    const { imagens, id } = body

    await productRepository.deleteProductImage(id)

    if (newImages.length > 0){

        newImages.map( async (e) => {
            const response = await productRepository.createProductImage({imageName: e, productId: id})
            console.log(response)
        })

    }

    const newProduct = await productRepository.putProduct(body)
    return newProduct
        
}
async function deleteProduct(productId: number){
    try {

        const hasProduct = await productRepository.findById(productId)

        if (!hasProduct) {
            throw notFoundError()
        }
        const result = await productRepository.deleteProduct(productId)
        return result
        
        
    } catch (error) {
        return error
    }
}
const productService = {
    verifyName,
    create,
    getAllProducts,
    changeProductStatus,
    getProductById,
    putProduct,
    deleteProduct
}

export default productService