"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import ExampleCard from "@/components/ExampleCard";
import SkeletonLoader from "@/components/SkeletonLoader";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Example {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  monthlyRevenue: number;
  categories: Category[];
}

export default function FavoritesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [examples, setExamples] = useState<Example[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/signin");
      return;
    }

    if (user) {
      loadFavorites();
    }
  }, [user, authLoading, router]);

  const loadFavorites = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/favorites");
      if (response.ok) {
        const data = await response.json();
        setExamples(data.examples || []);
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = (id: string, isFavorite: boolean) => {
    if (!isFavorite) {
      setExamples((prev) => prev.filter((ex) => ex.id !== id));
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-poppins text-slate-900 dark:text-white mb-4">
              My Favorites
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonLoader count={6} type="card" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 py-20 page-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-poppins text-slate-900 dark:text-white mb-4">
            My Favorites
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Your saved marketing examples
          </p>
        </div>

        {examples.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {examples.map((example) => (
              <ExampleCard
                key={example.id}
                id={example.id}
                slug={example.slug}
                title={example.title}
                description={example.description}
                imageUrl={example.imageUrl}
                monthlyRevenue={example.monthlyRevenue}
                categories={example.categories}
                isFavorite={true}
                onFavoriteToggle={handleFavoriteToggle}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-6 shadow-premium-lg">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
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
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              No favorites yet
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Start exploring and save your favorite marketing examples
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-premium-lg hover:shadow-premium-xl hover:scale-105 transform"
            >
              Browse Examples
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}



