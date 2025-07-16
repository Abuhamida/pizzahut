// src/app/cart/page.tsx
"use client";
import React from "react";
import { FaTrash, FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/store/store";
import { removeItem, updateQuantity, clearCart } from "@/app/store/slices/cartSlice";
import Link from "next/link";
import Image from "next/image";

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.cart);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (id: string, change: number) => {
    dispatch(updateQuantity({ id, change }));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="w-full">
          <div className="flex items-center mb-6">
            <Link href="/menu" className="mr-4 text-[#ee3a43]">
              <FaArrowLeft size={20} />
            </Link>
            <h1 className="text-2xl font-bold">Your Cart ({items.length})</h1>
            {items.length > 0 && (
              <button
                onClick={handleClearCart}
                className="ml-auto text-sm text-red-500 hover:underline"
              >
                Clear Cart
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="text-center py-12 w-full">
              <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-4">
                Start adding some delicious items from our menu
              </p>
              <Link
                href="/menu"
                className="inline-block bg-[#ee3a43] text-white px-6 py-2 rounded-full hover:bg-[#d63333]"
              >
                Browse Menu
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row gap-4 p-4 border rounded-lg"
                >
                  <div className="relative w-full sm:w-32 h-32">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <FaTrash />
                      </button>
                    </div>
                    <p className="text-gray-600 mb-2">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-4 mt-4">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary */}
        {items.length > 0 && (
          <div className="md:w-1/3">
            <div className="bg-gray-50 p-6 rounded-lg sticky top-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold mb-4">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 mb-4">
                  <span>Delivery Fee</span>
                  <span>$2.99</span>
                </div>
                <div className="flex justify-between text-lg font-bold mb-6">
                  <span>Total</span>
                  <span>${(subtotal + 2.99).toFixed(2)}</span>
                </div>
                <button className="w-full bg-[#ee3a43] text-white py-3 rounded-full hover:bg-[#d63333] font-medium">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;