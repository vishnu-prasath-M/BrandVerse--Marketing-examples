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
        className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Load more examples"
      >
        {loading ? "Loading..." : "Load more examples"}
      </button>
    </div>
  );
}

