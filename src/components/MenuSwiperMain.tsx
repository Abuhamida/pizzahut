"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import { Swiper as SwiperType } from "swiper"; // import Swiper type
import { setActiveCategory } from "@/app/store/slices/activeCategorySlice";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/app/store/store";

export default function MenuSwiperMain() {
  const swiperRef = useRef<SwiperType | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const categories = useSelector(
    (state: RootState) => state.category.categories
  );

  const handleCategoryClick = (categoryId: string) => {
    dispatch(setActiveCategory(categoryId));
    router.push("/menu");
  };

  const extendedCategories = [
    ...categories,
    { id: "favorites", name: "Favorites",image_url:"/favorite.png" },
  ];

  return (
    <div className="w-full max-w-screen flex flex-col lg:flex-row gap-10 items-center justify-start px-2 lg:px-6 mt-4 bg-[#f7fafe] ">
      <div className="flex flex-col justify-center items-start lg:items-center gap-10 w-full lg:w-auto">
        <h1 className="relative text-nowrap capitalize text-3xl font-nunito font-bold overflow-x-clip inline-block after:content-[''] after:absolute after:bottom-0 after:-mb-1 after:left-0 after:w-[100px] after:h-[3px] after:bg-[#ee3a43]">
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
          {extendedCategories.map((items, index) => (
            <SwiperSlide key={index} className="!w-44 cursor-pointer">
              <button onClick={() => handleCategoryClick(items.id)}>
                <div className="relative h-56 w-40 rounded-t-full rounded-b-xl p-4 bg-[#ed274b] flex flex-col justify-center items-center group cursor-pointer overflow-hidden">
                  <Image
                    src={(items.image_url ?? "/fallback.png") as string}
                    alt={`Slide ${index + 1}`}
                    width={600}
                    height={600}
                    className="w-32 h-32 object-cover group-hover:scale-105 transition-transform duration-300 rounded-full"
                  />
                  <h1 className="text-white font-bold font-nunito mt-2 text-nowrap group">
                    {items.name}
                  </h1>
                </div>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
