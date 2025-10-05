import React from "react";
import Image from "next/image";

interface CouponModalProps {
  onClose: () => void;
}

const CouponModal: React.FC<CouponModalProps> = ({ onClose }) => {
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`Copied: ${code}`);
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-3 shadow">
          <div className="modal-header border-0">
            
            <button
              type="button"
              className="btn-close shadow-none"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body text-center">
            <h3 className="modal-title fw-bold cupon-title">
              <span role="img" aria-label="coupon" className="cupon-img">
                <Image width={40} height={40} src="/img/cupon.png" alt="" />
              </span>
              Special Coupons
            </h3>
            <p className="mb-4 paragraph-md fw-normal">
              Copy a code and use it at checkout to save big!
            </p>

            {/* Coupon 1 */}
            <div className="mb-3 p-3 border rounded-3 shadow-sm">
              <h5 className="fw-bold mb-1 text-block-20">20% OFF</h5>
              <span className="text-muted small">Valid until Oct 15, 2025</span>
              <div className="d-flex justify-content-between align-items-center border border-dashed border-2 rounded p-2 mt-3">
                <span className="fw-bold text-block-16">SAVE20</span>
                <button
                  className="btn primary-bg px-3 text-white btn-sm"
                  onClick={() => copyCode("SAVE20")}
                >
                  Copy
                </button>
              </div>
            </div>

            {/* Coupon 2 */}
            <div className="mb-2 p-3 border rounded-3 shadow-sm">
              <h5 className="fw-bold mb-1 text-block-20">15% OFF</h5>
              <span className="text-muted small">Valid until Oct 31, 2025</span>
              <div className="d-flex justify-content-between align-items-center border border-dashed border-2 rounded p-2 mt-3">
                <span className="fw-bold text-block-16">SAVE15</span>
                <button
                  className="btn primary-bg px-3 text-white btn-sm"
                  onClick={() => copyCode("SAVE15")}
                >
                  Copy
                </button>
              </div>
            </div>
          </div>

          {/*<div className="modal-footer border-0">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>*/}
        </div>
      </div>
    </div>
  );
};

export default CouponModal;
