import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            login(res.data.token);
            navigate('/');
        } catch (err) {
            alert('Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-10">
            <div className="form-card w-full max-w-md">
                <div className="mb-8">
                    <span className="badge">Welcome back</span>
                    <h1 className="page-title mt-4">Login to your dashboard</h1>
                    <p className="section-subtitle">Access your tracking data, analytics, and daily score in one polished place.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <label className="block">
                        <span className="field-label">Email</span>
                        <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" required />
                    </label>
                    <label className="block">
                        <span className="field-label">Password</span>
                        <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" required />
                    </label>
                    <button type="submit" className="primary-btn">Login</button>
                </form>
                <p className="mt-6 text-center text-sm text-slate-400">Don't have an account? <a href="/signup" className="secondary-link">Signup</a></p>
            </div>
        </div>
    );
};

export default Login;