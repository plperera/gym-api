import { Request, Response } from "express";
import httpStatus from "http-status";
import bcrypt from 'bcrypt';
import { newCategoryBody, newCategorySCHEMA } from "@/schemas/newCategorySCHEMA";
import categoryService from "@/services/category-service";
import { updateCategoryBody, updateCategorySCHEMA } from "@/schemas/updateCategorySCHEMA";
import { categorias } from "@prisma/client";
import { deleteCategoryBody, deleteCategorySCHEMA } from "@/schemas/deleteCategorySCHEMA";

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

        return res.status(httpStatus.OK).send(allCategories)

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
export async function deleteCategory(req: Request, res: Response){

    try { 

        const isValid = deleteCategorySCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }
        
        const { id }: deleteCategoryBody = req.body

        const verifyCategory = await categoryService.verifyById(id)

        if(!verifyCategory){
            res.sendStatus(httpStatus.NOT_FOUND)
        } 

        await categoryService.deleteCategory(id)

        return res.sendStatus(httpStatus.OK)
        

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
export async function updateCategory(req: Request, res: Response){
    try { 

        const isValid = updateCategorySCHEMA.validate(req.body, {abortEarly: false})

        if(isValid.error){
            return res.sendStatus(httpStatus.BAD_REQUEST)
        }
        
        const { type, id }: updateCategoryBody = req.body

        const hasCategory = await categoryService.verify(type)

        if (hasCategory) {
            res.sendStatus(httpStatus.FORBIDDEN)
        }

        const result = await categoryService.updateCategory({ type, id })

        res.status(httpStatus.OK).send(result)

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


