import { getSiteHeaderData } from "@/src/app/helper/getSiteHeaderData";
import ChangePasswordWrapper from "./ChangePasswordWrapper";

const page = () => {
  return (
    <>
      <ChangePasswordWrapper />
    </>
  );
};

export default page;

export async function generateMetadata() {
  const headerData = await getSiteHeaderData();
  const siteTitle = headerData?.header_info?.site_title || "BookingXpart";

  return {
    title: `${siteTitle} | Change Password`,
    description: `Set a new password for your ${siteTitle} account securely.`,
  };
}
