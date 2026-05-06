export default function DashboardCards({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="card">
        <h3 className="text-lg font-semibold">Total Tasks</h3>
        <p className="text-3xl font-bold text-indigo-600">{stats.total}</p>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold">Completed</h3>
        <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold">Pending</h3>
        <p className="text-3xl font-bold text-yellow-500">{stats.pending}</p>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold">Overdue</h3>
        <p className="text-3xl font-bold text-red-500">{stats.overdue}</p>
      </div>
    </div>
  );
}