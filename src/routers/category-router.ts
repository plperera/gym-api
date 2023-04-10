import { getAllCategory, newCategory } from '@/controllers/category-controller'
import { authenticateToken } from '@/middlewares/authentication-middlerare'
import { Router } from 'express'

const categoryRouter = Router()

categoryRouter
    .all("/*", authenticateToken)
    .get("", getAllCategory)
    .post("", newCategory)
    .delete("", )

export { categoryRouter }