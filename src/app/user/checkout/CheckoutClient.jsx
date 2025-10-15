"use client";

import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LocalStoreContext } from "../../hooks/localstorage/LocalStoreContext";
import { toast } from "react-toastify";
import { CheckoutContext } from "../../hooks/api/CheckoutContext";
import BookingLoader from "@/src/components/BookingLoader";
import { isLoggedIn } from "../../helper/auth";

const CheckoutClient = () => {
  const { isLoadingSubmitting, saveBookingInfo, isLoadingAnimation } =
    useContext(CheckoutContext);
  const isLoggedInToken = isLoggedIn();
  const { authUserData, authUserProfile } = useContext(LocalStoreContext);
  const [bookingFor, setBookingFor] = useState("me");
  const cart = useSelector((state) => state.cart);
  const { resortName, items, bookingDetails, resortId } = cart;
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const isDayLong = items[0].is_daylong;

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  // Safe bookingDetails destructuring with defaults
  const safeBookingDetails = bookingDetails || {};
  const safeGuestData =
    safeBookingDetails.guestData?.length > 0
      ? safeBookingDetails.guestData
      : [{ adultGuests: 1, childGuests: 0, nightStay: 1 }];
  const safeDates =
    safeBookingDetails.dates?.length > 0
      ? safeBookingDetails.dates
      : [{ from: today.toISOString(), to: tomorrow.toISOString() }];
  const safeCheckInDate = safeBookingDetails.checkInDate || today;
  const safeGrandTotal =
    safeBookingDetails?.grandTotal || items?.[0]?.price || 0;

  const [discountedTotal, setDiscountedTotal] = useState(safeGrandTotal || 0);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    email: "",
    mobile: "",
    nationality: "Bangladeshi",
    coupon: "",
    comment: "",
  });

  useEffect(() => {
    if (authUserData) {
      setFormData((prev) => ({
        ...prev,
        firstName: authUserData.f_name || "",
        lastName: authUserData.l_name || "",
        email: authUserData.email || "",
        mobile: authUserData.phone_no || "",
        gender: authUserProfile?.gender || "",
        dob: authUserProfile?.date_of_birth || "",
      }));
    }
  }, [authUserData]);

  const [errors, setErrors] = useState({});

  // Update handleChange for mobile field
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile") {
      let numericValue = value.replace(/\D/g, "");
      if (numericValue.length > 15) numericValue = numericValue.slice(0, 15);
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Validation check
  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.gender) newErrors.gender = "Please select a gender";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email address";
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (formData.mobile.length < 10 || formData.mobile.length > 20) {
      newErrors.mobile = "Mobile number must be between 10 and 20 digits";
    }

    if (!formData.nationality.trim())
      newErrors.nationality = "Nationality is required";
    return newErrors;
  };

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    const checkoutData = {
      booking_for: bookingFor,
      comment: formData.comment,
      is_used_coupon: formData.coupon ? 1 : 0,
      gender: formData.gender,
      dob: formData.dob,
      resort_id: resortId || "",
      room_id: items[0]?.id || "",
      adult: safeGuestData?.adultGuests || 1,
      child: safeGuestData?.childGuests || 0,
      start_date: isDayLong
        ? formatDate(safeCheckInDate)
        : formatDate(safeDates?.[0]?.from),
      end_date: isDayLong
        ? formatDate(
            new Date(
              new Date(safeCheckInDate).setDate(
                new Date(safeCheckInDate).getDate() + 1
              )
            )
          )
        : formatDate(safeDates?.[0]?.to),
      amount: discountedTotal || "",
    };

    await saveBookingInfo(checkoutData, isLoggedInToken);
  };

  const handleCheckCoupon = (code, e) => {
    e.preventDefault();
    if (!code) return;

    const storedCoupons = JSON.parse(localStorage.getItem("coupons")) || [];
    const coupon = storedCoupons.find(
      (c) =>
        c.code.toLowerCase() === code.toLowerCase() && c.status === "active"
    );

    if (coupon) {
      // Apply discount
      const discountValue = parseFloat(coupon.discount_value) || 0;
      const newTotal = discountedTotal - discountValue;
      setDiscountedTotal(newTotal >= 0 ? newTotal : 0);

      setAppliedCoupon(coupon);
      toast.success(`Coupon "${coupon.code}" applied! 🎉`);
    } else {
      toast.error("Invalid or inactive coupon code");
    }
  };

  if (isLoadingAnimation) {
    return <BookingLoader />;
  }

  if (authUserData?.length === 0) {
    return <p>You are not logged In user.</p>;
  }

  return (
    <div
      className="checkout-page min-vh-100 py-5"
      style={{ background: "#f8fafc" }}
    >
      <div className="container">
        {!items || items.length === 0 ? (
          // Skeleton for loading cart items
          <div className="row g-4 justify-content-center">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="col-lg-7 p-4 rounded-4 shadow-sm bg-white mb-4"
                style={{ borderTop: "5px solid #006993" }}
              >
                <div className="skeleton h-3 mb-3 w-50"></div>
                <div className="skeleton h-3 mb-2 w-100"></div>
                <div className="skeleton h-3 mb-2 w-100"></div>
                <div className="skeleton h-3 mb-2 w-75"></div>
              </div>
            ))}
          </div>
        ) : (
          // Your actual content goes here
          <div
            className="checkout-page min-vh-100 py-5"
            style={{ background: "#f8fafc" }}
          >
            <div className="container">
              <div className="row g-4 justify-content-center">
                {/* Left Section - Booking Form */}
                <div className="col-lg-7">
                  <form
                    onSubmit={handleSubmit}
                    className="p-4 rounded-4 shadow-sm bg-white"
                    style={{ borderTop: "5px solid #006993" }}
                  >
                    <h3 className="fw-bold mb-4" style={{ color: "#0f3a63" }}>
                      Booking Information
                    </h3>

                    {/* Booking For */}
                    <div className="mb-4">
                      <label className="form-label fw-semibold text-secondary">
                        Who are you booking for?
                      </label>
                      <div className="d-flex flex-column gap-2">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="bookingFor"
                            id="bookingForMe"
                            checked={bookingFor === "me"}
                            onChange={() => setBookingFor("me")}
                          />
                          <label
                            className="form-check-label text-dark"
                            htmlFor="bookingForMe"
                          >
                            I am booking for myself
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="bookingFor"
                            id="bookingForOthers"
                            checked={bookingFor === "others"}
                            onChange={() => setBookingFor("others")}
                          />
                          <label
                            className="form-check-label text-dark"
                            htmlFor="bookingForOthers"
                          >
                            I am booking for my relative or friend
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Personal Details */}
                    <div className="row">
                      {/* First Name */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label text-secondary fw-semibold">
                          First Name <span className="text-danger">*</span>
                        </label>
                        <input
                          readOnly
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className={`form-control shadow-none border-0 border-bottom ${
                            errors.firstName ? "is-invalid" : ""
                          }`}
                        />
                        {errors.firstName && (
                          <small className="text-danger">
                            {errors.firstName}
                          </small>
                        )}
                      </div>

                      {/* Last Name */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label text-secondary fw-semibold">
                          Last Name <span className="text-danger">*</span>
                        </label>
                        <input
                          readOnly
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className={`form-control shadow-none border-0 border-bottom ${
                            errors.lastName ? "is-invalid" : ""
                          }`}
                        />
                        {errors.lastName && (
                          <small className="text-danger">
                            {errors.lastName}
                          </small>
                        )}
                      </div>

                      {/* Gender */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label text-secondary fw-semibold">
                          Gender <span className="text-danger">*</span>
                        </label>
                        <select
                          name="gender"
                          disabled={!!authUserProfile?.gender}
                          value={
                            authUserProfile?.gender || formData.gender || ""
                          }
                          onChange={(e) =>
                            setFormData({ ...formData, gender: e.target.value })
                          }
                          className={`form-select shadow-none border-0 border-bottom ${
                            errors.gender ? "is-invalid" : ""
                          }`}
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>

                        {errors.gender && (
                          <small className="text-danger">{errors.gender}</small>
                        )}
                      </div>

                      {/* Date of Birth */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label text-secondary fw-semibold">
                          Date of Birth <span className="text-danger">*</span>
                        </label>
                        <input
                          readOnly={!!authUserProfile?.date_of_birth}
                          type="date"
                          name="dob"
                          value={formData.dob}
                          onChange={handleChange}
                          className={`form-control shadow-none border-0 border-bottom ${
                            errors.dob ? "is-invalid" : ""
                          }`}
                          max={new Date().toISOString().split("T")[0]}
                        />
                        {errors.dob && (
                          <small className="text-danger">{errors.dob}</small>
                        )}
                      </div>

                      {/* Email */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label text-secondary fw-semibold">
                          Email <span className="text-danger">*</span>
                        </label>
                        <input
                          readOnly
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`form-control shadow-none border-0 border-bottom ${
                            errors.email ? "is-invalid" : ""
                          }`}
                        />
                        {errors.email && (
                          <small className="text-danger">{errors.email}</small>
                        )}
                      </div>

                      {/* Mobile */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label text-secondary fw-semibold">
                          Mobile Number <span className="text-danger">*</span>
                        </label>
                        <input
                          readOnly={!!authUserData?.phone_no}
                          type="text"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          className={`form-control shadow-none border-0 border-bottom ${
                            errors.mobile ? "is-invalid" : ""
                          }`}
                        />
                        {errors.mobile && (
                          <small className="text-danger">{errors.mobile}</small>
                        )}
                      </div>

                      {/* Nationality */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label text-secondary fw-semibold">
                          Nationality <span className="text-danger">*</span>
                        </label>
                        <input
                          readOnly
                          type="text"
                          name="nationality"
                          value={formData.nationality}
                          onChange={handleChange}
                          className={`form-control shadow-none border-0 border-bottom ${
                            errors.nationality ? "is-invalid" : ""
                          }`}
                        />
                        {errors.nationality && (
                          <small className="text-danger">
                            {errors.nationality}
                          </small>
                        )}
                      </div>

                      {/* Coupon Code (optional) */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label text-secondary fw-semibold">
                          Coupon Code
                        </label>
                        <div className="d-flex">
                          <input
                            type="text"
                            name="coupon"
                            value={formData.coupon}
                            onChange={handleChange}
                            className="form-control shadow-none border-0 border-bottom me-2"
                            placeholder="Enter coupon code"
                            disabled={!!appliedCoupon}
                          />
                          <button
                            type="button"
                            className="btn"
                            style={{
                              backgroundColor: "#28a745",
                              color: "#fff",
                              cursor: appliedCoupon ? "not-allowed" : "pointer",
                            }}
                            onClick={(e) =>
                              handleCheckCoupon(formData.coupon, e)
                            }
                            disabled={!!appliedCoupon}
                          >
                            {appliedCoupon ? "Applied" : "Use"}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Comments */}
                    <div className="mt-4 mb-4">
                      <label className="form-label text-secondary fw-semibold">
                        Additional Comments
                      </label>
                      <textarea
                        rows="3"
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                        className="form-control shadow-none border-0 border-bottom"
                        placeholder="Any additional comment..."
                      ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="btn w-100 py-3 text-white fw-semibold"
                      style={{
                        background: "linear-gradient(90deg, #164f84, #006993)",
                        borderRadius: "10px",
                      }}
                      disabled={isLoadingSubmitting}
                    >
                      {isLoadingSubmitting
                        ? "Submitting... Please wait"
                        : "Proceed to Booking"}
                    </button>
                  </form>
                </div>

                {/* Right Section - Summary */}
                <div className="col-lg-4">
                  <div
                    className="p-4 rounded-4 shadow-sm bg-white position-sticky"
                    style={{ top: "100px" }}
                  >
                    <h5 className="fw-bold mb-3" style={{ color: "#0f3a63" }}>
                      Booking Summary
                    </h5>

                    {items.map((item, index) => (
                      <ul key={item.id} className="list-unstyled mb-3">
                        <li className="d-flex justify-content-between py-1">
                          <span>Resort Name:</span>
                          <span className="fw-semibold">{resortName}</span>
                        </li>

                        <li className="d-flex justify-content-between py-1">
                          <span>
                            {item.is_daylong ? "Package Type:" : "Room Name:"}
                          </span>
                          <span className="fw-semibold">
                            {item.is_daylong ? "Day Long" : item.name}
                          </span>
                        </li>

                        {item.is_daylong ? (
                          <li className="d-flex justify-content-between py-1">
                            <span>Check-In Date:</span>
                            <span className="fw-semibold">
                              {new Date(safeCheckInDate).toLocaleDateString(
                                "en-US",
                                {
                                  weekday: "short",
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </span>
                          </li>
                        ) : (
                          <>
                            <li className="d-flex justify-content-between py-1">
                              <span>From:</span>
                              <span className="fw-semibold">
                                {new Date(
                                  safeDates[index].from
                                ).toLocaleDateString("en-US", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </span>
                            </li>
                            <li className="d-flex justify-content-between py-1">
                              <span>To:</span>
                              <span className="fw-semibold">
                                {new Date(
                                  safeDates[index].to
                                ).toLocaleDateString("en-US", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </span>
                            </li>
                          </>
                        )}

                        <li className="d-flex justify-content-between py-1">
                          <span>Adults:</span>
                          <span className="fw-semibold">
                            {safeGuestData[index].adultGuests}
                          </span>
                        </li>
                        <li className="d-flex justify-content-between py-1">
                          <span>Children:</span>
                          <span className="fw-semibold">
                            {safeGuestData[index].childGuests}
                          </span>
                        </li>

                        {isDayLong == false && (
                          <li className="d-flex justify-content-between py-1">
                            <span>Night(s):</span>
                            <span className="fw-semibold">
                              {safeGuestData[index].nightStay}
                            </span>
                          </li>
                        )}

                        <li className="d-flex justify-content-between py-1">
                          <span>Price:</span>
                          <span className="fw-semibold">
                            ৳{item.price * safeGuestData[index].nightStay}
                          </span>
                        </li>
                      </ul>
                    ))}

                    <hr />

                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="mb-0 fw-bold">Total Price:</h6>
                      <span className="fw-bold fs-5 text-success">
                        ৳{appliedCoupon ? discountedTotal : safeGrandTotal}
                      </span>
                    </div>
                    <p className="text-muted small mt-2 mb-0">
                      *Taxes and service charges included
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutClient;
