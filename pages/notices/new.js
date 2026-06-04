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

try {
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
} catch (error) {
  console.error(error);
}

setLoading(false);

};

return ( <div className="min-h-screen bg-slate-50"> <div className="max-w-4xl mx-auto px-4 py-10">

    {/* Header */}
    <div className="bg-gradient-to-red from-slate-900 via-slate-800 to-blue-900 rounded-3xl p-8 text-white mb-8 shadow-lg">
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 rounded-3xl p-10 text-white mb-8 shadow-xl">
        <h1 className="text-5xl font-extrabold tracking-tight">
          Create Notice
        </h1>

        <p className="mt-4 text-slate-100 text-lg max-w-2xl">
          Publish examinations, events and important announcements
          for students and faculty.
        </p>
      </div>
    </div>

    {/* Form */}
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8"
    >
      <div className="space-y-6">

        {/* Title */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-slate-700">
            Notice Title
          </label>

          <input
            type="text"
            name="title"
            required
            value={form.title}
            onChange={handleChange}
            placeholder="Enter notice title"
            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-slate-700">
            Description
          </label>

          <textarea
            rows={6}
            name="body"
            required
            value={form.body}
            onChange={handleChange}
            placeholder="Enter detailed notice description..."
            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Category & Priority */}
        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700">
              Category
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="EXAM">
                📚 Exam
              </option>

              <option value="EVENT">
                🎉 Event
              </option>

              <option value="GENERAL">
                📢 General
              </option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700">
              Priority
            </label>

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="NORMAL">
                Normal
              </option>

              <option value="URGENT">
                🔴 Urgent
              </option>
            </select>
          </div>

        </div>

        {/* Publish Date */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-slate-700">
            Publish Date
          </label>

          <input
            type="date"
            name="publishDate"
            required
            value={form.publishDate}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t">

          <button
            type="button"
            onClick={() => router.push("/")}
            className="px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-50 font-medium"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md disabled:opacity-50"
          >
            {loading
              ? "Creating..."
              : "Create Notice"}
          </button>

        </div>

      </div>
    </form>
  </div>
</div>

);
}
