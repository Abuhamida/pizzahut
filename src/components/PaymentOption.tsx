import React from "react";

export default function PaymentOption({
  method,
  icon,
  title,
  description,
  selected,
  onSelect,
}: any) {
  return (
    <div
      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
        selected ? "border-[#ee3a43] bg-[#feecec]" : "hover:border-gray-400"
      }`}
      onClick={() => onSelect(method)}
    >
      <div className="flex items-start">
        <div
          className={`p-2 rounded-full mr-3 ${
            selected ? "bg-[#ee3a43] text-white" : "bg-gray-100"
          }`}
        >
          {icon}
        </div>
        <div>
          <h3 className="font-bold">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
}
