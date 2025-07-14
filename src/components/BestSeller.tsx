import React from "react";
import Image from "next/image";
export default function BestSeller() {
  return (
    <div className="w-full max-w-screen flex flex-col lg:flex-row gap-10 items-start justify-start px-2 lg:px-6 mt-4 bg-[#f7fafe] ">
      <h1 className="relative text-nowrap capitalize text-xl font-nunito font-bold overflow-x-clip inline-block after:content-[''] after:absolute after:bottom-0 after:-mb-1 after:left-0 after:-translate-x-1/2 after:w-[100px] after:h-[3px] after:bg-[#ee3a43]">
        Best sellers
      </h1>
      <div className="w-full max-w-screen flex items-center justify-center px-2 lg:px-0 overflow-x-hidden">
        <div className="flex gap-4">
          {/* Example of best seller items, replace with actual data */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <Image src="/beef.png" alt="Pizza 1" width={150} height={150} />
            <h2 className="text-lg font-semibold">Pizza 1</h2>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <Image src="/beef.png" alt="Pizza 2" width={150} height={150} />
            <h2 className="text-lg font-semibold">Pizza 2</h2>
          </div>
          {/* Add more items as needed */}
        </div>
</div>

    </div>
  );
}
