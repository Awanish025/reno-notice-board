import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditNotice() {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(true);

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
    const res = await fetch(`/api/notices/${id}`);
    const data = await res.json();

    setForm({
      title: data.title,
      body: data.body,
      category: data.category,
      priority: data.priority,
      publishDate: data.publishDate
        .split("T")[0],
    });

    setLoading(false);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `/api/notices/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    if (res.ok) {
      router.push("/");
    }
  };

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto py-10 px-4">

        <h1 className="text-3xl font-bold mb-8">
          Edit Notice
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-lg border p-6 space-y-5"
        >
          <div>
            <label>Title</label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 mt-2"
            />
          </div>

          <div>
            <label>Description</label>

            <textarea
              rows={5}
              name="body"
              value={form.body}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 mt-2"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3"
            >
              <option value="EXAM">
                Exam
              </option>
              <option value="EVENT">
                Event
              </option>
              <option value="GENERAL">
                General
              </option>
            </select>

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="border rounded-xl px-4 py-3"
            >
              <option value="NORMAL">
                Normal
              </option>
              <option value="URGENT">
                Urgent
              </option>
            </select>

          </div>

          <input
            type="date"
            name="publishDate"
            value={form.publishDate}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            Update Notice
          </button>
        </form>
      </div>
    </div>
  );
}