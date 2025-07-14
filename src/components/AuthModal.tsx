"use client";

import { login, signup } from "@/app/auth/actions";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface LoginModalProps {
  onClose: () => void;
}

export default function AuthModal({ onClose }: LoginModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg w-full max-w-4xl relative"
      >
        <div className="hidden lg:flex justify-center items-center rounded-2xl gap-5">
          {/* Image */}
          <div className="w-1/2">
            <Image
              src="/login.png"
              alt="Auth"
              width={1000}
              height={1000}
              className="bg-cover bg-center bg-no-repeat w-full rounded-l"
            />
          </div>

          {/* Auth Form */}
          <div className="w-1/2 px-5">
            <h1 className="text-2xl font-bold mb-4 text-center">
              {isLogin ? "Login" : "Sign Up"}
            </h1>

            <form className="flex flex-col gap-4">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="input input-ghost"
              />
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="input input-ghost"
              />
              <button
                formAction={isLogin ? login : signup}
                className="bg-[#ee4d2b] text-white py-2 px-4 rounded hover:bg-[#d73f1f] cursor-pointer"
              >
                {isLogin ? "Log in" : "Sign up"}
              </button>

              <p className="text-center text-sm mt-2">
                {isLogin ? (
                  <>
                    Don't have an account?
                    <button
                      type="button"
                      onClick={() => setIsLogin(false)}
                      className="text-[#ee4d2b] hover:underline"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?
                    <button
                      type="button"
                      onClick={() => setIsLogin(true)}
                      className="text-[#ee4d2b] hover:underline cursor-pointer"
                    >
                      Log in
                    </button>
                  </>
                )}
              </p>
            </form>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
        >
          ×
        </button>
      </div>
    </div>
  );
}
