import React from "react";

export default function CheckoutProgress({
  activeStep,
}: {
  activeStep: string;
}) {
  return (
    <div className="flex items-center justify-between mb-8">
      {["delivery", "payment", "confirmation"].map((step) => (
        <div
          key={step}
          className={`flex items-center ${
            activeStep === step ? "text-[#ee3a43]" : "text-gray-400"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
              activeStep === step ? "bg-[#ee3a43] text-white" : "bg-gray-200"
            }`}
          >
            {["delivery", "payment", "confirmation"].indexOf(step) + 1}
          </div>
          <span>{step.charAt(0).toUpperCase() + step.slice(1)}</span>
        </div>
      ))}
    </div>
  );
}
