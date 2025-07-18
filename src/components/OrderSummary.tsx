import React from 'react';
import Image from 'next/image';

export default function OrderSummary({ cartItems, subtotal, deliveryFee, total }: any) {
  return (
    <div className="lg:w-1/3">
      <div className="bg-gray-50 rounded-lg shadow-md p-6 sticky top-4">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="space-y-4 mb-6">
          {cartItems.map((item: any) => (
            <div key={item.id} className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="relative w-12 h-12 rounded-md overflow-hidden mr-3">
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
                    {item.quantity} × EGP{item.price.toFixed(2)}
                  </p>
                </div>
              </div>
              <span className="font-medium">
                EGP{(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t pt-4">
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>EGP{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Delivery Fee</span>
            <span>EGP{deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-4">
            <span>Total</span>
            <span>EGP{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
