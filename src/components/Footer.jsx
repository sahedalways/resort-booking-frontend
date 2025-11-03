"use client";

import Image from "next/image";
import Link from "next/link";
import Skeleton from "./Skeleton";
import { isLoggedIn } from "../app/helper/auth";

import { useContext } from "react";
import { FooterContext } from "../app/hooks/api/FooterContext";

const Footer = () => {
  const { footerData, loading } = useContext(FooterContext);

  if (loading) return <Skeleton type="footer" />;
  const contact_info = footerData?.contact_info;
  const social_info = footerData?.social_info;
  const site_info = footerData?.site_info;
  const isLoggedInToken = isLoggedIn();

  return (
    <footer className="footer text-center text-lg-start mt-auto">
      <div className="container p-4">
        <div className="row g-4 mb-3 pb-3">
          <div className="col-lg-3 col-md-6">
            <h5 className="text-uppercase">Discover</h5>
            <ul className="list-unstyled mb-0 d-grid gap-1">
              <li>
                <Link href="/" className="text-dark">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-dark">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-dark">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-dark">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-dark">
                  Refund Policy
                </Link>
              </li>
              {isLoggedInToken && (
                <li>
                  <Link href="/user/dashboard" className="text-dark">
                    Dashboard
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5 className="text-uppercase">Services</h5>
            <ul className="list-unstyled mb-0 d-grid gap-1">
              <li>
                <Link href="/resorts" className="text-dark">
                  Resorts
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-dark">
                  Events
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5 className="text-uppercase">Contact</h5>
            <ul className="list-unstyled mb-0 d-grid gap-1">
              <li>
                <Link href={`tel:${contact_info?.phone}`} className="text-dark">
                  <i className="bi bi-telephone-fill me-2"></i>
                  {contact_info?.phone}
                </Link>
              </li>
              <li>
                <Link
                  href={`mailto:${contact_info?.email}`}
                  className="text-dark"
                >
                  <i className="bi bi-envelope-fill me-2"></i>
                  {contact_info?.email}
                </Link>
              </li>
              <li className="mt-2 contact-social-links">
                {social_info?.facebook && (
                  <Link href={social_info.facebook} className="text-dark me-3">
                    <i className="bi bi-facebook"></i>
                  </Link>
                )}
                {social_info?.twitter && (
                  <Link href={social_info.twitter} className="text-dark me-3">
                    <i className="bi bi-twitter"></i>
                  </Link>
                )}
                {social_info?.instagram && (
                  <Link href={social_info.instagram} className="text-dark me-3">
                    <i className="bi bi-instagram"></i>
                  </Link>
                )}
                {social_info?.youtube && (
                  <Link href={social_info.youtube} className="text-dark">
                    <i className="bi bi-youtube"></i>
                  </Link>
                )}
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h5 className="text-uppercase">We accept</h5>
            <div className="payment-grid">
              <Image
                width={100}
                height={60}
                src="/img/bkash.png"
                alt="Bkash"
                className="payment-icon"
              />
            </div>
          </div>
        </div>

        <div className="row mt-3 pt-3 border-top g-4">
          {/* Dhaka Office */}
          <div className="col-lg-3 col-md-6">
            <div className="contact-card">
              <h5>Dhaka Office</h5>
              <p>{contact_info?.dhaka_office_address}</p>
              <Link
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  contact_info?.dhaka_office_address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="map-link"
              >
                <i className="bi bi-geo-alt-fill"></i> View Map
              </Link>
            </div>
          </div>

          {/* Gazipur Office */}
          <div className="col-lg-3 col-md-6">
            <div className="contact-card">
              <h5>Gazipur Office</h5>
              <p>{contact_info?.gazipur_office_address}</p>
              <Link
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  contact_info?.gazipur_office_address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="map-link"
              >
                <i className="bi bi-geo-alt-fill"></i> View Map
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-3 pt-3 border-top">
          <small>
            {site_info?.copyright_text ? (
              <>
                {site_info.copyright_text
                  .split("BookingXpert")
                  .map((part, index, arr) => (
                    <span key={index}>
                      {part}
                      {index < arr.length - 1 && (
                        <a
                          href="http://bookingxpert.org"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "#305fa5", textDecoration: "none" }}
                        >
                          BookingXpert
                        </a>
                      )}
                    </span>
                  ))}
              </>
            ) : null}
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
