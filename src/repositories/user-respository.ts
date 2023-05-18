import { prisma } from "@/config";

async function findFirstWithEmail(email:string) {
    return prisma.users.findFirst({
        where:{
            email: email
        }
    });
}

async function findAll() {
    return prisma.users.findMany({
    });
}

const userRepository = {
    findFirstWithEmail,
    findAll
}

export default userRepository