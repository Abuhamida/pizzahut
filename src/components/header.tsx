"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { RiMenu3Fill, RiCloseCircleFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { FaPhone } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [isLogin, setIsLogin] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
      setIsProfileOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const page = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Menu",
      link: "/menu",
    },
    {
      name: "About Us",
      link: "/about",
    },
    {
      name: "Contact Us",
      link: "/contact",
    },
  ];

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div
      className={`${
        scrolled || pathname != "/"
          ? "bg-white shadow-md"
          : "bg-white lg:bg-transparent"
      } fixed top-0 left-0 w-full z-50 transition-all duration-300 shadow-lg min-h-10 font-nunito`}
    >
      <div className="flex items-center justify-between lg:justify-center mx-auto px-8 py-4 w-full text-nowrap">
        <Link
          href={"/"}
          className="flex items-center justify-center text-[#EE3A43] fugaz font-bold text-2xl gap-2  "
        >
          <Image
            src="/logo.svg"
            alt="Logo"
            width={500}
            height={500}
            className="cursor-pointer w-16 "
          />
          <h1 className=" font-fugaze">pizaa hut</h1>
        </Link>

        <div className="hidden lg:flex items-center justify-center gap-8 text-black font-semibold text-lg w-full ">
          {page.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className={`hover:scale-95 transition-colors duration-300 ${
                pathname === item.link
                  ? "bg-[#EE3A43] text-white rounded-3xl px-4 py-2"
                  : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center justify-center gap-4 text-black font-semibold text-lg">
          <button className="hidden lg:flex gap-1 justify-center items-center cursor-pointer font-semibold text-lg">
            <FaPhone className="text-2xl bg-[#EE3A43] text-white px-1 rounded-md" />
            Call Support
          </button>
          <div className="relative ">
            <CgProfile
              className={`text-2xl cursor-pointer hover:text-[#EE3A43] transition-colors duration-300 ${
                isProfileOpen ? "text-[#EE3A43]" : "text-black"
              }`}
              onClick={() => setIsProfileOpen((prev) => !prev)}
            />

            {isProfileOpen &&
              (isLogin ? (
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-16 right-8 bg-white shadow-lg rounded-lg p-4 z-50"
                >
                  <h2 className="text-lg font-semibold">Profile</h2>
                  <ul className="mt-2">
                    <li className="py-1 hover:bg-gray-100 cursor-pointer">
                      My Account
                    </li>
                    <li className="py-1 hover:bg-gray-100 cursor-pointer">
                      Orders
                    </li>
                    <li className="py-1 hover:bg-gray-100 cursor-pointer">
                      Logout
                    </li>
                  </ul>
                </motion.div>
              ) : (
                <div className="absolute top-16 right-8 bg-white shadow-lg rounded-lg p-4 z-50">
                  <h2 className="text-lg font-semibold">
                    <Link href={"/login"}>Login</Link>
                  </h2>
                  <h2 className="text-lg font-semibold">
                    <Link href={"/signup"}>Register </Link>
                  </h2>
                </div>
              ))}
          </div>
        </div>

        <div className="lg:hidden z-50 ">
          <RiMenu3Fill
            className="text-[#EE3A43] text-2xl font-bold"
            onClick={() => setIsOpen(true)}
          />
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="absolute top-0 left-0 w-full h-screen overflow-y-auto bg-white z-50 px-5 py-20"
            >
              <RiCloseCircleFill
                className="text-[#EE3A43] text-3xl font-bold absolute top-8 right-6"
                onClick={() => setIsOpen(false)}
              />
              <div className="flex flex-col items-start justify-start gap-2 text-black font-semibold text-lg">
                {page.map((item, index) => (
                  <Link
                    key={index}
                    href={item.link}
                    className={`hover:scale-95 transition-colors duration-300 ${
                      pathname === item.link
                        ? "bg-[#EE3A43] text-white rounded-3xl px-4 py-2"
                        : "px-4 py-2"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <motion.h1
                      initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.3, delay: index * 0.2 }}
                    >
                      {item.name}
                    </motion.h1>
                  </Link>
                ))}
              </div>
              {isLogin ? (
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.3, delay: page.length * 0.2 }}
                  className="flex flex-col items-start justify-start gap-2 mt-4 font-semibold text-lg px-4 pb-2 w-full border-t border-black/30"
                >
                  <Link href={"/profile"} className="text-lg pb-2 pt-2">
                    My Account
                  </Link>
                  <Link href={"/orders"} className="text-lg pb-2">
                    Orders
                  </Link>
                  <Link href={"/logout"} className="text-lg pb-2">
                    Logout
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.3, delay: page.length * 0.2 }}
                  className="flex flex-col items-start justify-start gap-2 mt-4 font-semibold text-lg px-4 pb-2 w-full border-t border-black/30"
                >
                  <Link href={"/login"} className="text-lg">
                    Login
                  </Link>
                  <Link href={"/signup"} className="text-lg">
                    Register
                  </Link>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3, delay: page.length * 0.2 }}
                className="flex flex-col items-start justify-start gap-2 mt-4 font-semibold text-lg px-4 pb-2 w-full border-t border-black/30"
              >
                {[
                  { name: "Feedback", link: "" },
                  { name: "FAQ", link: "" },
                  { name: "Terms & Conditions", link: "" },
                  { name: "Privacy Policy", link: "" },
                  { name: "Cookie Policy", link: "" },
                  { name: "Nutrition Information", link: "" },
                ].map((item, index) => (
                  <Link
                    key={index}
                    href={item.link}
                    className="text-lg  py-2 hover:text-[#EE3A43] transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                ))}
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3, delay: page.length * 0.2 }}
                className="flex gap-1 items-center cursor-pointer font-semibold text-lg py-2 px-4 shadow-md w-full justify-start "
              >
                <FaPhone className="text-2xl bg-[#EE3A43] text-white px-1 rounded-md" />
                <Link href="/contact">Call Support </Link>
              </motion.button>
            </motion.div>
          )}{" "}
        </div>
      </div>
    </div>
  );
}
