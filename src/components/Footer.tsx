import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
export default function Footer() {

  const time = new Date();
  const year = time.getFullYear();

  return (
    <div className=" relative   flex flex-col justify-center items-center w-full  px-8 py-4 text-nowrap min-h-56">
      <div className=" absolute -top-10 left-1/2 -translate-x-1/2 z-50 ">
        <Image
          src={"/logo.svg"}
          alt=""
          width={500}
          height={500}
          className=" object-cover bg-center w-20  bg-white rounded-full p-1 "
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
              { name: "For SharingFor One", link: "/for-sharing-for-one" },
              {
                name: "Hut FavoritesHut Signatures",
                link: "/hut-favorites-hut-signatures",
              },
              {
                name: "StartersDrinks and Desserts",
                link: "/starters-drinks-and-desserts",
              },
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
              { name: "About Us", link: "/about-us" },
              { name: "Location", link: "/ocation" },
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
                link: "https://www.facebook.com",
                icon: <FaFacebook />,
              },
              {
                name: "Instagram",
                link: "https://www.instagram.com",
                icon: <FaInstagram />,
              },
              {
                name: "Twitter",
                link: "https://www.twitter.com",
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
            <Link href={"/"}>
              <Image
                src={"/google-store.png"}
                alt=""
                height={500}
                width={500}
                className="w-28"
              />
            </Link>
            <Link href={"/"}>
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
  );
}
