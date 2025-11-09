"use client";

import { useState } from "react";

interface LoadMoreButtonProps {
  onLoadMore: () => Promise<void>;
  hasMore: boolean;
  isLoading?: boolean;
}

export default function LoadMoreButton({
  onLoadMore,
  hasMore,
  isLoading = false,
}: LoadMoreButtonProps) {
  const [internalLoading, setInternalLoading] = useState(false);

  const handleClick = async () => {
    setInternalLoading(true);
    try {
      await onLoadMore();
    } finally {
      setInternalLoading(false);
    }
  };

  if (!hasMore) {
    return null;
  }

  const loading = isLoading || internalLoading;

  return (
    <div className="flex justify-center py-8">
      <button
        onClick={handleClick}
        disabled={loading}
        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-premium-lg hover:shadow-premium-xl hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        aria-label="Load more examples"
      >
        {loading ? (
          <span className="flex items-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading...
          </span>
        ) : (
          "Load more examples"
        )}
      </button>
    </div>
  );
}
