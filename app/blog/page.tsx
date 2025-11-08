import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - Marketing Examples",
  description:
    "Read articles, insights, and deep dives into the best marketing examples and strategies.",
};

export default function BlogPage() {
  // Sample blog posts - in production, these would come from a database
  const blogPosts = [
    {
      id: 1,
      title: "10 Email Marketing Examples That Drive Results",
      excerpt:
        "Discover the email campaigns that have achieved the highest open and conversion rates in 2024.",
      category: "Email Marketing",
      date: "March 15, 2024",
      readTime: "5 min read",
      image: "https://via.placeholder.com/600x400/6366f1/ffffff?text=Email+Marketing",
    },
    {
      id: 2,
      title: "Landing Page Design Patterns That Convert",
      excerpt:
        "Analyze the landing page structures used by top SaaS companies to maximize conversions.",
      category: "Landing Pages",
      date: "March 10, 2024",
      readTime: "8 min read",
      image: "https://via.placeholder.com/600x400/8b5cf6/ffffff?text=Landing+Pages",
    },
    {
      id: 3,
      title: "Social Media Campaign Strategies That Build Communities",
      excerpt:
        "Learn how brands like Duolingo and Spotify create viral social media campaigns.",
      category: "Social Media",
      date: "March 5, 2024",
      readTime: "6 min read",
      image: "https://via.placeholder.com/600x400/10b981/ffffff?text=Social+Media",
    },
    {
      id: 4,
      title: "Content Marketing That Ranks: SEO Case Studies",
      excerpt:
        "Explore how companies like Shopify use content marketing to dominate search results.",
      category: "SEO",
      date: "February 28, 2024",
      readTime: "7 min read",
      image: "https://via.placeholder.com/600x400/f59e0b/ffffff?text=SEO",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
            Marketing <span className="gradient-text">Insights</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Deep dives into the strategies, tactics, and examples that drive marketing success.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 card-hover"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 text-xs font-semibold rounded-full text-gray-900 dark:text-white">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <time dateTime={post.date}>{post.date}</time>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-4 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline group"
                  >
                    Read more
                    <svg
                      className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Get the latest marketing insights and examples delivered straight to your inbox.
            </p>
            <Link
              href="/newsletter"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-colors font-semibold shadow-lg hover:shadow-xl"
            >
              Subscribe to Newsletter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}










