
## Table of contents
- [Rules](#rules)
- [Folder Structure](#folder-structure)
- [Check Points](#check-points)
- [Running server](#running-server)

This codebase shows practice of OOP with Whatsapp Messenger Backend Clone.

This base code have set uped prequently used library modules like cache, s3 uploader etc.
Check the .env.example file to run the project.
If you dont want, or doesnot need for your project, just makes unnecessary modules commented on app.module.ts 


# Rules<a id="rules"></a>
1. Use "yarn"
2. Use "prisma"
3. Use docker compose for dev

# [Folder Structure](./docs/folder-structure.md)<a id="folder-structure"></a>

# Check points <a id="check-points"></a>
## Before Run Production
1. Set the right connection pool size.
Recommanded connection pool size is "default pool size (num_physical_cpus * 2 + 1) ÷ number of application instances."

<!-- # Running server <a id="running-server"></a> -->
# [Running server](./docs/running-server.md)<a id="running-server"></a>

# Infra Features

- [x] ConfigService
- [x] Database - Prisma.js
- [x] Layered Exception and Filter
- [x] FileUpload with S3.
- [x] Swagger
- [x] Docker
- [ ] socialLogin
- [ ] fcm
- [ ] socket
- [ ] message queue

# API list

## Authentication

- [x] signup/signin
- [x] Get/Patch my profile

## Friends
- [x] Get friends list
- [ ] Get friend detail

## Chatrooms
- [ ] Create chatroom [1 to 1, group]
- [ ] Get chatrooms
- [ ] Enter chatroom

## Chat messsage
- [ ] Get chat messages
- [ ] Send chat message
    - [ ] referencing past message
    - [ ] send attachment together
    - [ ] tag user on a message
    - [ ] sticker message
- [ ] set emoji reaction on a message (? do I seprate emoji reaction from chat message module?)
- [ ] cancel emoji reaction on a message



# [Concerns](./docs/concern.md)