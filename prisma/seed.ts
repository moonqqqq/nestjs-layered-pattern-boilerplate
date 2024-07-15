import { PrismaClient } from '@prisma/client';
import { seedUsers, seedStickers } from './seed-datas/seed-users';

const prisma = new PrismaClient();
async function main() {
  // eslint-disable-next-line no-console
  console.log('Run Seeding');

  // seed users
  await Promise.all(
    seedUsers.map((seedUser) =>
      prisma.userEntity.create({
        data: seedUser,
      }),
    ),
  );

  await Promise.all(
    seedStickers.map(async (sticker) => {
      await prisma.stickerEntity.create({
        data: {
          name: sticker.name,
          file: {
            create: {
              name: sticker.file.name,
              originalName: sticker.file.originalName,
              path: sticker.file.path,
              size: sticker.file.size,
            },
          },
        },
      });
    }),
  );
  // eslint-disable-next-line no-console
  console.log('Seeding Done - added: [users, sticker]');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
