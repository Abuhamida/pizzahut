"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { showToast } from "@/components/Toast";
export default function page() {
  return (
    <div className="flex fle-col lg:flex-row items-center justify-center min-h-screen max-w-5xl w-full mx-auto gap-5 p-5">
      <div className="w-full lg:w-1/2 p-5">
          <h1 className="text-2xl font-bold mb-4 text-center">Contact Us</h1>
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
            onClick={() => showToast({ message: "Thanks for reaching out!", type: "success" })}
            className="bg-[#ed3b43] text-white py-2 px-4 rounded hover:bg-[#d73f1f] cursor-pointer w-full mt-4"
          >
            Send Message
          </button>
      </div>
      <div className="w-full lg:w-3/4 p-5 relative">
        <Image
          src="/contactus.png"
          className="w-full h-auto object-cover bg-center bg-no-repeat rounded-lg absolute right-0 top-1/2 -translate-y-1/2"
          alt="Contact Us"
          width={600}
          height={500}
        />

        <div className="absolute -top-10 left-0 right-0  w-full flex flex-col items-start ml-76 text-left gap-3 text-[#ee3a43]">
          <a
            href="tel:19000"
            className="font-semibold flex gap-1 items-center justify-center hover:underline"
          >
            <FaPhoneAlt className="text-xl" />
            19000
          </a>

          <a
            href="mailto:apps@americana-food.com"
            className="font-semibold flex gap-1 items-center justify-center hover:underline"
          >
            <MdOutlineEmail className="text-xl" />
            apps@americana-food.com
          </a>

          <div className="flex flex-col gap-2">
            <h1 className="capitalize">follow us</h1>
            <div className=" flex items-center gap-4 text-2xl text-[#ee3a43]">
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
          </div>
        </div>
      </div>
    </div>
  );
}
