import { getSiteHeaderData } from "@/src/app/helper/getSiteHeaderData";
import VerifyEmailWrapper from "./VerifyEmailWrapper";

const page = () => {
  return (
    <>
      <VerifyEmailWrapper />
    </>
  );
};

export default page;

export async function generateMetadata() {
  const headerData = await getSiteHeaderData();

  const siteTitle = headerData?.header_info?.site_title || "BookingXpart";

  return {
    title: `${siteTitle} | Email Verification`,
    description: `Verify your email address to change password on ${siteTitle}.`,
  };
}
