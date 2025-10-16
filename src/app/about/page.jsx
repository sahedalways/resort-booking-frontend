"use client";

import { useEffect, useState } from "react";
import fetchHeaderData from "../services/headerService";
import Link from "next/link";

const AboutUs = () => {
  const [siteTitle, setSiteTitle] = useState("BookingXpart");

  useEffect(() => {
    const fetchTitle = async () => {
      const data = await fetchHeaderData();
      setSiteTitle(data?.header_info?.site_title || "BookingXpart");
      document.title = `${
        data?.header_info?.site_title || "BookingXpart"
      } | About Us`;
    };

    fetchTitle();
  }, []);

  return (
    <section className="section-gap-sm about-sec">
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto">
            <div className="card border-0">
              <div className="card-body p-4">
                <div>
                  <div className="mb-lg-5 mb-md-4">
                    <h3 className="text-block-24 fw-bold mb-3 primary-color">
                      About us
                    </h3>
                    <p className="mb-3">
                      In 2017, a small spark lit up a bold vision-to make travel
                      accessible for everyone, everywhere.This vision gave life
                      to GoZayaan, a name now synonymous with seamless travel
                      experiences.
                    </p>
                    <p className="mb-3">
                      Imagine this: a company where every impossible challenge
                      transforms into an opportunity for growth. Today, this
                      spirit fuels our rapid expansion, connecting travelers
                      across borders, with operations spanning Singapore,
                      Pakistan, and our home, Bangladesh.
                    </p>

                    <p className="mb-3">
                      GoZayaan isn't just about growth-it's about impact.
                      Together, we've built a platform that empowers you to
                      explore the world effortlessly. Our mission is simple: to
                      make travel stress-free, transparent, and accessible.
                      Whether you're looking for expert consultation or need
                      assistance at any hour-you can get it through our
                      experience center, 24/7 hotline, social media, email, or
                      chat. We are here to make your journey as smooth as
                      possible.
                    </p>

                    <p className="mb-3">
                      At GoZayaan, innovation and technology are at the heart of
                      what we do. Our user-friendly platform is designed to
                      simplify travel planning by offering real-time pricing,
                      exclusive deals, and customized solutions. From flights
                      and hotels to customized tours and visa services, we open
                      the door to limitless possibilities.
                    </p>
                    <p className="mb-3">
                      As one of Bangladesh's leading OTA (Online Travel Agency)
                      platforms, we are committed to redefining the way you
                      travel. We believe that dreams aren't just meant to be
                      dreamed-they're meant to be lived. Together, let's make
                      every journey a seamless story worth telling.
                    </p>
                  </div>

                  <div className="mb-lg-5 mb-md-4">
                    <h3 className="text-block-24 mb-3 primary-color fw-bold">
                      Our Offices
                    </h3>

                    <div className="mb-3">
                      <strong>Dhaka Office</strong>
                      <p>
                        6th Floor, House 168, Block B, Sayednagar Gulsan, Dhaka
                        1212, Bangladesh
                      </p>
                    </div>

                    <div className="mb-3">
                      <strong>Gazipur Office</strong>
                      <p>
                        6th Floor, House 168, Block B, Sayednagar Gulsan, Dhaka
                        1212, Bangladesh
                      </p>
                      <ul>
                        <li className="mb-1">
                          <strong>Email:</strong>
                          <Link
                            className="ms-2 text-decoration-none primary-color"
                            href="mailto:info@bookingxpart.com"
                          >
                            info@bookingxpart.com
                          </Link>
                        </li>
                        <li className="mb-1">
                          <strong>Phone:</strong>
                          <Link
                            className="ms-2 text-decoration-none primary-color"
                            href="tel:+8801877556633"
                          >
                            +8801877556633
                          </Link>
                        </li>
                        <li className="mb-1">
                          <strong>Visit:</strong>
                          <Link
                            className="ms-2 text-decoration-none primary-color"
                            href="https://www.gozayaan.com"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            www.bookingxpart.com
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-block-24 mb-3 primary-color fw-bold">
                      Governance and Compliance
                    </h3>

                    <p>
                      GoZayaan is a global enterprise, governed by the Singapore
                      Travel Agents Act 1975 and Singapore Travel Agents
                      Regulations 2017. All services are operated under the laws
                      of Singapore, ensuring compliance and transparency across
                      its platforms.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
