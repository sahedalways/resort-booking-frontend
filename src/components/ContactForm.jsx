"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { http } from "../app/services/httpService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { useSiteData } from "../app/hooks/SiteDataContext";
import { generateCaptcha } from "../app/utils/GenerateCaptcha";

const ContactForm = () => {
  const { footerData } = useSiteData();

  const contactInfo = footerData?.contact_info || {};
  const dhakaAddress =
    contactInfo?.dhaka_office_address ||
    "6th Floor, House 168, Block B, Sayednagar, Gulshan, Dhaka 1212, Bangladesh";
  const phone = contactInfo?.phone || "+8801877556633";
  const email = contactInfo?.email || "info@bookingxpart.org";

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
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Your Name is required.";

    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email))
      newErrors.email = "Please enter a valid email address.";

    if (!formData.phone) newErrors.phone = "Phone number is required.";
    else if (!/^[0-9+\-\s()]+$/.test(formData.phone))
      newErrors.phone = "Please enter a valid phone number.";

    if (!formData.date_of_function)
      newErrors.date_of_function = "Date of function is required.";

    if (!formData.gathering_size)
      newErrors.gathering_size = "Gathering size is required.";

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

  // --- CONTACT INFO CARD COMPONENT ---
  const ContactInfoCard = ({ icon, title, content }) => (
    <div className="p-3 mb-3" style={{ borderBottom: "1px solid #0f3a63" }}>
      <div className="d-flex align-items-center mb-2">
        <span className="me-3 fs-4 text-white">{icon}</span>
        <h5 className="mb-0 fw-bold text-white">{title}</h5>
      </div>
      {content.map((item, index) => (
        <p
          key={index}
          className="mb-0 text-light"
          style={{ fontSize: "0.9rem" }}
        >
          {item}
        </p>
      ))}
    </div>
  );
  // -----------------------------------

  return (
    <section className="section-gap py-5">
      <div className="container">
        <div className="row g-0 rounded shadow-lg overflow-hidden">
          {/* LEFT PANEL */}
          <div
            className="col-md-5"
            style={{ backgroundColor: "#1a227eef", color: "#ffffff" }}
          >
            <div className="p-4 p-md-5 h-100">
              <h3
                className="mb-4 fw-bold text-center border-bottom pb-3"
                style={{ borderColor: "#3d4a8e" }}
              >
                Get In Touch With Us Now!
              </h3>

              <ContactInfoCard
                icon={<FontAwesomeIcon icon={faPhone} />}
                title="Phone Number"
                content={[phone || "N/A"]}
              />

              <ContactInfoCard
                icon={<FontAwesomeIcon icon={faEnvelope} />}
                title="Email"
                content={[email || "N/A"]}
              />

              <ContactInfoCard
                icon={<FontAwesomeIcon icon={faMapMarkerAlt} />}
                title="Location"
                content={[dhakaAddress || "N/A"]}
              />

              <ContactInfoCard
                icon={<FontAwesomeIcon icon={faClock} />}
                title="Working Hours"
                content={["Saturday To Thursday", "09:00 AM To 06:00 PM"]}
              />
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="col-md-7 mt-5" style={{ backgroundColor: "#f8f9fa" }}>
            <div className="p-4 p-md-5 h-100">
              <h3 className="mb-4 fw-bold text-dark border-bottom pb-3">
                Contact Us
              </h3>

              <form onSubmit={handleSubmit} noValidate>
                {/* Name, Email & Phone */}
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
                      type="text"
                      id="date_of_function"
                      className={`form-control shadow-none ${
                        errors.date_of_function ? "is-invalid" : ""
                      }`}
                      placeholder="Date of Function *"
                      value={formData.date_of_function}
                      onChange={handleChange}
                    />
                    {errors.date_of_function && (
                      <div className="invalid-feedback">
                        {errors.date_of_function}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <input
                      type="number"
                      id="gathering_size"
                      className={`form-control shadow-none ${
                        errors.gathering_size ? "is-invalid" : ""
                      }`}
                      placeholder="Gathering Size *"
                      value={formData.gathering_size}
                      onChange={handleChange}
                    />
                    {errors.gathering_size && (
                      <div className="invalid-feedback">
                        {errors.gathering_size}
                      </div>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div className="row mb-4">
                  <div className="col-12">
                    <textarea
                      id="message"
                      className="form-control shadow-none"
                      rows={4}
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>

                {/* CAPTCHA */}
                <div className="row mb-4">
                  <div className="col-12">
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
                </div>

                {/* Submit */}
                <div className="row">
                  <div className="col-12">
                    <button
                      type="submit"
                      className="btn btn-primary px-5 py-2 fw-bold"
                      disabled={isSubmitting}
                      style={{ backgroundColor: "#1a237e", border: "none" }}
                    >
                      {isSubmitting ? "SENDING..." : "Submit ✉️"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
