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
  categories: Category[];
  activeCategory?: string;
}

export default function CategoryChips({
  categories,
  activeCategory,
}: CategoryChipsProps) {
  return (
    <div className="overflow-x-auto py-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
      <div className="flex space-x-2 min-w-max">
        <Link
          href="/"
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
            !activeCategory
              ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
          }`}
        >
          All
        </Link>
        {(categories ?? []).map((category) => (
          <Link
            key={category.id}
            href={`/?category=${category.slug}`}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === category.slug
                ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
            }`}
          >
            {category.name}
            {category._count && (
              <span className={`ml-1.5 px-1.5 py-0.5 rounded text-xs ${
                activeCategory === category.slug
                  ? "bg-white/20 dark:bg-gray-900/20 text-white dark:text-gray-900"
                  : "text-gray-500 dark:text-gray-500"
              }`}>
                {category._count.examples}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

