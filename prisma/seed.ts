import { PrismaClient, TaskType } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

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

    await prisma.task.createMany({
        data: [
            {
                title: 'Join the Dev Telegram Chat',
                description: 'Join our developer community chat to get verified.',
                rewardPoints: 50,
                type: TaskType.TELEGRAM,
                telegramChatId: '-5034425280',
                slug: 'join-dev-chat',
                joinUrl: 'https://t.me/+dev_chat_link',
                imageUrl: faker.image.urlPicsumPhotos()
            },

            {
                title: 'Join the Announcements Telegram',
                description: 'Stay updated with the latest Lumia news.',
                rewardPoints: 30,
                type: TaskType.TELEGRAM,
                telegramChatId: '-5034425280',
                slug: 'join-announcements',
                joinUrl: 'https://t.me/+announcements_link',
                imageUrl: faker.image.urlPicsumPhotos()
            },

            {
                title: 'Join the Test QA Telegram',
                description: 'Join QA testing group for early feature previews.',
                rewardPoints: 40,
                type: TaskType.TELEGRAM,
                telegramChatId: '-5034425280',
                slug: 'join-qa',
                joinUrl: 'https://t.me/+qa_chat_link',
                imageUrl: faker.image.urlPicsumPhotos()
            },

            {
                title: 'Join the Web3 Community Telegram',
                description: 'Participate in vibrant Web3 discussions with the community.',
                rewardPoints: 20,
                type: TaskType.TELEGRAM,
                telegramChatId: '-5034425280',
                slug: 'join-web3',
                joinUrl: 'https://t.me/+web3_chat_link',
                imageUrl: faker.image.urlPicsumPhotos()
            },

            {
                title: 'Join the Builders Telegram',
                description: 'Meet other builders, share your DApps and ideas.',
                rewardPoints: 60,
                type: TaskType.TELEGRAM,
                telegramChatId: '-5034425280',
                slug: 'join-builders',
                joinUrl: 'https://t.me/+builders_chat_link',
                imageUrl: faker.image.urlPicsumPhotos()
            },

            {
                title: 'Join the Research Telegram',
                description: 'Access advanced articles and protocol updates.',
                rewardPoints: 25,
                type: TaskType.TELEGRAM,
                telegramChatId: '-5034425280',
                slug: 'join-research',
                joinUrl: 'https://t.me/+research_chat_link',
                imageUrl: faker.image.urlPicsumPhotos()
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
