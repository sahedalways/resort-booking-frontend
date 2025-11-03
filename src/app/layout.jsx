import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import BootstrapClient from "../components/BootstrapClient";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { AuthProvider } from "./hooks/api/AuthContext";
import { LocalStoreProvider } from "./hooks/localstorage/LocalStoreContext";
import { DashboardProvider } from "./hooks/api/DashboardContext";
import { CheckoutProvider } from "./hooks/api/CheckoutContext";
import { ToastContainer } from "react-toastify";
import { HomeProvider } from "./hooks/api/HomeContext";
import { ResortProvider } from "./hooks/api/ResortContext";
import { ReduxProvider } from "../redux/provider";
import { FooterProvider } from "./hooks/api/FooterContext";
import { HeaderProvider } from "./hooks/api/HeaderContext";
import { getSiteHeaderData } from "./helper/getSiteHeaderData";
import { EventProvider } from "./hooks/api/EventContext";

export default async function RootLayout({ children }) {
  const headerData = await getSiteHeaderData();
  const faviconUrl = headerData?.header_info?.favicon_url || "/favicon.ico";

  return (
    <html lang="en">
      <head>
        {/* Fonts & icons */}
        {faviconUrl && <link rel="icon" href={faviconUrl} />}

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
            <EventProvider>
              <ResortProvider>
                <HomeProvider>
                  <CheckoutProvider>
                    <DashboardProvider>
                      <AuthProvider>
                        <HeaderProvider>
                          <Header />
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
                          <FooterProvider>
                            {children}
                            <Footer />
                          </FooterProvider>
                        </HeaderProvider>
                      </AuthProvider>
                    </DashboardProvider>
                  </CheckoutProvider>
                </HomeProvider>
              </ResortProvider>
            </EventProvider>
          </LocalStoreProvider>
        </ReduxProvider>
        <BootstrapClient />
      </body>
    </html>
  );
}
