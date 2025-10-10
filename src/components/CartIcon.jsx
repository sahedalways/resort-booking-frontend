"use client";

import { Provider, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { store } from "../redux/store/store";

const CartIcon = ({ handleClose }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link href="/user/cart" onClick={handleClose} className="position-relative">
      <Icon
        icon="mdi:cart-outline"
        width="30"
        height="30"
        className="text-secondary"
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

export default function CartBadge() {
  return (
    <Provider store={store}>
      <CartIcon />
    </Provider>
  );
}
