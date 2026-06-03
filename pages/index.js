import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import DashboardStats from "../components/DashboardStats";
import NoticeCard from "../components/NoticeCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";

export default function Home() {
  const [notices, setNotices] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("ALL");

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    const res = await fetch("/api/notices");
    const data = await res.json();
    setNotices(data);
  };

  const filteredNotices = useMemo(() => {
    return notices.filter((notice) => {
      const matchesSearch =
        notice.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        notice.body
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "ALL" ||
        notice.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [notices, search, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Notice Board
            </h1>

            <p className="text-slate-500 mt-2">
              Manage exams, events and general notices.
            </p>
          </div>

          <Link
            href="/notices/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium text-center"
          >
            + Add Notice
          </Link>
        </div>

        {/* Stats */}
        <DashboardStats notices={notices} />

        {/* Search */}
        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        {/* Filters */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Grid */}
        {filteredNotices.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center">
            <h2 className="text-xl font-semibold">
              No Notices Found
            </h2>

            <p className="text-gray-500 mt-2">
              Try changing filters or create a new notice.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredNotices.map((notice) => (
              <NoticeCard
                key={notice.id}
                notice={notice}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}