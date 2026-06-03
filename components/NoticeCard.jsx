import Link from "next/link";

export default function NoticeCard({ notice }) {
  const urgent = notice.priority === "URGENT";

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 p-5">
      <div className="flex items-center justify-between">
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${
            urgent
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {notice.priority}
        </span>

        <span className="text-sm text-gray-500">
          {new Date(
            notice.publishDate
          ).toLocaleDateString()}
        </span>
      </div>

      <h2 className="text-xl font-semibold text-gray-900 mt-4">
        {notice.title}
      </h2>

      <p className="text-gray-600 mt-2 line-clamp-3">
        {notice.body}
      </p>

      <div className="mt-4">
        <span className="inline-block px-3 py-1 text-sm rounded-lg bg-blue-50 text-blue-700">
          {notice.category}
        </span>
      </div>

      <div className="flex gap-3 mt-6">
        <Link
          href={`/notices/edit/${notice.id}`}
          className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg font-medium text-center"
        >
          Edit
        </Link>

        <button
          onClick={async () => {
            const confirmed = window.confirm(
              "Are you sure you want to delete this notice?"
            );

            if (!confirmed) return;

            const res = await fetch(
              `/api/notices/${notice.id}`,
              {
                method: "DELETE",
              }
            );

            if (res.ok) {
              window.location.reload();
            }
          }}
          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium"
        >
          Delete
        </button>

      </div>
    </div>
  );
}