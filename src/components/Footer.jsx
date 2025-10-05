import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
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
                <Link href="/events" className="text-dark">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-dark">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-dark">
                  Customer Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-dark">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5 className="text-uppercase">Services</h5>
            <ul className="list-unstyled mb-0 d-grid gap-1">
              <li>
                <Link href="/" className="text-dark">
                  Resorts
                </Link>
              </li>
              <li>
                <Link href="/resorts" className="text-dark">
                  Event
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-dark">
                  Trips
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-dark">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5 className="text-uppercase">Contact</h5>
            <ul className="list-unstyled mb-0 d-grid gap-1">
              <li>
                <Link href="tel:+8801877556633" className="text-dark">
                  <i className="bi bi-telephone-fill me-2"></i>
                  +8801877556633
                </Link>
              </li>
              <li>
                <Link href="mailto:info@bookingxpart.com" className="text-dark">
                  <i className="bi bi-envelope-fill me-2"></i>
                  info@bookingxpart.com
                </Link>
              </li>
              <li className="mt-2 contact-social-links">
                <Link href="https://facebook.com" className="text-dark me-3">
                  <i className="bi bi-facebook"></i>
                </Link>
                <Link href="https://twitter.com" className="text-dark me-3">
                  <i className="bi bi-twitter"></i>
                </Link>
                <Link href="https://instagram.com" className="text-dark me-3">
                  <i className="bi bi-instagram"></i>
                </Link>
                <Link href="https://youtube.com" className="text-dark">
                  <i className="bi bi-youtube"></i>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5 className="text-uppercase">We accept</h5>
            <div className="payment-grid">
              <Image width={100} height={60} src="/img/bkash.png" alt="Bkash" className="payment-icon" />
              <Image width={100} height={60} src="/img/nagad.png" alt="Nagad" className="payment-icon" />
              <Image
              width={100} height={60}
                src="/img/rocket.png"
                alt="Rocket"
                className="payment-icon"
              />
              <Image width={100} height={60} src="/img/Upay.png" alt="Upai" className="payment-icon" />
            </div>
          </div>
        </div>

        <div className="row mt-3 pt-3 border-top g-4">
          <div className="col-lg-3 col-md-6">
            <div className="contact-card">
              <h5>BookingXpart (Dhaka)</h5>
              <p>
                6th Floor, House 168,
                <br />
                Block B, Sayednagar
                <br />
                Gulshan, Dhaka 1212,
                <br />
                Bangladesh
              </p>
              <Link href="#" className="map-link">
                <i className="bi bi-geo-alt-fill"></i> View Map
              </Link>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="contact-card">
              <h5>Gazipur Office</h5>
              <p>
               6th Floor, House 168, <br /> Block B, Sayednagar <br /> Gulsan, Dhaka 1212, <br /> Bangladesh
              </p>
              <Link href="#" className="map-link">
                <i className="bi bi-geo-alt-fill"></i> View Map
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;