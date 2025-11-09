import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white/60">
      <div className="container-px mx-auto max-w-7xl py-8 text-sm text-gray-500">
        © {new Date().getFullYear()} MarketingExamples. All rights reserved.
      </div>
    </footer>
  );
}




