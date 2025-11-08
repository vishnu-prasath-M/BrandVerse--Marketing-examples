"use client";

import { useEffect, useState, Suspense } from "react";
import Hero from "@/components/Hero";
import CategoryChips from "@/components/CategoryChips";
import ExampleCard from "@/components/ExampleCard";
import LoadMoreButton from "@/components/LoadMoreButton";
import NewsletterForm from "@/components/NewsletterForm";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

interface Category {
  id: string;
  name: string;
  slug: string;
  _count?: {
    examples: number;
  };
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

function HomeContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const { user } = useAuth();

  const [examples, setExamples] = useState<Example[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    setExamples([]);
    setNextCursor(null);
    setHasMore(true);
    loadExamples();
  }, [category, search]);

  const loadCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const loadExamples = async (cursor?: string | null) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        take: "9",
      });
      if (cursor) params.set("cursor", cursor);
      if (category) params.set("category", category);
      if (search) params.set("search", search);

      const response = await fetch(`/api/examples?${params}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(errorData.error || "Failed to fetch examples");
      }
      
      const data = await response.json();

      if (!data.examples || !Array.isArray(data.examples)) {
        console.error("Invalid API response:", data);
        setExamples([]);
        setNextCursor(null);
        setHasMore(false);
        return;
      }

      if (cursor) {
        setExamples((prev) => [...prev, ...data.examples]);
      } else {
        setExamples(data.examples || []);
      }

      setNextCursor(data.nextCursor || null);
      setHasMore(data.hasMore || false);
    } catch (error) {
      console.error("Error loading examples:", error);
      setExamples([]);
      setNextCursor(null);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (nextCursor) {
      await loadExamples(nextCursor);
    }
  };

  return (
    <div>
      <Hero />

      {/* Optional welcome + newsletter for authenticated users */}
      {user && (
        <section id="newsletter" className="py-14 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              Welcome back, {user.name || user.email}!
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400 mb-6">
              Stay updated with the latest marketing examples and insights.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <NewsletterForm />
            </div>
          </div>
        </section>
      )}

      {/* Categories Section */}
      <section id="categories" className="py-12 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Browse by Category
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Filter examples by marketing category
            </p>
          </div>
          <CategoryChips categories={categories} activeCategory={category || undefined} />
        </div>
      </section>

      {/* Examples Grid */}
      <section id="examples" className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && examples.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm animate-pulse"
                >
                  <div className="aspect-video bg-gray-200 dark:bg-gray-700" />
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : examples.length > 0 ? (
            <>
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Marketing Examples
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {category ? `Examples in ${categories.find(c => c.slug === category)?.name || category}` : "Discover real marketing campaigns from top brands"}
                </p>
              </div>
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
                  />
                ))}
              </div>
              <LoadMoreButton
                onLoadMore={handleLoadMore}
                hasMore={hasMore}
                isLoading={loading}
              />
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No examples found. Try a different category or search term.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
            Ready to improve your marketing?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Browse our curated collection of real marketing examples from top brands.
          </p>
          <a
            href="/examples"
            className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Explore all examples
            <svg
              className="ml-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}

