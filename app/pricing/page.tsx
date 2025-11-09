"use client";

import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import UpgradeModal from "@/components/UpgradeModal";

export default function PricingPage() {
  const { user, refresh } = useAuth();
  const router = useRouter();
  const [processing, setProcessing] = useState<string | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [upgradeMessage, setUpgradeMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const handlePurchase = async (plan: "Standard" | "Premium") => {
    if (!user) {
      setUpgradeMessage("Please sign in to continue");
      setShowUpgradeModal(true);
      return;
    }

    setProcessing(plan);
    try {
      const response = await fetch("/api/payments/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan }),
      });

      const data = await response.json();

      if (!response.ok) {
        setUpgradeMessage(data.error || "Failed to process payment");
        setShowUpgradeModal(true);
      } else {
        setSuccessMessage(`Successfully upgraded to ${plan} plan!`);
        await refresh();
        setTimeout(() => {
          router.push("/profile");
        }, 2000);
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setUpgradeMessage("An error occurred. Please try again.");
      setShowUpgradeModal(true);
    } finally {
      setProcessing(null);
    }
  };

  const pricingPlans = [
    {
      tier: "Free",
      plan: "Free" as const,
      price: "$0",
      period: "forever",
      features: [
        "Access to basic examples",
        "Browse by category",
        "Search functionality",
        "5 saved examples",
        "5 comments per day",
        "Email support",
      ],
      cta: "Current Plan",
      highlight: false,
      isCurrent: user?.plan === "Free",
    },
    {
      tier: "Standard",
      plan: "Standard" as const,
      price: "$12",
      period: "month",
      features: [
        "All free features",
        "20 saved examples/month",
        "10 downloads/month",
        "50 comments per day",
        "No ads",
        "Priority support",
      ],
      cta: user?.plan === "Standard" ? "Current Plan" : "Upgrade to Standard",
      highlight: true,
      isCurrent: user?.plan === "Standard",
    },
    {
      tier: "Premium",
      plan: "Premium" as const,
      price: "$29",
      period: "month",
      features: [
        "Everything in Standard",
        "Unlimited saves",
        "Unlimited downloads",
        "Unlimited comments",
        "Premium badge",
        "Dedicated support",
      ],
      cta: user?.plan === "Premium" ? "Current Plan" : "Upgrade to Premium",
      highlight: false,
      isCurrent: user?.plan === "Premium",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 py-20 page-transition">
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        message={upgradeMessage}
        requiresUpgrade={false}
      />
      {successMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 glass-strong rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 p-4 shadow-premium-lg animate-fade-in">
          <p className="text-green-800 dark:text-green-200 font-medium">{successMessage}</p>
        </div>
      )}
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
                onClick={() => {
                  if (plan.plan !== "Free" && !plan.isCurrent) {
                    handlePurchase(plan.plan);
                  }
                }}
                disabled={plan.isCurrent || processing === plan.plan}
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  plan.isCurrent
                    ? "glass border-2 border-green-500 text-green-600 dark:text-green-400 cursor-default"
                    : plan.highlight
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-premium-lg hover:shadow-premium-xl hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    : "glass border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                }`}
              >
                {processing === plan.plan ? "Processing..." : plan.cta}
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
