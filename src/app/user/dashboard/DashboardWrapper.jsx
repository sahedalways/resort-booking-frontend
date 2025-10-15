"use client";

import { useState, useRef, useContext, useEffect } from "react";
import { AuthContext } from "../../hooks/api/AuthContext";
import DashboardSidebar from "@/src/components/dashboard/DashboardSidebar";
import ProfileContent from "@/src/components/dashboard/ProfileContent";
import BookingHistoryContent from "@/src/components/dashboard/BookingHistoryContent ";
import SettingsContent from "@/src/components/dashboard/Settings";
import { LocalStoreContext } from "../../hooks/localstorage/LocalStoreContext";
import { toast } from "react-toastify";
import { DashboardContext } from "../../hooks/api/DashboardContext";

export function DashboardWrapper() {
  const { getProfileOverview, bookingData, profileData, isLoading } =
    useContext(DashboardContext);
  const { authUserData } = useContext(LocalStoreContext);
  const { isLoginSuccessMsg, setIsLoginSuccessMsg } = useContext(AuthContext);
  const [activeSection, setActiveSection] = useState("profile");

  useEffect(() => {
    getProfileOverview();
  }, []);
  console.log("profileData555", profileData);
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

  const calledRef = useRef(false);

  useEffect(() => {
    if (isLoginSuccessMsg && !calledRef.current) {
      toast.success(isLoginSuccessMsg, { autoClose: 3000, theme: "colored" });
      setIsLoginSuccessMsg("");
      calledRef.current = true;
    }
  }, [isLoginSuccessMsg]);

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
          <ProfileContent
            ref={profileRef}
            userData={authUserData}
            savedProfileInfo={profileData}
            isLoading={isLoading}
          />

          {/* Booking History Section */}
          <BookingHistoryContent
            ref={bookingInfoRef}
            isLoading={isLoading}
            bookingData={bookingData}
          />

          {/* Settings Section */}
          <SettingsContent ref={settingsRef} userData={authUserData} />
        </div>
      </div>
    </div>
  );
}

export default DashboardWrapper;
