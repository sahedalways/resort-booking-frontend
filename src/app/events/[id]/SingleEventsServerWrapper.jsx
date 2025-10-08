import { fetchEventServiceById } from "../../services/eventService";
import SingleEventServicePage from "./SingleEventServicePage";

export const revalidate = 100;

export default async function SingleEventsServerWrapper({ params }) {
  const { id } = params;
  const eventData = await fetchEventServiceById(id);

  return <SingleEventServicePage eventData={eventData} />;
}
