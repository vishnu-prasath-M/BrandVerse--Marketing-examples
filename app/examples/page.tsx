"use client";

import { useEffect, useState } from "react";
import ExampleCard from "@/components/ExampleCard";
import LoadMoreButton from "@/components/LoadMoreButton";
import SkeletonLoader from "@/components/SkeletonLoader";

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

export default function ExamplesPage() {
  const [examples, setExamples] = useState<Example[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExamples();
  }, []);

  const loadExamples = async (cursor?: string | null) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        take: "9",
      });
      if (cursor) params.set("cursor", cursor);

      const response = await fetch(`/api/examples?${params}`);
      const data = await response.json();

      if (!data.examples || !Array.isArray(data.examples)) {
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
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 py-20 page-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-poppins text-slate-900 dark:text-white mb-4">
            All Examples
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Browse our complete collection of marketing examples
          </p>
        </div>

        {loading && examples.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonLoader count={9} type="card" />
          </div>
        ) : examples.length > 0 ? (
          <>
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
              No examples found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
