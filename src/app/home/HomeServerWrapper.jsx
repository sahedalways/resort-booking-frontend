import dynamic from "next/dynamic";
import fetchHomeData from "../services/homeService";

export const revalidate = 10;

const HomePage = dynamic(() => import("./Home"));

export default async function HomeServerWrapper() {
  const homeData = await fetchHomeData();

  return <HomePage homeData={homeData} />;
}
