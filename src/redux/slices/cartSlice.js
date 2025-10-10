import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage
const savedCart =
  typeof window !== "undefined" ? localStorage.getItem("bx_cart") : null;
const initialState = savedCart
  ? JSON.parse(savedCart)
  : {
      resortId: null,
      items: [],
      lastAction: null,
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { room, resortId, resortName } = action.payload;

      state.items = [];
      // if (state.resortId && state.resortId !== resortId) {
      //   state.items = [];
      // }

      state.resortId = resortId;
      state.resortName = resortName;

      const existingItem = state.items.find((item) => item.id === room.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...room, quantity: 1 });
      }

      state.lastAction = {
        type: "add",
        roomId: room.id,
        message: `${room.name} added to cart!`,
      };

      // Save updated cart to localStorage
      localStorage.setItem(
        "bx_cart",
        JSON.stringify({
          resortId: state.resortId,
          items: state.items,
          resortName: state.resortName,
        })
      );
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      if (index !== -1) {
        const removedRoom = state.items[index];
        state.items.splice(index, 1);
        state.lastAction = {
          type: "remove",
          roomId: id,
          message: `${removedRoom.name} removed from cart!`,
        };
      }

      if (state.items.length === 0) {
        state.resortId = null;
      }

      // Save updated cart to localStorage
      localStorage.setItem(
        "bx_cart",
        JSON.stringify({ resortId: state.resortId, items: state.items })
      );
    },

    setBookingDetails: (state, action) => {
      state.bookingDetails = action.payload;

      localStorage.setItem(
        "bx_cart",
        JSON.stringify({
          resortId: state.resortId,
          resortName: state.resortName,
          items: state.items,
          guestData: state.guestData,
          bookingDetails: state.bookingDetails,
        })
      );
    },

    clearLastAction: (state) => {
      state.lastAction = null;
    },
  },
});

export const { addToCart, removeFromCart, clearLastAction, setBookingDetails } =
  cartSlice.actions;
export default cartSlice.reducer;
