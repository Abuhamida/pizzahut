// src/app/orders/[id]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useParams } from "next/navigation";
import {
  FiClock,
  FiCheckCircle,
  FiTruck,
  FiCreditCard,
  FiDollarSign,
  FiArrowLeft,
} from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderDetails {
  id: string;
  created_at: string;
  items: OrderItem[];
  total: number;
  status: "processing" | "out_for_delivery" | "delivered";
  payment_method: "card" | "cash";
  payment_status: "paid" | "pending";
  delivery_address: string;
  delivery_instructions: string;
}

export default function OrderDetailsPage() {
  const supabase = createClient();
  const params = useParams();
  const orderId = params.id as string;
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("id", orderId)
          .single();

        if (error) throw error;
        if (!data) throw new Error("Order not found");

        setOrder(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load order");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, supabase]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ee3a43]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Error Loading Order</h2>
        <p className="mb-6 text-red-500">{error}</p>
        <Link
          href="/orders"
          className="bg-[#ee3a43] text-white px-6 py-2 rounded-full hover:bg-[#d63333]"
        >
          View All Orders
        </Link>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
        <p className="mb-6">The requested order could not be found</p>
        <Link
          href="/orders"
          className="bg-[#ee3a43] text-white px-6 py-2 rounded-full hover:bg-[#d63333]"
        >
          View All Orders
        </Link>
      </div>
    );
  }

  const statusSteps = [
    {
      id: "processing",
      title: "Processing",
      icon: <FiClock />,
      description: "Your order is being prepared",
    },
    {
      id: "out_for_delivery",
      title: "Out for Delivery",
      icon: <FiTruck />,
      description: "Your order is on the way",
    },
    {
      id: "delivered",
      title: "Delivered",
      icon: <FiCheckCircle />,
      description: "Order has been delivered",
    },
  ];

  const currentStatusIndex = statusSteps.findIndex(
    (step) => step.id === order.status
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Order Details */}
        <div className="lg:w-2/3">
          <Link
            href="/profile"
            className="flex items-center text-[#ee3a43] mb-6"
          >
            <FiArrowLeft className="mr-2" />
            Back to Orders
          </Link>

          <h1 className="text-2xl font-bold mb-6">
            Order #{order.id.slice(0, 8)}
          </h1>

          {/* Order Status Timeline */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-6">Order Status</h2>
            <div className="space-y-8">
              {statusSteps.map((step, index) => (
                <div key={step.id} className="flex items-start">
                  <div
                    className={`rounded-full p-3 mr-4 ${
                      index < currentStatusIndex
                        ? "bg-green-100 text-green-500"
                        : index === currentStatusIndex
                        ? "bg-[#ee3a43] text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <div>
                    <h3
                      className={`font-bold ${
                        index <= currentStatusIndex
                          ? "text-gray-900"
                          : "text-gray-400"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`${
                        index <= currentStatusIndex
                          ? "text-gray-600"
                          : "text-gray-400"
                      }`}
                    >
                      {step.description}
                    </p>
                    {index === currentStatusIndex && (
                      <p className="text-sm text-[#ee3a43] mt-1">
                        Current status
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-6">Your Order</h2>
            <div className="space-y-6">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b pb-4"
                >
                  <div className="flex items-center">
                    <div className="relative w-16 h-16 rounded-md overflow-hidden mr-4">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-6">Delivery Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-600">Delivery Address</h3>
                <p className="mt-1">{order.delivery_address}</p>
              </div>
              {order.delivery_instructions && (
                <div>
                  <h3 className="font-medium text-gray-600">
                    Delivery Instructions
                  </h3>
                  <p className="mt-1">{order.delivery_instructions}</p>
                </div>
              )}
              <div>
                <h3 className="font-medium text-gray-600">Order Date</h3>
                <p className="mt-1">
                  {new Date(order.created_at).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-gray-50 rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            {/* Payment Information */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-600 mb-2">Payment Method</h3>
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-gray-100 mr-3">
                  {order.payment_method === "card" ? (
                    <FiCreditCard className="text-gray-600" />
                  ) : (
                    <FiDollarSign className="text-gray-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium">
                    {order.payment_method === "card"
                      ? "Credit/Debit Card"
                      : "Cash on Delivery"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Status:{" "}
                    <span
                      className={`${
                        order.payment_status === "paid"
                          ? "text-green-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {order.payment_status === "paid" ? "Paid" : "Pending"}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>
                  $
                  {order.items
                    .reduce((sum, item) => sum + item.price * item.quantity, 0)
                    .toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Delivery Fee</span>
                <span>$2.99</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>

            {order.status !== "delivered" && (
              <button className="w-full bg-[#ee3a43] text-white py-3 rounded-full hover:bg-[#d63333] mt-6">
                <Link  href={'/contact'}>Need Help? Contact Support</Link>
                
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
