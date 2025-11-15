import { PrismaClient, TaskType } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
    await prisma.userTask.deleteMany()
    await prisma.task.deleteMany()
    await prisma.user.deleteMany()

    const users = await Promise.all([
        prisma.user.create({
            data: {
                id: faker.string.uuid(),
                walletAddress: '0x1234567890abcdef1234567890abcdef12345678'
            }
        }),
        prisma.user.create({
            data: {
                id: faker.string.uuid(),
                walletAddress: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd'
            }
        })
    ])

    const tasks = await prisma.task.createMany({
        data: [
            {
                title: 'Join Lumia Telegram',
                description: 'Join the official @LumiaOfficial Telegram channel.',
                rewardPoints: 50,
                type: TaskType.TELEGRAM,
                telegramChatId: '@LumiaOfficial'
            },
            {
                title: 'Join Web3 Builders Chat',
                description: 'Become a member of the builders community chat.',
                rewardPoints: 30,
                type: TaskType.TELEGRAM,
                telegramChatId: '@web3builders'
            },
            {
                title: 'Join Test Private Group',
                description: 'Join a test channel for development.',
                rewardPoints: 10,
                type: TaskType.TELEGRAM,
                telegramChatId: '@my_test_channel'
            }
        ]
    })
    const allTasks = await prisma.task.findMany()

    for (const task of allTasks) {
        await prisma.userTask.create({
            data: {
                userId: users[0].id,
                taskId: task.id,
                verified: faker.datatype.boolean(),
                verifiedAt: faker.date.past()
            }
        })
    }
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
