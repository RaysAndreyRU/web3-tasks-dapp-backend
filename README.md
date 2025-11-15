#  Web3 Bounty Board DApp — Backend

> Backend service for a decentralized Bounty Board DApp,
where users earn points by completing social tasks
(e.g., joining a Telegram channel) and authenticate securely via Lumia Passport.
---

##  Features

-  **Lumia Passport Authentication** — verifies user sessions with wallet-based login
-  **Bounty Tasks System** — list tasks, verify completion, grant reward points
-  **Prisma ORM + PostgreSQL** — type-safe, fast, and schema-driven persistence
-  **NestJS Modular Architecture** — clean, testable, and enterprise-ready structure
-  **Class-based Validation & DTOs** — input validation, serialization, and Swagger docs
-  **Ready for Web3 Integration** — designed to connect seamlessly with DApp frontends
-  **Telegram Verification** using the tasks-verifiers SDK
---

## Tech Stack

| Layer | Technology |
|-------|-------------|
| **Framework** | [NestJS](https://nestjs.com) |
| **ORM** | [Prisma](https://www.prisma.io) |
| **Database** | PostgreSQL |
| **Auth** | [@lumiapassport/core](https://www.npmjs.com/package/@lumiapassport/core) |
| **Verification SDK** | [@tasks-verifiers](https://www.npmjs.com/package/tasks-verifiers) |
| **Validation** | `class-validator`, `class-transformer` |
| **Docs** | [Swagger](https://swagger.io/tools/swagger-ui/) (`@nestjs/swagger`) |

---

##  Installation

```bash
# 1. Clone the repository
git clone https://github.com/RaysAndreyRU/web3-tasks-dapp-backend.git
cd web3-tasks-dapp-backend

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env
```



##  Database Setup

```bash
# Run Prisma migrations
npx prisma migrate dev

# Run Prisma generate
npx prisma generate 
# (Optional) Seed sample data
npx prisma db seed
```

##  Development
```bash
# Start the dev server
npm start:dev
```
##  Docker (optional)
```bash
docker compose up -d
```
##  License
MIT © Rays Andrey
