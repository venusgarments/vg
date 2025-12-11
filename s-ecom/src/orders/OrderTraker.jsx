import * as React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ReplayIcon from "@mui/icons-material/Replay";
import CancelIcon from "@mui/icons-material/Cancel";

const stepIcons = {
  0: ShoppingCartIcon, // Placed
  1: TaskAltIcon, // Confirmed
  2: LocalShippingIcon, // Shipped
  3: DirectionsBikeIcon, // Out for Delivery
  4: DoneAllIcon, // Delivered
  5: ReplayIcon, // Return Requested
  6: CancelIcon, // Return Rejected
  7: TaskAltIcon, // Return Accepted
};

export default function OrderTraker({ activeStep = 0, steps = [] }) {
  return (
    <div className="w-full">
      <div className="relative">
        {/* Progress Line - Behind icons */}
        <div className="absolute top-4 sm:top-5 left-0 right-0 h-0.5 sm:h-1 bg-gray-200">
          <div
            className="h-full bg-[#DFF200] transition-all duration-500"
            style={{
              width:
                steps.length > 1
                  ? `${
                      (Math.min(activeStep, steps.length - 1) /
                        (steps.length - 1)) *
                      100
                    }%`
                  : "0%",
            }}
          />
        </div>

        {/* Steps - Single row */}
        <div className="relative flex justify-between">
          {steps.map((label, index) => {
            const StepIcon = stepIcons[index] || TaskAltIcon;
            const isActive = activeStep === index;
            const isCompleted = activeStep > index;

            return (
              <div key={label} className="flex flex-col items-center flex-1">
                {/* Icon Circle */}
                <div
                  className={`
                    w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center
                    transition-all duration-300 border-2 mb-1 sm:mb-2 z-10
                    ${
                      isCompleted
                        ? "bg-[#DFF200] border-[#CBE600]"
                        : isActive
                        ? "bg-[#DFF200] border-[#CBE600] ring-2 sm:ring-4 ring-[#DFF200]/30 animate-pulse"
                        : "bg-white border-gray-300"
                    }
                  `}
                >
                  <StepIcon
                    sx={{
                      fontSize: { xs: 16, sm: 20 },
                      color: isCompleted || isActive ? "#111111" : "#9ca3af",
                    }}
                  />
                </div>

                {/* Label */}
                <span
                  className={`
                    text-[8px] sm:text-xs font-semibold text-center transition-colors leading-tight
                    ${
                      isCompleted || isActive
                        ? "text-[#111111]"
                        : "text-gray-400"
                    }
                  `}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
