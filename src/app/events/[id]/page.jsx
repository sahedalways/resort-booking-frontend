import { getSiteHeaderData } from "../../helper/getSiteHeaderData";
import { fetchEventServiceById } from "../../services/eventService";
import SingleEventsServerWrapper from "./SingleEventsServerWrapper";

export default async function EventDetails({ params }) {
  return <SingleEventsServerWrapper params={await params} />;
}

export async function generateMetadata({ params }) {
  const headerData = await getSiteHeaderData();
  const siteTitle = headerData?.header_info?.site_title || "BookingXpert";

  const eventData = await fetchEventServiceById(params.id);

  return {
    title: `${siteTitle} | ${eventData?.title || "Event Service"}`,
    description:
      eventData?.description || `Explore this event service on ${siteTitle}.`,

    openGraph: {
      images: [
        {
          url: eventData?.thumbnail_url || "/img/default-image.jpg",
          width: 800,
          height: 600,
          alt: eventData?.title || "Event Service",
        },
      ],
    },
  };
}
