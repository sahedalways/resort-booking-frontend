"use client";

import { useContext, useEffect } from "react";
import Link from "next/link";
import ParallaxHero from "@/src/components/ParallaxHero";
import { HeaderContext } from "../hooks/api/HeaderContext";
import { FooterContext } from "../hooks/api/FooterContext";

const AboutUs = () => {
  const { headerData } = useContext(HeaderContext);
  const { footerData } = useContext(FooterContext);

  const siteTitle = headerData?.header_info?.site_title || "BookingXpert";
  const contactInfo = footerData?.contact_info || {};
  const dhakaAddress = contactInfo?.dhaka_office_address || "N/A";
  const gazipurAddress = contactInfo?.gazipur_office_address || "N/A";
  const phone = contactInfo?.phone || "N/A";
  const email = contactInfo?.email || "N/A";
  const website = "https://www.bookingxpert.org";

  useEffect(() => {
    document.title = `${siteTitle} | About Us`;
  }, [siteTitle]);

  return (
    <>
      {/* ====== Parallax Hero Section ====== */}
      <ParallaxHero
        title="About Us"
        subtitle="Turning plans into experiences — and venues into destinations."
        image="/img/about-hero.png"
      />

      {/* ====== About Content Section ====== */}
      <section className="section-gap-sm py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-12 mx-auto">
              <div>
                <div>
                  {/* About Description */}
                  <div className="mb-4">
                    <h3 className="text-block-24 fw-bold mb-3 primary-color">
                      About {siteTitle}
                    </h3>
                    <p className="mb-3">
                      At <strong>{siteTitle}</strong>, we make resort booking
                      and event planning effortless—connecting resort owners
                      with customers who are looking for the perfect place to
                      celebrate life’s moments, whether it’s a wedding, a
                      corporate retreat, a picnic, or a private getaway.
                    </p>
                    <p className="mb-3">
                      Our mission is to bring every detail of your event
                      together under one roof. From finding the right venue to
                      organizing the entire experience, we handle it all so you
                      can focus on enjoying the occasion.
                    </p>
                    <p className="mb-3">
                      For resort owners, <strong>{siteTitle}</strong> is a
                      trusted partner that drives real business—offering
                      visibility, bookings, and event opportunities through a
                      reliable digital platform.
                    </p>
                    <p className="mb-0">
                      We’re not just a booking site. We’re your event and
                      hospitality partner—turning plans into experiences and
                      venues into destinations.
                    </p>
                  </div>

                  {/* Contact Information */}
                  <div className="mt-5">
                    <h3 className="text-block-24 mb-3 primary-color fw-bold">
                      Contact Information
                    </h3>

                    {/* Dhaka Office */}
                    <div className="mb-4">
                      <strong>Dhaka Office</strong>
                      <p className="mb-2">{dhakaAddress}</p>
                    </div>

                    {/* Gazipur Office */}
                    <div className="mb-4">
                      <strong>Gazipur Office</strong>
                      <p className="mb-2">{gazipurAddress}</p>
                    </div>

                    {/* Contact Details */}
                    <ul className="list-unstyled mb-0">
                      <li className="mb-2">
                        <strong>Phone:</strong>
                        <Link
                          href={`tel:${phone}`}
                          className="ms-2 text-decoration-none primary-color"
                        >
                          {phone}
                        </Link>
                      </li>

                      <li className="mb-2">
                        <strong>Email:</strong>
                        <Link
                          href={`mailto:${email}`}
                          className="ms-2 text-decoration-none primary-color"
                        >
                          {email}
                        </Link>
                      </li>

                      <li className="mb-2">
                        <strong>Website:</strong>
                        <Link
                          href={website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ms-2 text-decoration-none primary-color"
                        >
                          {website.replace(/^https?:\/\//, "")}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
