import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us - Marketing Examples",
  description:
    "Learn about Marketing Examples - a curated collection of real marketing campaigns from top brands to inspire your next campaign.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">
            About Marketing Examples
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We're on a mission to help marketers learn from the best campaigns in the world.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Our Mission
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Marketing Examples was created to solve a simple problem: finding real,
              actionable marketing inspiration is hard. Most "example" sites show mockups
              or fake campaigns. We showcase real marketing examples from top brands that
              have actually worked.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 mt-12">
              What We Do
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Every week, we curate and analyze marketing examples from successful brands
              across various categories:
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-600 dark:text-gray-300 mb-8 ml-4">
              <li>Email marketing campaigns that drive engagement</li>
              <li>Landing pages that convert</li>
              <li>Social media strategies that build communities</li>
              <li>Content marketing that educates and sells</li>
              <li>SEO tactics that rank</li>
              <li>And much more...</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 mt-12">
              Why We Do It
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Great marketing doesn't happen in a vacuum. The best marketers study what
              works, learn from others' successes (and failures), and adapt winning
              strategies to their own unique context. We make that learning process easier
              by bringing the best examples together in one place.
            </p>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 mt-12 mb-12 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Join Our Community
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Subscribe to our newsletter to get the latest marketing examples delivered
                to your inbox every week. No spam, just inspiration.
              </p>
              <a
                href="/newsletter"
                className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-medium text-sm"
              >
                Subscribe Now
              </a>
            </div>

            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6 mt-12">
              Have an Example to Share?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              We're always looking for great marketing examples to feature. If you've seen
              a campaign that deserves recognition, or if you've created something
              exceptional yourself, we'd love to hear about it.
            </p>
            <a
              href="/submit"
              className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-medium text-sm"
            >
              Submit an Example
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}



