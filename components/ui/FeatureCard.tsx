export default function FeatureCard({
  title,
  text,
  icon,
}: {
  title: string;
  text: string;
  icon?: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-soft">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 text-white">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d={icon || "M12 2v20"} />
        </svg>
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-gray-600">{text}</p>
    </div>
  );
}




