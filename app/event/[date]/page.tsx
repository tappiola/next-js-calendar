import { getEventByDate } from "@/app/actions";
import EventForm from "@/app/event/[date]/eventForm";

interface Props {
  params: Promise<{ date: string }>;
}

export default async function EventPage({ params }: Props) {
  const { date } = await params;

  const event = await getEventByDate(date);

  return <EventForm date={date} event={event} />;
}
