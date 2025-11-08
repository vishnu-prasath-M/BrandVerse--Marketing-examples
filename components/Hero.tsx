"use client";

export default function Hero() {
  return (
    <section className="relative bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1 mb-8 rounded-full bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900 text-blue-700 dark:text-blue-400 text-xs font-medium tracking-wide uppercase">
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
            Curated Collection
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
            Real marketing examples
            <br />
            <span className="text-gray-600 dark:text-gray-400">from leading brands</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            Learn from successful campaigns, landing pages, and email strategies. 
            Analyzed and documented for marketers who want to improve their craft.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="#examples"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-sm"
            >
              Browse Examples
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>
            <a
              href="/about"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Learn more
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500 dark:text-gray-500">
            <div>
              <span className="font-semibold text-gray-900 dark:text-white">500+</span>
              <span className="ml-1.5">Examples</span>
            </div>
            <div className="w-px h-4 bg-gray-200 dark:bg-gray-800"></div>
            <div>
              <span className="font-semibold text-gray-900 dark:text-white">50+</span>
              <span className="ml-1.5">Categories</span>
            </div>
            <div className="w-px h-4 bg-gray-200 dark:bg-gray-800"></div>
            <div>
              <span className="font-semibold text-gray-900 dark:text-white">Weekly</span>
              <span className="ml-1.5">Updates</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
