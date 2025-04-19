// venueSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    name: "Large Meeting Room (Capacity:50)",
    cost: 1000,
    quantity: 0,
    img: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=80&w=1925&auto=format&fit=crop"
  },
  {
    name: "Conference Room (Capacity:100)",
    cost: 2000,
    quantity: 0,
    img: "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Auditorium Hall (Capacity:200)",
    cost: 5000,
    quantity: 0,
    img: "https://images.unsplash.com/photo-1526041092449-209d556f7a32?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Executive Boardroom (Capacity:20)",
    cost: 800,
    quantity: 0,
    img: "https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Training Room (Capacity:40)",
    cost: 1200,
    quantity: 0,
    img: "https://images.unsplash.com/photo-1558008258-3256797b43f3?q=80&w=2071&auto=format&fit=crop"
  },
  {
    name: "Presentation Hall (Capacity:80)",
    cost: 1800,
    quantity: 0,
    img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop"
  }
];

const venueSlice = createSlice({
  name: "venue",
  initialState,
  reducers: {
    incrementQuantity: (state, action) => {
      const index = action.payload;
      if (state[index].name === "Auditorium Hall (Capacity:200)" && state[index].quantity >= 3) {
        return;
      }
      state[index].quantity += 1;
    },
    decrementQuantity: (state, action) => {
      const index = action.payload;
      if (state[index].quantity > 0) {
        state[index].quantity -= 1;
      }
    },
  },
});

export const { incrementQuantity, decrementQuantity } = venueSlice.actions;

export default venueSlice.reducer;
