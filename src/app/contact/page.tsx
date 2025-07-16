"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { showToast } from "@/components/Toast";

export default function ContactPage() {
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-center min-h-screen max-w-7xl w-full mx-auto gap-5 lg:gap-10 py-20 px-5 lg:px-10 relative">
      {/* Contact Form */}
      <div className="w-full lg:w-1/2 p-5 lg:p-10 z-10">
        <h1 className="text-2xl font-bold mb-6 text-center lg:text-left">Contact Us</h1>
        <div className="flex flex-col gap-4">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="input input-ghost w-full border-b-2 border-gray-300 focus:border-[#ed3b43] focus:outline-none"
          />
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="input input-ghost w-full border-b-2 border-gray-300 focus:border-[#ed3b43] focus:outline-none"
          />
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            className="input input-ghost w-full border-b-2 border-gray-300 focus:border-[#ed3b43] focus:outline-none"
          />
        </div>
        <button
          onClick={() =>
            showToast({ message: "Thanks for reaching out!", type: "success" })
          }
          className="bg-[#ed3b43] text-white py-3 px-6 rounded hover:bg-[#d73f1f] cursor-pointer w-full mt-6"
        >
          Send Message
        </button>
      </div>

      {/* Contact Image and Info */}
      <div className="w-full lg:w-1/2 relative">
        <div className="relative w-full h-full">
          <Image
            src="/contactus.png"
            className="w-full h-auto object-cover rounded-lg"
            alt="Contact Us"
            width={600}
            height={500}
            priority
          />
          
          {/* Text content - positioned middle right on all screens */}
          <div className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 p-4 sm:p-6 shadow-2xl bg-white/10 rounded-2xl  lg:shadow-none lg:bg-white/0 lg:rounded-none max-w-[80%] sm:max-w-xs">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-[#ee3a43]">Contact Info</h2>
            <div className="flex flex-col gap-2 sm:gap-3">
              <a
                href="tel:19000"
                className="font-semibold flex gap-2 items-center hover:underline text-sm sm:text-base"
              >
                <FaPhoneAlt className="text-lg sm:text-xl" />
                19000
              </a>
              <a
                href="mailto:apps@americana-food.com"
                className="font-semibold flex gap-2 items-center hover:underline text-sm sm:text-base"
              >
                <MdOutlineEmail className="text-lg sm:text-xl" />
                apps@americana-food.com
              </a>
            </div>
            
            <div className="mt-3 sm:mt-4">
              <h3 className="capitalize mb-1 sm:mb-2 font-medium text-sm sm:text-base">Follow us</h3>
              <div className="flex items-center gap-3 sm:gap-4 text-xl sm:text-2xl text-[#ee3a43]">
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
                    target="_blank"
                    className="hover:text-[#b80000] transition-colors duration-300"
                    aria-label={item.name}
                  >
                    {item.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}