import { signIn, signUp } from '@/controllers/auth-controller'
import { Router } from 'express'

const authRouter = Router()

authRouter
    .post("", signUp)
    .delete("/", signIn)

export { authRouter }