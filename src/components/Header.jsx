"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import Skeleton from "./Skeleton";
import { LocalStoreContext } from "../app/hooks/localstorage/LocalStoreContext";
import { AuthContext } from "../app/hooks/api/AuthContext";
import { isLoggedIn } from "../app/helper/auth";
import CartBadge from "./CartIcon";
import { HeaderContext } from "../app/hooks/api/HeaderContext";

const Header = () => {
  const { headerData, loading } = useContext(HeaderContext);
  const { authUserData } = useContext(LocalStoreContext);
  const { handleLogout } = useContext(AuthContext);
  const isLoggedInToken = isLoggedIn();
  console.log("headerData", headerData);
  const router = useRouter();
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = () => router.push("/user/dashboard");
  const logoutSubmit = () => handleLogout();
  const handleShow = () => setShowMenu(true);
  const handleClose = () => setShowMenu(false);

  useEffect(() => {
    if (headerData?.site_title) {
      localStorage.setItem("siteTitle", headerData.header_info?.site_title);
    }
  }, [headerData]);

  const profileImage = authUserData?.profile?.avatar_url;

  if (loading || !headerData) return <Skeleton type="header" />;

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow-sm">
        <div className="container">
          <Link href="/" className="navbar-brand d-flex align-items-center">
            <img
              src={headerData?.header_info?.logo_url || "/default-logo.png"}
              alt={headerData?.header_info?.site_title || "BookingXpert"}
              style={{ height: "40px", marginRight: "10px" }}
            />
            <span>{headerData?.header_info?.site_title || "BookingXpert"}</span>
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

          <div className="collapse navbar-collapse d-none d-lg-block">
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
                  href="/about"
                  className={`nav-link ${
                    pathname === "/about" ? "active" : ""
                  }`}
                >
                  About
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
              {isLoggedInToken && authUserData && (
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
              )}
            </ul>

            <div className="d-flex justify-content-center align-items-center gap-3">
              {isLoggedInToken && <CartBadge handleClose={handleClose} />}
              {isLoggedInToken ? (
                <>
                  <button
                    className="btn secondary-bg custom-btn-style"
                    onClick={() => {
                      logoutSubmit();
                      handleClose();
                    }}
                  >
                    Logout
                  </button>
                  {authUserData && (
                    <div className="d-flex align-items-center ms-3">
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt="Profile"
                          className="rounded-circle me-2"
                          style={{
                            width: "35px",
                            height: "35px",
                            objectFit: "cover",
                          }}
                        />
                      ) : authUserData?.profile?.gender === "male" ? (
                        <i
                          className="bi bi-person-fill me-2"
                          style={{ fontSize: "35px", color: "#7f8a96d8" }}
                        ></i>
                      ) : (
                        <i
                          className="bi bi-person-fill-up me-2"
                          style={{ fontSize: "35px", color: "#7f8a96d8" }}
                        ></i>
                      )}
                      <span
                        className="nav-link"
                        style={{
                          color: "#7f8a96d8",
                          cursor: "pointer",
                          transition: "color 0.3s",
                        }}
                        onClick={handleClick}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#000080")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "#7f8a96d8")
                        }
                      >
                        {authUserData?.f_name} {authUserData?.l_name}
                      </span>
                    </div>
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
      </nav>

      {/* Mobile Offcanvas */}
      <div
        className={`offcanvas offcanvas-start ${showMenu ? "show" : ""}`}
        tabIndex="-1"
      >
        <div className="offcanvas-header">
          <Link href="/" className="navbar-brand d-flex align-items-center">
            <img
              src={headerData?.logo_url || "/default-logo.png"}
              alt={headerData?.site_title || "BookingXpert"}
              style={{ height: "30px", marginRight: "8px" }}
            />
            <span
              className="offcanvas-title"
              style={{ fontSize: "14px", fontWeight: "500" }}
            >
              {headerData?.site_title || "BookingXpert"}
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
                href="/about"
                className={`nav-link ${pathname === "/about" ? "active" : ""}`}
                onClick={handleClose}
              >
                About
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
                <li className="nav-item mt-2 text-center">
                  <CartBadge handleClose={handleClose} />
                </li>
              </>
            )}
          </ul>
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
