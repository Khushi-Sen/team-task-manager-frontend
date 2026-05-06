export default function ProjectCard({ project }) {
  return (
    <div className="card hover:shadow-xl transition duration-300">
      <h2 className="text-2xl font-bold text-slate-800">{project.name}</h2>
      <p className="text-slate-600 mt-3">{project.description}</p>
    </div>
  );
}