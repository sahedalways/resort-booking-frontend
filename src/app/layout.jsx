import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import BootstrapClient from "../components/BootstrapClient";
import Header from "../components/Header";
import Footer from "../components/Footer";

import fetchFooterData from "./services/FooterService";
import { AuthProvider } from "./hooks/api/AuthContext";
import { LocalStoreProvider } from "./hooks/localstorage/LocalStoreContext";
import { getSiteHeaderData } from "./helper/getSiteHeaderData";

export const revalidate = 300;

export default async function RootLayout({ children }) {
  const [footerData] = await Promise.all([fetchFooterData()]);
  const headerData = await getSiteHeaderData();
  const faviconUrl = headerData?.header_info?.favicon_url || "/favicon.ico";

  return (
    <html lang="en">
      <head>
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

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>

      <body>
        <LocalStoreProvider>
          <AuthProvider>
            <Header data={headerData?.header_info} />

            {children}

            <Footer data={footerData} />
          </AuthProvider>
        </LocalStoreProvider>
        <BootstrapClient />
      </body>
    </html>
  );
}

export async function generateMetadata() {
  const headerData = await getSiteHeaderData();

  const siteTitle = headerData?.header_info?.site_title || "BookingXpart";

  return {
    title: `${siteTitle} | Home`,
    description: `Welcome to ${siteTitle} — your go-to platform for booking services.`,
  };
}
