"use client";
import React from "react";

// eslint-disable-next-line react/display-name
const ProfileContent = React.forwardRef(({ userData }, ref) => {
  const ContentHeader = ({ title, subtitle }) => (
    <div className="d-flex justify-content-between align-items-end pb-3 border-bottom">
      <div>
        <h3 className="card-title fw-bold mb-0">{title}</h3>
        <p className="text-muted mb-0 small">{subtitle}</p>
      </div>
    </div>
  );

  const profile = userData?.profile || {};

  const getValue = (value) => value || "N/A";

  return (
    <div ref={ref} className="mb-4">
      <div className="profile-details profile-content-card mb-4">
        <ContentHeader
          title="Profile"
          subtitle="Basic info, for a faster booking experience"
        />

        <div className="d-flex justify-content-between profile-list-item">
          <span className="label-text col-6">First Name</span>
          <span className="value-text text-dark col-6 text-end">
            {getValue(userData?.f_name)}
          </span>
        </div>

        <div className="d-flex justify-content-between profile-list-item">
          <span className="label-text col-6">Last Name</span>
          <span className="value-text text-dark col-6 text-end">
            {getValue(userData?.l_name)}
          </span>
        </div>

        <div className="d-flex justify-content-between profile-list-item">
          <span className="label-text col-6">Gender</span>
          <span className="value-text text-dark col-6 text-end">
            {getValue(profile?.gender)}
          </span>
        </div>

        <div className="d-flex justify-content-between profile-list-item">
          <span className="label-text col-6">Present Address</span>
          <span className="value-text text-dark col-6 text-end">
            {getValue(profile?.present_address)}
          </span>
        </div>

        <div className="d-flex justify-content-between profile-list-item">
          <span className="label-text col-6">Permanent Address</span>
          <span className="value-text text-dark col-6 text-end">
            {getValue(profile?.permanent_address)}
          </span>
        </div>

        <div className="d-flex justify-content-between profile-list-item">
          <span className="label-text col-6">Marital Status</span>
          <span className="value-text text-dark col-6 text-end">
            {getValue(profile?.marital_status)}
          </span>
        </div>

        <div className="d-flex justify-content-between profile-list-item">
          <span className="label-text col-6">Date of Birth</span>
          <span className="value-text text-dark col-6 text-end">
            {getValue(profile?.date_of_birth)}
          </span>
        </div>

        <div className="d-flex justify-content-between profile-list-item">
          <span className="label-text col-6">National ID</span>
          <span className="value-text text-dark col-6 text-end">
            {getValue(profile?.national_id)}
          </span>
        </div>

        <div className="d-flex justify-content-between profile-list-item">
          <span className="label-text col-6">Nationality</span>
          <span className="value-text text-dark col-6 text-end">
            {getValue(profile?.nationality)}
          </span>
        </div>

        <div className="d-flex justify-content-between profile-list-item">
          <span className="label-text col-6">Religion</span>
          <span className="value-text text-dark col-6 text-end">
            {getValue(profile?.religion)}
          </span>
        </div>
      </div>
    </div>
  );
});

export default ProfileContent;
