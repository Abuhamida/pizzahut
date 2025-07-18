// src/app/checkout/page.tsx
"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { FiArrowLeft, FiCreditCard, FiDollarSign } from "react-icons/fi";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/app/store/store";
import { clearCart } from "@/app/store/slices/cartSlice";
import LoadingSpinner from "@/components/LoadingSpinner";
import OrderSummary from "@/components/OrderSummary";
import EmptyCart from "@/components/EmptyCart";
import AuthRequired from "@/components/AuthRequired";
import CardPaymentForm from "@/components/CardPaymentForm";
import DeliveryForm from "@/components/DeliveryForm";
import CheckoutProgress from "@/components/CheckoutProgress";
import OrderConfirmation from "@/components/OrderConfirmation";
import PaymentOption from "@/components/PaymentOption";

export default function CheckoutPage() {
  const supabase = createClient();
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState<
    "delivery" | "payment" | "confirmation"
  >("delivery");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cash">("card");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    deliveryInstructions: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  // Get cart items from Redux store
  const { items: cartItems } = useSelector((state: RootState) => state.cart);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);

        if (user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

          if (profile) {
            setFormData((prev) => ({
              ...prev,
              name: profile.full_name || "",
              phone: profile.phone || "",
              address: profile.address || "",
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [supabase]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Calculate order totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = 2.99;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = async () => {
    if (!user) return;

    try {
      setLoading(true);

      const { error } = await supabase.from("orders").insert([
        {
          user_id: user.id,
          items: cartItems,
          total: total,
          status: "processing",
          payment_method: paymentMethod,
          payment_status: paymentMethod === "cash" ? "pending" : "paid",
          delivery_address: formData.address,
          delivery_instructions: formData.deliveryInstructions,
        },
      ]);

      if (error) throw error;

      dispatch(clearCart());
      setActiveStep("confirmation");
    } catch (error) {
      console.error("Error placing order:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <AuthRequired />;
  }

  if (cartItems.length === 0 && activeStep !== "confirmation") {
    return <EmptyCart />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Checkout Steps */}
        <div className="lg:w-2/3">
          <Link href="/cart" className="flex items-center text-[#ee3a43] mb-6">
            <FiArrowLeft className="mr-2" />
            Back to Cart
          </Link>

          <CheckoutProgress activeStep={activeStep} />

          {activeStep === "delivery" && (
            <DeliveryForm
              formData={formData}
              onChange={handleInputChange}
              onContinue={() => setActiveStep("payment")}
            />
          )}

          {activeStep === "payment" && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <FiCreditCard className="mr-2 text-[#ee3a43]" />
                Payment Method
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <PaymentOption
                  method="card"
                  icon={<FiCreditCard />}
                  title="Credit/Debit Card"
                  description="Pay securely with your card"
                  selected={paymentMethod === "card"}
                  onSelect={() => setPaymentMethod("card")}
                />
                <PaymentOption
                  method="cash"
                  icon={<FiDollarSign />}
                  title="Cash on Delivery"
                  description="Pay when you receive your order"
                  selected={paymentMethod === "cash"}
                  onSelect={() => setPaymentMethod("cash")}
                />
              </div>

              {paymentMethod === "card" && (
                <CardPaymentForm
                  formData={formData}
                  onChange={handleInputChange}
                />
              )}

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-[#ee3a43] text-white py-3 rounded-full hover:bg-[#d63333] mt-4"
                disabled={loading}
              >
                {loading ? "Processing..." : "Place Order"}
              </button>
            </div>
          )}

          {activeStep === "confirmation" && (
            <OrderConfirmation paymentMethod={paymentMethod} />
          )}
        </div>

        {/* Order Summary */}
        <OrderSummary
          cartItems={cartItems}
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          total={total}
        />
      </div>
    </div>
  );
}
