import { prisma } from "@/config";
import { signUpBody } from "@/schemas/signupSCHEMA";

async function insertNewUser(body: Omit<signUpBody, "passwordVerify">) {
    return prisma.users.create({
        data:{
            email: body.email,
            password: body.password
        }
    });
}

async function createNewSession(body: {userId: number, token: string}){
    return prisma.sessions.create({
        data: {
            userId: body.userId,
            token: body.token
        }
    })
}

const authRepository = {
    insertNewUser,
    createNewSession
}

export default authRepository