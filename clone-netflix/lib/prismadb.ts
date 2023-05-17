import { PrismaClient } from "@prisma/client";

const clinet = global.prismadb || new PrismaClient();
if(process.env.NODE_ENV === 'production') {
    global.prismadb = clinet;
}

export default clinet;