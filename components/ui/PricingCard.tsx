export default function PricingCard({
  tier,
  price,
  features,
  cta,
  highlight,
}: {
  tier: string;
  price: string;
  features: string[];
  cta: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-6 shadow-soft ${
        highlight
          ? "border-gray-900 bg-white"
          : "border-gray-200 bg-white"
      }`}
    >
      <h3 className="text-xl font-semibold">{tier}</h3>
      <p className="mt-2 text-3xl font-bold">{price}</p>
      <ul className="mt-4 grid gap-2 text-sm text-gray-700">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <a
        href="#"
        className={`mt-6 inline-flex w-full items-center justify-center rounded-lg px-4 py-2 font-semibold ${
          highlight
            ? "bg-gray-900 text-white hover:bg-gray-800"
            : "border border-gray-300 text-gray-800 hover:bg-gray-50"
        }`}
      >
        {cta}
      </a>
    </div>
  );
}






