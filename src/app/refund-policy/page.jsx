"use client";

import { useEffect } from "react";
import { useSiteData } from "../hooks/SiteDataContext";
import Link from "next/link";

const RefundPolicy = () => {
  const { headerData, footerData } = useSiteData();
  const siteTitle = headerData?.header_info?.site_title || "BookingXpert";
  const sitePhone = footerData?.contact_info?.phone || "+8801877556633";
  const siteEmail =
    footerData?.contact_info?.email ||
    `support@${siteTitle.toLowerCase().replace(/\s+/g, "")}.com`;

  useEffect(() => {
    document.title = `${siteTitle} | Refund Policy`;
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
            backgroundImage: `url('/img/refund-hero.png')`,
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.5)",
          }}
        ></div>

        <div className="px-3 w-100">
          <h1 className="fw-bold mb-2 text-block-50">Refund Policy</h1>
          <h4 className="fw-normal mb-0 text-block-20">
            Simple, transparent, and fair refund policy at {siteTitle}.
          </h4>
        </div>
      </section>

      {/* ====== Refund Policy Content Section ====== */}
      <section className="section-gap py-5 about-sec">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="shadow-sm p-4 mb-5">
                <p className="mb-4">
                  At <strong>{siteTitle}</strong>, we strive to deliver
                  excellent service and ensure customer satisfaction. However,
                  if you are not completely satisfied with your booking or
                  purchase, we’re here to help with a clear and fair{" "}
                  <strong>Refund Policy</strong>.
                </p>

                <div className="mb-4">
                  <h3 className="text-block-20 mb-3 text-decoration-underline primary-color">
                    Eligibility for Refund
                  </h3>
                  <p className="mb-0">Refunds are applicable only if:</p>
                  <ul>
                    <li>
                      The cancellation is made within the permitted time frame
                      mentioned during the booking.
                    </li>
                    <li>
                      The service or booking could not be fulfilled due to a
                      verified issue from our side.
                    </li>
                    <li>
                      You have a valid payment receipt and transaction details.
                    </li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h3 className="text-block-20 mb-3 text-decoration-underline primary-color">
                    Non-Refundable Situations
                  </h3>
                  <ul>
                    <li>
                      No-shows or cancellations after the scheduled date/time.
                    </li>
                    <li>Services partially used or already consumed.</li>
                    <li>Any third-party charges or processing fees.</li>
                  </ul>
                </div>

                <div className="mb-4">
                  <h3 className="text-block-20 mb-3 text-decoration-underline primary-color">
                    Refund Processing Time
                  </h3>
                  <p className="mb-0">
                    Once your refund request is approved, the refund will be
                    processed within <strong>5–7 business days</strong>. The
                    amount will be credited back to your original payment method
                    depending on your bank or payment provider’s policies.
                  </p>
                </div>

                <div className="mb-4">
                  <h3 className="text-block-20 mb-3 text-decoration-underline primary-color">
                    Cancellation Policy
                  </h3>
                  <p className="mb-0">
                    To cancel a booking, please contact our support team as soon
                    as possible. Refunds for cancellations depend on the
                    cancellation time and type of service booked. Some
                    promotional or discounted bookings may not be eligible for
                    refunds.
                  </p>
                </div>

                <div>
                  <h3 className="text-block-20 mb-3 text-decoration-underline primary-color">
                    Contact Us
                  </h3>
                  <p className="mb-0">
                    For refund-related inquiries, please contact our support
                    team at{" "}
                    <strong>
                      <Link
                        href={`mailto:${siteEmail}`}
                        className="text-decoration-none primary-color"
                      >
                        {siteEmail}
                      </Link>
                    </strong>{" "}
                    or call us at{" "}
                    <strong>
                      <Link
                        href={`tel:${sitePhone}`}
                        className="text-decoration-none primary-color"
                      >
                        {sitePhone}
                      </Link>
                    </strong>
                    . We’re always happy to assist you.
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

export default RefundPolicy;
