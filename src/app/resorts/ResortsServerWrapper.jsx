import fetchResortData from "../services/resortService";
import ResortsPage from "./ResortsPage";

export default async function ResortsServerWrapper() {
  const resortData = await fetchResortData();

  return <ResortsPage resortData={resortData} />;
}
