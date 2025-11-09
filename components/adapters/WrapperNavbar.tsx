"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../AuthProvider";

// This adapter preserves all existing Navbar logic while using the new UI
export default function WrapperNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const { user, refresh } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/signout", { method: "POST" });
      await refresh();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur transition-all duration-200 ${
        isScrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="container-px mx-auto flex h-16 max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="Marketing Examples Home"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 text-white font-bold">
            <span>M</span>
          </div>
          <span className="text-lg font-semibold tracking-tight">
            MarketingExamples
          </span>
        </Link>

        {/* Desktop Search */}
        <div className="hidden lg:flex items-center flex-1 justify-center max-w-md mx-12">
          <form onSubmit={handleSearch} className="w-full relative">
            <input
              type="search"
              placeholder="Search examples..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-9 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-brand-500 focus:border-brand-500 bg-gray-50 placeholder-gray-400 transition-all"
              aria-label="Search examples"
            />
            <svg
              className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </form>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-1">
          <Link
            href="/about"
            className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900 transition-colors font-medium"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900 transition-colors font-medium"
          >
            Contact
          </Link>
          <div className="h-4 w-px bg-gray-200 mx-2"></div>
          {user ? (
            <>
              <span className="px-3 py-2 text-sm text-gray-600 font-medium">
                {user.name || user.email}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 transition-colors font-medium"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden p-2 -mr-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-500 transition-colors"
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="container-px mx-auto max-w-7xl py-3">
            <ul className="grid gap-2">
              {/* Mobile Search */}
              <li className="pb-2">
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <input
                      type="search"
                      placeholder="Search examples..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-2 pl-9 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-brand-500 focus:border-brand-500 bg-gray-50"
                      aria-label="Search examples"
                    />
                    <svg
                      className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </form>
              </li>
              <li>
                <Link
                  className="block rounded-lg px-3 py-2 hover:bg-gray-50"
                  href="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  className="block rounded-lg px-3 py-2 hover:bg-gray-50"
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
              <li className="mt-2 h-px bg-gray-200" />
              {user ? (
                <>
                  <li className="px-3 py-2 text-sm text-gray-600 font-medium">
                    {user.name || user.email}
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium text-left"
                    >
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-center gap-2">
                    <Link
                      className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-center hover:bg-gray-50"
                      href="/signin"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign in
                    </Link>
                    <Link
                      className="flex-1 rounded-lg bg-gray-900 px-3 py-2 text-center font-semibold text-white hover:bg-gray-800"
                      href="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}






