import { getSiteHeaderData } from "../../helper/getSiteHeaderData";
import { fetchResortById } from "../../services/resortService";
import SingleResortsServerWrapper from "./SingleResortsServerWrapper";

const ResortPage = async ({ params }) => {
  return <SingleResortsServerWrapper params={await params} />;
};

export default ResortPage;

export async function generateMetadata({ params }) {
  const headerData = await getSiteHeaderData();
  const siteTitle = headerData?.header_info?.site_title || "BookingXpert";

  const resortData = await fetchResortById(params.id);

  return {
    title: resortData
      ? `${resortData.name} | ${siteTitle}`
      : `${siteTitle} | Resort Details`,
    description: resortData
      ? resortData.desc
      : `Explore this resort on ${siteTitle}. Find your perfect stay and book directly online.`,
    openGraph: resortData
      ? {
          images: [resortData.images[0]],
        }
      : undefined,
  };
}
