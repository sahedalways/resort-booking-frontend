"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

const CouponModal = ({ onClose, couponData }) => {
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [closing, setClosing] = useState(false);

  // Copy coupon code to clipboard
  const copyCode = (code) => {
    try {
      navigator.clipboard.writeText(code);
      setToastMessage(`Copied: ${code}`);
      setToastType("success");
    } catch (error) {
      setToastMessage("Failed to copy!");
      setToastType("error");
    }
  };

  // Handle toast notifications
  useEffect(() => {
    if (toastMessage) {
      switch (toastType) {
        case "success":
          toast.success(toastMessage, { autoClose: 3000, theme: "colored" });
          break;
        case "error":
          toast.error(toastMessage, { autoClose: 3000, theme: "colored" });
          break;
        case "warning":
          toast.warn(toastMessage, { autoClose: 3000, theme: "colored" });
          break;
        default:
          toast.info(toastMessage, { autoClose: 3000, theme: "colored" });
      }
      setToastMessage("");
    }
  }, [toastMessage, toastType]);

  // Handle close with fade-out
  const handleClose = () => {
    setClosing(true);
    setTimeout(() => onClose(), 300); // match animation duration
  };

  return (
    <>
      <div
        className={`modal fade show coupon-modal ${closing ? "fade-out" : ""}`}
        style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-3 shadow">
            <div className="modal-header border-0">
              <button
                type="button"
                className="btn-close shadow-none"
                onClick={handleClose}
              ></button>
            </div>

            <div className="modal-body text-center">
              <h3 className="modal-title fw-bold cupon-title mb-3">
                <span role="img" aria-label="coupon" className="cupon-img">
                  <Image width={40} height={40} src="/img/cupon.png" alt="" />
                </span>
                Special Coupons
              </h3>
              <p className="mb-4 paragraph-md fw-normal">
                Copy a code and use it at checkout to save big!
              </p>

              {couponData?.map((coupon) => (
                <div
                  key={coupon.id}
                  className="mb-3 p-3 border rounded-3 shadow-sm"
                >
                  <h5 className="fw-bold mb-1 text-block-20">
                    {coupon.discount_value}% OFF
                  </h5>

                  <div className="d-flex justify-content-between align-items-center border border-dashed border-2 rounded p-2 mt-3">
                    <span className="fw-bold text-block-16">{coupon.code}</span>
                    <button
                      className="btn primary-bg px-3 text-white btn-sm"
                      onClick={() => copyCode(coupon.code)}
                    >
                      Copy
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Toast handled by react-toastify */}
    </>
  );
};

export default CouponModal;
