"use client";

import {
  removeFromCart,
  setBookingDetails,
} from "@/src/redux/slices/cartSlice";
import { store } from "@/src/redux/store/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";

const CartComponent = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const cartItems = cart.items;
  const resortName = cart.resortName;

  const [guestData, setGuestData] = useState(
    cartItems.map((item) => ({
      adultGuests: item.adult_guests || 1,
      childGuests: item.child_guests || 0,
      nightStay: item.nights || 1,
    }))
  );

  const handleNumberInput = (value, min, max, index, key) => {
    const filtered = value.replace(/\D/g, "");
    let num = Number(filtered);
    if (num < min) num = min;
    if (max && num > max) num = max;

    setGuestData((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [key]: num };
      return updated;
    });
  };

  const today = new Date();

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const grandTotal = cartItems.reduce(
    (sum, item, i) => sum + item.price * guestData[i].nightStay,
    0
  );

  const handleRemoveItem = (rooomId) => {
    dispatch(removeFromCart(rooomId));
  };

  const handleBookNow = () => {
    const today = new Date();
    const dates = guestData.map((g) => {
      const toDate = new Date(today);
      toDate.setDate(today.getDate() + g.nightStay);
      return { from: today.toISOString(), to: toDate.toISOString() };
    });

    const grandTotal = cartItems.reduce(
      (sum, item, i) => sum + item.price * guestData[i].nightStay,
      0
    );

    dispatch(
      setBookingDetails({
        guestData,
        dates,
        grandTotal,
      })
    );

    router.push("/user/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <section className="section-gap">
        <div className="container my-5 text-center">
          <i className="fas fa-shopping-cart cart-icon mb-3 mx-auto"></i>
          <h1 className="cart-title">Your Cart is Empty!</h1>
        </div>
      </section>
    );
  }

  return (
    <section className="section-gap">
      <div className="container my-5">
        <div className="text-center mb-4">
          <i className="fas fa-shopping-cart cart-icon mb-3 mx-auto"></i>
          <h1 className="cart-title">Your Cart!</h1>
        </div>
        {resortName && (
          <p className="resort-name text-muted mb-2">
            Resort Name : {resortName}
          </p>
        )}

        <div className="row">
          <div className="col-xl-9 col-lg-8">
            {cartItems.map((item, index) => {
              const { adultGuests, childGuests, nightStay } = guestData[index];
              const toDate = new Date(today);
              toDate.setDate(today.getDate() + nightStay);

              return (
                <div key={index} className="card cart-item-card mb-4">
                  <div className="card-body">
                    <div className="row g-0 align-items-center">
                      <div className="col-lg-9 col-md-8">
                        <div className="row g-4">
                          <div className="col-md-4">
                            <Image
                              width={500}
                              height={500}
                              alt={item.name}
                              className="img-fluid object-fit-cover cart-side-img"
                              src={
                                item.images && item.images.length > 0
                                  ? item.images[0]
                                  : "/img/default-image.jpg"
                              }
                            />
                          </div>

                          <div className="col-md-8">
                            <h5 className="room-title-checkout">{item.name}</h5>

                            <p className="price-per-night">
                              <span className="currency">৳</span> {item.price} /
                              Room/Night
                            </p>

                            {/* Night Stay Input */}
                            <div className="d-flex align-items-center mb-3 flex-wrap gap-2">
                              <div className="border d-flex me-2 rounded-1 align-items-center px-2">
                                <label
                                  htmlFor={`nightStay-${index}`}
                                  className="me-2 item-label"
                                  style={{ whiteSpace: "nowrap" }}
                                >
                                  Night Stay No
                                </label>
                                <input
                                  type="number"
                                  id={`nightStay-${index}`}
                                  className="form-control item-input shadow-none bg-white"
                                  value={nightStay}
                                  onChange={(e) =>
                                    handleNumberInput(
                                      e.target.value,
                                      1,
                                      99,
                                      index,
                                      "nightStay"
                                    )
                                  }
                                />
                              </div>

                              <div className="d-flex align-items-center border rounded-2 px-3 py-2 bg-white shadow-sm mt-2">
                                <div className="text-center me-3">
                                  <span className="d-block fw-semibold text-dark small">
                                    {formatDate(today)}
                                  </span>
                                  <small className="text-muted text-capitalize">
                                    {today.toLocaleDateString("en-US", {
                                      weekday: "short",
                                    })}
                                  </small>
                                </div>

                                <i
                                  className="fas fa-arrow-right mx-4"
                                  style={{ color: "#0d6efd", fontSize: "1rem" }}
                                ></i>

                                <div className="text-center">
                                  <span className="d-block fw-semibold text-dark small">
                                    {formatDate(toDate)}
                                  </span>
                                  <small className="text-muted text-capitalize">
                                    {toDate.toLocaleDateString("en-US", {
                                      weekday: "short",
                                    })}
                                  </small>
                                </div>
                              </div>
                            </div>

                            {/* Adults & Children */}
                            <div className="d-flex align-items-center mb-2 mt-4 gap-2">
                              {/* Adult input */}
                              <div className="border d-flex rounded-2 align-items-center px-2">
                                <label
                                  htmlFor={`adultNo-${index}`}
                                  className="me-2 item-label"
                                >
                                  Adults
                                </label>
                                <input
                                  type="text"
                                  id={`adultNo-${index}`}
                                  className="form-control item-input shadow-none"
                                  value={adultGuests}
                                  onChange={(e) =>
                                    handleNumberInput(
                                      e.target.value,
                                      1,
                                      item.adult_cap,
                                      index,
                                      "adultGuests"
                                    )
                                  }
                                />
                              </div>

                              {/* Child input */}
                              <div className="border d-flex rounded-2 align-items-center px-2">
                                <label
                                  htmlFor={`childNo-${index}`}
                                  className="me-2 item-label"
                                >
                                  Children
                                </label>
                                <input
                                  type="text"
                                  id={`childNo-${index}`}
                                  className="form-control item-input shadow-none"
                                  value={childGuests}
                                  onChange={(e) =>
                                    handleNumberInput(
                                      e.target.value,
                                      0,
                                      item.child_cap,
                                      index,
                                      "childGuests"
                                    )
                                  }
                                />
                              </div>
                            </div>

                            <p className="max-persons mt-3">
                              Maximum {item.adult_cap} Adult(s) and{" "}
                              {item.child_cap} Child(ren) can stay in this Room.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-3 col-md-4 text-end d-flex flex-column justify-content-between align-items-end h-100">
                        <div className="price-total mb-2">
                          ৳{item.price * nightStay}
                        </div>
                        <i
                          className="fas fa-times close-icon"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleRemoveItem(item.id)}
                        ></i>
                        <div className="selected-night">
                          [{nightStay} night]
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="text-center mb-5">
              <button
                className="btn btn-action-add me-3"
                onClick={() => router.back()}
              >
                <i className="fas fa-plus"></i> Add Another Room
              </button>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="col-xl-3 col-lg-4">
            <div className="booking-details-card">
              <h5 className="details-title p-3">Booking Details</h5>

              <div className="p-3">
                {cartItems.map((item, i) => (
                  <div key={i} className="room-summary mb-4">
                    <h6 className="booking-details-title">
                      Room #{i + 1} / of {cartItems.length}
                    </h6>
                    <p className="room-name-detail mb-2">{item.name}</p>
                    <p className="room-details-text mb-0">
                      {guestData[i].nightStay} Night(s)
                    </p>
                    <p className="room-details-text mb-0">
                      {formatDate(today)} -{" "}
                      {formatDate(
                        new Date(
                          today.getFullYear(),
                          today.getMonth(),
                          today.getDate() + guestData[i].nightStay
                        )
                      )}
                    </p>
                    <p className="room-details-text">
                      {guestData[i].adultGuests + guestData[i].childGuests}{" "}
                      Guest(s)
                    </p>
                  </div>
                ))}

                <h6 className="booking-details-title">Bill Summary</h6>
                <div className="bill-summary">
                  {cartItems.map((item, i) => (
                    <div
                      key={i}
                      className="bill-item detail-text d-flex justify-content-between border-bottom pb-3 mb-3"
                    >
                      <span>
                        {guestData[i].nightStay} Night(s) - {item.name}
                      </span>
                      <span>৳{item.price * guestData[i].nightStay}</span>
                    </div>
                  ))}

                  {/* Taxes */}
                  <div className="bill-item d-flex justify-content-between">
                    <span>Total VAT/Tax:</span>
                    <span>৳0.00</span>
                  </div>
                  <div className="bill-item d-flex justify-content-between">
                    <span>Total Service Tax:</span>
                    <span>৳0.00</span>
                  </div>
                  <div className="bill-item d-flex justify-content-between border-bottom pb-3 mb-3">
                    <span>Total City Tax:</span>
                    <span>৳0.00</span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="grand-total d-flex justify-content-between align-items-center p-3">
                  <span className="total-label">Grand Total:</span>
                  <span className="total-value">৳{grandTotal}</span>
                </div>
              </div>
            </div>
            <div className="text-center mt-4">
              <button onClick={handleBookNow} className="btn btn-custom">
                <i className="fas fa-money-bill-wave"></i> Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function CartClient() {
  return (
    <Provider store={store}>
      <CartComponent />
    </Provider>
  );
}
