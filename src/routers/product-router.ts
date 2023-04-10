import { signIn, signUp } from '@/controllers/auth-controller'
import { authenticateToken } from '@/middlewares/authentication-middlerare'
import { Router } from 'express'

const authRouter = Router()

authRouter
    .all("/*", authenticateToken)
    .post("", signUp)
    .delete("/", signIn)

export { authRouter }