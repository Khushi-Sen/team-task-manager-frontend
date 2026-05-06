import { useEffect, useState } from 'react';
import API from '../services/api';
import Sidebar from '../components/Sidebar';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    project: '',
    dueDate: ''
  });

  const user = JSON.parse(localStorage.getItem('user'));

  const fetchData = async () => {
    const taskRes = await API.get('/tasks');
    const projectRes = await API.get('/projects');
    setTasks(taskRes.data);
    setProjects(projectRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();
    await API.post('/tasks', form);
    setForm({ title: '', description: '', project: '', dueDate: '' });
    fetchData();
  };

  const updateStatus = async (id, status) => {
    await API.put(`/tasks/${id}`, { status });
    fetchData();
  };

  const badgeClass = (status) => {
    if (status === 'Pending') return 'badge-pending';
    if (status === 'In Progress') return 'badge-progress';
    return 'badge-completed';
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 space-y-8">
        <h1 className="text-4xl font-bold">Tasks</h1>

        {user.role === 'Admin' && (
          <form onSubmit={createTask} className="card space-y-4 max-w-2xl">
            <input
              className="input"
              placeholder="Task Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <textarea
              className="input"
              placeholder="Task Description"
                         value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <select
              className="input"
              value={form.project}
              onChange={(e) => setForm({ ...form, project: e.target.value })}
            >
              <option value="">Select Project</option>
              {projects.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>

            <input
              className="input"
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            />

            <button className="btn-primary">Create Task</button>
          </form>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div key={task._id} className="card space-y-3">
              <h2 className="text-xl font-semibold">{task.title}</h2>
              <p>{task.description}</p>
              <span className={badgeClass(task.status)}>{task.status}</span>
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
          ))}
        </div>
      </div>
    </div>
  );
}
