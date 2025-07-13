"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
export default function MainSwiper() {
  const swiperImages = ["/main-5.png", "/main-1.png", "/limo.png"];

  return (
    <div className="w-full max-w-screen  flex items-center justify-center px-2 lg:px-0">
      <Swiper
  modules={[Navigation, Pagination, Autoplay]}
  spaceBetween={20}
  loop={true}
  autoplay={{ delay: 3000 }}
  pagination={{ clickable: true }}
  observer={true}
  observeParents={true}
  breakpoints={{
    0: {
      slidesPerView: 1.1, 
    },
    1024: {
      slidesPerView: 1, 
    },
  }}
  className="w-full max-w-screen h-[200px] sm:h-[250px] md:h-[350px] lg:h-[650px]"
>

        {/* <SwiperSlide className="w-full h-full ">
          <video
            src="/main-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </SwiperSlide> */}

        {swiperImages.map((image, index) => (
          <SwiperSlide key={index} className="w-full rounded-2xl">
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              width={1920}
              height={600}
              className="w-full h-full object-fill  rounded-2xl lg:rounded-none"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
