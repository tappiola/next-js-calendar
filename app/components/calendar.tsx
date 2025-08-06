import {
  formatDate,
  generateMonth,
  getMonthName,
  getWeekdayName,
  isSameDate,
} from "@/app/utils/dateUtils";
import { COLUMN_CLASSES } from "@/app/utils/styling";
import clsx from "clsx";
import { Tooltip } from "@/app/components/tooltip";
import Link from "next/link";
import { Holidays, Vacations } from "@prisma/client";

export const Calendar = (props: {
  year: number;
  bankHolidays: Holidays[];
  vacations: Vacations[];
}) => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-9 max-w-5/6 mx-auto justify-center">
        {Array.from({ length: 12 }, (_, idx) => (
          <Month key={idx} monthIndex={idx} {...props} />
        ))}
      </div>
    </div>
  );
};

const Month = async ({
  monthIndex,
  year,
  bankHolidays,
  vacations,
}: {
  monthIndex: number;
  year: number;
  bankHolidays: Holidays[];
  vacations: Vacations[];
}) => {
  return (
    <div className="max-w-3xs w-3xs mx-auto">
      <h2 className="uppercase text-orange-400 text-center mb-3">
        {getMonthName(monthIndex)}
      </h2>
      <div className="grid grid-cols-7 text-center">
        {Array.from({ length: 7 }, (_, idx) => (
          <div key={idx}>{getWeekdayName(idx)}</div>
        ))}
        {generateMonth(bankHolidays, vacations, year, monthIndex).days.map(
          (day, idx) => (
            <Tooltip
              text={day.title}
              key={day.dayOfMonth}
              className={clsx({
                [COLUMN_CLASSES[day.dayOfWeek]]: idx === 0,
              })}
            >
              <Link
                href={`/event/${formatDate(day.date)}`}
                aria-disabled={day.isWeekend}
                className={clsx(
                  {
                    "text-orange-700 pointer-events-none": day.isWeekend,
                    "text-amber-300": day.isVacation,
                    "font-bold text-orange-400": isSameDate(
                      day.date,
                      new Date(),
                    ),
                  },
                  "select-none",
                )}
              >
                {day.dayOfMonth}
              </Link>
            </Tooltip>
          ),
        )}
      </div>
    </div>
  );
};
