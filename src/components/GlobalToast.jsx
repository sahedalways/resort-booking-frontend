"use client";

import { useEffect } from "react";
import { useSelector, useDispatch, Provider } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "../redux/store/store";
import { clearLastAction } from "../redux/slices/cartSlice";

const GlobalToastComponent = () => {
  const dispatch = useDispatch();
  const lastAction = useSelector((state) => state.cart.lastAction);

  useEffect(() => {
    if (!lastAction) return;

    // Show toast
    if (lastAction.type === "add") {
      toast.success(lastAction.message);
    } else if (lastAction.type === "remove") {
      toast.error(lastAction.message);
    }

    // Clear lastAction in Redux
    dispatch(clearLastAction());
  }, [lastAction, dispatch]);

  return (
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  );
};

export default function GlobalToast() {
  return (
    <Provider store={store}>
      <GlobalToastComponent />
    </Provider>
  );
}
