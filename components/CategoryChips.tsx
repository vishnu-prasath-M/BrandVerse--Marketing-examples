"use client";

import Link from "next/link";

interface Category {
  id: string;
  name: string;
  slug: string;
  _count?: {
    examples: number;
  };
}

interface CategoryChipsProps {
  categories?: Category[];
  activeCategory?: string;
}

export default function CategoryChips({
  categories = [],
  activeCategory,
}: CategoryChipsProps) {
  return (
    <div className="overflow-x-auto py-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 scrollbar-hide">
      <div className="flex space-x-3 min-w-max">
        <Link
          href="/"
          className={`px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
            !activeCategory
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-premium-lg"
              : "glass border border-slate-200/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          All
        </Link>
        {categories.map((category, index) => (
          <Link
            key={category.id}
            href={`/?category=${category.slug}`}
            className={`px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
              activeCategory === category.slug
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-premium-lg"
                : "glass border border-slate-200/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {category.name}
            {category._count && (
              <span
                className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                  activeCategory === category.slug
                    ? "bg-white/20 text-white"
                    : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
                }`}
              >
                {category._count.examples}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
