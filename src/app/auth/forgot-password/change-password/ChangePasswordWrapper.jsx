"use client";

import { AuthContext } from "@/src/app/hooks/api/AuthContext";
import { LocalStoreContext } from "@/src/app/hooks/localstorage/LocalStoreContext";

import InputField from "@/src/components/InputField";
import SubmitButton from "@/src/components/SubmitButton";
import Toast from "@/src/components/Toast";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const ChangePasswordWrapper = () => {
  const {
    changePassword,
    isChangePasswordErrorMsg,
    isChangePasswordLoading,
    setIsChangePasswordErrorMsg,
  } = useContext(AuthContext);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { forgotPasswordIdentifier, allowVerifyEmail } =
    useContext(LocalStoreContext);

  const router = useRouter();

  useEffect(() => {
    if (!allowVerifyEmail || !forgotPasswordIdentifier) {
      router.push("/auth/login");
    }
  }, [router]);

  const validateData = () => {
    if (!password) return "Password is required.";
    if (password.length < 8)
      return "Password must be at least 8 characters long.";
    if (password.length > 20) return "Password cannot exceed 20 characters.";
    if (!confirmPassword) return "Please retype your password.";
    if (password !== confirmPassword) return "Passwords do not match.";
    return "";
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    const validationError = validateData();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    await changePassword(password, confirmPassword);
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
                <h4 className="text-center mb-3 fw-bold">Change Password</h4>
                <p className="text-center text-muted mb-4">
                  Enter your new password below.
                </p>

                <form className="w-100" onSubmit={handleChangePassword}>
                  <div className="mb-4">
                    <InputField
                      label="New Password"
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password"
                      error={error.includes("Password") ? error : ""}
                      isRequired={true}
                    />
                  </div>

                  <div className="mb-4">
                    <InputField
                      label="Confirm Password"
                      type="password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Retype new password"
                      error={error.includes("match") ? error : ""}
                      isRequired={true}
                    />
                  </div>

                  <Toast
                    message={isChangePasswordErrorMsg}
                    type="error"
                    onClose={() => setIsChangePasswordErrorMsg("")}
                  />

                  <div className="text-center mt-3">
                    <SubmitButton
                      type="submit"
                      submitLoading={isChangePasswordLoading}
                      submitBtnDisabled={isChangePasswordLoading}
                    >
                      {isChangePasswordLoading
                        ? "Updating..."
                        : "Change Password"}
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

export default ChangePasswordWrapper;
