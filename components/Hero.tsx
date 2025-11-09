"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-float" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-float" style={{ animationDelay: "4s" }}></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div
            className={`inline-flex items-center px-4 py-2 mb-8 rounded-full glass border border-blue-200/50 dark:border-blue-800/50 text-blue-700 dark:text-blue-400 text-sm font-medium tracking-wide uppercase shadow-premium transition-all duration-500 ${
              mounted ? "animate-fade-in" : "opacity-0"
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mr-2 animate-pulse"></span>
            Curated Collection
          </div>

          {/* Heading */}
          <h1
            className={`text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold font-poppins text-slate-900 dark:text-white mb-6 tracking-tight leading-tight transition-all duration-500 ${
              mounted ? "animate-fade-in" : "opacity-0"
            }`}
            style={{ animationDelay: "0.2s" }}
          >
            Real marketing examples
            <br />
            <span className="gradient-text">from leading brands</span>
          </h1>

          {/* Subheading */}
          <p
            className={`text-lg sm:text-xl lg:text-2xl text-slate-600 dark:text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed font-light transition-all duration-500 ${
              mounted ? "animate-fade-in" : "opacity-0"
            }`}
            style={{ animationDelay: "0.3s" }}
          >
            Learn from successful campaigns, landing pages, and email strategies.
            <br className="hidden sm:block" />
            Analyzed and documented for marketers who want to improve their craft.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 transition-all duration-500 ${
              mounted ? "animate-fade-in" : "opacity-0"
            }`}
            style={{ animationDelay: "0.4s" }}
          >
            <a
              href="#examples"
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-base font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-premium-lg hover:shadow-premium-xl hover:scale-105 transform"
            >
              Browse Examples
              <svg
                className="ml-2 h-5 w-5 transform group-hover:translate-y-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>
            <a
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 glass rounded-xl border border-slate-200/50 dark:border-slate-700/50 hover:border-blue-200 dark:hover:border-blue-800"
            >
              Learn more
            </a>
          </div>

          {/* Stats */}
          <div
            className={`flex flex-wrap justify-center gap-8 text-sm text-slate-600 dark:text-slate-400 mb-12 transition-all duration-500 ${
              mounted ? "animate-fade-in" : "opacity-0"
            }`}
            style={{ animationDelay: "0.5s" }}
          >
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">500+</span>
              <span>Examples</span>
            </div>
            <div className="w-px h-6 bg-slate-300 dark:bg-slate-700"></div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">50+</span>
              <span>Categories</span>
            </div>
            <div className="w-px h-6 bg-slate-300 dark:bg-slate-700"></div>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">Weekly</span>
              <span>Updates</span>
            </div>
          </div>

          {/* Search Bar (Minimal) */}
          <div
            className={`w-full max-w-2xl mx-auto transition-all duration-500 ${
              mounted ? "animate-fade-in" : "opacity-0"
            }`}
            style={{ animationDelay: "0.6s" }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const input = e.currentTarget.querySelector("input") as HTMLInputElement;
                if (input?.value.trim()) {
                  window.location.href = `/?search=${encodeURIComponent(input.value.trim())}`;
                }
              }}
              className="relative"
            >
              <input
                type="search"
                placeholder="Search examples..."
                className="w-full px-6 py-4 pl-14 text-base glass-strong rounded-2xl border border-slate-200/50 dark:border-slate-700/50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-900/90 dark:text-white placeholder-slate-400 transition-all duration-300 shadow-premium-lg"
                aria-label="Search examples"
              />
              <svg
                className="absolute left-5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
