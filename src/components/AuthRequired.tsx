import React from "react";
import Link from "next/link";

export default function AuthRequired() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
      <p className="mb-6">Please sign in to complete your order</p>
      <Link
        href="/login"
        className="bg-[#ee3a43] text-white px-6 py-2 rounded-full hover:bg-[#d63333]"
      >
        Sign In
      </Link>
    </div>
  );
}
