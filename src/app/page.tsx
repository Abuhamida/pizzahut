import Image from "next/image";
import MainSwiper from "@/components/MainSwiper";
import MenuSwiperMain from "@/components/MenuSwiperMain";
import BestSeller from "@/components/BestSeller";
export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col  bg-[#f7fafe] pb-16 mb-12 lg:mb-0 ">
      <div className="w-full max-w-screen flex flex-col items-center justify-center px-2 lg:px-0 lg:hidden min-h-[100px]"></div>
      <MainSwiper />
      <MenuSwiperMain />
      <BestSeller />
    </div>
  );
}
