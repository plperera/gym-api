import { Response } from "express";
import httpStatus from "http-status";
import categoryService from "@/services/category-service";
import { newProductBody, newProductSCHEMA } from "@/schemas/newProductSCHEMA";
import productService from "@/services/product-service";
import { AuthenticatedRequest } from "@/middlewares/authentication-middlerare";

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


