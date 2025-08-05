"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle } from "lucide-react";

export default function PaymentStatus() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const success = searchParams.get("success");
    const canceled = searchParams.get("canceled");
    const sessionId = searchParams.get("session_id");

    if (success === "true") {
      setMessage("Payment successful! Your subscription has been activated.");
      setIsSuccess(true);
      setShowMessage(true);
      
      // Clean up URL parameters
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("success");
      newUrl.searchParams.delete("session_id");
      window.history.replaceState({}, "", newUrl.toString());
    } else if (canceled === "true") {
      setMessage("Payment was canceled. You can try again anytime.");
      setIsSuccess(false);
      setShowMessage(true);
      
      // Clean up URL parameters
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete("canceled");
      window.history.replaceState({}, "", newUrl.toString());
    }
  }, [searchParams]);

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  if (!showMessage) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
      <div
        className={`flex items-center gap-3 p-4 rounded-lg shadow-lg border ${
          isSuccess
            ? "bg-green-50 border-green-200 text-green-800"
            : "bg-amber-50 border-amber-200 text-amber-800"
        }`}
      >
        {isSuccess ? (
          <CheckCircle className="w-5 h-5 text-green-600" />
        ) : (
          <XCircle className="w-5 h-5 text-amber-600" />
        )}
        <span className="text-sm font-medium">{message}</span>
        <button
          onClick={() => setShowMessage(false)}
          className="ml-2 text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>
    </div>
  );
} 