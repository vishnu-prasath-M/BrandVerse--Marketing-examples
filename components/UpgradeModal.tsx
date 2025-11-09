"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  requiresUpgrade?: boolean;
}

export default function UpgradeModal({
  isOpen,
  onClose,
  message,
  requiresUpgrade = false,
}: UpgradeModalProps) {
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="glass-strong rounded-2xl border border-slate-200 dark:border-slate-700 p-6 max-w-md w-full shadow-premium-xl animate-slide-in">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-bold font-poppins text-slate-900 dark:text-white">
            {requiresUpgrade ? "Upgrade Required" : "Action Required"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
            aria-label="Close"
          >
            <svg
              className="w-5 h-5 text-slate-600 dark:text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <p className="text-slate-700 dark:text-slate-300 mb-6">{message}</p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 glass border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 font-medium"
          >
            Cancel
          </button>
          {requiresUpgrade ? (
            <Link
              href="/pricing"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-colors duration-200 text-center shadow-premium-lg"
            >
              Upgrade Now
            </Link>
          ) : (
            <Link
              href="/signin"
              onClick={() => {
                onClose();
                router.push("/signin");
              }}
              className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-colors duration-200 text-center shadow-premium-lg"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

