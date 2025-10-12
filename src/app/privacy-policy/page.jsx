"use client";

import { useEffect, useState } from "react";
import fetchHeaderData from "../services/headerService";

const PrivacyPolicy = () => {
  const [siteTitle, setSiteTitle] = useState("BookingXpart");

  useEffect(() => {
    const fetchTitle = async () => {
      const data = await fetchHeaderData();
      setSiteTitle(data?.header_info?.site_title || "BookingXpart");
      document.title = `${
        data?.header_info?.site_title || "BookingXpart"
      } | Privacy Policy`;
    };

    fetchTitle();
  }, []);

  return (
    <div className="container-fluid p-0">
      {/* Header Section */}
      <div className="privacy-header mb-5">
        <div className="privacy-overlay"></div>
        <div className="position-relative">
          <h1 className="text-block-50 fw-bold">Privacy Policy</h1>
          <p className="text-block-20">
            Protecting your personal information is our top priority at{" "}
            <strong>{siteTitle}</strong>.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card shadow-sm p-4 mb-5">
              <p className="mb-4">
                At <strong>{siteTitle}</strong>, we respect your privacy and are
                committed to protecting your personal information. This{" "}
                <strong>Privacy Policy</strong> explains how we collect, use,
                and safeguard your data when you use our services.
              </p>

              <div className="mb-4">
                <h3 className="text-block-20 mb-3 text-decoration-underline">
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
                <h3 className="text-block-20 mb-3 text-decoration-underline">
                  How We Use Your Information
                </h3>
                <p className="mb-0">
                  Your information is used to provide and improve our services,
                  process bookings, communicate with you, and ensure a secure
                  experience on our platform.
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-block-20 mb-3 text-decoration-underline">
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
                <h3 className="text-block-20 mb-3 text-decoration-underline">
                  Contact Us
                </h3>
                <p className="mb-0">
                  For questions or concerns about our privacy practices, please
                  contact our support team at{" "}
                  <strong>
                    support@{siteTitle.toLowerCase().replace(/\s+/g, "")}.com
                  </strong>{" "}
                  or reach us via our customer service hotline.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
