import { useEffect, useState } from 'react';
import API from '../services/api';
import Sidebar from '../components/Sidebar';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: '', description: '' });
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchProjects = async () => {
    const res = await API.get('/projects');
    setProjects(res.data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async (e) => {
    e.preventDefault();
    await API.post('/projects', form);
    setForm({ name: '', description: '' });
    fetchProjects();
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 space-y-8">
        <h1 className="text-4xl font-bold">Projects</h1>

        {user.role === 'Admin' && (
          <form onSubmit={createProject} className="card space-y-4 max-w-xl">
            <input
              className="input"
              placeholder="Project Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <textarea
              className="input"
              placeholder="Project Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <button className="btn-primary">Create Project</button>
          </form>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project._id} className="card">
              <h2 className="text-2xl font-semibold">{project.name}</h2>
              <p className="text-slate-600 mt-2">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}