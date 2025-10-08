"use client";
import React, { useState, useRef, useContext } from "react";
import Link from "next/link";
import Toast from "@/src/components/Toast";
import { AuthContext } from "../../hooks/api/AuthContext";

export function Dashboard() {
  const { isLoginSuccessMsg, setIsLoginSuccessMsg } = useContext(AuthContext);
  const [activeSection, setActiveSection] = useState("profile");

  const profileRef = useRef(null);
  const travelersRef = useRef(null);
  const settingsRef = useRef(null);

  const SCROLL_OFFSET = 90;

  const handleNavClick = (section, ref) => {
    setActiveSection(section);

    if (ref.current) {
      const elementTop = ref.current.getBoundingClientRect().top;

      const absoluteElementTop = elementTop + window.scrollY;

      const newScrollPosition = absoluteElementTop - SCROLL_OFFSET;

      window.scrollTo({
        top: newScrollPosition > 0 ? newScrollPosition : 0,
        behavior: "smooth",
      });
    }
  };

  const ContentHeader = ({ title, subtitle, showEdit = true }) => (
    <div className="d-flex justify-content-between align-items-end pb-3 border-bottom">
      <div>
        <h3 className="card-title fw-bold mb-0">{title}</h3>
        <p className="text-muted mb-0 small">{subtitle}</p>
      </div>
      {showEdit && (
        <Link
          href="#"
          className="secondary-color text-decoration-none text-block-16 py-0"
        >
          <i className="bi bi-pencil-fill edit-icon me-1"></i> Edit
        </Link>
      )}
    </div>
  );

  return (
    <div className="container custom-container">
      <div className="row g-4">
        {/* Left Sidebar Navigation (col-md-4) */}
        <div className="col-md-4 sidebar-card-wrapper">
          <div className="card sidebar-card">
            <div className="card-body d-flex flex-column align-items-center">
              {/* Avatar & Edit */}
              <div className="d-flex align-items-center mb-4 w-100 justify-content-center position-relative">
                <div className="avatar-container">
                  <i className="bi bi-person-fill avatar-icon"></i>
                </div>

                <Link
                  href="#"
                  className="text-decoration-none avatar-edit-btn secondary-color"
                >
                  <i className="bi bi-pencil-fill me-1"></i> Edit
                </Link>
              </div>

              <div className="my-4">
                <span className="badge custom-badge-style py-2 px-3 rounded-pill">
                  <i className="bi bi-shield-fill me-1"></i> Bronze
                </span>
              </div>

              {/* Navigation List */}
              <div className="w-100 text-start">
                <a
                  href="#profile"
                  className={`nav-link-custom ${
                    activeSection === "profile" ? "nav-link-active" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("profile", profileRef);
                  }}
                >
                  <i className="bi bi-person-circle"></i> Personal Info
                </a>

                <a
                  href="#travelers"
                  className={`nav-link-custom ${
                    activeSection === "travelers" ? "nav-link-active" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("travelers", travelersRef);
                  }}
                >
                  <i className="bi bi-people-fill"></i> Travelers
                </a>

                <a
                  href="#settings"
                  className={`nav-link-custom ${
                    activeSection === "settings" ? "nav-link-active" : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("settings", settingsRef);
                  }}
                >
                  <i className="bi bi-gear-fill"></i> Settings
                </a>

                <a href="#" className="nav-link-custom text-danger">
                  <i className="bi bi-box-arrow-right"></i> Log Out
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Profile Content (col-md-8) */}
        <div className="col-md-8">
          {/* 1. Profile Card (Personal Info) */}
          <div ref={profileRef} className="mb-4">
            {/* Profile Details List */}
            <div className="profile-details profile-content-card mb-4">
              <ContentHeader
                title="Profile"
                subtitle="Basic info, for a faster booking experience"
              />
              <div className="d-flex justify-content-between profile-list-item">
                <span className="label-text col-6">Name</span>
                <span className="value-text text-dark col-6 text-end">N/A</span>
              </div>
              <div className="d-flex justify-content-between profile-list-item">
                <span className="label-text col-6">Gender</span>
                <span className="value-text text-dark col-6 text-end">
                  Male
                </span>
              </div>
              <div className="d-flex justify-content-between profile-list-item">
                <span className="label-text col-6">Present Address</span>
                <span className="value-text text-dark col-6 text-end">N/A</span>
              </div>
              <div className="d-flex justify-content-between profile-list-item">
                <span className="label-text col-6">Permanent Address</span>
                <span className="value-text text-dark col-6 text-end">N/A</span>
              </div>

              <div className="d-flex justify-content-between profile-list-item">
                <span className="label-text col-6">Marital Status</span>
                <span className="value-text text-dark col-6 text-end">N/A</span>
              </div>
              <div className="d-flex justify-content-between profile-list-item">
                <span className="label-text col-6">Date of Birth</span>
                <span className="value-text text-dark col-6 text-end">N/A</span>
              </div>
              <div className="d-flex justify-content-between profile-list-item">
                <span className="label-text col-6">Passport Country</span>
                <span className="value-text text-dark col-6 text-end">
                  Bangladesh
                </span>
              </div>
              <div className="d-flex justify-content-between profile-list-item">
                <span className="label-text col-6">Passport Number</span>
                <span className="value-text text-dark col-6 text-end">N/A</span>
              </div>
              <div className="d-flex justify-content-between profile-list-item">
                <span className="label-text col-6">Passport Expiry Date</span>
                <span className="value-text text-dark col-6 text-end">N/A</span>
              </div>
              <div className="d-flex justify-content-between profile-list-item">
                <span className="label-text col-6">National ID</span>
                <span className="value-text text-dark col-6 text-end">N/A</span>
              </div>
              <div className="d-flex justify-content-between profile-list-item">
                <span className="label-text col-6">Nationality</span>
                <span className="value-text text-dark col-6 text-end">
                  Bangladesh
                </span>
              </div>
              <div className="d-flex justify-content-between profile-list-item">
                <span className="label-text col-6">Emergency Contact</span>
                <span className="value-text text-dark col-6 text-end">N/A</span>
              </div>
              <div className="d-flex justify-content-between profile-list-item">
                <span className="label-text col-6">Religion</span>
                <span className="value-text text-dark col-6 text-end">N/A</span>
              </div>
              <div className="d-flex justify-content-between profile-list-item">
                <span className="label-text col-6">Language Preference</span>
                <span className="value-text text-dark col-6 text-end">N/A</span>
              </div>
            </div>

            {/* Traveler Info Card */}
            <div ref={travelersRef} className="profile-content-card mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h3 className="card-title fw-bold mb-0">Traveler Info</h3>
                  <small className="text-muted">You have 1 traveler</small>
                </div>
              </div>

              <div className="border rounded p-3 mb-2">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h6 className="mb-1">
                      GoZayaan User
                      <span className="badge bg-light primary-color border ms-2">
                        Primary Traveler
                      </span>
                    </h6>
                    <small className="text-muted">
                      shawonmahmud5001@gmail.com
                    </small>
                  </div>
                </div>
              </div>

              <a
                href="#"
                className="primary-color small fw-medium text-decoration-none"
              >
                + Add traveller
              </a>
            </div>

            {/* Settings Card */}
            <div ref={settingsRef} className="profile-content-card mb-4">
              <div className="mb-3">
                <h3 className="card-title fw-bold mb-0">Settings</h3>
                <small className="text-muted">
                  Manage your email address, mobile number and password
                </small>
              </div>

              <ul className="list-group list-group-flush border rounded">
                {/* Email */}
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span className="text-muted">Email</span>
                  <span className="fw-semibold">user@gmail.com</span>
                </li>

                {/* Phone */}
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span className="text-muted">Phone</span>
                  <span className="fw-semibold">8800123456789</span>
                </li>

                {/* Password */}
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span className="text-muted">Password</span>
                  <a href="#" className="primary-color fw-semibold">
                    Change Password ?
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Toast
        message={isLoginSuccessMsg}
        type="success"
        onClose={() => setIsLoginSuccessMsg("")}
      />
    </div>
  );
}

const App = () => (
  <div className="app-background">
    <Dashboard />
  </div>
);

export default App;
