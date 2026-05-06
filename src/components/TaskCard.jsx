export default function TaskCard({ task, updateStatus }) {
  const badgeClass =
    task.status === 'Pending'
      ? 'badge-pending'
      : task.status === 'In Progress'
      ? 'badge-progress'
      : 'badge-completed';

  return (
    <div className="card space-y-3 hover:shadow-xl transition duration-300">
      <h2 className="text-xl font-bold">{task.title}</h2>
      <p>{task.description}</p>

      <span className={badgeClass}>{task.status}</span>

      <p className="text-sm text-slate-500">
        Due: {new Date(task.dueDate).toLocaleDateString()}
      </p>

      <select
        className="input"
        value={task.status}
        onChange={(e) => updateStatus(task._id, e.target.value)}
      >
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>
    </div>
  );
}