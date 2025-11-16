import { PrismaClient, TaskType } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

const IMAGE =
    'https://docs.lumia.org/~gitbook/image?url=https%3A%2F%2F2350053608-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F9xpHYszlcNFP3MXUQBaJ%252Ficon%252FBDmLzn8yppQZB9K9xw2O%252FLUMIA-Avatar.png%3Falt%3Dmedia%26token%3D61e41c4c-36ae-4e13-b4bf-938ea2336569&width=32&dpr=2&quality=100&sign=388901a1&sv=2'

async function main() {
    await prisma.userTask.deleteMany()
    await prisma.task.deleteMany()
    await prisma.user.deleteMany()

    await prisma.user.createMany({
        data: [
            {
                id: faker.string.uuid(),
                walletAddress: '0x1111111111111111111111111111111111111111'
            },
            {
                id: faker.string.uuid(),
                walletAddress: '0x2222222222222222222222222222222222222222'
            }
        ]
    })

    const joinUrl = 'https://t.me/lumia_community'

    await prisma.task.createMany({
        data: [
            {
                title: 'Join the Dev Telegram Chat',
                description: 'Join our developer community chat to get verified.',
                rewardPoints: 50,
                type: TaskType.TELEGRAM,
                telegramChatId: '-5034425280',
                slug: 'join-dev-chat',
                joinUrl,
                imageUrl: IMAGE
            },

            {
                title: 'Join the Announcements Telegram',
                description: 'Stay updated with the latest Lumia news.',
                rewardPoints: 30,
                type: TaskType.TELEGRAM,
                telegramChatId: '-5034425280',
                slug: 'join-announcements',
                joinUrl,
                imageUrl: IMAGE
            },

            {
                title: 'Join the Test QA Telegram',
                description: 'Join QA testing group for early feature previews.',
                rewardPoints: 40,
                type: TaskType.TELEGRAM,
                telegramChatId: '-5034425280',
                slug: 'join-qa',
                joinUrl,
                imageUrl: IMAGE
            },

            {
                title: 'Join the Web3 Community Telegram',
                description: 'Participate in vibrant Web3 discussions with the community.',
                rewardPoints: 20,
                type: TaskType.TELEGRAM,
                telegramChatId: '-5034425280',
                slug: 'join-web3',
                joinUrl,
                imageUrl: IMAGE
            },

            {
                title: 'Join the Builders Telegram',
                description: 'Meet other builders, share your DApps and ideas.',
                rewardPoints: 60,
                type: TaskType.TELEGRAM,
                telegramChatId: '-5034425280',
                slug: 'join-builders',
                joinUrl,
                imageUrl: IMAGE
            },

            {
                title: 'Join the Research Telegram',
                description: 'Access advanced articles and protocol updates.',
                rewardPoints: 25,
                type: TaskType.TELEGRAM,
                telegramChatId: '-5034425280',
                slug: 'join-research',
                joinUrl,
                imageUrl: IMAGE
            }
        ]
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
