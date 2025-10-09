"use client";

import OtpInput from "@/src/components/OtpInput";
import SubmitButton from "@/src/components/SubmitButton";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../hooks/api/AuthContext";
import Toast from "@/src/components/Toast";
import { useRouter } from "next/navigation";
import { LocalStoreContext } from "../../hooks/localstorage/LocalStoreContext";
import { getSiteHeaderData } from "../../helper/getSiteHeaderData";

const VerifyEmailWrapper = () => {
  const {
    verifyEmail,
    resendOtp,
    isMatchOtpLoading,
    isMatchOtpErrorMsg,
    isResendOtpSuccessMsg,
    isResendOtpLoading,
    setIsResendOtpSuccessMsg,
    setIsMatchOtpErrorMsg,
  } = useContext(AuthContext);

  const OTP_LENGTH = 6;
  const [otpValue, setOtpValue] = useState(new Array(OTP_LENGTH).fill(null));
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const { authIdentifier, allowVerifyEmail } = useContext(LocalStoreContext);

  const router = useRouter();

  useEffect(() => {
    if (!allowVerifyEmail || !authIdentifier) {
      router.push("/auth/login");
    }
  }, [router]);

  // Countdown timer effect
  useEffect(() => {
    if (resendTimer > 0) {
      const timerId = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  // Clear error automatically when OTP is complete
  useEffect(() => {
    if (!otpValue.includes(null) && otpValue.length === OTP_LENGTH) {
      setError("");
    }
  }, [otpValue]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otp = otpValue;

    if (otp.includes(null) || otp.length < OTP_LENGTH) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    setError("");

    try {
      const isRegisteredUser = await verifyEmail(otp);

      if (isRegisteredUser) {
        setOtpValue(new Array(OTP_LENGTH).fill(null));
        setError("");
      }
    } catch (error) {
      console.error("Email verification failed:", error);
    }
  };

  const handleResendOtp = async () => {
    try {
      const success = await resendOtp();
      if (success) {
        setResendTimer(120);
        setCanResend(false);
      }
    } catch (err) {
      console.error("Failed to resend OTP:", err);
    }
  };

  // Format timer as MM:SS
  const formatTimer = (seconds) => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <section className="section-gap">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="d-flex justify-content-center align-items-center">
              <div
                className="card shadow-sm p-5 w-100"
                style={{ maxWidth: "700px" }}
              >
                <h4 className="text-center mb-2 fw-bold">Verify Your Email</h4>
                <p className="text-center text-muted small mb-4">
                  Enter the 6-digit OTP sent to your email
                </p>

                <form className="w-100" onSubmit={handleSubmit}>
                  <OtpInput
                    length={OTP_LENGTH}
                    value={otpValue}
                    onChange={setOtpValue}
                  />

                  <Toast
                    message={error}
                    type="error"
                    onClose={() => setError("")}
                  />

                  <div className="d-flex justify-content-center flex-column align-items-center">
                    <Toast
                      message={isMatchOtpErrorMsg}
                      type="error"
                      onClose={() => setIsMatchOtpErrorMsg("")}
                    />

                    <Toast
                      message={isResendOtpSuccessMsg}
                      type="success"
                      onClose={() => setIsResendOtpSuccessMsg("")}
                    />

                    <SubmitButton
                      type="submit"
                      submitLoading={isMatchOtpLoading}
                      submitBtnDisabled={isMatchOtpLoading}
                    >
                      {isMatchOtpLoading ? "Processing" : "Verify"}
                    </SubmitButton>

                    {/* Resend OTP Section */}
                    <button
                      type="button"
                      className="btn btn-link mt-3"
                      disabled={!canResend || isResendOtpLoading}
                      onClick={handleResendOtp}
                      onMouseEnter={() => setIsHover(true)}
                      onMouseLeave={() => setIsHover(false)}
                      style={{
                        textDecoration: "none",
                        color: canResend ? "#fff" : "#555",
                        padding: "0.5rem 1.5rem",
                        borderRadius: "8px",
                        border: "none",
                        background: canResend
                          ? isResendOtpLoading
                            ? "#164f84"
                            : isHover
                            ? "linear-gradient(90deg, #164f84 0%, #0083bb 100%)"
                            : "#164f84"
                          : "#eee",
                        cursor:
                          canResend && !isResendOtpLoading
                            ? "pointer"
                            : "not-allowed",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {isResendOtpLoading
                        ? "Sending..."
                        : canResend
                        ? "Resend OTP"
                        : `Resend OTP in ${formatTimer(resendTimer)}`}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyEmailWrapper;
