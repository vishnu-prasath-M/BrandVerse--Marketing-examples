"use client";

import { useEffect, useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import CategoryCard from "@/components/ui/CategoryCard";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  slug: string;
  _count?: {
    examples: number;
  };
}

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <div className="container-px mx-auto max-w-7xl py-12">
        <SectionHeader title="Categories" subtitle="Browse by type" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-soft animate-pulse"
            >
              <div className="h-28 rounded-xl bg-muted" />
              <div className="mt-4 flex items-center justify-between">
                <div className="h-4 bg-gray-200 rounded w-24" />
                <div className="h-6 bg-gray-200 rounded w-12" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container-px mx-auto max-w-7xl py-12">
      <SectionHeader title="Categories" subtitle="Browse by type" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.id} href={`/?category=${category.slug}`}>
            <CategoryCard
              title={category.name}
              count={category._count?.examples || 0}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}






