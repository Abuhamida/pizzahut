import React from 'react'
import { FiMapPin } from 'react-icons/fi'

export default function DeliveryForm({ formData, onChange, onContinue }: any) {
  return (
   <div className="bg-white rounded-lg shadow-md p-6 mb-8">
    <h2 className="text-xl font-bold mb-6 flex items-center">
      <FiMapPin className="mr-2 text-[#ee3a43]" />
      Delivery Information
    </h2>
    <div className="space-y-4">
      {["name", "phone", "address"].map((field) => (
        <div key={field}>
          <label className="block text-gray-600 mb-1">
            {field === "name"
              ? "Full Name"
              : field === "phone"
              ? "Phone Number"
              : "Delivery Address"}
          </label>
          <input
            type={field === "phone" ? "tel" : "text"}
            name={field}
            value={formData[field]}
            onChange={onChange}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>
      ))}
      <div>
        <label className="block text-gray-600 mb-1">
          Delivery Instructions (Optional)
        </label>
        <textarea
          name="deliveryInstructions"
          value={formData.deliveryInstructions}
          onChange={onChange}
          className="w-full p-3 border rounded-lg"
          rows={3}
        />
      </div>
      <button
        onClick={onContinue}
        className="w-full bg-[#ee3a43] text-white py-3 rounded-full hover:bg-[#d63333] mt-4"
      >
        Continue to Payment
      </button>
    </div>
  </div>
  )
}
