import { useEffect, useState } from 'react';
import API from '../services/api';
import Sidebar from '../components/Sidebar';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState('');
  const [selectedProject, setSelectedProject] = useState('');

  const [form, setForm] = useState({
    name: '',
    description: '',
  });

  const fetchData = async () => {
    try {
      const [projectRes, memberRes] = await Promise.all([
        API.get('/projects'),
        API.get('/projects/members'),
      ]);

      setProjects(projectRes.data);
      setMembers(memberRes.data);
    } catch (error) {
      console.error('Fetch data failed:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createProject = async (e) => {
    e.preventDefault();

    try {
      await API.post('/projects', form);

      setForm({
        name: '',
        description: '',
      });

      await fetchData();
    } catch (error) {
      console.error('Project creation failed:', error);
    }
  };

  const addMember = async () => {
    if (!selectedProject || !selectedMember) return;

    try {
      await API.put(`/projects/${selectedProject}/add-member`, {
        userId: selectedMember,
      });

      await fetchData();

      setSelectedProject('');
      setSelectedMember('');
    } catch (error) {
      console.error('Add member failed:', error);
    }
  };

  const deleteProject = async (projectId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this project?'
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/projects/${projectId}`);
      await fetchData();
    } catch (error) {
      console.error('Project deletion failed:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex-1 p-8 space-y-10">
        <h1 className="text-4xl font-bold text-slate-800">
          Project & Team Management
        </h1>

        {/* CREATE PROJECT */}
        <form
          onSubmit={createProject}
          className="card space-y-4 max-w-2xl bg-white shadow-lg rounded-2xl p-6"
        >
          <h2 className="text-2xl font-bold">Create New Project</h2>

          <input
            className="input"
            placeholder="Project Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <textarea
            className="input"
            placeholder="Project Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            required
          />

          <button type="submit" className="btn-primary w-full">
            Add Project
          </button>
        </form>

        {/* ADD MEMBER */}
        <div className="card space-y-4 max-w-2xl bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-2xl font-bold">Assign Team Members</h2>

          <select
            className="input"
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
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
            value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)}
          >
            <option value="">Select Member</option>
            {members.map((member) => (
              <option key={member._id} value={member._id}>
                {member.name}
              </option>
            ))}
          </select>

          <button onClick={addMember} className="btn-primary w-full">
            Add Member to Project
          </button>
        </div>

        {/* PROJECT LIST */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-slate-800">
            All Projects
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-white rounded-2xl shadow-lg p-6 space-y-4 border border-slate-200"
              >
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-slate-800">
                    {project.name}
                  </h2>

                  <button
                    onClick={() => deleteProject(project._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                  >
                    Delete
                  </button>
                </div>

                <p className="text-slate-600">{project.description}</p>

                <div>
                  <h3 className="font-semibold text-slate-700">
                    Team Members:
                  </h3>

                  <ul className="text-sm text-slate-600 mt-2 space-y-1">
                    {project.teamMembers &&
                    project.teamMembers.length > 0 ? (
                      project.teamMembers.map((member) => (
                        <li key={member._id}>• {member.name}</li>
                      ))
                    ) : (
                      <li>No members assigned</li>
                    )}
                  </ul>
                </div>

                <div className="text-xs text-slate-400">
                  Created by: {project.createdBy?.name || 'Unknown'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}