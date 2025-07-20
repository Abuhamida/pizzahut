"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaStar,
  FaPlus,
  FaMinus,
  FaShoppingCart,
  FaSearch,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { addItem, updateQuantity } from "../store/slices/cartSlice";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Swiper as SwiperType } from "swiper"; // import Swiper type
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { clearActiveCategory } from "@/app/store/slices/activeCategorySlice";
import { fetchCategories } from "@/lib/api/fetchCategories";
import { fetchMenuItems } from "@/lib/api/fetchMenuItems";
import { RiHeart2Line } from "react-icons/ri";
import { toggleFavorite } from "@/app/store/slices/favoritesSlice";
import { setOpenSearch } from "@/app/store/slices/searchModalSlice";
import { MenuItem } from "@/types/menuItem";
import { SearchModal } from "@/components/SearchModal";

const MenuPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const openSearch = useSelector(
    (state: RootState) => state.searchModal.openSearch
  );
  console.log(openSearch);
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useSelector((state: RootState) => state.category);

  const {
    items: menuItems,
    loading: menuItemsLoading,
    error: menuItemsError,
  } = useSelector((state: RootState) => state.menuItems);

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const storedActiveCategory = useSelector(
    (state: RootState) => state.activeCategory.id
  );
  console.log(storedActiveCategory);

  useEffect(() => {
    if (openSearch) {
      setIsSearchOpen(true);
      dispatch(setOpenSearch(false));
    }
  }, [openSearch, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      const categoriesData = await fetchCategories(dispatch);
      await fetchMenuItems(dispatch);

      if (categoriesData.length > 0) {
        if (storedActiveCategory) {
          setActiveCategory(storedActiveCategory);
        } else {
          setActiveCategory(categoriesData[0].id);
        }
      }
    };

    fetchData();
  }, [dispatch, storedActiveCategory]);

  const filteredItems =
    activeCategory === "favorites"
      ? favorites
      : menuItems.filter((item) => item.category_id === activeCategory);

  const handleAddToCart = (item: MenuItem) => {
    dispatch(
      addItem({
        id: item.id,
        name: item.name,
        price: item.base_price,
        image: item.image_url,
      })
    );
  };

  const handleQuantityChange = (id: string, change: number) => {
    dispatch(updateQuantity({ id, change }));
  };

  const getItemQuantity = (id: string) => {
    const item = cartItems.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };

  const handleSlideChange = (swiper: any) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  if (categoriesLoading || menuItemsLoading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  if (categoriesError || menuItemsError)
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 min-h-screen">
        Error loading data
      </div>
    );

  const handleToggleFavorite = (item: MenuItem) => {
    dispatch(toggleFavorite(item));
  };

  const isFavorited = (id: string) => {
    return favorites.some((fav) => fav.id === id);
  };

  const extendedCategories = [
    ...categories,
    { id: "favorites", name: "Favorites" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 min-h-screen ">
      <div className="flex w-full gap-5 mb-8 pb-2 justify-center items-center  ">
        <button
          className="text-[#ee3a43] text-3xl disabled:text-gray-400 disabled:cursor-not-allowed"
          onClick={() => swiperRef.current?.slidePrev()}
          disabled={isBeginning}
        >
          <FaArrowAltCircleLeft />
        </button>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={10}
          loop={false}
          autoplay={false}
          observer={true}
          observeParents={true}
          slidesPerView="auto"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={handleSlideChange}
          className="w-full h-full"
        >
          {extendedCategories.map((category) => (
            <SwiperSlide key={category.id} className="!w-32 cursor-pointer">
              <button
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full whitespace-nowrap font-medium w-32 ${
                  activeCategory === category.id
                    ? "bg-[#ee3a43] text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {category.name}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          className="text-[#ee3a43] text-3xl disabled:text-gray-400 disabled:cursor-not-allowed"
          onClick={() => swiperRef.current?.slideNext()}
          disabled={isEnd}
        >
          <FaArrowAltCircleRight />
        </button>
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors"
        >
          <FaSearch className="text-gray-500" />
          <span className="hidden sm:inline text-nowrap">Search Menu</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow relative"
          >
            <div className="relative h-48">
              <Image
                src={item.image_url}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex flex-col justify-start gap-3">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <button onClick={() => handleToggleFavorite(item)}>
                    <RiHeart2Line
                      size={20}
                      className={`${
                        isFavorited(item.id) ? "text-red-500" : "text-gray-500"
                      } hover:text-red-600 transition-colors`}
                    />
                  </button>
                </div>
                {item.is_new && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded absolute top-5">
                    New
                  </span>
                )}
              </div>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">
                  EGP {item.base_price.toFixed(2)}
                </span>
                <div className="flex items-center gap-2">
                  {getItemQuantity(item.id) > 0 ? (
                    <>
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                      >
                        <FaMinus size={14} />
                      </button>
                      <span>{getItemQuantity(item.id)}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                      >
                        <FaPlus size={14} />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="flex items-center gap-1 bg-[#ee3a43] text-white px-3 py-1 rounded-full text-sm hover:bg-[#d63333]"
                    >
                      <FaShoppingCart size={12} />
                      Add
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {cartItems.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-[#ee3a43] text-white p-3 rounded-full shadow-lg hidden lg:block">
          <Link href={"/cart"}>
            <div className="relative">
              <FaShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-white text-[#ee3a43] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </div>
          </Link>
        </div>
      )}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        menuItems={menuItems}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default MenuPage;
