import { LayoutDashboard, FolderKanban, CheckSquare, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white p-6 flex flex-col justify-between">
      <div>
        <h1 className="text-3xl font-bold mb-10">TaskFlow</h1>

        <nav className="space-y-5">
          <Link to="/dashboard" className="flex items-center gap-3 hover:text-indigo-300">
            <LayoutDashboard size={20} /> Dashboard
          </Link>

          <Link to="/projects" className="flex items-center gap-3 hover:text-indigo-300">
            <FolderKanban size={20} /> Projects
          </Link>

          <Link to="/tasks" className="flex items-center gap-3 hover:text-indigo-300">
            <CheckSquare size={20} /> Tasks
          </Link>
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 bg-red-500 hover:bg-red-600 px-4 py-3 rounded-xl"
      >
        <LogOut size={20} /> Logout
      </button>
    </div>
  );
}
