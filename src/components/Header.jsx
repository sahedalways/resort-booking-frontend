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
import Image from "next/image";

const Header = () => {
  const { headerData, loading } = useContext(HeaderContext);
  const { authUserData } = useContext(LocalStoreContext);
  const { handleLogout } = useContext(AuthContext);
  const isLoggedInToken = isLoggedIn();

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
                    pathname === "/resorts/" ? "active" : ""
                  }`}
                >
                  Resorts
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/events"
                  className={`nav-link ${
                    pathname === "/events/" ? "active" : ""
                  }`}
                >
                  Events
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/about"
                  className={`nav-link ${
                    pathname === "/about/" ? "active" : ""
                  }`}
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  href="/contact"
                  className={`nav-link ${
                    pathname === "/contact/" ? "active" : ""
                  }`}
                >
                  Contact
                </Link>
              </li>
            </ul>

            <div className="d-flex justify-content-center align-items-center gap-3">
              {isLoggedInToken && <CartBadge setShowMenu={setShowMenu} />}
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
                      ) : authUserData?.profile?.gender == "Male" ? (
                        <Image
                          src="/img/male-profile.png"
                          alt="Male Profile"
                          width={35}
                          height={35}
                          className="rounded-circle me-2"
                        />
                      ) : authUserData?.profile?.gender === "Female" ? (
                        <Image
                          src="/img/female-profile.png"
                          alt="Female Profile"
                          width={35}
                          height={35}
                          className="rounded-circle me-2"
                        />
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
        <div className="offcanvas-header border-bottom py-3 px-4">
          <Link href="/" className="navbar-brand d-flex align-items-center">
            <img
              src={headerData?.header_info?.logo_url || "/default-logo.png"}
              alt={headerData?.header_info?.site_title || "BookingXpert"}
              style={{ height: "35px", marginRight: "10px" }}
            />
            <span className="fw-semibold" style={{ fontSize: "16px" }}>
              {headerData?.header_info?.site_title || "BookingXpert"}
            </span>
          </Link>
          <button
            type="button"
            className="btn-close text-reset shadow-none"
            onClick={handleClose}
          ></button>
        </div>

        <div className="offcanvas-body p-3">
          <ul className="navbar-nav flex-column gap-2">
            {/* Main Links */}
            {["/", "/resorts", "/events", "/about", "/contact"].map(
              (path, i) => {
                const titles = [
                  "Home",
                  "Resorts",
                  "Events",
                  "About",
                  "Contact",
                ];
                return (
                  <li className="nav-item" key={i}>
                    <Link
                      href={path}
                      className={`nav-link ${
                        pathname === path || pathname === `${path}/`
                          ? "active"
                          : ""
                      }`}
                      onClick={handleClose}
                      style={{
                        fontWeight: "500",
                        padding: "10px 15px",
                        borderRadius: "8px",
                        transition: "background 0.3s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#f0f0f5")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
                    >
                      {titles[i]}
                    </Link>
                  </li>
                );
              }
            )}

            {isLoggedInToken && authUserData && (
              <>
                {/* Cart */}
                <li className="nav-item mt-3 text-center">
                  <div
                    style={{
                      display: "inline-flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: pathname === "/user/cart/" ? "#28a745" : "#495057",
                      transition: "color 0.3s",
                      fontSize: "1.4rem",
                    }}
                  >
                    {isLoggedInToken && <CartBadge setShowMenu={setShowMenu} />}
                  </div>
                </li>

                {/* Profile Image */}
                <li className="nav-item mt-4 text-center">
                  <Link
                    href="/user/dashboard"
                    className="d-flex flex-column align-items-center text-decoration-none"
                  >
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="rounded-circle"
                        style={{
                          width: "45px",
                          height: "45px",
                          objectFit: "cover",
                        }}
                      />
                    ) : authUserData?.profile?.gender === "Male" ? (
                      <Image
                        src="/img/male-profile.png"
                        alt="Male Profile"
                        width={45}
                        height={45}
                        className="rounded-circle"
                      />
                    ) : authUserData?.profile?.gender === "Female" ? (
                      <Image
                        src="/img/female-profile.png"
                        alt="Female Profile"
                        width={45}
                        height={45}
                        className="rounded-circle"
                      />
                    ) : (
                      <i
                        className="bi bi-person-fill-up me-2"
                        style={{ fontSize: "35px", color: "#7f8a96d8" }}
                      ></i>
                    )}

                    <div
                      className="mt-2 fw-semibold"
                      style={{ fontSize: "14px" }}
                    >
                      {authUserData?.f_name} {authUserData?.l_name}
                    </div>
                  </Link>
                </li>

                {/* Logout / Cart Buttons */}
                <li className="nav-item mt-3 text-center d-flex justify-content-center gap-2">
                  <button
                    className="btn secondary-bg me-2 custom-btn-style"
                    onClick={() => {
                      logoutSubmit();
                      handleClose();
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

            {/* Guest Links */}
            {!isLoggedInToken && (
              <li className="nav-item mt-3 d-flex justify-content-center gap-2">
                <Link href="/auth/signup">
                  <button
                    className="btn secondary-bg me-2 custom-btn-style"
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    Sign Up
                  </button>
                </Link>
                <Link href="/auth/login">
                  <button
                    onClick={handleClose}
                    className="btn primary-bg custom-btn-style"
                  >
                    Log In
                  </button>
                </Link>
              </li>
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
