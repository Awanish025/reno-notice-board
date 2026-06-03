const categories = [
  "ALL",
  "EXAM",
  "EVENT",
  "GENERAL",
];

export default function CategoryFilter({
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() =>
            setSelectedCategory(category)
          }
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            selectedCategory === category
              ? "bg-blue-600 text-white"
              : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}