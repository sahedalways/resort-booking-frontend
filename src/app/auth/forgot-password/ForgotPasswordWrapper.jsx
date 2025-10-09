"use client";

import { useContext, useState } from "react";
import SubmitButton from "@/src/components/SubmitButton";
import Toast from "@/src/components/Toast";
import { AuthContext } from "../../hooks/api/AuthContext";
import InputField from "@/src/components/InputField";

const ForgotPasswordWrapper = () => {
  const {
    searchAccount,
    isSearchAccErrorMsg,
    setIsSearchAccErrorMsg,
    isFindingAccountLoading,
  } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateData = () => {
    if (!email) {
      return "Email is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }

    return "";
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();

    const validationError = validateData();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    await searchAccount(email);
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
                <h4 className="text-center mb-3 fw-bold">Forgot Password</h4>
                <p className="text-center text-muted mb-4">
                  Enter your email address and we’ll send you a verification
                  code.
                </p>

                <form className="w-100" onSubmit={handleSendOtp}>
                  <div className="mb-4">
                    <InputField
                      label="Email Address"
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@example.com"
                      error={error}
                      isRequired={true}
                    />
                  </div>

                  <Toast
                    message={isSearchAccErrorMsg}
                    type="error"
                    onClose={() => setIsSearchAccErrorMsg("")}
                  />

                  <div className="text-center mt-3">
                    <SubmitButton
                      type="submit"
                      submitLoading={isFindingAccountLoading}
                      submitBtnDisabled={isFindingAccountLoading}
                    >
                      {isFindingAccountLoading ? "Sending..." : "Send OTP"}
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

export default ForgotPasswordWrapper;
