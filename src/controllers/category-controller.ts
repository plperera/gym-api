import { Request, Response } from "express";
import httpStatus from "http-status";
import bcrypt from 'bcrypt';
import { newCategoryBody, newCategorySCHEMA } from "@/schemas/newCategorySCHEMA";
import categoryService from "@/services/category-service";

export async function newCategory(req: Request, res: Response){

    try {
        
        const isValid = newCategorySCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }
        
        const { type }: newCategoryBody = req.body
        
        const verifyCategory = await categoryService.verify(type)

        if(verifyCategory){
            res.sendStatus(httpStatus.CONFLICT)
        } else {
            const newCategory = await categoryService.create(type)

            return res.status(httpStatus.CREATED).send(newCategory)
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
          return res.sendStatus(httpStatus.NOT_FOUND);
    }
}
export async function getAllCategory(req: Request, res: Response){

    try {        
        const allCategories = await categoryService.getAllValidCategories()

        return res.status(httpStatus.CREATED).send(allCategories)

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
          return res.sendStatus(httpStatus.NOT_FOUND);
    }
}


