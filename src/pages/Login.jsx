import { useState, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post('/auth/login', form);
    login(res.data);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200">
      <form onSubmit={handleSubmit} className="card w-full max-w-md space-y-4">
        <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
        <input className="input" placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})} />
        <input className="input" type="password" placeholder="Password" onChange={(e)=>setForm({...form,password:e.target.value})} />
        <button className="btn-primary w-full">Login</button>
      </form>
    </div>
  );
}