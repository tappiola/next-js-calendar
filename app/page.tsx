import { YearSwitch } from "@/app/components/yearSwitch";
import { getAllHolidays } from "@/app/actions";
import { Calendar } from "@/app/components/calendar";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>;
}) {
  const { year = new Date().getFullYear() } = await searchParams;

  const { bankHolidays, vacations } = await getAllHolidays();

  return (
    <>
      <YearSwitch year={Number(year)} />
      <Calendar
        year={Number(year)}
        bankHolidays={bankHolidays}
        vacations={vacations}
      />
    </>
  );
}
