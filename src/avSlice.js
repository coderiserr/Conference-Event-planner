import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    name: "Microphone System",
    cost: 100,
    quantity: 0,
    img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Professional Speakers",
    cost: 200,
    quantity: 0,
    img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Digital Signage",
    cost: 150,
    quantity: 0,
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "Interactive Whiteboard",
    cost: 300,
    quantity: 0,
    img: "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2070&auto=format&fit=crop"
  },
  {
    name: "4K Projector System",
    cost: 400,
    quantity: 0,
    img: "https://images.unsplash.com/photo-1585504198199-20277593b94f?q=80&w=2069&auto=format&fit=crop"
  },
  {
    name: "Video Conferencing Setup",
    cost: 350,
    quantity: 0,
    img: "https://images.unsplash.com/photo-1616400619175-5beda3a17896?q=80&w=2070&auto=format&fit=crop"
  }
];

const avSlice = createSlice({
  name: "av",
  initialState,

  reducers: {
    incrementAvQuantity: (state, action) => {
      const index = action.payload;
      state[index].quantity += 1;
    },
    decrementAvQuantity: (state, action) => {
      const index = action.payload;
      if (state[index].quantity > 0) {
        state[index].quantity -= 1;
      }
    },
  },
});

export const { incrementAvQuantity, decrementAvQuantity } = avSlice.actions;

export default avSlice.reducer;
