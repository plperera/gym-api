import { updateCategory, deleteCategory, getAllCategory, newCategory } from '@/controllers/category-controller'
import { authenticateToken } from '@/middlewares/authentication-middlerare'
import { Router } from 'express'

const categoryRouter = Router()

categoryRouter
    .get("", getAllCategory)
    
    .all("/*", authenticateToken)
    .post("", newCategory)
    .put("", updateCategory)
    .delete("", deleteCategory)

export { categoryRouter }