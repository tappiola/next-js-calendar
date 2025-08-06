import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const holidays: Prisma.HolidaysCreateInput[] = [
  { date: new Date("2025-01-01"), name: "New Year's Day" },
  { date: new Date("2025-04-18"), name: "Good Friday" },
  { date: new Date("2025-04-21"), name: "Easter Monday" },
  { date: new Date("2025-05-05"), name: "Early May Bank Holiday" },
  { date: new Date("2025-05-26"), name: "Spring Bank Holiday" },
  { date: new Date("2025-08-25"), name: "Summer Bank Holiday" },
  { date: new Date("2025-12-25"), name: "Christmas Day" },
  { date: new Date("2025-12-26"), name: "Boxing Day" },
];

export const main = async () => {
  for (const h of holidays) {
    await prisma.holidays.create({ data: h });
  }
};

await main();
