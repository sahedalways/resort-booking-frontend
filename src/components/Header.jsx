'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";

const Header = () => {
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);

  const handleShow = () => setShowMenu(true);
  const handleClose = () => setShowMenu(false);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow-sm">
        <div className="container">
          <Link href="/" className="navbar-brand">
            BookingXpart
          </Link>
          <button
            className="navbar-toggler d-lg-none shadow-none"
            type="button"
            onClick={handleShow}
          >
            <span className="navbar-toggler-icon">
              <Icon icon="garden:menu-fill-16" width="24" height="24" />
            </span>
          </button>
          <div className="collapse navbar-collapse d-none d-lg-block" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link
                  href="/"
                  className={`nav-link ${pathname === "/" ? "active" : ""}`}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/resorts"
                  className={`nav-link ${
                    pathname === "/resorts" ? "active" : ""
                  }`}
                >
                  Resorts
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/events"
                  className={`nav-link ${
                    pathname === "/events" ? "active" : ""
                  }`}
                >
                  Events
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/contact"
                  className={`nav-link ${
                    pathname === "/contact" ? "active" : ""
                  }`}
                >
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/dashboard"
                  className={`nav-link ${
                    pathname === "/dashboard" ? "active" : ""
                  }`}
                >
                  Dashboard
                </Link>
              </li>
            </ul>
            {pathname !== "/dashboard" && (
            <div className="d-flex justify-content-center">
              <button className="btn secondary-bg me-2 custom-btn-style" type="button">
                Book
              </button>
              <Link href="/login" className="btn primary-bg custom-btn-style">
                Log In
              </Link>
            </div>
            )}
          </div>
        </div>
      </nav>

      <div
        className={`offcanvas offcanvas-start ${showMenu ? "show" : ""}`}
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            BookingXpart
          </h5>
          <button
            type="button"
            className="btn-close text-reset shadow-none"
            onClick={handleClose}
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                href="/"
                className={`nav-link ${pathname === "/" ? "active" : ""}`}
                onClick={handleClose}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/resorts"
                className={`nav-link ${
                  pathname === "/resorts" ? "active" : ""
                }`}
                onClick={handleClose}
              >
                Resorts
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/events"
                className={`nav-link ${
                  pathname === "/events" ? "active" : ""
                }`}
                onClick={handleClose}
              >
                Events
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/contact"
                className={`nav-link ${
                  pathname === "/contact" ? "active" : ""
                }`}
                onClick={handleClose}
              >
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/dashboard"
                className={`nav-link ${
                  pathname === "/dashboard" ? "active" : ""
                }`}
                onClick={handleClose}
              >
                Dashboard
              </Link>
            </li>
          </ul>
          {pathname !== "/dashboard" && (
          <div className="mt-3 text-center">
            <button className="btn secondary-bg me-2 custom-btn-style" type="button">
              Book
            </button>
            <Link href="/login" className="btn primary-bg custom-btn-style">
              Log In
            </Link>
          </div>
          )}
        </div>
      </div>

      {showMenu && <div className="offcanvas-backdrop fade show" onClick={handleClose}></div>}
    </>
  );
};

export default Header;