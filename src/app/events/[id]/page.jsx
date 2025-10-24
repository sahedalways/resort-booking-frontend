import { getSiteHeaderData } from "../../helper/getSiteHeaderData";
import fetchEventData from "../../services/eventService";
import SingleEventsServerWrapper from "./SingleEventsServerWrapper";

export async function generateStaticParams() {
  const events = await fetchEventData();
  return events.event_services.map((event) => ({
    id: event.id.toString(),
  }));
}

export default function EventDetails({ params }) {
  return (
    <>
      <SingleEventsServerWrapper params={params} />
    </>
  );
}

export async function generateMetadata() {
  const headerData = await getSiteHeaderData();
  const siteTitle = headerData?.header_info?.site_title || "BookingXpart";

  return {
    title: `${siteTitle} | Event Services`,
    description: `Explore our event services on ${siteTitle}. Find and book services for your events easily and conveniently.`,
  };
}
