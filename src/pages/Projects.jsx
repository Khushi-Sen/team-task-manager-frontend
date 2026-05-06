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
      console.error(error);
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

    await API.put(`/projects/${selectedProject}/add-member`, {
      userId: selectedMember,
    });

    fetchData();
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 space-y-8">
        <h1 className="text-4xl font-bold">Project & Team Management</h1>

        <form onSubmit={createProject} className="card space-y-4 max-w-2xl">
          <input
            className="input"
            placeholder="Project Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <textarea
            className="input"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <button type="submit" className="btn-primary">
            Add Project
          </button>
        </form>

        <div className="card space-y-4 max-w-2xl">
          <h2 className="text-2xl font-bold">Assign Team Members</h2>

          <select
            className="input"
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
            onChange={(e) => setSelectedMember(e.target.value)}
          >
            <option value="">Select Member</option>
            {members.map((member) => (
              <option key={member._id} value={member._id}>
                {member.name}
              </option>
            ))}
          </select>

          <button onClick={addMember} className="btn-primary">
            Add Member to Project
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project._id} className="card space-y-3">
              <h2 className="text-2xl font-bold">{project.name}</h2>
              <p>{project.description}</p>

              <div>
                <h3 className="font-semibold">Team Members:</h3>
                <ul className="text-sm text-slate-600">
                  {project.teamMembers.map((member) => (
                    <li key={member._id}>{member.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}