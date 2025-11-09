import { Metadata } from "next";
import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export const metadata: Metadata = {
  title: "About Us - Brand Verse",
  description:
    "Learn about Brand Verse - a curated collection of real marketing campaigns from top brands to inspire your next campaign.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 page-transition">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-20 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold font-poppins text-slate-900 dark:text-white mb-4 tracking-tight">
            About Brand Verse
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            We're on a mission to help marketers learn from the best campaigns in the world.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="glass-strong rounded-2xl border border-slate-200 dark:border-slate-700 p-8 mb-12 shadow-premium-lg">
              <h2 className="text-3xl font-bold font-poppins text-slate-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed text-lg">
                Brand Verse was created to solve a simple problem: finding real,
                actionable marketing inspiration is hard. Most "example" sites show mockups
                or fake campaigns. We showcase real marketing examples from top brands that
                have actually worked.
              </p>
            </div>

            <div className="glass-strong rounded-2xl border border-slate-200 dark:border-slate-700 p-8 mb-12 shadow-premium-lg">
              <h2 className="text-3xl font-bold font-poppins text-slate-900 dark:text-white mb-6">
                What We Do
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed text-lg">
                Every week, we curate and analyze marketing examples from successful brands
                across various categories:
              </p>
              <ul className="list-disc list-inside space-y-3 text-slate-600 dark:text-slate-300 mb-8 ml-4 text-lg">
                <li>Email marketing campaigns that drive engagement</li>
                <li>Landing pages that convert</li>
                <li>Social media strategies that build communities</li>
                <li>Content marketing that educates and sells</li>
                <li>SEO tactics that rank</li>
                <li>And much more...</li>
              </ul>
            </div>

            <div className="glass-strong rounded-2xl border border-slate-200 dark:border-slate-700 p-8 mb-12 shadow-premium-lg">
              <h2 className="text-3xl font-bold font-poppins text-slate-900 dark:text-white mb-6">
                Why We Do It
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed text-lg">
                Great marketing doesn't happen in a vacuum. The best marketers study what
                works, learn from others' successes (and failures), and adapt winning
                strategies to their own unique context. We make that learning process easier
                by bringing the best examples together in one place.
              </p>
            </div>

            <div className="glass-strong rounded-2xl border border-blue-200 dark:border-blue-800 p-8 mb-12 shadow-premium-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
              <h3 className="text-2xl font-bold font-poppins text-slate-900 dark:text-white mb-4">
                Join Our Community
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6 text-lg">
                Subscribe to our newsletter to get the latest marketing examples delivered
                to your inbox every week. No spam, just inspiration.
              </p>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6">
                <NewsletterForm />
              </div>
            </div>

            <div className="glass-strong rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-premium-lg">
              <h2 className="text-3xl font-bold font-poppins text-slate-900 dark:text-white mb-6">
                Have an Example to Share?
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed text-lg">
                We're always looking for great marketing examples to feature. If you've seen
                a campaign that deserves recognition, or if you've created something
                exceptional yourself, we'd love to hear about it.
              </p>
              <Link
                href="/submit"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-premium-lg hover:shadow-premium-xl hover:scale-105 transform"
              >
                Submit an Example
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
