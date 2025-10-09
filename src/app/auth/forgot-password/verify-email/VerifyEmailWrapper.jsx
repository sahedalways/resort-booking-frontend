"use client";

import { getSiteHeaderData } from "@/src/app/helper/getSiteHeaderData";
import { AuthContext } from "@/src/app/hooks/api/AuthContext";
import { LocalStoreContext } from "@/src/app/hooks/localstorage/LocalStoreContext";
import OtpInput from "@/src/components/OtpInput";
import SubmitButton from "@/src/components/SubmitButton";
import Toast from "@/src/components/Toast";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const VerifyEmailWrapper = () => {
  const {
    verifyEmailForForgotPassword,

    isMatchOtpLoading,
    isMatchOtpErrorMsg,
    isResendOtpSuccessMsg,

    setIsResendOtpSuccessMsg,
    setIsMatchOtpErrorMsg,
  } = useContext(AuthContext);

  const OTP_LENGTH = 6;
  const [otpValue, setOtpValue] = useState(new Array(OTP_LENGTH).fill(null));
  const [error, setError] = useState("");

  const { authIdentifier, allowVerifyEmail } = useContext(LocalStoreContext);

  const router = useRouter();

  useEffect(() => {
    if (!allowVerifyEmail || !authIdentifier) {
      router.push("/auth/login");
    }
  }, [router]);

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
      const isRegisteredUser = await verifyEmailForForgotPassword(otp);

      if (isRegisteredUser) {
        setOtpValue(new Array(OTP_LENGTH).fill(null));
        setError("");
      }
    } catch (error) {
      console.error("Email verification failed:", error);
    }
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
                <p className="text-center text-muted small mb-2">
                  Enter the 6-digit OTP sent to your email.
                </p>
                <p className="text-center text-danger small mb-4">
                  ⚠️ This OTP will expire in <strong>2 minutes</strong>.
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
