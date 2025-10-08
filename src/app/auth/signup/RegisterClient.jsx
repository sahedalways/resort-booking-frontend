"use client";

import Link from "next/link";
import Image from "next/image";
import { useContext, useState } from "react";
import { AuthContext } from "../../hooks/api/AuthContext";
import InputField from "@/src/components/InputField";
import SubmitButton from "@/src/components/SubmitButton";

const RegisterClient = () => {
  const {
    register,
    isRegisterErrorMsg,
    isRegisteringLoading,
    emailError,
    phoneNumberError,
  } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    f_name: "",
    l_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    f_name: "",
    l_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // This function validates the form data and sets error messages if validation fails
  const validateForm = () => {
    const newErrors = {};

    if (!formData.f_name.trim()) newErrors.f_name = "First name is required.";
    if (!formData.l_name.trim()) newErrors.l_name = "Last name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format.";
    if (!formData.password.trim()) newErrors.password = "Password is required.";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters.";
    if (!formData.confirmPassword.trim())
      newErrors.confirmPassword = "Please confirm your password.";
    else if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords do not match.";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (formData.phone.replace(/\D/g, "").length < 7) {
      newErrors.phone = "Phone number is too short.";
    } else if (formData.phone.replace(/\D/g, "").length > 15) {
      newErrors.phone = "Phone number is too long.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    setErrors({
      f_name: "",
      l_name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
    return true;
  };

  // save to db through this function
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const isRegisteredUser = await register(
          formData?.f_name,
          formData?.l_name,
          formData?.email,
          formData?.phone,
          formData?.password,
          formData?.confirmPassword
        );

        if (isRegisteredUser) {
          setFormData({
            f_name: "",
            l_name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
          });

          setErrors({
            f_name: "",
            l_name: "",
            email: "",
            password: "",
            phone: "",
            confirmPassword: "",
          });
        }
      } catch (error) {
        console.error("Registration failed:", error);
      }
    }
  };

  return (
    <section className="section-gap">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            {" "}
            {/* increased width */}
            <div className="d-flex justify-content-center align-items-center">
              <div
                className="card shadow-sm p-5 w-100"
                style={{ maxWidth: "700px" }}
              >
                {" "}
                {/* increased padding and max-width */}
                <h4 className="text-center mb-2 fw-bold">Please Sign Up</h4>
                <p className="text-center text-muted small mb-4">
                  You need to Sign Up first to continue
                </p>
                <div className="d-flex gap-2 mb-4">
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
                  <span className="mx-2 text-muted small">Or Sign Up with</span>
                  <hr className="flex-grow-1" />
                </div>
                <form className="w-100" onSubmit={handleSubmit}>
                  <InputField
                    label="First Name"
                    name="f_name"
                    value={formData.f_name}
                    onChange={handleChange}
                    placeholder="Your first name"
                    error={errors.f_name}
                    isRequired={true}
                  />

                  <InputField
                    label="Last Name"
                    name="l_name"
                    value={formData.l_name}
                    onChange={handleChange}
                    placeholder="Your last name"
                    error={errors.l_name}
                    isRequired={true}
                  />
                  <InputField
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    error={errors.email || emailError}
                    isRequired={true}
                  />
                  <InputField
                    label="Phone Number"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                    isRequired={true}
                    error={errors.phone || phoneNumberError}
                  />
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
                  <InputField
                    label="Retype Password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Retype password"
                    error={errors.confirmPassword}
                    isRequired={true}
                  />

                  <p className="text-danger mt-2 text-center">
                    {isRegisterErrorMsg}
                  </p>

                  <SubmitButton
                    type="submit"
                    submitLoading={isRegisteringLoading}
                    submitBtnDisabled={isRegisteringLoading}
                  >
                    {isRegisteringLoading ? "Registering" : "Register"}
                  </SubmitButton>
                </form>
                <p className="text-center small my-3">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="text-decoration-none primary-color"
                  >
                    Sign In
                  </Link>
                </p>
                <p className="small text-center fw-semibold">
                  By Signing up you agree to the T&C
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterClient;
