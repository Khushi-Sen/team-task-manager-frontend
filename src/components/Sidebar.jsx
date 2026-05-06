import { LayoutDashboard, FolderKanban, CheckSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white p-6 space-y-8">
      <h1 className="text-2xl font-bold">TaskFlow</h1>
      <nav className="space-y-4">
        <Link to="/dashboard" className="flex gap-3"><LayoutDashboard /> Dashboard</Link>
        <Link to="/projects" className="flex gap-3"><FolderKanban /> Projects</Link>
        <Link to="/tasks" className="flex gap-3"><CheckSquare /> Tasks</Link>
      </nav>
    </div>
  );
}