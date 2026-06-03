export default function SearchBar({
  search,
  setSearch,
}) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search notices..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}