"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSiteData } from "../hooks/SiteDataContext";
import ParallaxHero from "@/src/components/ParallaxHero";

const AboutUs = () => {
  const { headerData, footerData } = useSiteData();

  const siteTitle = headerData?.header_info?.site_title || "BookingXpart";
  const contactInfo = footerData?.contact_info || {};
  const dhakaAddress =
    contactInfo?.dhaka_office_address ||
    "6th Floor, House 168, Block B, Sayednagar, Gulshan, Dhaka 1212, Bangladesh";
  const gazipurAddress =
    contactInfo?.gazipur_office_address ||
    "Plot 12, Shafipur Main Road, Kaliakoir, Gazipur, Bangladesh";
  const phone = contactInfo?.phone || "+8801877556633";
  const email = contactInfo?.email || "info@bookingxpart.org";
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
      <section className="section-gap-sm about-sec py-5">
        <div className="container">
          <div className="row">
            <div className="col-10 mx-auto">
              <div className=" border-0 shadow-sm">
                <div className=" p-4 p-md-5">
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
