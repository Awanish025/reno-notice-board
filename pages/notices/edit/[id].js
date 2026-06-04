import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function EditNotice() {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    body: "",
    category: "GENERAL",
    priority: "NORMAL",
    publishDate: "",
  });

  useEffect(() => {
    if (id) fetchNotice();
  }, [id]);

  const fetchNotice = async () => {
    try {
      const res = await fetch(`/api/notices/${id}`);
      const data = await res.json();

      setForm({
        title: data.title || "",
        body: data.body || "",
        category: data.category || "GENERAL",
        priority: data.priority || "NORMAL",
        publishDate: data.publishDate?.split("T")[0] || "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const res = await fetch(`/api/notices/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg font-medium">
          Loading Notice...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-3xl p-8 text-white mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <h1 className="text-4xl font-bold">
                Edit Notice
              </h1>

              <p className="text-slate-200 mt-2">
                Update announcement details and publish changes.
              </p>
            </div>

            <Link
              href="/"
              className="bg-white text-slate-900 px-5 py-3 rounded-xl font-medium text-center"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8"
        >
          <div className="space-y-6">

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Notice Title
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Description
              </label>

              <textarea
                rows={6}
                name="body"
                value={form.body}
                onChange={handleChange}
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-5">

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Category
                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-900 bg-white"
                >
                  <option value="EXAM">Exam</option>
                  <option value="EVENT">Event</option>
                  <option value="GENERAL">General</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Priority
                </label>

                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-slate-900 bg-white"
                >
                  <option value="NORMAL">Normal</option>
                  <option value="URGENT">Urgent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Publish Date
                </label>

                <input
                  type="date"
                  name="publishDate"
                  value={form.publishDate}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3"
                />
              </div>

            </div>

            <div className="flex justify-end gap-4 pt-4">

              <Link
                href="/"
                className="px-6 py-3 rounded-xl border border-slate-300 font-medium"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-medium transition"
              >
                {saving ? "Updating..." : "Update Notice"}
              </button>

            </div>

          </div>
        </form>
      </div>
    </div>
  );
}