"use client";

import { useEffect, useState, Suspense } from "react";
import Hero from "@/components/Hero";
import CategoryChips from "@/components/CategoryChips";
import ExampleCard from "@/components/ExampleCard";
import LoadMoreButton from "@/components/LoadMoreButton";
import NewsletterForm from "@/components/NewsletterForm";
import SkeletonLoader from "@/components/SkeletonLoader";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Goals from "@/components/Goals";
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
    <div className="page-transition">
      <Hero />

      {/* Optional welcome + newsletter for authenticated users */}
      {user && (
        <section className="py-16 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold font-poppins text-slate-900 dark:text-white mb-3">
              Welcome back, {user.name || user.email}!
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-400 mb-6">
              Stay updated with the latest marketing examples and insights.
            </p>
            <div className="glass-strong rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-premium">
              <NewsletterForm />
            </div>
          </div>
        </section>
      )}

      {/* Categories Section */}
      <section className="py-12 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-poppins text-slate-900 dark:text-white mb-2">
              Browse by Category
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Filter examples by marketing category
            </p>
          </div>
          <CategoryChips categories={categories} activeCategory={category || undefined} />
        </div>
      </section>

      {/* Examples Grid */}
      <section id="examples" className="py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && examples.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SkeletonLoader count={9} type="card" />
            </div>
          ) : examples.length > 0 ? (
            <>
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold font-poppins text-slate-900 dark:text-white mb-2">
                  Marketing Examples
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
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
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                No examples found. Try a different category or search term.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Goals Section */}
      <Goals />

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />

      {/* Newsletter Section */}
      {!user && (
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold font-poppins text-slate-900 dark:text-white mb-3">
              Stay Updated
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Subscribe to our newsletter and get the latest marketing examples delivered to your inbox.
            </p>
            <div className="glass-strong rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-premium">
              <NewsletterForm />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <SkeletonLoader count={1} type="card" />
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
