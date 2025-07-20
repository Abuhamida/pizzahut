"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { BiFoodMenu } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { BiSolidOffer } from "react-icons/bi";
import { BsCart3 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { setActiveCategory } from "@/app/store/slices/activeCategorySlice";
import { addItem, updateQuantity } from "@/app/store/slices/cartSlice";
import { setOpenSearch } from "@/app/store/slices/searchModalSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SearchModal } from "./SearchModal";
import { MenuItem } from "@/types/menuItem";
interface Category {
  id: string;
  name: string;
  description: string;
  position: number;
  created_at: string;
}

export default function Footer() {
  const time = new Date();
  const year = time.getFullYear();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const dispatch = useDispatch();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories/get");
        const data = await res.json();
        setCategoriesData(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, []);
  const pastaCategory = categoriesData.find((item: any) =>
    item.name.includes("Pasta")
  );
  const router = useRouter();

  const handleCategoryClick = (categoryId: string) => {
    dispatch(setActiveCategory(categoryId));
    router.push("/menu");
  };
  const {
    items: menuItems,
    loading: menuItemsLoading,
    error: menuItemsError,
  } = useSelector((state: RootState) => state.menuItems);

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

  return (
    <div className="  flex flex-col justify-center items-center w-full pb-5 text-nowrap font-nunito   ">
      <div className=" hidden lg:flex flex-col justify-center items-center w-full border-t border-black/30  pt-5 relative">
        <div className=" absolute -top-12 left-1/2 -translate-x-1/2 z-30 ">
          <Image
            src={"/logo.svg"}
            alt=""
            width={500}
            height={500}
            className=" object-cover bg-center w-24  bg-[#f7fafe] rounded-full p-1 "
          />
        </div>
        <div className=" absolute top-0 left-0 w-full h-full z-[-1] ">
          <Image
            src={"/footer-1.png"}
            alt=""
            width={500}
            height={500}
            className=" object-cover bg-center mix-blend-color opacity-80 w-96"
          />
        </div>

        <div className=" w-full md:max-w-2/3 flex flex-wrap justify-start  gap-10 lg:justify-between border-b-4 border-[#ee7d49] py-6">
          <div>
            <h1 className=" font-fredoka font-bold text-xl border-b-2 border-[#ee7d49] uppercase">
              menu
            </h1>
            <div className=" flex flex-col gap-2 mt-4">
              {[
                { name: "My Box Range", link: "/my-box-range" },
                { name: "Special Offers", link: "/special-offers" },
                { name: "For Sharing", link: "/for-sharing" },
                { name: "For One", link: "/for-one" },
                { name: "Hut Favorites", link: "/hut-favorites" },
                { name: "Hut Signatures", link: "/hut-signatures" },
                { name: "Starters", link: "/starters" },
                { name: "Drinks and Desserts", link: "/drinks-and-desserts" },
                { name: "Kids", link: "/kids" },
                { name: "Dips and Seasoning", link: "/dips-and-seasoning" },
                { name: "Build Your Own", link: "/build-your-own" },
              ].map((item, index) => (
                <Link
                  href={item.link}
                  key={index}
                  className=" font-nunito  text-md flex items-center gap-2 hover:text-[#EE3A43] transition-colors duration-300"
                >
                  <IoIosArrowForward />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h1 className=" font-fredoka font-bold text-xl border-b-2 border-[#ee7d49] uppercase">
              Custom Service
            </h1>
            <div className=" flex flex-col gap-2 mt-4">
              {[
                { name: "Contact Us", link: "/contact-us" },
                { name: "FAQs", link: "/faqs" },
                { name: "Terms and Conditions", link: "/terms-and-conditions" },
                { name: "Privacy Policy", link: "/privacy-policy" },
                { name: "Cookie Policy", link: "/cookie-policy" },
              ].map((item, index) => (
                <Link
                  href={item.link}
                  key={index}
                  className=" font-nunito text-md flex items-center gap-2 hover:text-[#EE3A43] transition-colors duration-300"
                >
                  <IoIosArrowForward />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h1 className=" font-fredoka font-bold text-xl border-b-2 border-[#ee7d49] uppercase">
              My Account
            </h1>
            <div className=" flex flex-col gap-2 mt-4">
              {[
                { name: "Sign In", link: "/sign-in" },
                { name: "Register", link: "/register" },
                { name: "My Orders", link: "/my-orders" },
                { name: "My Profile", link: "/my-profile" },
              ].map((item, index) => (
                <Link
                  href={item.link}
                  key={index}
                  className=" font-nunito text-md flex items-center gap-2 hover:text-[#EE3A43] transition-colors duration-300"
                >
                  <IoIosArrowForward />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h1 className=" font-fredoka font-bold text-xl border-b-2 border-[#ee7d49] uppercase">
              About
            </h1>
            <div className=" flex flex-col gap-2 mt-4">
              {[
                { name: "About Us", link: "/about" },
                { name: "Location", link: "/location" },
              ].map((item, index) => (
                <Link
                  href={item.link}
                  key={index}
                  className=" font-nunito text-md flex items-center gap-2 hover:text-[#EE3A43] transition-colors duration-300"
                >
                  <IoIosArrowForward />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h1 className=" font-fredoka font-bold text-xl border-b-2 border-[#ee7d49] uppercase">
              follow us
            </h1>
            <div className=" flex items-center gap-4 mt-4 text-2xl text-black ">
              {[
                {
                  name: "Facebook",
                  link: "https://www.facebook.com/Pizzahutuae/",
                  icon: <FaFacebook />,
                },
                {
                  name: "Instagram",
                  link: "https://www.instagram.com/pizzahutme/",
                  icon: <FaInstagram />,
                },
                {
                  name: "Twitter",
                  link: "https://twitter.com/pizzahutme/",
                  icon: <FaTwitter />,
                },
              ].map((item, index) => (
                <Link
                  href={item.link}
                  key={index}
                  className=" hover:text-[#EE3A43] transition-colors duration-300"
                >
                  {item.icon}
                </Link>
              ))}
            </div>
            <div className=" flex flex-row md:flex-col items-center gap-4 mt-4">
              <Link
                href={
                  "https://play.google.com/store/apps/details?id=com.pizzahutapp"
                }
              >
                <Image
                  src={"/google-store.png"}
                  alt=""
                  height={500}
                  width={500}
                  className="w-28"
                />
              </Link>
              <Link
                href={
                  "https://apps.apple.com/us/app/pizza-hut-uae-order-food-now/id1147168061"
                }
              >
                <Image
                  src={"/app-store.png"}
                  alt=""
                  height={500}
                  width={500}
                  className="w-28"
                />
              </Link>
            </div>
          </div>
        </div>
        <div>
          <p className=" text-center text-sm font-nunito mt-4">
            © {year} Pizza Hut. All rights reserved.
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center lg:hidden w-full bg-white  min-20 fixed bottom-0 px-4 py-5  border-t border-black/30 z-40 ">
        <div className="flex justify-between w-full items-center">
          {[
            { name: "menu", link: "/menu", icon: <BiFoodMenu /> },
            { name: "search", link: "/#", icon: <FiSearch /> },
            { name: "offers", link: "/offers", icon: <BiSolidOffer /> },
            { name: "cart", link: "/cart", icon: <BsCart3 /> },
            { name: "pasta", link: "/menu", icon: <BiFoodMenu /> },
          ].map((item, index) => (
            <Link
              href={item.name === "search" ? "#" : item.link}
              key={index}
              onClick={(e) => {
                if (item.name === "pasta" && pastaCategory) {
                  handleCategoryClick(pastaCategory.id);
                }
                if (item.name === "search") {
                  e.preventDefault();
                  dispatch(setOpenSearch(true)); 
                  router.push("/menu"); 
                  return;
                }
              }}
            >
              <div className="flex flex-col justify-end items-center gap-1 capitalize ">
                <div
                  className={`text-2xl ${
                    item.link == "/offers"
                      ? " absolute text-white bg-[#ee3a43] p-5 rounded-full border-white border-2 -top-10 text-4xl shadow"
                      : ""
                  } `}
                >
                  <div className={`${item.link == "/cart" ? "relative" : ""}`}>
                    {item.icon}
                    {item.link == "/cart" && cartItems.length > 0 && (
                      <div className="absolute -top-2 -right-2 bg-[#ee3a43] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItems.reduce(
                          (total, item) => total + item.quantity,
                          0
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <h1
                  className={`my-auto h-full mx-auto ${
                    item.link == "/offers" ? " mt-7" : ""
                  }`}
                >
                  {item.name}
                </h1>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
