export default function CategoryCard({
  title,
  count,
}: {
  title: string;
  count: number;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-soft">
      <div className="h-28 rounded-xl bg-muted" />
      <div className="mt-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
          {count}
        </span>
      </div>
    </div>
  );
}




