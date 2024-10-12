import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
async function main() {

    const bcrypt = require('bcrypt');

    let password = '123456'
    let hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.upsert({
        where: { email: 'user@user.com' },
        update: {
            email: 'user@user.com',
            password: hashedPassword,
        },
        create: {
            email: 'user@user.com',
            password: hashedPassword,
            role: 'user'
        },
    })

    await prisma.user.upsert({
        where: { email: 'admin@admin.com' },
        update: {
        },
        create: {
            email: 'admin@admin.com',
            password: hashedPassword,
            role: 'admin'
        },
    })

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })