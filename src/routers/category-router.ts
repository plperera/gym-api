import { updateCategory, deleteCategory, getAllCategory, newCategory, getCategoryById } from '@/controllers/category-controller'
import { authenticateToken } from '@/middlewares/authentication-middlerare'
import { Router } from 'express'

const categoryRouter = Router()

categoryRouter
    .get("", getAllCategory)
    .get("/:categoryId", getCategoryById)
    
    .all("/*", authenticateToken)
    .post("", newCategory)
    .put("", updateCategory)
    .delete("", deleteCategory)

export { categoryRouter }