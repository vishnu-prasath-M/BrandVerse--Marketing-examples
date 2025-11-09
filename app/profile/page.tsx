"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ExampleCard from "@/components/ExampleCard";
import SkeletonLoader from "@/components/SkeletonLoader";
// Plan limits
const PLAN_LIMITS: Record<string, { maxSaves: number }> = {
  Free: { maxSaves: 5 },
  Standard: { maxSaves: 20 },
  Premium: { maxSaves: Infinity },
};

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

export default function ProfilePage() {
  const { user, refresh } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
  });
  const [savedExamples, setSavedExamples] = useState<Example[]>([]);
  const [loadingSaved, setLoadingSaved] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        bio: "",
      });
      loadSavedExamples();
    }
  }, [user]);

  const loadSavedExamples = async () => {
    if (!user) return;
    setLoadingSaved(true);
    try {
      const response = await fetch("/api/favorites");
      if (response.ok) {
        const data = await response.json();
        setSavedExamples(data.examples || []);
      }
    } catch (error) {
      console.error("Error loading saved examples:", error);
    } finally {
      setLoadingSaved(false);
    }
  };

  const handleFavoriteToggle = (id: string, isFavorite: boolean) => {
    if (!isFavorite) {
      setSavedExamples((prev) => prev.filter((ex) => ex.id !== id));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    // TODO: Implement profile update API
    setTimeout(() => {
      setStatus("success");
      setMessage("Profile updated successfully!");
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full">
          <div className="glass-strong rounded-2xl border border-slate-200 dark:border-slate-700 p-8 text-center shadow-premium-lg">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-4 shadow-premium">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Sign in required
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Please sign in to view your profile.
            </p>
            <Link
              href="/signin"
              className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-premium-lg hover:shadow-premium-xl hover:scale-105 transform"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 py-20 page-transition">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-strong rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-premium-lg">
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-2xl shadow-premium-lg relative">
              {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || "U"}
              {user.plan === "Premium" && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-yellow-900" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-3xl font-bold font-poppins text-slate-900 dark:text-white">
                  {user.name || "Your Profile"}
                </h2>
                {user.plan && (
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    user.plan === "Premium"
                      ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900"
                      : user.plan === "Standard"
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  }`}>
                    {user.plan}
                  </span>
                )}
              </div>
              <p className="text-slate-600 dark:text-slate-400">{user.email}</p>
              {user.plan && (
                <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
                  <span>Downloads: {user.downloadCount || 0}</span>
                  {user.plan !== "Premium" && (
                    <span>This month: {user.downloadsThisMonth || 0}</span>
                  )}
                </div>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 cursor-not-allowed"
                  disabled
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>

            {message && (
              <div
                className={`p-4 rounded-xl ${
                  status === "success"
                    ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800"
                    : "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800"
                }`}
                role="alert"
              >
                {message}
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-premium-lg hover:shadow-premium-xl hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {status === "loading" ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/favorites"
                className="px-4 py-2 glass border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
              >
                View Favorites
              </Link>
              <Link
                href="/pricing"
                className="px-4 py-2 glass border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
              >
                {user.plan === "Free" ? "Upgrade Plan" : "Manage Plan"}
              </Link>
              <Link
                href="/"
                className="px-4 py-2 glass border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
              >
                Browse Examples
              </Link>
            </div>
          </div>
        </div>

        {/* Saved Examples Section */}
        <div className="mt-8">
          <div className="glass-strong rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-premium-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold font-poppins text-slate-900 dark:text-white">
                Saved Examples
              </h3>
              {user.plan && (
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {savedExamples.length} / {PLAN_LIMITS[user.plan]?.maxSaves === Infinity ? "∞" : PLAN_LIMITS[user.plan]?.maxSaves || 0} saved
                </span>
              )}
            </div>

            {loadingSaved ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <SkeletonLoader count={3} />
              </div>
            ) : savedExamples.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedExamples.map((example) => (
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
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-4 shadow-premium">
                  <svg
                    className="w-8 h-8 text-white"
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
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  No saved examples yet
                </p>
                <Link
                  href="/"
                  className="inline-block px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-premium-lg hover:shadow-premium-xl hover:scale-105 transform"
                >
                  Browse Examples
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
