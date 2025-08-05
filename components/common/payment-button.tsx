"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaymentButtonProps {
  priceId: string;
  className?: string;
  children: React.ReactNode;
}

export default function PaymentButton({ priceId, className, children }: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    
    try {
      // Create checkout session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { url } = await response.json();

      // Open payment in new tab
      const paymentWindow = window.open(url, "_blank");
      
      if (paymentWindow) {
        // Set up a listener to check if the payment window is closed
        const checkClosed = setInterval(() => {
          if (paymentWindow.closed) {
            clearInterval(checkClosed);
            // Refresh the current page after payment window is closed
            window.location.reload();
          }
        }, 1000);

        // Also set up a timeout to refresh after a reasonable time
        setTimeout(() => {
          clearInterval(checkClosed);
          window.location.reload();
        }, 30000); // 30 seconds timeout
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Failed to initiate payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={isLoading}
      className={cn(
        "w-full rounded-full flex items-center justify-center gap-2 bg-linear-to-r from-rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 text-white border-2 py-2 disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          Processing...
        </div>
      ) : (
        <>
          {children}
          <ArrowRight size={18} />
        </>
      )}
    </button>
  );
} 