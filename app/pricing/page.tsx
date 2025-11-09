"use client";

export default function PricingPage() {
  const pricingPlans = [
    {
      tier: "Free",
      price: "$0",
      period: "forever",
      features: [
        "Access to basic examples",
        "Browse by category",
        "Search functionality",
        "Email support",
      ],
      cta: "Get Started",
      highlight: false,
    },
    {
      tier: "Pro",
      price: "$12",
      period: "month",
      features: [
        "All free features",
        "Premium examples",
        "Detailed analytics",
        "Priority support",
        "Weekly updates",
        "Save favorites",
      ],
      cta: "Go Pro",
      highlight: true,
    },
    {
      tier: "Team",
      price: "$29",
      period: "month",
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Advanced analytics",
        "Custom categories",
        "API access",
        "Dedicated support",
      ],
      cta: "Start Team",
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 py-20 page-transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold font-poppins text-slate-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Choose the plan that works best for you. All plans include our core features.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.tier}
              className={`relative rounded-2xl p-8 border transition-all duration-500 transform hover:-translate-y-2 ${
                plan.highlight
                  ? "glass-strong border-blue-500 dark:border-blue-600 shadow-premium-xl scale-105"
                  : "glass border-slate-200 dark:border-slate-700 shadow-premium hover:shadow-premium-lg"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="px-4 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-full shadow-premium">
                    Recommended
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {plan.tier}
                </h3>
                <div className="flex items-baseline justify-center mb-4">
                  <span className="text-5xl font-bold text-slate-900 dark:text-white">
                    {plan.price}
                  </span>
                  {plan.period !== "forever" && (
                    <span className="text-slate-600 dark:text-slate-400 ml-2">
                      /{plan.period}
                    </span>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-slate-700 dark:text-slate-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  plan.highlight
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-premium-lg hover:shadow-premium-xl hover:scale-105 transform"
                    : "glass border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold font-poppins text-slate-900 dark:text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="glass-strong rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                Can I change plans later?
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </div>
            <div className="glass-strong rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                We accept all major credit cards, PayPal, and bank transfers for annual plans.
              </p>
            </div>
            <div className="glass-strong rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                Is there a free trial?
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Yes, all paid plans come with a 14-day free trial. No credit card required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
