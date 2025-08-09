"use client";
import { Modal } from "@/app/components/modal";
import { prettyFormatDate } from "@/app/utils/dateUtils";
import clsx from "clsx";
import { createVacation, deleteVacation, FormState } from "@/app/actions";
import { Holidays } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

export default function EventForm({
  date,
  event,
}: {
  date: string;
  event: Holidays | null;
}) {
  const [error, formAction] = useActionState(
    async (_: FormState, formData: FormData) => {
      const error = await createVacation(formData);
      if (error) {
        return error;
      }
      router.push(returnRoute);
    },
    null,
  );

  const router = useRouter();

  const year = date.slice(0, 4);

  const returnRoute = `/${
    year !== new Date().getFullYear().toString() ? `?year=${year}` : ""
  }`;

  const onDelete = async () => {
    await deleteVacation(date);
    await router.push(returnRoute);
  };

  return (
    <Modal
      open={true}
      onClose={() => router.push(returnRoute)}
      footer={
        <div className="flex gap-7 text-neutral-400 hover:text-neutral-50 items-center">
          {event && (
            <form action={onDelete}>
              <button type="submit" className="hover:cursor-pointer">
                Delete
              </button>
            </form>
          )}
          <button
            type="submit"
            form="event-form"
            className="hover:cursor-pointer border-2 text-orange-400 border-orange-400  px-4 py-3 rounded-xl uppercase"
          >
            {event ? "Update event" : "Add event"}
          </button>
        </div>
      }
    >
      <form action={formAction} id="event-form">
        <h1 className="font-semibold text-xl">
          Event for {prettyFormatDate(date)}
        </h1>
        <input type="hidden" name="date" value={date} />
        <input
          key={date}
          name="title"
          placeholder="Enter event title"
          defaultValue={event?.name}
          className={clsx(
            "w-full px-4 py-3 rounded-xl text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-600 mt-4 -mb-2 border border-neutral-600 ",
            { "border-red-800 ring-red-800": error },
          )}
          aria-describedby={error ? "event-error" : undefined}
          aria-invalid={!!error}
        />
        {error && (
          <div id="event-error" className="text-red-800 text-sm pl-1 pt-3">
            {error}
          </div>
        )}
      </form>
    </Modal>
  );
}
