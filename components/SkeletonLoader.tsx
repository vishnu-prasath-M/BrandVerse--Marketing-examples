"use client";

interface SkeletonLoaderProps {
  count?: number;
  type?: "card" | "text" | "avatar";
}

export default function SkeletonLoader({ count = 1, type = "card" }: SkeletonLoaderProps) {
  if (type === "card") {
    return (
      <>
        {[...Array(count)].map((_, i) => (
          <div
            key={i}
            className="bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 animate-pulse"
          >
            <div className="aspect-video w-full bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
              <div className="absolute inset-0 shimmer"></div>
            </div>
            <div className="p-5 space-y-3">
              <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-lg w-3/4 shimmer"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-full shimmer"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-5/6 shimmer"></div>
              <div className="flex gap-2 pt-2">
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-20 shimmer"></div>
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-16 shimmer"></div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  if (type === "text") {
    return (
      <>
        {[...Array(count)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full shimmer"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6 shimmer"></div>
          </div>
        ))}
      </>
    );
  }

  return (
    <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-full shimmer"></div>
  );
}





