import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
    reducers: {
      

    add:(state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      state.totalQuantity++;

      if (!existingItem) {
        state.items.push({
          id: action.payload.id,
          price: action.payload.price,
          quantity: 1,
          totalPrice: action.payload.price,
          title: action.payload.title,
          images: action.payload.images
        });
      } else {
        existingItem.quantity++,
          (existingItem.totalPrice += action.payload.price);
      }
      state.totalPrice += action.payload.price
    },
    remove:(state, action) =>  {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      state.totalQuantity--;
      state.totalPrice -= existingItem.price;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    },

    clearCart:(state) => {
        state.items = [];
        state.totalPrice = 0;
        state.totalQuantity = 0
    },
  },
});

export const { add, remove, clearCart } = cartSlice.actions;
export default cartSlice.reducer;


