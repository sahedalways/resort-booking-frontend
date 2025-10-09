"use client";

import { useContext, useState } from "react";
import SubmitButton from "../SubmitButton";
import { DashboardContext } from "@/src/app/hooks/api/DashboardContext";
import Toast from "../Toast";
import { AuthContext } from "@/src/app/hooks/api/AuthContext";

const DashboardSidebar = ({
  activeSection,
  handleNavClick,
  profileRef,
  bookingInfoRef,
  settingsRef,
  userImage,
  setAvatarPreview,
  avatarPreview,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    changeAvatar,
    isSuccessMsg,
    isErrorMsg,
    isLoadingSubmitting,
    setIsErrorMsg,
    setIsSuccessMsg,
  } = useContext(DashboardContext);

  const { handleLogout } = useContext(AuthContext);

  // Open modal
  const handleAvatarClick = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setAvatarPreview(userImage);
    setIsModalOpen(false);
  };

  // Select file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  // Upload to backend
  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    await changeAvatar(formData);
    setIsModalOpen(false);
  };

  const logoutSubmit = () => {
    handleLogout();
  };

  return (
    <div className="col-md-4 sidebar-card-wrapper">
      <div className="card sidebar-card">
        <div className="card-body d-flex flex-column align-items-center">
          {/* Avatar & Edit */}
          <div className="d-flex align-items-center mb-4 w-100 justify-content-center position-relative">
            <div
              className="avatar-container"
              style={{
                backgroundImage: avatarPreview ? `url(${avatarPreview})` : "",
                backgroundSize: "cover",
                backgroundPosition: "center",
                cursor: "pointer",
              }}
            >
              {!avatarPreview && (
                <i className="bi bi-person-fill avatar-icon"></i>
              )}
            </div>

            <button
              type="button"
              onClick={handleAvatarClick}
              className="text-decoration-none avatar-edit-btn secondary-color btn btn-link"
            >
              <i className="bi bi-pencil-fill me-1"></i> Edit
            </button>
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
              href="#booking-info"
              className={`nav-link-custom ${
                activeSection === "booking-info" ? "nav-link-active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("booking-info", bookingInfoRef);
              }}
            >
              <i className="bi bi-people-fill"></i> Booking History
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

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                logoutSubmit();
              }}
              className="nav-link-custom text-danger"
              style={{ cursor: "pointer" }}
            >
              <i className="bi bi-box-arrow-right"></i> Log Out
            </a>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Upload Avatar</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCancel}
                ></button>
              </div>
              <form onSubmit={handleUpload} className="w-100">
                <div className="modal-body text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  {avatarPreview && (
                    <div
                      className="mt-3"
                      style={{
                        width: "100px",
                        height: "100px",
                        margin: "0 auto",
                        borderRadius: "50%",
                        backgroundImage: `url(${avatarPreview})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  )}
                </div>
                <div className="modal-footer d-flex justify-content-between">
                  {/* Cancel Button */}
                  <SubmitButton
                    type="button"
                    onClick={handleCancel}
                    submitBtnDisabled={false}
                    submitLoading={false}
                    variant="danger"
                  >
                    Cancel
                  </SubmitButton>

                  <SubmitButton
                    type="submit"
                    onClick={handleUpload}
                    submitBtnDisabled={isLoadingSubmitting}
                    submitLoading={isLoadingSubmitting}
                  >
                    {isLoadingSubmitting ? "Uploading..." : "Change"}
                  </SubmitButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <Toast
        message={isSuccessMsg}
        type="success"
        onClose={() => setIsSuccessMsg("")}
      />

      <Toast
        message={isErrorMsg}
        type="error"
        onClose={() => setIsErrorMsg("")}
      />
    </div>
  );
};

export default DashboardSidebar;
