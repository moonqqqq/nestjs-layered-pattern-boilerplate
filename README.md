
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
    - [ ] adapter
- [ ] message queue

# API list

## Authentication

- [x] signup/signin
- [x] Get/Patch my profile

## Friends
- [x] Get friends list
- [x] Get friend detail

## Chatrooms
- [x] Create chatroom [1 to 1, group]
- [ ] Get chatrooms - last message content,timestamp need.
- [ ] Enter chatroom - after implements the socketio feature

## Chat messsage
- [x] Send chat message
    - [x] text chat-message
        - [x] tagged user on a message
        - [x] referencing past message
        - [x] send attachment together
    - [x] sticker chat-message
- [x] Get chat messages
    - [x] with emoji reactions
    - [x] with tagged user
    - [x] with referencing past message
    - [x] with attachment
- [ ] emoji reaction
    - [ ] send
    - [ ] cancel



# [Concerns](./docs/concern.md)