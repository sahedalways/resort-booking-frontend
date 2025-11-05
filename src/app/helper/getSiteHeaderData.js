import fetchHeaderData from "../services/headerService";

export async function getSiteHeaderData() {
  const headerData = await fetchHeaderData();
  return headerData ?? {};
}
