"use server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const dateSchema = z.string().transform((val, ctx) => {
  const parsed = new Date(val);
  if (isNaN(parsed.getTime())) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Invalid date",
    });
    return z.NEVER;
  }
  return parsed;
});

export const getAllHolidays = async () => {
  const [bankHolidays, vacations] = await Promise.all([
    prisma.holidays.findMany(),
    prisma.vacations.findMany(),
  ]);

  return { bankHolidays, vacations };
};

export type FormState = string | null | undefined;

export async function createVacation(formData: FormData): Promise<FormState> {
  const raw = Object.fromEntries(formData.entries());
  const schema = z.object({
    date: dateSchema,
    title: z.string().min(1, "Title is required"),
  });

  const parse = schema.safeParse(raw);

  if (parse.error) {
    return parse.error.issues[0].message;
  }

  const { date, title } = parse.data;

  await prisma.vacations.upsert({
    where: { date },
    update: { name: title },
    create: { date, name: title },
  });

  revalidatePath("/");
}

export const deleteVacation = async (date: string) => {
  const { error, data } = dateSchema.safeParse(date);

  if (error) {
    throw new Error(error.issues[0].message);
  }

  await prisma.vacations.delete({
    where: {
      date: data,
    },
  });

  revalidatePath("/");
};

export const getEventByDate = async (date: string) => {
  const { error, data } = dateSchema.safeParse(date);

  if (error) {
    throw new Error(error.issues[0].message);
  }

  return await prisma.vacations.findUnique({
    where: {
      date: data,
    },
  });
};
