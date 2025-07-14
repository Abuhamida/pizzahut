"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import { Swiper as SwiperType } from "swiper"; // import Swiper type

export default function MenuSwiperMain() {
  const swiperRef = useRef<SwiperType | null>(null);

  const swiperImages = [
    { image: "/beef.png", name: "My Box Range", link: "#" },
    { image: "/burger.png", name: "Special Offers", link: "#" },
    { image: "/pie.png", name: "For Sharing", link: "#" },
    { image: "/pie.png", name: "For One", link: "#" },
    { image: "/wings.png", name: "Hut Favorites", link: "#" },
    { image: "/cheese.png", name: "Hut Signatures", link: "#" },
    { image: "/beef2.png", name: "Starters", link: "#" },
    { image: "/salmon.png", name: "Drinks and Desserts", link: "#" },
    { image: "/beef.png", name: "Kids", link: "#" },
    { image: "/burger.png", name: "Dips and Seasoning", link: "#" },
    { image: "/pie.png", name: "Build Your Own", link: "#" },
  ];

  return (
    <div className="w-full max-w-screen flex flex-col lg:flex-row gap-10 items-center justify-start px-2 lg:px-6 mt-4 bg-[#f7fafe] ">
      <div className="flex flex-col justify-center items-start lg:items-center gap-10 w-full lg:w-auto">
        <h1 className="relative text-nowrap capitalize text-xl font-nunito font-bold overflow-x-clip inline-block after:content-[''] after:absolute after:bottom-0 after:-mb-1 after:left-0 after:-translate-x-1/2 after:w-[100px] after:h-[3px] after:bg-[#ee3a43]">
          Explore Menu
        </h1>
        <div className="lg:flex w-full justify-between items-center hidden">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="text-3xl text-[#ed274b] cursor-pointer hover:scale-95"
          >
            <FaArrowCircleLeft />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="text-3xl text-[#ed274b] cursor-pointer hover:scale-95"
          >
            <FaArrowCircleRight />
          </button>
        </div>
      </div>

      <div className="w-full max-w-screen flex items-center justify-center px-2 lg:px-0  overflow-x-hidden">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={10}
          loop={false}
          autoplay={false}
          pagination={{ clickable: true }}
          observer={true}
          observeParents={true}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          slidesPerView="auto"
          className="w-full h-full"
        >
          {swiperImages.map((items, index) => (
            <SwiperSlide key={index} className="!w-44 cursor-pointer">
              <Link href={items.link}>
                <div className="relative h-56 w-40 rounded-t-full rounded-b-xl p-4 bg-[#ed274b] flex flex-col justify-center items-center group">
                  <Image
                    src={items.image}
                    alt={`Slide ${index + 1}`}
                    width={1920}
                    height={600}
                    className="w-40 object-fill group-hover:scale-105 transition-transform duration-300"
                  />
                  <h1 className="text-white font-bold font-nunito mt-2 text-nowrap group">
                    {items.name}
                  </h1>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
