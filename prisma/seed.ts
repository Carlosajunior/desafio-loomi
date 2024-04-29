import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const SALT = bcrypt.genSaltSync(10);
  const password = bcrypt.hashSync('senha123', SALT);
  await prisma.user.create({
    data: {
      email: 'email@email.com',
      password: password,
      type: 'Administrador',
      name: 'Carlos',
      status: true,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
