"use client";

import { useState, useRef, useContext, useEffect } from "react";
import Link from "next/link";
import Toast from "@/src/components/Toast";
import { AuthContext } from "../../hooks/api/AuthContext";
import DashboardSidebar from "@/src/components/dashboard/DashboardSidebar";
import ProfileContent from "@/src/components/dashboard/ProfileContent";
import BookingHistoryContent from "@/src/components/dashboard/BookingHistoryContent ";
import SettingsContent from "@/src/components/dashboard/Settings";
import { LocalStoreContext } from "../../hooks/localstorage/LocalStoreContext";

export function DashboardWrapper() {
  const { authUserData } = useContext(LocalStoreContext);
  const { isLoginSuccessMsg, setIsLoginSuccessMsg } = useContext(AuthContext);
  const [activeSection, setActiveSection] = useState("profile");

  const profileRef = useRef(null);
  const bookingInfoRef = useRef(null);
  const settingsRef = useRef(null);

  const [avatarPreview, setAvatarPreview] = useState(null);
  const userImage = authUserData?.profile?.avatar_url;
  useEffect(() => {
    if (userImage) {
      setAvatarPreview(userImage);
    }
  }, [userImage]);

  const SCROLL_OFFSET = 90;

  // Sample bookings data
  const [bookings] = useState([
    {
      id: 1,
      resortName: "Sea View Resort",
      rooms: 2,
      startDate: "2025-10-12",
      endDate: "2025-10-15",
      price: 450,
      status: "Confirmed",
    },
    {
      id: 2,
      resortName: "Mountain Lodge",
      rooms: 1,
      startDate: "2025-11-01",
      endDate: "2025-11-03",
      price: 300,
      status: "Pending",
    },
  ]);

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
    <div
      className="container custom-container"
      style={{ maxWidth: "1800px", width: "100%" }}
    >
      <div className="row g-4">
        {/* Left Sidebar Navigation */}

        <DashboardSidebar
          activeSection={activeSection}
          handleNavClick={handleNavClick}
          profileRef={profileRef}
          bookingInfoRef={bookingInfoRef}
          settingsRef={settingsRef}
          userImage={userImage}
          setAvatarPreview={setAvatarPreview}
          avatarPreview={avatarPreview}
        />

        {/* Right Content */}
        <div className="col-md-8">
          {/* Profile Section */}
          <ProfileContent ref={profileRef} userData={authUserData} />

          {/* Booking History Section */}
          <BookingHistoryContent ref={bookingInfoRef} bookings={bookings} />

          {/* Settings Section */}
          <SettingsContent ref={settingsRef} userData={authUserData} />
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

export default DashboardWrapper;
