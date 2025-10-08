import { getSiteHeaderData } from "../../helper/getSiteHeaderData";
import { fetchResortById } from "../../services/resortService";
import SingleResortsServerWrapper from "./SingleResortsServerWrapper";

const page = ({ params }) => {
  return <SingleResortsServerWrapper params={params} />;
};

export default page;

export async function generateMetadata({ params }) {
  const resort = await fetchResortById(params.id);
  const headerData = await getSiteHeaderData();
  const siteTitle = headerData?.header_info?.site_title || "BookingXpart";

  if (!resort) {
    return {
      title: `${siteTitle} | Resort Not Found`,
      description: `Resort details not available on ${siteTitle}.`,
    };
  }

  return {
    title: `${resort.name} | ${siteTitle}`,
    description: `Book your stay at ${resort.name} in ${
      resort.location
    }. Enjoy amenities like ${resort.features?.join(
      ", "
    )} and more at ${siteTitle}.`,
  };
}
