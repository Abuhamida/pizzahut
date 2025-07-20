"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FaSearch, FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";
import { MenuItem } from "@/types/menuItem";
import { useDispatch, useSelector } from "react-redux";
import { addItem, updateQuantity } from "@/app/store/slices/cartSlice";
import { AppDispatch, RootState } from "@/app/store/store";

export const SearchModal = ({
  isOpen,
  onClose,
  menuItems,
  onAddToCart,
}: {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const filteredItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);
  const handleQuantityChange = (id: string, change: number) => {
    dispatch(updateQuantity({ id, change }));
  };

  const handleAddToCart = (item: MenuItem) => {
    dispatch(
      addItem({
        id: item.id,
        name: item.name,
        price: item.base_price,
        image: item.image_url,
      })
    );
  };

  const getItemQuantity = (id: string) => {
    const item = cartItems.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };
  if (!isOpen) return null;

  return (
     <div className="fixed inset-0 z-40 flex justify-center items-start bg-black/30 backdrop-blur-sm px-2 sm:px-4 py-10 sm:py-20">
      <div
        ref={modalRef}
        className="bg-white rounded-lg w-full max-w-md sm:max-w-2xl max-h-[80vh] overflow-hidden shadow-lg flex flex-col"
      >
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Search Menu Items</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
          </div>
          <div className="relative mt-4">
            <input
              type="text"
              placeholder="Search for pizzas, sides, drinks..."
              className="w-full p-3 pl-10 border rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <FaSearch className="absolute left-3 top-4 text-gray-400" />
          </div>
        </div>

        <div className="overflow-y-auto max-h-[50vh] lg:max-h-[60vh] max-w-sceen">
          {filteredItems.length > 0 ? ( 
            <ul className="divide-y">
              {filteredItems.map((item) => (
                <li key={item.id} className="p-4 hover:bg-gray-50">
                  <div className="flex gap-4">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-bold text-[#ee3a43]">
                          EGP {item.base_price.toFixed(2)}
                        </span>
                        {getItemQuantity(item.id) > 0 ? (
                          <>
                            <button
                              onClick={() => handleQuantityChange(item.id, -1)}
                              className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                            >
                              <FaMinus size={14} />
                            </button>
                            <span>{getItemQuantity(item.id)}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, 1)}
                              className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                            >
                              <FaPlus size={14} />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="flex items-center gap-1 bg-[#ee3a43] text-white px-3 py-1 rounded-full text-sm hover:bg-[#d63333]"
                          >
                            <FaShoppingCart size={12} />
                            Add
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-8 text-center text-gray-500">
              {searchQuery ? "No items found" : "Start typing to search"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
