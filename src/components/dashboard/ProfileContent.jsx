"use client";
import { DashboardContext } from "@/src/app/hooks/api/DashboardContext";
import React, { useContext, useEffect, useRef, useState } from "react";

import { toast } from "react-toastify";

// eslint-disable-next-line react/display-name
const ProfileContent = React.forwardRef(({ userData }, ref) => {
  const {
    saveProfileData,
    isSuccessMsg,
    isErrorMsg,
    isLoadingSubmitting,
    setIsErrorMsg,
    setIsSuccessMsg,
  } = useContext(DashboardContext);

  const [isEditMode, setIsEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    f_name: "",
    l_name: "",
    gender: "",
    present_address: "",
    permanent_address: "",
    marital_status: "",
    date_of_birth: "",
    national_id: "",
    nationality: "Bangladeshi",
    religion: "Islam",
  });

  useEffect(() => {
    if (userData) {
      setProfileData({
        f_name: userData?.f_name || "",
        l_name: userData?.l_name || "",
        gender: userData?.profile?.gender || "",
        present_address: userData?.profile?.present_address || "",
        permanent_address: userData?.profile?.permanent_address || "",
        marital_status: userData?.profile?.marital_status || "",
        date_of_birth: userData?.profile?.date_of_birth || "",
        national_id: userData?.profile?.national_id || "",
        nationality: "Bangladeshi",
        religion: userData?.profile?.religion || "Islam",
      });
    }
  }, [userData]);
  const [errors, setErrors] = useState({});

  const MAX_CHAR = {
    f_name: 50,
    l_name: 50,
    present_address: 100,
    permanent_address: 100,
    national_id: 17,
  };

  const handleInputChange = (field, value) => {
    // Validation: max length
    if (MAX_CHAR[field] && value.length > MAX_CHAR[field]) return;

    // Validation: numeric only for National ID
    if (field === "national_id" && value && !/^\d*$/.test(value)) return;

    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleEditMode = () => setIsEditMode((prev) => !prev);

  const saveProfile = async () => {
    // Simple validation example
    const newErrors = {};
    if (!profileData.f_name) newErrors.f_name = "First Name is required";
    if (!profileData.l_name) newErrors.l_name = "Last Name is required";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsEditMode(false);
      await saveProfileData(profileData);
    }
  };

  const successCalledRef = useRef(false);
  const errorCalledRef = useRef(false);

  useEffect(() => {
    if (isSuccessMsg && !successCalledRef.current) {
      toast.success(isSuccessMsg, { autoClose: 3000, theme: "colored" });
      setIsSuccessMsg("");
      successCalledRef.current = true;
    } else if (!isSuccessMsg) {
      successCalledRef.current = false;
    }
  }, [isSuccessMsg]);

  useEffect(() => {
    if (isErrorMsg && !errorCalledRef.current) {
      toast.error(isErrorMsg, { autoClose: 3000, theme: "colored" });
      setIsErrorMsg("");
      errorCalledRef.current = true;
    } else if (!isErrorMsg) {
      errorCalledRef.current = false;
    }
  }, [isErrorMsg]);

  const ContentHeader = ({ title, subtitle }) => (
    <div className="d-flex justify-content-between align-items-end pb-3 border-bottom mb-3">
      <div>
        <h3 className="card-title fw-bold mb-0">{title}</h3>
        <p className="text-muted mb-0 small">{subtitle}</p>
      </div>
      <div>
        {isEditMode ? (
          <>
            <button
              className="btn btn-sm me-2"
              onClick={saveProfile}
              style={{
                backgroundColor: "#164f84",
                borderColor: "#218838",
                color: "#fff",
              }}
              disabled={isLoadingSubmitting}
            >
              {isLoadingSubmitting ? (
                <span className="d-flex align-items-center">
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Saving...
                </span>
              ) : (
                "Save"
              )}
            </button>

            <button
              className="btn btn-secondary btn-sm"
              onClick={toggleEditMode}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className="btn btn-sm"
            onClick={toggleEditMode}
            style={{
              backgroundColor: "#0083bb",
              borderColor: "#164f84",
              color: "#fff",
            }}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
  const renderField = (
    label,
    field,
    type = "text",
    options = [],
    disabled = false
  ) => (
    <div className="d-flex justify-content-between profile-list-item mb-2 align-items-center">
      <span className="label-text col-6">{label}</span>
      <span className="value-text col-6 text-end">
        {isEditMode ? (
          type === "select" ? (
            <select
              className="form-select form-select-sm text-end"
              value={profileData[field] || ""}
              onChange={(e) => handleInputChange(field, e.target.value)}
              disabled={disabled} // disable if true
            >
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              className="form-control form-control-sm text-end"
              value={profileData[field] || ""}
              onChange={(e) => handleInputChange(field, e.target.value)}
            />
          )
        ) : (
          profileData[field] || "N/A"
        )}
        {errors[field] && (
          <small className="text-danger d-block text-end">
            {errors[field]}
          </small>
        )}
      </span>
    </div>
  );

  return (
    <div ref={ref} className="mb-4">
      <div className="profile-details profile-content-card mb-4 p-3 border rounded">
        <ContentHeader
          title="Profile"
          subtitle="Basic info, for a faster booking experience"
        />

        {renderField("First Name", "f_name")}
        {renderField("Last Name", "l_name")}
        {renderField("Gender", "gender", "select", ["Male", "Female", "Other"])}
        {renderField("Present Address", "present_address")}
        {renderField("Permanent Address", "permanent_address")}
        {renderField("Marital Status", "marital_status", "select", [
          "Single",
          "Married",
          "Divorced",
          "Widowed",
        ])}
        {renderField("Date of Birth", "date_of_birth", "date")}
        {renderField("National ID", "national_id", "text")}
        {renderField(
          "Nationality",
          "nationality",
          "select",
          ["Bangladeshi"],
          true
        )}

        {renderField("Religion", "religion", "select", [
          "Islam",
          "Hinduism",
          "Christianity",
          "Buddhism",
          "Other",
        ])}
      </div>
    </div>
  );
});

export default ProfileContent;
