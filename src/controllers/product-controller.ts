import { Response, Request } from "express";
import httpStatus from "http-status";
import categoryService from "@/services/category-service";
import { newProductBody, newProductSCHEMA } from "@/schemas/newProductSCHEMA";
import productService from "@/services/product-service";
import { AuthenticatedRequest } from "@/middlewares/authentication-middlerare";
import { deleteProductBody, deleteProductSCHEMA } from "@/schemas/deleteProductSCHEMA";
import { putProductBody, putProductSCHEMA } from "@/schemas/putProduct";

export async function newProduct(req: AuthenticatedRequest, res: Response){
    try {
        
        const isValid = newProductSCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const { nome, categorias }: newProductBody = req.body
        const { userId } = req
        
        const verifyName = await productService.verifyName(nome)

        console.log(verifyName)

        if(verifyName){
            return res.sendStatus(httpStatus.CONFLICT)
        }

        categorias.map(async (e) => {

            const categoryVerify = await categoryService.verify(e.tipo)

            if (!categoryVerify) {
                res.sendStatus(httpStatus.BAD_REQUEST)
            }

        })

        const newProduct = await productService.create({body: req.body, userId})

        if(newProduct) {
            res.status(httpStatus.CREATED).send(newProduct)
        } else {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(newProduct)
        }
        

    } catch (error) {
        if(error.name === "ConflictError") {
            res.sendStatus(httpStatus.CONFLICT);
          }
          if (error.name === "NotFoundError") {
            return res.status(httpStatus.NOT_FOUND).send(error);
          }
          if (error.name === "ForbiddenError") {
            return res.status(httpStatus.FORBIDDEN).send(error);
          }
          console.log(error)
          return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function getAllProducts(req: AuthenticatedRequest, res: Response){
    try {
        
        const getAllProducts = await productService.getAllProducts()

        res.status(httpStatus.CREATED).send(getAllProducts)
     

    } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function putProduct(req: Request, res: Response){
    try { 

        const isValid = putProductSCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const product = await productService.putProduct(req.body)

        return res.sendStatus(httpStatus.OK)

    } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
export async function getProductById(req: Request, res: Response){
    try { 
        const { productId } = req.params

        if (typeof Number(productId) !== "number"){
            res.sendStatus(httpStatus.BAD_REQUEST)
        }

        const result = await productService.getProductById(Number(productId))

        return res.status(httpStatus.OK).send(result)

    } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export async function deleteProductById(req: Request, res: Response){
    try { 
        const { id } = req.body

        const result = await productService.deleteProduct(Number(id))

        return res.status(httpStatus.OK).send(result)

    } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}
