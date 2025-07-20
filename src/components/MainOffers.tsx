"use client";
import Image from "next/image";
export default function MainOffers() {
  const offers = [
    {
      id: 1,
      title: "Monday Special",
      description: "2 Large Pizzas + Garlic Bread + 1.5L Drink",
      price: "EGP799",
      originalPrice: "EGP1199",
      image: "/offers2.png",
    },
    {
      id: 2,
      title: "Weekend Special",
      description: "1 Large Pizza + Pasta + Garlic Bread + Dessert",
      price: "EGP649",
      originalPrice: "EGP899",
      image: "/offers1.png",
    },
  ];

  return (
    <div className="w-full  flex flex-col gap-10 px-4  py-12 bg-[#f7fafe]">
      <div className="flex flex-col justify-center items-start  gap-4 w-full">
        <h1 className="relative text-nowrap capitalize text-3xl font-nunito font-bold overflow-x-clip inline-block after:content-[''] after:absolute after:bottom-0 after:-mb-1 after:left-0 after:w-[100px] after:h-[3px] after:bg-[#ee3a43]">
          Explore Offers
        </h1>
        <p className="text-gray-600 max-w-2xl text-center">
          Delicious deals made just for you! Enjoy great savings on your
          favorite pizzas and more.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full mx-auto">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-48 w-full">
              <Image
                src={offer.image}
                alt={offer.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
              <div className="absolute top-2 right-2 bg-[#ee3a43] text-white px-3 py-1 rounded-full text-sm font-bold">
                {offer.title}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {offer.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{offer.description}</p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-[#ee3a43]">
                    {offer.price}
                  </span>
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    {offer.originalPrice}
                  </span>
                </div>
                <button className="bg-[#ee3a43] hover:bg-[#d42a33] text-white px-4 py-2 rounded-full text-sm font-bold transition-colors">
                  Order Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
