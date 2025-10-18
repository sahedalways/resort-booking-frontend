"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { http } from "../app/services/httpService";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date_of_function: "",
    gathering_size: "",
    preferred_location: "",
    budget: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setErrors({ ...errors, [e.target.id]: "" });
  };

  // Handle budget dropdown
  const handleBudgetSelect = (budget) => {
    setFormData({ ...formData, budget });
    setErrors({ ...errors, budget: "" });
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    else if (!/^[0-9+\-\s()]+$/.test(formData.phone))
      newErrors.phone = "Please enter a valid phone number.";

    if (!formData.date_of_function)
      newErrors.date_of_function = "Date of function is required.";
    if (!formData.gathering_size)
      newErrors.gathering_size = "Gathering size is required.";
    if (!formData.preferred_location)
      newErrors.preferred_location = "Preferred location is required.";
    if (!formData.budget) newErrors.budget = "Budget is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
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

        // Reset form
        setFormData({
          name: "",
          phone: "",
          date_of_function: "",
          gathering_size: "",
          preferred_location: "",
          budget: "",
          message: "",
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
    }
  };

  return (
    <section className="section-gap">
      <div className="container">
        <div className="section-header-container text-center mb-5">
          <h1 className="main-title">Ready to Make It Happen? Let’s Talk!</h1>
          <p className="primary-color fw-semibold col-md-8 mx-auto">
            Let us help you find the venue of your dreams. Contact us today to
            start your journey to an unforgettable experience.
          </p>
        </div>

        <div className="row">
          <div className="col-lg-8 col-md-10 col-12 mx-auto">
            <form onSubmit={handleSubmit} noValidate>
              {/* Name & Phone */}
              <div className="row mb-3">
                <div className="col-md-6 mb-3 mb-md-0">
                  <input
                    type="text"
                    id="name"
                    className="form-control shadow-none"
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <small className="text-danger">{errors.name}</small>
                  )}
                </div>
                <div className="col-md-6">
                  <input
                    type="tel"
                    id="phone"
                    className="form-control shadow-none"
                    placeholder="Your Phone *"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <small className="text-danger">{errors.phone}</small>
                  )}
                </div>
              </div>

              {/* Date & Gathering */}
              <div className="row mb-3">
                <div className="col-md-6 mb-3 mb-md-0">
                  <input
                    type="text"
                    id="date_of_function"
                    className="form-control shadow-none"
                    placeholder="Date of Function *"
                    value={formData.date_of_function}
                    onChange={handleChange}
                  />
                  {errors.date_of_function && (
                    <small className="text-danger">
                      {errors.date_of_function}
                    </small>
                  )}
                </div>
                <div className="col-md-6">
                  <input
                    type="number"
                    id="gathering_size"
                    className="form-control shadow-none"
                    placeholder="Gathering Size *"
                    value={formData.gathering_size}
                    onChange={handleChange}
                  />
                  {errors.gathering_size && (
                    <small className="text-danger">
                      {errors.gathering_size}
                    </small>
                  )}
                </div>
              </div>

              {/* Location & Budget */}
              <div className="row mb-3">
                <div className="col-md-6 mb-3 mb-md-0">
                  <input
                    type="text"
                    id="preferred_location"
                    className="form-control shadow-none"
                    placeholder="Preferred Location *"
                    value={formData.preferred_location}
                    onChange={handleChange}
                  />
                  {errors.preferred_location && (
                    <small className="text-danger">
                      {errors.preferred_location}
                    </small>
                  )}
                </div>
                <div className="col-md-6">
                  <div className="dropdown">
                    <button
                      className="btn btn-outline-secondary dropdown-toggle custom-dropdown-style w-100"
                      type="button"
                      data-bs-toggle="dropdown"
                    >
                      {formData.budget
                        ? `৳ ${formData.budget}`
                        : "Select Budget *"}
                    </button>
                    <ul className="dropdown-menu w-100">
                      <li>
                        <button
                          type="button"
                          className="dropdown-item"
                          onClick={() => handleBudgetSelect("100 - 500")}
                        >
                          ৳100 - ৳500
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="dropdown-item"
                          onClick={() => handleBudgetSelect("500 - 1,000")}
                        >
                          ৳500 - ৳1,000
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="dropdown-item"
                          onClick={() => handleBudgetSelect("1,000+")}
                        >
                          ৳1,000+
                        </button>
                      </li>
                    </ul>
                  </div>
                  {errors.budget && (
                    <small className="text-danger">{errors.budget}</small>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="row mb-4">
                <div className="col-12">
                  <textarea
                    id="message"
                    className="form-control shadow-none"
                    rows={5}
                    placeholder="Tell Us More"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              {/* Submit */}
              <div className="row">
                <div className="col-12 text-center">
                  <button
                    type="submit"
                    className="btn btn-custom"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "SENDING..." : "SEND YOUR MESSAGE"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
