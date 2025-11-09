export default function ExampleCard({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-soft">
      <div className="h-36 rounded-xl bg-muted" />
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">Placeholder content</p>
    </div>
  );
}






