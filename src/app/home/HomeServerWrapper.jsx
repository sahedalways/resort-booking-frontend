import dynamic from "next/dynamic";
import fetchHomeData from "../services/homeService";
import ErrorPage from "@/src/components/ErrorPage";
import Loading from "@/src/components/Loading";

export const revalidate = 10;

const HomePage = dynamic(() => import("./Home"));

export default async function HomeServerWrapper() {
  let data;
  try {
    data = await fetchHomeData();
  } catch (err) {
    return <ErrorPage code={500} message={err.message} />;
  }

  if (!data) return <Loading />;

  return <HomePage initialData={data} />;
}
