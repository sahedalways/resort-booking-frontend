import { getSiteHeaderData } from "../helper/getSiteHeaderData";
import ResortsServerWrapper from "./ResortsServerWrapper";

export default function Resorts() {
  return (
    <>
      <ResortsServerWrapper />
    </>
  );
}

export async function generateMetadata() {
  const headerData = await getSiteHeaderData();
  const siteTitle = headerData?.header_info?.site_title || "BookingXpart";

  return {
    title: `${siteTitle} | Resorts`,
    description: `Explore all resorts on ${siteTitle}. Find your perfect stay and book directly online.`,
  };
}
