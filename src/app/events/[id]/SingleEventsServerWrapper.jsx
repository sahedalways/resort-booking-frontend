import SingleEventServicePage from "./SingleEventServicePage";

export default async function SingleEventsServerWrapper({ params }) {
  return <SingleEventServicePage id={await params.id} />;
}
