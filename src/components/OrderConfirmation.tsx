import React from "react";
import Link from "next/link";
import { FiCheck } from "react-icons/fi";
import { FiDollarSign } from "react-icons/fi";

export default function OrderConfirmation({
  paymentMethod,
}: {
  paymentMethod: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <FiCheck className="text-green-500 text-2xl" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
      <p className="text-gray-600 mb-6">
        Your order has been placed and will be delivered soon
      </p>
      {paymentMethod === "cash" && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 text-left">
          <div className="flex">
            <div className="flex-shrink-0">
              <FiDollarSign className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Please prepare <span className="font-bold">exact cash</span> for
                delivery
              </p>
            </div>
          </div>
        </div>
      )}
      <p className="mb-6">
        Estimated delivery time:{" "}
        <span className="font-bold">30-45 minutes</span>
      </p>
      <div className="flex justify-center gap-4">
        <Link
          href="/orders"
          className="inline-block bg-[#ee3a43] text-white px-6 py-2 rounded-full hover:bg-[#d63333]"
        >
          View Order Details
        </Link>
        <Link
          href="/menu"
          className="inline-block border border-[#ee3a43] text-[#ee3a43] px-6 py-2 rounded-full hover:bg-gray-50"
        >
          Order Again
        </Link>
      </div>
    </div>
  );
}
