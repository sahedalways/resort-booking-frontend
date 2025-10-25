import { getSiteHeaderData } from "../helper/getSiteHeaderData";
import EventsServerWrapper from "./EventsServerWrapper";

export default function Events() {
  return (
    <>
      <EventsServerWrapper />
    </>
  );
}

export async function generateMetadata() {
  const headerData = await getSiteHeaderData();
  const siteTitle = headerData?.header_info?.site_title || "BookingXpert";

  return {
    title: `${siteTitle} | Events`,
    description: `Discover all upcoming events on ${siteTitle}. Stay updated and book your spot for exciting events and experiences.`,
  };
}
