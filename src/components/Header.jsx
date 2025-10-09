"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import Skeleton from "./Skeleton";
import { LocalStoreContext } from "../app/hooks/localstorage/LocalStoreContext";
import { AuthContext } from "../app/hooks/api/AuthContext";
import { isLoggedIn } from "../app/helper/auth";

const Header = ({ data }) => {
  const { authUserData } = useContext(LocalStoreContext);
  const { handleLogout } = useContext(AuthContext);
  const isLoggedInToken = isLoggedIn();

  const logoutSubmit = () => {
    handleLogout(isLoggedInToken);
  };

  if (!data) return <Skeleton type="header" />;

  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);

  const handleShow = () => setShowMenu(true);
  const handleClose = () => setShowMenu(false);

  useEffect(() => {
    const title = data?.site_title || "BookingXpart";
    localStorage.setItem("siteTitle", title);
  }, [data]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow-sm">
        <div className="container">
          <Link href="/" className="navbar-brand d-flex align-items-center">
            <img
              src={data?.logo_url || "/default-logo.png"}
              alt={data?.site_title || "BookingXpart"}
              style={{ height: "40px", marginRight: "10px" }}
            />
            <span>{data?.site_title || "BookingXpart"}</span>
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
          <div
            className="collapse navbar-collapse d-none d-lg-block"
            id="navbarNav"
          >
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
                  href="/checkout"
                  className={`nav-link ${
                    pathname === "/checkout" ? "active" : ""
                  }`}
                >
                  Checkout
                </Link>
              </li>

              {/* Dashboard + User name */}
              {isLoggedInToken && authUserData && (
                <>
                  <li className="nav-item">
                    <Link
                      href="/user/dashboard"
                      className={`nav-link ${
                        pathname === "/user/dashboard" ? "active" : ""
                      }`}
                    >
                      Dashboard
                    </Link>
                  </li>
                </>
              )}
            </ul>

            <div className="d-flex justify-content-center">
              {isLoggedInToken ? (
                <>
                  <button
                    className="btn secondary-bg custom-btn-style"
                    onClick={logoutSubmit}
                  >
                    Logout
                  </button>

                  {authUserData && (
                    <li className="nav-item d-flex align-items-center mt-2 ms-5">
                      <span
                        className="nav-link disabled"
                        style={{ color: "#7f8a96d8" }}
                      >
                        {authUserData?.f_name} {authUserData?.l_name}
                      </span>
                    </li>
                  )}
                </>
              ) : (
                <>
                  <Link href="/auth/signup">
                    <button
                      className="btn secondary-bg me-2 custom-btn-style"
                      type="button"
                    >
                      Sign Up
                    </button>
                  </Link>
                  <Link href="/auth/login">
                    <button className="btn primary-bg custom-btn-style">
                      Log In
                    </button>
                  </Link>
                </>
              )}
            </div>
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
          <Link href="/" className="navbar-brand d-flex align-items-center">
            <img
              src={data?.logo_url || "/default-logo.png"}
              alt={data?.site_title || "BookingXpart"}
              style={{ height: "30px", marginRight: "8px" }}
            />
            <span
              className="offcanvas-title"
              style={{ fontSize: "14px", fontWeight: "500" }}
            >
              {data?.site_title || "BookingXpart"}
            </span>
          </Link>

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
                className={`nav-link ${pathname === "/events" ? "active" : ""}`}
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
                href="/checkout"
                className={`nav-link ${
                  pathname === "/checkout" ? "active" : ""
                }`}
                onClick={handleClose}
              >
                Checkout
              </Link>
            </li>
            {isLoggedInToken && authUserData && (
              <>
                <li className="nav-item">
                  <Link
                    href="/user/dashboard"
                    className={`nav-link ${
                      pathname === "/user/dashboard" ? "active" : ""
                    }`}
                    onClick={handleClose}
                  >
                    Dashboard
                  </Link>
                </li>
              </>
            )}
          </ul>

          <div className="mt-3 text-center">
            {isLoggedInToken ? (
              <>
                <button
                  className="btn secondary-bg custom-btn-style"
                  onClick={logoutSubmit}
                >
                  Logout
                </button>

                {authUserData && (
                  <li className="nav-item d-flex align-items-center mt-3  justify-content-center">
                    <span
                      className="nav-link disabled"
                      style={{ color: "#7f8a96d8" }}
                    >
                      {authUserData?.f_name} {authUserData?.l_name}
                    </span>
                  </li>
                )}
              </>
            ) : (
              <>
                <Link href="/auth/signup">
                  <button className="btn secondary-bg me-2 custom-btn-style">
                    Sign Up
                  </button>
                </Link>
                <Link href="/auth/login">
                  <button className="btn primary-bg custom-btn-style">
                    Log In
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {showMenu && (
        <div
          className="offcanvas-backdrop fade show"
          onClick={handleClose}
        ></div>
      )}
    </>
  );
};

export default Header;
