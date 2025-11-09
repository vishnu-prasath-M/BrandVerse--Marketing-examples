"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "./AuthProvider";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ExampleCardProps {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  monthlyRevenue: number;
  categories: Category[];
  isFavorite?: boolean;
  onFavoriteToggle?: (id: string, isFavorite: boolean) => void;
}

function formatRevenue(revenue: number): string {
  if (revenue >= 1000000) {
    return `$${(revenue / 1000000).toFixed(1)}M`;
  }
  if (revenue >= 1000) {
    return `$${(revenue / 1000).toFixed(0)}k`;
  }
  return `$${revenue}`;
}

export default function ExampleCard({
  id,
  slug,
  title,
  description,
  imageUrl,
  monthlyRevenue,
  categories,
  isFavorite: initialIsFavorite = false,
  onFavoriteToggle,
}: ExampleCardProps) {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isHovered, setIsHovered] = useState(false);
  const safeCategories = Array.isArray(categories) ? categories : [];

  useEffect(() => {
    if (user) {
      // Check if favorite on mount
      fetch(`/api/favorites/${id}`)
        .then((res) => res.json())
        .then((data) => setIsFavorite(data.isFavorite))
        .catch(() => {});
    }
  }, [user, id]);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      // Redirect to sign in
      window.location.href = "/signin";
      return;
    }

    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);

    try {
      const response = await fetch(`/api/favorites/${id}`, {
        method: newFavoriteState ? "POST" : "DELETE",
      });

      if (!response.ok) {
        setIsFavorite(!newFavoriteState); // Revert on error
      } else {
        onFavoriteToggle?.(id, newFavoriteState);
      }
    } catch (error) {
      setIsFavorite(!newFavoriteState); // Revert on error
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <Link
      href={`/examples/${slug}`}
      className="group block relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-500 shadow-premium hover:shadow-premium-xl transform hover:-translate-y-2">
        {/* Image Container */}
        <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className={`object-cover transition-transform duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Revenue Badge */}
          <div className="absolute top-4 right-4">
            <div className="glass-strong px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-900 dark:text-white shadow-premium backdrop-blur-xl">
              {formatRevenue(monthlyRevenue)}/mo
            </div>
          </div>

          {/* Favorite Button */}
          {user && (
            <button
              onClick={handleFavoriteClick}
              className={`absolute top-4 left-4 p-2.5 rounded-full backdrop-blur-xl transition-all duration-300 ${
                isFavorite
                  ? "bg-red-500/90 text-white shadow-premium"
                  : "glass-strong text-slate-700 dark:text-slate-300 hover:bg-red-500/20"
              }`}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <svg
                className={`w-5 h-5 transition-all duration-300 ${
                  isFavorite ? "scale-110 fill-current" : "scale-100"
                }`}
                fill={isFavorite ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          )}

          {/* Trending Badge (if applicable) */}
          {monthlyRevenue > 100000 && (
            <div className="absolute bottom-4 left-4 flex items-center space-x-1 glass-strong px-2.5 py-1 rounded-lg text-xs font-semibold text-orange-600 dark:text-orange-400 shadow-premium">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Trending</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 leading-tight">
            {title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
            {description}
          </p>
          <div className="flex flex-wrap gap-2">
            {safeCategories.slice(0, 2).map((category) => (
              <span
                key={category.id}
                className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-full border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors duration-300"
              >
                {category.name}
              </span>
            ))}
            {safeCategories.length > 2 && (
              <span className="px-3 py-1 text-slate-500 dark:text-slate-500 text-xs font-medium">
                +{safeCategories.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
