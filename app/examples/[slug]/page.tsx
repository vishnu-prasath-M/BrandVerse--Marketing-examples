import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { prisma } from "@/lib/prisma";
import ExampleCard from "@/components/ExampleCard";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Example {
  id: string;
  slug: string;
  title: string;
  description: string;
  body: string;
  imageUrl: string;
  monthlyRevenue: number;
  categories: Category[];
}

function formatRevenue(revenue: number): string {
  if (revenue >= 1000000) {
    return `$${(revenue / 1000000).toFixed(1)}M`;
  }
  if (revenue >= 1000) {
    return `$${(revenue / 1000).toFixed(0)}k`;
  }
  return `$${revenue}`;
}

async function getExample(slug: string) {
  const example = await prisma.example.findUnique({
    where: { slug },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
  });

  if (!example) {
    return null;
  }

  // Get related examples
  const categoryIds = example.categories.map((ec) => ec.categoryId);
  const relatedExamples = await prisma.example.findMany({
    where: {
      id: { not: example.id },
      categories: {
        some: {
          categoryId: { in: categoryIds },
        },
      },
    },
    take: 6,
    orderBy: { createdAt: "desc" },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
  });

  // Get next and previous examples
  const [nextExample, prevExample] = await Promise.all([
    prisma.example.findFirst({
      where: {
        createdAt: { gt: example.createdAt },
      },
      orderBy: { createdAt: "asc" },
    }),
    prisma.example.findFirst({
      where: {
        createdAt: { lt: example.createdAt },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return {
    ...example,
    categories: example.categories.map((ec) => ({
      id: ec.category.id,
      name: ec.category.name,
      slug: ec.category.slug,
    })),
    related: relatedExamples.map((ex) => ({
      id: ex.id,
      slug: ex.slug,
      title: ex.title,
      description: ex.description,
      imageUrl: ex.imageUrl,
      monthlyRevenue: ex.monthlyRevenue,
      categories: ex.categories.map((ec) => ({
        id: ec.category.id,
        name: ec.category.name,
        slug: ec.category.slug,
      })),
    })),
    next: nextExample ? { slug: nextExample.slug, title: nextExample.title } : null,
    previous: prevExample
      ? { slug: prevExample.slug, title: prevExample.title }
      : null,
  };
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const example = await getExample(params.slug);

  if (!example) {
    return {
      title: "Example Not Found",
    };
  }

  return {
    title: `${example.title} - Marketing Examples`,
    description: example.description,
    openGraph: {
      title: example.title,
      description: example.description,
      images: [example.imageUrl],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: example.title,
      description: example.description,
      images: [example.imageUrl],
    },
  };
}

export default async function ExampleDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const example = await getExample(params.slug);

  if (!example) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Example Not Found</h1>
          <Link href="/" className="text-blue-600 hover:text-blue-700">
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Image */}
      <div className="relative w-full h-64 sm:h-96 lg:h-[500px] bg-gray-100 dark:bg-gray-800 overflow-hidden border-b border-gray-200 dark:border-gray-800">
        <Image
          src={example.imageUrl}
          alt={example.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <header className="mb-10 pb-8 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
            {example.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {example.categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/?category=${category.slug}`}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>

            {/* Revenue */}
            <div className="ml-auto px-3 py-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded text-sm font-medium">
              {formatRevenue(example.monthlyRevenue)} / month
            </div>
          </div>

          {/* Share Buttons */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Share:</span>
            <div className="flex gap-2">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  example.title
                )}&url=${encodeURIComponent(
                  `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/examples/${example.slug}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                aria-label="Share on Twitter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/examples/${example.slug}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                aria-label="Share on LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </header>

        {/* Body Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <ReactMarkdown>{example.body || example.description}</ReactMarkdown>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center py-8 border-t border-b border-gray-200 dark:border-gray-700 mb-12 gap-4">
          {example.previous ? (
            <Link
              href={`/examples/${example.previous.slug}`}
              className="flex flex-col group"
            >
              <span className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Previous
              </span>
              <span className="text-blue-600 dark:text-blue-400 group-hover:underline">
                {example.previous.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          <Link
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to Home
          </Link>

          {example.next ? (
            <Link
              href={`/examples/${example.next.slug}`}
              className="flex flex-col text-right group"
            >
              <span className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Next
              </span>
              <span className="text-blue-600 dark:text-blue-400 group-hover:underline">
                {example.next.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Related Examples */}
        {example.related.length > 0 && (
          <section className="mb-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Related Examples
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {example.related.map((related) => (
                <ExampleCard
                  key={related.id}
                  id={related.id}
                  slug={related.slug}
                  title={related.title}
                  description={related.description}
                  imageUrl={related.imageUrl}
                  monthlyRevenue={related.monthlyRevenue}
                  categories={related.categories}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}

