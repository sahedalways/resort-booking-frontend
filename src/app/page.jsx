import { getSiteHeaderData } from "./helper/getSiteHeaderData";
import HomeServerWrapper from "./home/HomeServerWrapper";

export default function page() {
  return <HomeServerWrapper />;
}

export async function generateMetadata() {
  const headerData = await getSiteHeaderData();

  const siteTitle = headerData?.header_info?.site_title || "BookingXpart";

  return {
    title: `${siteTitle} | Home`,
    description: `Welcome to ${siteTitle} — your go-to platform for booking services.`,
  };
}
