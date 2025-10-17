"use client";

import { useEffect } from "react";
import { useSiteData } from "../hooks/SiteDataContext";
import Link from "next/link";

const PrivacyPolicy = () => {
  const { headerData, footerData } = useSiteData();
  const siteTitle = headerData?.header_info?.site_title || "BookingXpart";
  const sitePhone = footerData?.contact_info?.phone || "+8801877556633";
  const siteEmail =
    footerData?.contact_info?.email ||
    `support@${siteTitle.toLowerCase().replace(/\s+/g, "")}.com`;

  useEffect(() => {
    document.title = `${siteTitle} | Privacy Policy`;
  }, [siteTitle]);

  return (
    <>
      {/* ====== Parallax Hero Section ====== */}
      <section
        className="position-relative w-100 d-flex align-items-center justify-content-center text-center text-white"
        style={{
          height: "65vh",
          overflow: "hidden",
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            zIndex: "-1",
            backgroundImage: `url('/img/privacy-hero.png')`,
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.5)",
          }}
        ></div>

        <div className="px-3 w-100">
          <h1 className="fw-bold mb-2 text-block-50">Privacy Policy</h1>
          <h4 className="fw-normal mb-0 text-block-20">
            Protecting your personal information is our top priority at{" "}
            {siteTitle}.
          </h4>
        </div>
      </section>

      {/* ====== Privacy Content Section ====== */}
      <section className="section-gap py-5 about-sec">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className=" shadow-sm p-4 mb-5">
                <p className="mb-4">
                  At <strong>{siteTitle}</strong>, we respect your privacy and
                  are committed to protecting your personal information. This{" "}
                  <strong>Privacy Policy</strong> explains how we collect, use,
                  and safeguard your data when you use our services.
                </p>

                <div className="mb-4">
                  <h3 className="text-block-20 mb-3 text-decoration-underline primary-color">
                    Information We Collect
                  </h3>
                  <p className="mb-0">
                    We collect information you provide directly, such as your
                    name, email, phone number, and payment details, as well as
                    information collected automatically, like usage data and
                    cookies.
                  </p>
                </div>

                <div className="mb-4">
                  <h3 className="text-block-20 mb-3 text-decoration-underline primary-color">
                    How We Use Your Information
                  </h3>
                  <p className="mb-0">
                    Your information is used to provide and improve our
                    services, process bookings, communicate with you, and ensure
                    a secure experience on our platform.
                  </p>
                </div>

                <div className="mb-4">
                  <h3 className="text-block-20 mb-3 text-decoration-underline primary-color">
                    Data Sharing & Security
                  </h3>
                  <p className="mb-0">
                    We do not sell your personal information. We may share data
                    with trusted partners to facilitate bookings or comply with
                    legal obligations. We implement robust security measures to
                    protect your data.
                  </p>
                </div>

                <div>
                  <h3 className="text-block-20 mb-3 text-decoration-underline primary-color">
                    Contact Us
                  </h3>
                  <p className="mb-0">
                    For questions or concerns about our privacy practices,
                    please contact our support team at{" "}
                    <strong>
                      <Link
                        href={`mailto:${siteEmail}`}
                        className="text-decoration-none primary-color"
                      >
                        {siteEmail}
                      </Link>
                    </strong>{" "}
                    or reach us via our customer service hotline{" "}
                    <strong>
                      <Link
                        href={`tel:${sitePhone}`}
                        className="text-decoration-none primary-color"
                      >
                        {sitePhone}
                      </Link>
                    </strong>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;
