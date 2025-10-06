import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import BootstrapClient from "../components/BootstrapClient";
import Header from "../components/Header";
import Footer from "../components/Footer";

import fetchHeaderData from "./services/headerService";
import fetchFooterData from "./services/FooterService";

export const revalidate = 100;

export default async function RootLayout({ children }) {
  const [headerData, footerData] = await Promise.all([
    fetchHeaderData(),
    fetchFooterData(),
  ]);

  const siteTitle =
    (headerData?.header_info?.site_title || "BookingXpart") + " | Home";

  const faviconUrl = headerData?.header_info?.favicon_url || "/favicon.ico";

  return (
    <html lang="en">
      <head>
        <title>{siteTitle}</title>

        <meta name="description" content="Home page of this site" />
        {faviconUrl && <link rel="icon" href={faviconUrl} />}

        {/* Fonts & icons */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
        <Header data={headerData?.header_info} />
        {children}
        <Footer data={footerData} />
        <BootstrapClient />
      </body>
    </html>
  );
}
