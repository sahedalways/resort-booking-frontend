"use client";

import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const CartIcon = ({ setShowMenu }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const pathname = usePathname(); // get current route
  const isActive = pathname.replace(/\/$/, "") === "/user/cart";

  return (
    <Link
      href="/user/cart"
      onClick={() => setShowMenu(false)}
      className="position-relative"
    >
      <Icon
        icon="mdi:cart-outline"
        width="30"
        height="30"
        style={{
          color: isActive ? "#0d6efd" : "#6c757d",
          transition: "color 0.3s",
        }}
      />
      {totalQuantity > 0 && (
        <span
          className="badge bg-danger"
          style={{
            position: "absolute",
            top: "-6px",
            right: "-6px",
            fontSize: "12px",
            borderRadius: "50%",
            padding: "0.3rem 0.4rem",
          }}
        >
          {totalQuantity}
        </span>
      )}
    </Link>
  );
};

export default function CartBadge({ setShowMenu }) {
  return <CartIcon setShowMenu={setShowMenu} />;
}
