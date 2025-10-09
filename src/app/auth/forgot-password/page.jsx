import { getSiteHeaderData } from "../../helper/getSiteHeaderData";
import ForgotPasswordWrapper from "./ForgotPasswordWrapper";

const page = () => {
  return (
    <>
      <ForgotPasswordWrapper />
    </>
  );
};

export default page;

export async function generateMetadata() {
  const headerData = await getSiteHeaderData();
  const siteTitle = headerData?.header_info?.site_title || "BookingXpart";

  return {
    title: `${siteTitle} | Forgot Password`,
    description: `Reset your password on ${siteTitle} by entering your registered email.`,
  };
}
