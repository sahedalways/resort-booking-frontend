"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { http } from "../app/services/httpService";
import { generateCaptcha } from "../app/utils/GenerateCaptcha";

const EventContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date_of_function: "",
    gathering_size: "",
    message: "",
    userCaptcha: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaText, setCaptchaText] = useState(generateCaptcha());

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "gathering_size") {
      const numericValue = value.replace(/\D/g, "");
      setFormData({ ...formData, [id]: numericValue });
    } else {
      setFormData({ ...formData, [id]: value });
    }

    setErrors({ ...errors, [id]: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Your Name is required.";

    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email))
      newErrors.email = "Please enter a valid email address.";

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    else if (!/^[0-9+\-\s()]+$/.test(formData.phone))
      newErrors.phone = "Please enter a valid phone number.";

    if (!formData.userCaptcha) {
      newErrors.userCaptcha = "The characters are required.";
    } else if (
      formData.userCaptcha.toLowerCase() !== captchaText.toLowerCase()
    ) {
      newErrors.userCaptcha = "Incorrect characters. Please try again.";
      setCaptchaText(generateCaptcha());
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      const response = await http.post("/save-contact", formData);

      if (response.data.success) {
        toast.success("Message sent successfully!", {
          autoClose: 3000,
          theme: "colored",
        });

        setFormData({
          name: "",
          email: "",
          phone: "",
          date_of_function: "",
          gathering_size: "",
          message: "",
          userCaptcha: "",
        });
        setErrors({});
      } else {
        toast.error(response.data.message || "Failed to send message.", {
          autoClose: 3000,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        autoClose: 3000,
        theme: "colored",
      });
    } finally {
      setIsSubmitting(false);
      setCaptchaText(generateCaptcha());
    }
  };

  return (
    <section className="py-5" style={{ backgroundColor: "#f1f3f6" }}>
      <div className="container">
        <div
          className="rounded shadow-lg bg-white p-4 p-md-5 mx-auto"
          style={{ maxWidth: "850px" }}
        >
          <h3 className="text-center fw-bold mb-4" style={{ color: "#1a237e" }}>
            Contact Us
          </h3>

          <form onSubmit={handleSubmit} noValidate>
            {/* Name, Email, Phone */}
            <div className="row mb-3">
              <div className="col-md-4 mb-3 mb-md-0">
                <input
                  type="text"
                  id="name"
                  className={`form-control shadow-none ${
                    errors.name ? "is-invalid" : ""
                  }`}
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>
              <div className="col-md-4 mb-3 mb-md-0">
                <input
                  type="email"
                  id="email"
                  className={`form-control shadow-none ${
                    errors.email ? "is-invalid" : ""
                  }`}
                  placeholder="Your Email *"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <div className="col-md-4">
                <input
                  type="tel"
                  id="phone"
                  className={`form-control shadow-none ${
                    errors.phone ? "is-invalid" : ""
                  }`}
                  placeholder="Your Phone *"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <div className="invalid-feedback">{errors.phone}</div>
                )}
              </div>
            </div>

            {/* Date & Gathering */}
            <div className="row mb-3">
              <div className="col-md-6 mb-3 mb-md-0">
                <input
                  type="date"
                  id="date_of_function"
                  className="form-control shadow-none"
                  placeholder="Date of Function (optional)"
                  value={formData.date_of_function}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  id="gathering_size"
                  className="form-control shadow-none"
                  placeholder="Gathering Size (optional)"
                  value={formData.gathering_size}
                  onChange={handleChange}
                  inputMode="numeric"
                />
              </div>
            </div>

            {/* Message */}
            <div className="mb-4">
              <textarea
                id="message"
                className="form-control shadow-none"
                rows={4}
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* CAPTCHA */}
            <div className="mb-4">
              <label className="form-label fw-semibold">
                Please type the characters *
              </label>
              <div className="d-flex align-items-center mb-2">
                <span
                  className="me-3 px-3 py-1 rounded fw-bold text-dark"
                  style={{
                    backgroundColor: "#e9ecef",
                    fontSize: "1.2rem",
                    letterSpacing: "3px",
                    userSelect: "none",
                    border: "1px solid #ced4da",
                    textDecoration: "line-through",
                  }}
                >
                  {captchaText}
                </span>
                <input
                  type="text"
                  id="userCaptcha"
                  className={`form-control shadow-none flex-grow-1 ${
                    errors.userCaptcha ? "is-invalid" : ""
                  }`}
                  placeholder="Enter characters"
                  value={formData.userCaptcha}
                  onChange={handleChange}
                />
              </div>
              <small className="text-muted d-block mb-2">
                This helps us prevent spam, thank you.
              </small>
              {errors.userCaptcha && (
                <div className="invalid-feedback d-block">
                  {errors.userCaptcha}
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-lg px-5 py-2 fw-bold text-white"
                disabled={isSubmitting}
                style={{
                  backgroundColor: "#1a237e",
                  border: "none",
                  borderRadius: "8px",
                }}
              >
                {isSubmitting ? "SENDING..." : "Submit ✉️"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EventContactForm;
