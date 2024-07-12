import { PrismaClient } from '@prisma/client';
import { seedUsers } from './seed-datas/seed-users';

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
