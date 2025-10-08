import fetchHeaderData from "../services/headerService";

export const revalidate = 300;

export async function getSiteHeaderData() {
  const headerData = await fetchHeaderData();
  return headerData ?? {};
}
