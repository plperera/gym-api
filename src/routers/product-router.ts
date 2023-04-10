import { signIn, signUp } from '@/controllers/auth-controller'
import { getAllProducts, newProduct } from '@/controllers/product-controller'
import { authenticateToken } from '@/middlewares/authentication-middlerare'
import { Router } from 'express'

const productRouter = Router()

productRouter
    .all("/*", authenticateToken)
    .post("", newProduct)
    .get("/", getAllProducts)

export { productRouter }