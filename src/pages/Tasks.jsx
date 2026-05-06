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
      console.error(error);
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
    await API.put(`/tasks/${id}`, { status });
    fetchData();
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 space-y-8">
        <h1 className="text-4xl font-bold">Task Assignment & Tracking</h1>

        <form onSubmit={createTask} className="card space-y-4 max-w-3xl">
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
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <select
            className="input"
            value={form.project}
            onChange={(e) => setForm({ ...form, project: e.target.value })}
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
          />

          <button type="submit" className="btn-primary">
            Add Task
          </button>
        </form>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div key={task._id} className="card space-y-3">
              <h2 className="text-xl font-bold">{task.title}</h2>
              <p>{task.description}</p>
              <p>Project: {task.project?.name}</p>
              <p>Assigned To: {task.assignedTo?.name}</p>
              <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>

              <select
                className="input"
                value={task.status}
                onChange={(e) => updateStatus(task._id, e.target.value)}
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
  );
}