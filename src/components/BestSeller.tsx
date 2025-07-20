"use client";
import React from "react";
import Image from "next/image";
import { FaStar, FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";
import { RiHeart2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/store/store";
import { addItem, updateQuantity } from "@/app/store/slices/cartSlice";
import { toggleFavorite } from "@/app/store/slices/favoritesSlice";
import { MenuItem } from "@/types/menuItem";

const BestSeller = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const handleToggleFavorite = (item: MenuItem) => {
    dispatch(toggleFavorite(item));
  };

  const isFavorited = (id: string) => {
    return favorites.some((fav) => fav.id === id);
  };

  const {
    items: menuItems,
    error: menuItemsError,
  } = useSelector((state: RootState) => state.menuItems);

  // Filter best sellers from menu items
  const bestSellers = menuItems.filter((item) => item.is_best_seller);

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

  const handleQuantityChange = (id: string, change: number) => {
    dispatch(updateQuantity({ id, change }));
  };

  const getItemQuantity = (id: string) => {
    const item = cartItems.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };

  if (menuItemsError) return <div>Error loading best sellers</div>;

  return (
    <div className="w-full flex flex-col gap-8 px-4 lg:px-6 py-12 bg-[#f7fafe]">
      <div className="flex flex-col items-start  gap-2">
        <h1 className="relative text-nowrap capitalize text-3xl font-nunito font-bold overflow-x-clip inline-block after:content-[''] after:absolute after:bottom-0 after:-mb-1 after:left-0 after:w-[100px] after:h-[3px] after:bg-[#ee3a43]">
          Best Sellers
        </h1>
        <p className="text-gray-600 max-w-2xl text-center">
          Customer favorites - tried, tested and loved!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full mx-auto">
        {bestSellers.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow relative"
          >
            <div className="relative h-48">
              <Image
                src={item.image_url}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex flex-col justify-start gap-3">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <button onClick={() => handleToggleFavorite(item)}>
                    <RiHeart2Line
                      size={20}
                      className={`${
                        isFavorited(item.id) ? "text-red-500 bg-[#]" : "text-gray-500"
                      } hover:text-red-600 transition-colors cursor-pointer`}
                    />
                  </button>
                </div>
                {item.is_new && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded absolute top-5">
                    New
                  </span>
                )}
              </div>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">
                  EGP {item.base_price.toFixed(2)}
                </span>
                <div className="flex items-center gap-2">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
