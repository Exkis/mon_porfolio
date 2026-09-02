import { PrismaClient, Role } from "@prisma/client";
import { hashPassword } from "../src/lib/auth";

const prisma = new PrismaClient();

async function main() {
  const email = "excellencekisengo000@gmail.com";
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new Error("ADMIN_PASSWORD is required");
  await prisma.user.upsert({
    where: { email },
    update: { name: "Excellence Kisengo", passwordHash: hashPassword(password), role: Role.ADMIN },
    create: { name: "Excellence Kisengo", email, passwordHash: hashPassword(password), role: Role.ADMIN },
  });
  console.log(`Admin ready: ${email}`);
}

main().finally(() => prisma.$disconnect());
