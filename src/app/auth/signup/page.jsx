import { getSiteHeaderData } from "../../helper/getSiteHeaderData";
import RegisterClient from "./RegisterClient";

export default function Register() {
  return (
    <>
      <RegisterClient />
    </>
  );
}

export async function generateMetadata() {
  const headerData = await getSiteHeaderData();

  const siteTitle = headerData?.header_info?.site_title || "BookingXpart";
  return {
    title: `${siteTitle} | Register`,
    description: `Register an account on ${siteTitle}`,
  };
}
