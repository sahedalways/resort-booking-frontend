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
import { DashboardProvider } from "./hooks/api/DashboardContext";

import { CheckoutProvider } from "./hooks/api/CheckoutContext";
import { ToastContainer } from "react-toastify";
import { HomeProvider } from "./hooks/api/HomeContext";
import { ResortProvider } from "./hooks/api/ResortContext";
import { ReduxProvider } from "../redux/provider";

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
        <ReduxProvider>
          <LocalStoreProvider>
            <ResortProvider>
              <HomeProvider>
                <CheckoutProvider>
                  <DashboardProvider>
                    <AuthProvider>
                      <Header data={headerData?.header_info} />

                      <ToastContainer
                        position="top-center"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                      />
                      {children}

                      <Footer data={footerData} />
                    </AuthProvider>
                  </DashboardProvider>
                </CheckoutProvider>
              </HomeProvider>
            </ResortProvider>
          </LocalStoreProvider>
        </ReduxProvider>
        <BootstrapClient />
      </body>
    </html>
  );
}