import { useState } from 'react';
import API from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Member'
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/auth/signup', form);
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200">
      <form onSubmit={handleSubmit} className="card w-full max-w-lg space-y-4">
        <h2 className="text-3xl font-bold text-center">Create Account</h2>

        <input
          className="input"
          placeholder="Full Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="input"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          className="input"
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <select
          className="input"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="Member">Member</option>
          <option value="Admin">Admin</option>
        </select>

        <button className="btn-primary w-full">Sign Up</button>

        <p className="text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 font-semibold">
            Login
          </Link>
        </p>
      </form>
      </div>
  ); 
}