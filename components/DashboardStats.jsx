export default function DashboardStats({ notices }) {
  const total = notices.length;
  const urgent = notices.filter(
    (n) => n.priority === "URGENT"
  ).length;
  const exams = notices.filter(
    (n) => n.category === "EXAM"
  ).length;
  const events = notices.filter(
    (n) => n.category === "EVENT"
  ).length;

  const stats = [
    { title: "Total Notices", value: total },
    { title: "Urgent", value: urgent },
    { title: "Exams", value: exams },
    { title: "Events", value: events },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-white rounded-xl shadow-sm border p-5"
        >
          <p className="text-gray-500 text-sm">
            {stat.title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {stat.value}
          </h2>
        </div>
      ))}
    </div>
  );
}