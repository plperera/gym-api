import { prisma } from "@/config";

async function findFirstWithEmail(email:string) {
    return prisma.users.findFirst({
        where:{
            email: email
        }
    });
}

const userRepository = {
    findFirstWithEmail
}

export default userRepository