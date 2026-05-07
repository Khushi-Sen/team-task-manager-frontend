import { useEffect, useState } from 'react';
import API from '../services/api';
import Sidebar from '../components/Sidebar';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);

  const [form, setForm] = useState({
    title: '',
    description: '',
    project: '',
    assignedTo: '',
    dueDate: '',
    status: 'Pending',
  });

  const fetchData = async () => {
    try {
      const [taskRes, projectRes, memberRes] = await Promise.all([
        API.get('/tasks'),
        API.get('/projects'),
        API.get('/projects/members'),
      ]);

      setTasks(taskRes.data);
      setProjects(projectRes.data);
      setMembers(memberRes.data);
    } catch (error) {
      console.error('Fetch data failed:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();

    try {
      await API.post('/tasks', form);

      setForm({
        title: '',
        description: '',
        project: '',
        assignedTo: '',
        dueDate: '',
        status: 'Pending',
      });

      await fetchData();
    } catch (error) {
      console.error('Task creation failed:', error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/tasks/${id}`, { status });
      await fetchData();
    } catch (error) {
      console.error('Status update failed:', error);
    }
  };

  const deleteTask = async (taskId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this task?'
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/tasks/${taskId}`);
      await fetchData();
    } catch (error) {
      console.error('Task deletion failed:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 p-8 space-y-10">
        <h1 className="text-4xl font-bold text-slate-800">
          Task Assignment & Tracking
        </h1>

        {/* CREATE TASK */}
        <form
          onSubmit={createTask}
          className="bg-white rounded-2xl shadow-lg p-6 space-y-4 max-w-3xl"
        >
          <h2 className="text-2xl font-bold">Create New Task</h2>

          <input
            className="input"
            placeholder="Task Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />

          <textarea
            className="input"
            placeholder="Task Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            required
          />

          <select
            className="input"
            value={form.project}
            onChange={(e) => setForm({ ...form, project: e.target.value })}
            required
          >
            <option value="">Select Project</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.name}
              </option>
            ))}
          </select>

          <select
            className="input"
            value={form.assignedTo}
            onChange={(e) =>
              setForm({ ...form, assignedTo: e.target.value })
            }
            required
          >
            <option value="">Select Member</option>
            {members.map((member) => (
              <option key={member._id} value={member._id}>
                {member.name}
              </option>
            ))}
          </select>

          <input
            className="input"
            type="date"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            required
          />

          <button type="submit" className="btn-primary w-full">
            Add Task
          </button>
        </form>

        {/* TASK LIST */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-slate-800">
            All Tasks
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white rounded-2xl shadow-lg p-6 space-y-4 border border-slate-200"
              >
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold text-slate-800">
                    {task.title}
                  </h2>

                  <button
                    onClick={() => deleteTask(task._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition"
                  >
                    Delete
                  </button>
                </div>

                <p className="text-slate-600">{task.description}</p>

                <div className="space-y-1 text-sm text-slate-700">
                  <p>
                    <span className="font-semibold">Project:</span>{' '}
                    {task.project?.name || 'N/A'}
                  </p>

                  <p>
                    <span className="font-semibold">Assigned To:</span>{' '}
                    {task.assignedTo?.name || 'N/A'}
                  </p>

                  <p>
                    <span className="font-semibold">Due:</span>{' '}
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : 'N/A'}
                  </p>
                </div>

                <select
                  className="input"
                  value={task.status}
                  onChange={(e) =>
                    updateStatus(task._id, e.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}