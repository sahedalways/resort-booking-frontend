"use client";

import Link from "next/link";
import Image from "next/image";
import Toast from "@/src/components/Toast";
import { AuthContext } from "../../hooks/api/AuthContext";
import { useContext, useState } from "react";
import InputField from "@/src/components/InputField";
import SubmitButton from "@/src/components/SubmitButton";

const LoginClient = () => {
  const {
    isLogoutMessage,
    setLogoutMessage,
    login,
    isLoginErrorMsg,
    isLoginLoading,
    setIsLoginErrorMsg,
  } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // This function validates the form data and sets error messages if validation fails
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format.";
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    } else if (formData.password.length > 20) {
      newErrors.password = "Password cannot exceed 20 characters.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    return true;
  };

  // save to db through this function
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const isLoggedInUser = await login(formData?.email, formData?.password);

        if (isLoggedInUser) {
          setFormData({
            email: "",
            password: "",
          });

          setErrors({
            email: "",
            password: "",
          });
        }
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
  };

  return (
    <section className="section-gap">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="d-flex justify-content-center align-items-center">
              <div className="card shadow-sm p-4 w-100">
                <h4 className="text-center mb-1 fw-bold">Please Sign in</h4>
                <p className="text-center text-muted small mb-4">
                  You need to Sign in first to continue
                </p>

                {/* Social login buttons */}
                <div className="d-flex gap-2 mb-3">
                  <button className="btn btn-light border w-50 d-flex align-items-center justify-content-center">
                    <Image
                      width={16}
                      height={16}
                      src="/img/google-logo.png"
                      alt="Google"
                      className="me-2"
                    />
                    Google
                  </button>
                  <button className="btn btn-light border w-50 d-flex align-items-center justify-content-center">
                    <Image
                      width={16}
                      height={16}
                      src="/img/facebook-new.png"
                      alt="Facebook"
                      className="me-2"
                    />
                    Facebook
                  </button>
                </div>

                <div className="d-flex align-items-center my-3">
                  <hr className="flex-grow-1" />
                  <span className="mx-2 text-muted small">Or Sign In with</span>
                  <hr className="flex-grow-1" />
                </div>

                {/* Login form */}
                <form onSubmit={handleSubmit} className="w-100">
                  <div className="mb-3">
                    <InputField
                      label="Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email"
                      error={errors.email}
                      isRequired={true}
                    />
                  </div>

                  <div className="mb-3">
                    <InputField
                      label="Password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Password"
                      error={errors.password}
                      isRequired={true}
                    />
                  </div>

                  <Toast
                    message={isLoginErrorMsg}
                    type="error"
                    onClose={() => setIsLoginErrorMsg("")}
                  />

                  <SubmitButton
                    submitLoading={isLoginLoading}
                    type="submit"
                    submitBtnDisabled={isLoginLoading}
                    className="w-100 mt-2"
                  >
                    {isLoginLoading ? "Logging In..." : "Login"}
                  </SubmitButton>
                </form>

                <div className="mb-3 text-end mt-2">
                  <Link
                    href="/forget-password"
                    className="small text-decoration-none primary-color"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <p className="text-center small mb-0 mt-3">
                  Don’t have an account?{" "}
                  <Link
                    href="/auth/signup"
                    className="text-decoration-none primary-color"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toast
        message={isLogoutMessage}
        type="error"
        onClose={() => setLogoutMessage("")}
      />
    </section>
  );
};

export default LoginClient;
