"use client";
import React from "react";

// eslint-disable-next-line react/display-name
const SettingsContent = React.forwardRef(({ user }, ref) => {
  return (
    <div ref={ref} className="profile-content-card mb-4">
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
          <span className="fw-semibold">{user?.email || "user@gmail.com"}</span>
        </li>

        {/* Phone */}
        <li className="list-group-item d-flex justify-content-between align-items-center">
          <span className="text-muted">Phone</span>
          <span className="fw-semibold">{user?.phone || "8800123456789"}</span>
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
  );
});

export default SettingsContent;
