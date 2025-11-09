"use client";

import React from "react";
import Link from "next/link";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="container-px mx-auto flex h-16 max-w-7xl items-center justify-between">
        {/* Left: Logo text */}
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="Brand home"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-white font-bold">
            <span>M</span>
          </div>
          <span className="text-lg font-semibold tracking-tight">
            MarketingExamples
          </span>
        </Link>

        {/* Center links (desktop) */}
        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-center">
          <ul className="flex items-center gap-6 text-sm font-medium">
            <li>
              <Link className="text-gray-700 hover:text-gray-900" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-700 hover:text-gray-900"
                href="/pricing"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-700 hover:text-gray-900"
                href="/category"
              >
                Category
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-700 hover:text-gray-900"
                href="/examples"
              >
                Examples
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right actions (desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/signin"
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-gray-900 px-3.5 py-1.5 text-sm font-semibold text-white hover:bg-gray-800"
          >
            Sign up
          </Link>
          <Link
            href="/profile"
            aria-label="Profile"
            className="ml-1 inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-gray-100"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21a8 8 0 1 0-16 0" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>
        </div>

        {/* Mobile trigger */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="container-px mx-auto max-w-7xl py-3">
            <ul className="grid gap-2">
              <li>
                <Link
                  className="block rounded-lg px-3 py-2 hover:bg-gray-50"
                  href="/"
                  onClick={() => setMobileOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="block rounded-lg px-3 py-2 hover:bg-gray-50"
                  href="/pricing"
                  onClick={() => setMobileOpen(false)}
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  className="block rounded-lg px-3 py-2 hover:bg-gray-50"
                  href="/category"
                  onClick={() => setMobileOpen(false)}
                >
                  Category
                </Link>
              </li>
              <li>
                <Link
                  className="block rounded-lg px-3 py-2 hover:bg-gray-50"
                  href="/examples"
                  onClick={() => setMobileOpen(false)}
                >
                  Examples
                </Link>
              </li>
              <li className="mt-2 h-px bg-gray-200" />
              <li className="flex items-center gap-2">
                <Link
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-center hover:bg-gray-50"
                  href="/signin"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  className="flex-1 rounded-lg bg-gray-900 px-3 py-2 text-center font-semibold text-white hover:bg-gray-800"
                  href="/signup"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign up
                </Link>
              </li>
              <li>
                <Link
                  className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-50"
                  href="/profile"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-gray-100">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21a8 8 0 1 0-16 0" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <span>Profile</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}




