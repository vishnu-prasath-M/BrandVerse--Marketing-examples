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

// This adapter uses new UI styling but preserves existing logic
export default function WrapperExampleCard({
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
      className="group block rounded-2xl border border-gray-200 bg-white p-6 shadow-soft hover:border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
    >
      <div className="relative h-36 w-full overflow-hidden rounded-xl bg-muted mb-4">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 right-3">
          <div className="bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] font-medium text-gray-900 shadow-sm">
            {formatRevenue(monthlyRevenue)}/mo
          </div>
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-1.5 line-clamp-2 group-hover:text-brand-600 transition-colors leading-snug">
        {title}
      </h3>
      <p className="text-sm text-gray-600 line-clamp-2 mb-3 leading-relaxed">
        {description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {safeCategories.slice(0, 2).map((category) => (
          <span
            key={category.id}
            className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[11px] font-medium rounded border border-gray-200"
          >
            {category.name}
          </span>
        ))}
        {safeCategories.length > 2 && (
          <span className="px-2 py-0.5 text-gray-500 text-[11px] font-medium">
            +{safeCategories.length - 2}
          </span>
        )}
      </div>
    </Link>
  );
}




