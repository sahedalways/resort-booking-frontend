import React from "react";

const RefundPolicy = () => {
  return (
    <div className="container-fluid p-0">
      {/* Header Section */}
      <div className="refund-header mb-5">
        <div className="refund-overlay"></div>
        <div className="position-relative">
          <h1 className="text-block-50 fw-bold">Refund Policy</h1>
          <p className="text-block-20">
            Clear and transparent refund process for your peace of mind.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card shadow-sm p-4 mb-5">
              <p className="mb-4">
                At <strong>BookingXpart</strong>, we value your trust and strive
                to ensure a smooth experience. Our{" "}
                <strong>refund policy</strong> is designed to be fair and
                transparent for all our customers.
              </p>

              <div className="mb-4">
                <h3 className="text-block-20 mb-3 text-decoration-underline">Cancellation & Refunds</h3>
                <p className="mb-0">
                  You may cancel your booking according to the terms specified
                  during your reservation. Refunds, if applicable, will be
                  processed within
                  <strong> 5-7 business days</strong> to your original payment
                  method.
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-block-20 mb-3 text-decoration-underline">Non-Refundable Cases</h3>
                <p className="mb-0">
                  Certain bookings may be non-refundable or partially refundable
                  based on the resort's policies or promotional offers. Always
                  check the booking details before confirming.
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-block-20 mb-3 text-decoration-underline">Refund Process</h3>
                <p className="mb-0">
                  Our team will verify your refund request and notify you once
                  it's approved. You can track the status through your
                  <strong> BookingXpart account</strong>. Refunds will be issued
                  using the same payment method used during the booking.
                </p>
              </div>

              <div>
                <h3 className="text-block-20 mb-3 text-decoration-underline">Contact Us</h3>
                <p className="mb-0">
                  For any questions or assistance regarding refunds, please
                  reach out to our support team at{" "}
                  <strong>support@bookingxpart.com</strong> or through our
                  customer service hotline.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;