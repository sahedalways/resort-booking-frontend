import { fetchResortById } from "../../services/resortService";
import SingleResortInfo from "./SingleResortInfo";

export default async function SingleResortsServerWrapper({ params }) {
  const { id } = params;

  const resortData = await fetchResortById(id);

  return <SingleResortInfo resortData={resortData} />;
}
