import Image from "next/image";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ExampleCardProps {
  id: string;
  slug: string;
  title: string;
  description: string;
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

export default function ExampleCard({
  slug,
  title,
  description,
  imageUrl,
  monthlyRevenue,
  categories,
}: ExampleCardProps) {
  const safeCategories = Array.isArray(categories) ? categories : [];
  return (
    <Link
      href={`/examples/${slug}`}
      className="group block bg-white dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 right-3">
          <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] font-medium text-gray-900 dark:text-white shadow-sm">
            {formatRevenue(monthlyRevenue)}/mo
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1.5 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
          {title}
        </h3>
        <p className="text-[13px] text-gray-600 dark:text-gray-400 line-clamp-2 mb-3 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {safeCategories.slice(0, 2).map((category) => (
            <span
              key={category.id}
              className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-[11px] font-medium rounded border border-gray-200 dark:border-gray-700"
            >
              {category.name}
            </span>
          ))}
          {safeCategories.length > 2 && (
            <span className="px-2 py-0.5 text-gray-500 dark:text-gray-500 text-[11px] font-medium">
              +{safeCategories.length - 2}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
