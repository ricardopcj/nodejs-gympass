# Wellhub (Gympass) Clone API

This project is a **backend API inspired by Gympass / Wellhub**, built to manage gyms, users, check-ins, and subscriptions.  
It was developed as a study project focusing on **clean architecture, authentication, and scalable backend practices**.

## Tech Stack

- **Node.js**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **SOLID principles**
- **JWT Authentication**
- **Fastify**

## Features

- User registration and authentication (JWT-based)
- Gym creation and listing
- Check-in system
- Secure routes with authentication middleware
- Clean architecture with services and repositories
- Environment-based configuration

## Architecture

The project follows **SOLID principles** and is structured around:

- **Services** – business rules
- **Repositories** – data access abstraction
- **Controllers** – HTTP layer
- **Interfaces** – strong typing and consistency

This separation makes the application easier to test, maintain, and scale.

## Usefull Commands

```bash
npx prisma init

npx prisma generate

docker start apisolid

npx prisma migrate dev

npx prisma studio
```

## Generate Keys

```sh
#!/bin/sh
openssl genpkey -algorithm RSA -out private-key.pem -pkeyopt rsa_keygen_bits:2048
openssl rsa -pubout -in private-key.pem -out public-key.pem

echo "Done!"
```
