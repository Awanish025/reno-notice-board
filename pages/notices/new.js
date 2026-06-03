import { useState } from "react";
import { useRouter } from "next/router";

export default function NewNotice() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    body: "",
    category: "GENERAL",
    priority: "NORMAL",
    publishDate: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const response = await fetch("/api/notices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      router.push("/");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 py-10">

        <h1 className="text-3xl font-bold mb-8">
          Add Notice
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm border p-6 space-y-5"
        >
          <div>
            <label className="block mb-2 font-medium">
              Title
            </label>

            <input
              type="text"
              name="title"
              required
              value={form.title}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              rows={5}
              name="body"
              required
              value={form.body}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block mb-2 font-medium">
                Category
              </label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              >
                <option value="EXAM">Exam</option>
                <option value="EVENT">Event</option>
                <option value="GENERAL">General</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Priority
              </label>

              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              >
                <option value="NORMAL">Normal</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>

          </div>

          <div>
            <label className="block mb-2 font-medium">
              Publish Date
            </label>

            <input
              type="date"
              name="publishDate"
              required
              value={form.publishDate}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
          >
            {loading ? "Creating..." : "Create Notice"}
          </button>
        </form>
      </div>
    </div>
  );
}