// src/store/slices/orderSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: "Processing" | "Out for Delivery" | "Delivered";
}

interface OrderState {
  history: Order[];
}

const initialState: OrderState = {
  history: [
    {
      id: "12345",
      date: "2023-05-15",
      items: [
        {
          id: "1",
          name: "Super Supreme Pizza",
          price: 12.99,
          quantity: 2,
          image: "/supreme-pizza.jpg",
        },
        {
          id: "3",
          name: "Garlic Bread",
          price: 4.99,
          quantity: 1,
          image: "/garlic-bread.jpg",
        },
      ],
      total: 30.97,
      status: "Delivered",
    },
    // Add more sample orders as needed
  ],
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // Add reducers for order operations if needed
  },
});

export default orderSlice.reducer;