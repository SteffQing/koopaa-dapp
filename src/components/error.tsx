"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  buttonText?: string;
  onRetry?: () => void;
  errorCode?: string;
}

export default function Error({
  title = "Something went wrong",
  message = "We couldn't load this page. Please try again.",
  buttonText = "Try again",
  onRetry,
  errorCode,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 px-6 py-12 text-center overflow-hidden">
      <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-6">
        <AlertTriangle className="h-8 w-8 text-red-500" />
      </div>

      <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600 mb-6 max-w-xs">{message}</p>

      {errorCode && (
        <div className="text-sm text-gray-400 mb-6">
          Error code: {errorCode}
        </div>
      )}

      <Button onClick={onRetry} className="flex items-center justify-center">
        <RefreshCw className="h-4 w-4 mr-2" />
        {buttonText}
      </Button>
    </div>
  );
}
