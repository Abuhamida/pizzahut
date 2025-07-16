// src/app/profile/page.tsx
"use client";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { FiEdit, FiLogOut, FiClock, FiUser, FiMapPin, FiPhone, FiLock } from "react-icons/fi";
import Image from "next/image";

interface Order {
  id: string;
  created_at: string;
  items: any[];
  total: number;
  status: "processing" | "shipped" | "delivered";
}

export default function ProfilePage() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("orders");
  const [isEditing, setIsEditing] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user session
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);

        if (user) {
          // Fetch user profile data
          const { data: profile, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user?.id)
            .single();



          if (!error && profile) {
            setFormData({
              full_name: profile.full_name || "",
              email: user.email || "",
              phone: profile.phone || "",
              address: profile.address || "",
            });
          }

          // Fetch orders
          const { data: ordersData } = await supabase
            .from("orders")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

          setOrders(ordersData || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [supabase]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          full_name: formData.full_name,
          phone: formData.phone,
          address: formData.address,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen py-28">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ee3a43]"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Not Authenticated</h2>
        <p className="mb-6">Please sign in to view your profile</p>
        <a
          href="/login"
          className="bg-[#ee3a43] text-white px-6 py-2 rounded-full hover:bg-[#d63333]"
        >
          Sign In
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 min-h-screen">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Sidebar */}
        <div className="md:w-1/3 lg:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 bg-gray-200">
                {user.user_metadata?.avatar_url ? (
                  <Image
                    src={user.user_metadata.avatar_url}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-3xl text-gray-400">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <h2 className="text-xl font-bold">{formData.full_name || user.email}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("orders")}
                className={`flex items-center w-full px-4 py-2 rounded-lg ${activeTab === "orders" ? "bg-[#ee3a43] text-white" : "hover:bg-gray-100"}`}
              >
                <FiClock className="mr-3" />
                My Orders
              </button>
              <button
                onClick={() => setActiveTab("account")}
                className={`flex items-center w-full px-4 py-2 rounded-lg ${activeTab === "account" ? "bg-[#ee3a43] text-white" : "hover:bg-gray-100"}`}
              >
                <FiUser className="mr-3" />
                Account Details
              </button>
              <button
                onClick={() => setActiveTab("address")}
                className={`flex items-center w-full px-4 py-2 rounded-lg ${activeTab === "address" ? "bg-[#ee3a43] text-white" : "hover:bg-gray-100"}`}
              >
                <FiMapPin className="mr-3" />
                Delivery Address
              </button>
              <button
                onClick={handleSignOut}
                className="flex items-center w-full px-4 py-2 rounded-lg text-red-500 hover:bg-red-50 mt-4"
              >
                <FiLogOut className="mr-3" />
                Sign Out
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:w-2/3 lg:w-3/4">
          {activeTab === "orders" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Order History</h2>
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <FiClock className="mx-auto text-4xl text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No orders yet</h3>
                  <p className="text-gray-600 mb-4">
                    Your completed orders will appear here
                  </p>
                  <a
                    href="/menu"
                    className="inline-block bg-[#ee3a43] text-white px-6 py-2 rounded-full hover:bg-[#d63333]"
                  >
                    Order Now
                  </a>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <h3 className="font-bold">Order #{order.id.slice(0, 8)}</h3>
                          <p className="text-sm text-gray-500">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          order.status === "delivered"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 mb-3">
                        {order.items.slice(0, 3).map((item, index) => (
                          <div key={index} className="flex items-center">
                            <div className="relative w-12 h-12 rounded-md overflow-hidden bg-gray-100">
                              {item.image && (
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              )}
                            </div>
                            <span className="ml-2 text-sm">
                              {item.name} × {item.quantity}
                            </span>
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <div className="flex items-center">
                            <span className="text-sm text-gray-500">
                              +{order.items.length - 3} more
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t">
                        <span className="font-bold">${order.total.toFixed(2)}</span>
                        <a
                          href={`/orders/${order.id}`}
                          className="text-[#ee3a43] hover:underline text-sm"
                        >
                          View Details
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "account" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Account Details</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center text-[#ee3a43] hover:underline"
                  >
                    <FiEdit className="mr-2" />
                    Edit
                  </button>
                ) : (
                  <button
                    onClick={handleSave}
                    className="bg-[#ee3a43] text-white px-4 py-2 rounded-full hover:bg-[#d63333]"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-600 mb-1">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-lg"
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded-lg">
                      {formData.full_name || "Not provided"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">Email</label>
                  <p className="p-2 bg-gray-50 rounded-lg">{formData.email}</p>
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">Phone Number</label>
                  {isEditing ? (
                    <div className="flex items-center">
                      <FiPhone className="text-gray-400 mr-2" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center p-2 bg-gray-50 rounded-lg">
                      <FiPhone className="text-gray-400 mr-2" />
                      {formData.phone || "Not provided"}
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t">
                  <h3 className="flex items-center text-lg font-medium mb-3">
                    <FiLock className="mr-2 text-gray-400" />
                    Password
                  </h3>
                  <a
                    href="/reset-password"
                    className="text-[#ee3a43] hover:underline"
                  >
                    Change Password
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeTab === "address" && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Delivery Address</h2>
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center text-[#ee3a43] hover:underline"
                >
                  <FiEdit className="mr-2" />
                  {isEditing ? "Cancel" : "Edit"}
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start">
                    <FiMapPin className="text-2xl text-[#ee3a43] mr-4 mt-1" />
                    <div>
                      <h3 className="font-bold mb-1">Primary Address</h3>
                      {isEditing ? (
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-lg mb-3"
                        />
                      ) : (
                        <p className="text-gray-600 mb-3">
                          {formData.address || "No address saved"}
                        </p>
                      )}
                      {isEditing && (
                        <button
                          onClick={handleSave}
                          className="bg-[#ee3a43] text-white px-4 py-2 rounded-full hover:bg-[#d63333] text-sm"
                          disabled={loading}
                        >
                          {loading ? "Saving..." : "Save Address"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {!isEditing && (
                  <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#ee3a43] hover:text-[#ee3a43] transition-colors">
                    + Add New Address
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}