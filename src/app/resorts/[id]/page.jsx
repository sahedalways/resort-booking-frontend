import { getSiteHeaderData } from "../../helper/getSiteHeaderData";
import { fetchAllResorts, fetchResortById } from "../../services/resortService";
import SingleResortsServerWrapper from "./SingleResortsServerWrapper";

export async function generateStaticParams() {
  const resorts = await fetchAllResorts();
  return resorts.map((resort) => ({
    id: resort.id.toString(),
  }));
}

const page = async ({ params }) => {
  return <SingleResortsServerWrapper params={await params} />;
};

export default page;

export async function generateMetadata({ params }) {
  const { id } = await params;
  const resort = await fetchResortById(id);
  const headerData = await getSiteHeaderData();
  const siteTitle = headerData?.header_info?.site_title || "BookingXpert";

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
