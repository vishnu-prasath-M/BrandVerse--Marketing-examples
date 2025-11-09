"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";

export default function FAB() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const actions = [
    {
      label: "Favorites",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      href: "/favorites",
      requireAuth: true,
    },
    {
      label: "Submit Example",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      ),
      href: "/submit",
      requireAuth: false,
    },
    {
      label: "Contact",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      href: "/contact",
      requireAuth: false,
    },
  ];

  const filteredActions = actions.filter(
    (action) => !action.requireAuth || user
  );

  return (
    <div className="fixed bottom-8 right-8 z-40">
      {/* Action Menu */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 mb-4 space-y-2 animate-fade-in">
          {filteredActions.map((action, index) => (
            <button
              key={action.href}
              onClick={() => {
                router.push(action.href);
                setIsOpen(false);
              }}
              className="flex items-center space-x-3 glass-strong px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-premium-lg hover:shadow-premium-xl transition-all duration-300 transform hover:scale-105 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
              style={{ animationDelay: `${(filteredActions.length - index - 1) * 0.05}s` }}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-premium">
                {action.icon}
              </div>
              <span className="font-medium whitespace-nowrap">{action.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Main FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-premium-xl hover:shadow-premium-xl transition-all duration-300 flex items-center justify-center transform ${
          isOpen ? "rotate-45 scale-110" : "hover:scale-110"
        }`}
        aria-label="Quick actions"
      >
        <svg
          className="w-6 h-6 transition-transform duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>
  );
}





