"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/lib/api/fetchCategories";
import LoadingSpinner from "@/components/LoadingSpinner";
import MainSwiper from "@/components/MainSwiper";
import MenuSwiperMain from "@/components/MenuSwiperMain";
import BestSeller from "@/components/BestSeller";
import MainOffers from "@/components/MainOffers";
import { RootState } from "./store/store";
import { FaShoppingCart } from "react-icons/fa";
import { fetchMenuItems } from "@/lib/api/fetchMenuItems";


import Link from "next/link";
export default function Home() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);


  useEffect(() => {
    const fetchData = async () => {
      await fetchCategories(dispatch);
      await fetchMenuItems(dispatch);
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);
  return (
    <div className="w-full min-h-screen flex flex-col  bg-[#f7fafe] pb-16 mb-12 lg:mb-0 ">
      <div className="w-full max-w-screen flex flex-col items-center justify-center px-2 lg:px-0 lg:hidden min-h-[100px]"></div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <MainSwiper />
          <MenuSwiperMain />
          <BestSeller />
          <MainOffers />
          {/* Cart Summary Floating Button */}
          {cartItems.length > 0 && (
            <div className="fixed bottom-4 right-4 bg-[#ee3a43] text-white p-3 rounded-full shadow-lg hidden lg:block">
              <Link href={"/cart"}>
                <div className="relative">
                  <FaShoppingCart size={24} />
                  <span className="absolute -top-2 -right-2 bg-white text-[#ee3a43] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}
                  </span>
                </div>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
