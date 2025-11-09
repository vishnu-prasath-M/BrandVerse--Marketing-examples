"use client";

import { useState, useEffect } from "react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Marketing Director",
    avatar: "SJ",
    rating: 5,
    comment: "Brand Verse has transformed how we approach marketing campaigns. The examples are incredibly detailed and actionable.",
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Startup Founder",
    avatar: "MC",
    rating: 5,
    comment: "As a startup, we don't have a large marketing budget. This platform gives us access to world-class examples that inspire our campaigns.",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Content Strategist",
    avatar: "ER",
    rating: 5,
    comment: "The curated collection saves me hours of research. I find new inspiration every week.",
  },
  {
    id: "4",
    name: "David Thompson",
    role: "Agency Owner",
    avatar: "DT",
    rating: 5,
    comment: "Our team uses Brand Verse daily to stay updated on the latest marketing trends and strategies.",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold font-poppins text-slate-900 dark:text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Join thousands of marketers who trust Brand Verse for inspiration
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="min-w-full px-6"
                >
                  <div className="glass-strong rounded-2xl p-8 shadow-premium-lg">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-premium mr-4">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white text-lg">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                      "{testimonial.comment}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-blue-600 w-8"
                    : "bg-slate-300 dark:bg-slate-700"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}





