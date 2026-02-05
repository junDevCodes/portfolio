import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ownerEmail = process.env.OWNER_EMAIL?.toLowerCase();
const ownerName = process.env.OWNER_NAME ?? "Owner";

async function main() {
  if (!ownerEmail) {
    throw new Error("OWNER_EMAIL is required to seed the owner user.");
  }

  const owner = await prisma.user.upsert({
    where: { email: ownerEmail },
    update: {
      isOwner: true,
      name: ownerName,
    },
    create: {
      email: ownerEmail,
      name: ownerName,
      isOwner: true,
    },
  });

  console.log(`Seeded owner user: ${owner.email}`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
