import { prisma } from "../src/lib/prisma";

const ownerEmail = process.env.OWNER_EMAIL?.toLowerCase();
const ownerName = process.env.OWNER_NAME ?? "오너";

async function main() {
  if (!ownerEmail) {
    throw new Error("OWNER_EMAIL은 오너 계정 시드를 위해 필요합니다.");
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

  console.log(`오너 계정 시드 완료: ${owner.email}`);
}

main()
  .catch((error) => {
    console.error("시드 실패:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
