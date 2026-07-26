export default function ServiceCard({
  title,
  description,
  icon: Icon,
}) {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="mb-5 inline-flex rounded-xl bg-red-100 p-4 text-red-600">
        <Icon size={32} />
      </div>

      <h3 className="mb-3 text-xl font-bold">
        {title}
      </h3>

      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
}