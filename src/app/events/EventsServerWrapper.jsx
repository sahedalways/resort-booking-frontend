import fetchEventData from "../services/eventService";
import EventPage from "./EventPage";

export const revalidate = 100;

export default async function EventsServerWrapper() {
  const eventData = await fetchEventData();

  return <EventPage eventData={eventData} />;
}
