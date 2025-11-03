import Head from "next/head";

/* eslint-disable no-undef */
const { useContext } = require("react");
const { HeaderContext } = require("../hooks/api/HeaderContext");

export const Favicon = () => {
  const { headerData, loading } = useContext(HeaderContext);

  if (loading) return null;

  return (
    <>
      {headerData?.favicon_url && (
        <Head>
          <link rel="icon" href={headerData.header_info.favicon_url} />
        </Head>
      )}
    </>
  );
};
