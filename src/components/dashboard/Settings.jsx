"use client";
import { DashboardContext } from "@/src/app/hooks/api/DashboardContext";
import React, { useContext, useEffect, useState } from "react";

import SubmitButton from "../SubmitButton";
import InputField from "../InputField";
import { toast } from "react-toastify";

// eslint-disable-next-line react/display-name
const SettingsContent = React.forwardRef(({ userData }, ref) => {
  const {
    changePassword,
    isSuccessMsg,
    isErrorMsg,
    isLoadingSubmitting,
    setIsErrorMsg,
    setIsSuccessMsg,
  } = useContext(DashboardContext);

  const [isEditing, setIsEditing] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const newErrors = {};

    // Current Password
    if (!passwordData.current_password) {
      newErrors.current_password = "Current password is required";
    } else if (passwordData.current_password.length > 20) {
      newErrors.current_password =
        "Current password cannot exceed 20 characters";
    }

    // New Password
    if (!passwordData.new_password) {
      newErrors.new_password = "New password is required";
    } else if (passwordData.new_password.length < 8) {
      newErrors.new_password = "Password must be at least 8 characters";
    } else if (passwordData.new_password.length > 20) {
      newErrors.new_password = "Password cannot exceed 20 characters";
    }

    // Confirm Password
    if (passwordData.new_password !== passwordData.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
    } else if (passwordData.confirm_password.length > 20) {
      newErrors.confirm_password = "Password cannot exceed 20 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Validate fields first
    if (!validate()) return;

    try {
      const success = await changePassword(passwordData);

      if (success) {
        setPasswordData({
          current_password: "",
          new_password: "",
          confirm_password: "",
        });
        setIsEditing(false);
        setIsSuccessMsg("Password updated successfully!");
      }
    } catch (error) {
      setIsErrorMsg(error.message || "Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    if (isSuccessMsg) {
      toast.success(isSuccessMsg, { autoClose: 3000 });
      setIsSuccessMsg("");
    }
  }, [isSuccessMsg]);

  useEffect(() => {
    if (isErrorMsg) {
      toast.error(isErrorMsg, { autoClose: 3000 });
      setIsErrorMsg("");
    }
  }, [isErrorMsg]);

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
          <span className="fw-semibold">
            {userData?.email || "user@gmail.com"}
          </span>
        </li>

        {/* Phone */}
        <li className="list-group-item d-flex justify-content-between align-items-center">
          <span className="text-muted">Phone</span>
          <span className="fw-semibold">
            {userData?.phone_no || "8800123456789"}
          </span>
        </li>

        <li className="list-group-item">
          {!isEditing ? (
            <div className="d-flex justify-content-between align-items-center">
              <span className="text-muted">Password</span>
              <button
                className="btn btn-link p-0 m-0 fw-semibold primary-color"
                onClick={() => setIsEditing(true)}
              >
                Change Password ?
              </button>
            </div>
          ) : (
            <form onSubmit={handleSave} className="w-100">
              <div>
                <div className="mb-2">
                  <InputField
                    label="Current Password"
                    type="password"
                    name="current_password"
                    value={passwordData.current_password}
                    onChange={(e) =>
                      handleChange("current_password", e.target.value)
                    }
                    placeholder="Current Password"
                    error={errors.current_password}
                    isRequired={true}
                  />
                </div>

                <div className="mb-2">
                  <InputField
                    label="New Password"
                    type="password"
                    placeholder="New Password"
                    name="new_password"
                    error={errors.new_password}
                    value={passwordData.new_password}
                    onChange={(e) =>
                      handleChange("new_password", e.target.value)
                    }
                    isRequired={true}
                  />
                </div>

                <div className="mb-2">
                  <InputField
                    label="Retype Password"
                    type="password"
                    placeholder="Confirm New Password"
                    name="confirm_password"
                    value={passwordData.confirm_password}
                    onChange={(e) =>
                      handleChange("confirm_password", e.target.value)
                    }
                    isRequired={true}
                    error={errors.confirm_password}
                  />
                </div>
                <div className="d-flex justify-content-center gap-2">
                  <SubmitButton
                    type="button"
                    onClick={() => setIsEditing(false)}
                    submitBtnDisabled={false}
                    submitLoading={false}
                    variant="danger"
                  >
                    Cancel
                  </SubmitButton>
                  <SubmitButton
                    type="submit"
                    submitLoading={isLoadingSubmitting}
                    submitBtnDisabled={isLoadingSubmitting}
                  >
                    {isLoadingSubmitting ? "Updating..." : "Change Password"}
                  </SubmitButton>
                </div>
              </div>
            </form>
          )}
        </li>
      </ul>
    </div>
  );
});

export default SettingsContent;
