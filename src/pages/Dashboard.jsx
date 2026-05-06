import { useEffect, useState } from 'react';
import API from '../services/api';
import Sidebar from '../components/Sidebar';
import DashboardCards from '../components/DashboardCards';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    API.get('/tasks').then((res) => setTasks(res.data));
  }, []);

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === 'Completed').length,
    pending: tasks.filter((t) => t.status === 'Pending').length,
    overdue: tasks.filter(
      (t) => new Date(t.dueDate) < new Date() && t.status !== 'Completed'
    ).length,
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 space-y-8">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <DashboardCards stats={stats} />
      </div>
    </div>
  );
}