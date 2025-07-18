import React from "react";

export default function CardPaymentForm({ formData, onChange }: any) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-gray-600 mb-1">Card Number</label>
        <input
          type="text"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={onChange}
          placeholder="1234 5678 9012 3456"
          className="w-full p-3 border rounded-lg"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-600 mb-1">Expiry Date</label>
          <input
            type="text"
            name="expiry"
            value={formData.expiry}
            onChange={onChange}
            placeholder="MM/YY"
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">CVV</label>
          <input
            type="text"
            name="cvv"
            value={formData.cvv}
            onChange={onChange}
            placeholder="123"
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>
      </div>
      <div className="flex items-center mt-2">
        <input type="checkbox" id="saveCard" className="mr-2" />
        <label htmlFor="saveCard" className="text-gray-600">
          Save card for future purchases
        </label>
      </div>
    </div>
  );
}
