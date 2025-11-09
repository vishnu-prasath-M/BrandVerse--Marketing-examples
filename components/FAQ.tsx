"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How often are new examples added?",
    answer: "We add new marketing examples weekly. Our team curates the best campaigns from top brands across various industries.",
  },
  {
    question: "Can I submit my own marketing example?",
    answer: "Yes! We encourage submissions from the community. Visit our Submit page to share your marketing examples with us.",
  },
  {
    question: "Is there a free plan available?",
    answer: "Yes, we offer a free plan that includes access to basic examples and categories. Check our Pricing page for more details.",
  },
  {
    question: "How do I search for specific examples?",
    answer: "You can use the search bar at the top of the page or filter by categories. We also support filtering by revenue and other criteria.",
  },
  {
    question: "Can I save examples for later?",
    answer: "Yes! Registered users can save examples as favorites. Just click the heart icon on any example card.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-poppins text-slate-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Everything you need to know about Brand Verse
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass-strong rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-premium transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-300"
              >
                <span className="font-semibold text-slate-900 dark:text-white text-lg pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-slate-600 dark:text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "transform rotate-180" : ""
                  }`}
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
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-5 text-slate-600 dark:text-slate-400 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



