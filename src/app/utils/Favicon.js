import Head from "next/head";
import { useContext } from "react";
import { HeaderContext } from "../hooks/api/HeaderContext";

export const Favicon = () => {
  const { headerData, loading } = useContext(HeaderContext);

  if (loading || !headerData?.header_info?.favicon_url) return null;

  return (
    <Head>
      <link
        rel="icon"
        type="image/x-icon"
        href={headerData.header_info.favicon_url}
      />
    </Head>
  );
};
