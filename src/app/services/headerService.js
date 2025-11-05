export default async function fetchHeaderData() {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api"
      }/header-data`,
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch header data");

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching header data:", error);
    return null;
  }
}
