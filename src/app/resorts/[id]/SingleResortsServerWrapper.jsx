import SingleResortInfo from "./SingleResortInfo";

export default async function SingleResortsServerWrapper({ params }) {
  const { id } = params;

  return <SingleResortInfo id={id} />;
}
