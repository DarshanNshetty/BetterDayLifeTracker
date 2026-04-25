import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
            login(res.data.token);
            navigate('/');
        } catch (err) {
            alert('Signup failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-10">
            <div className="form-card w-full max-w-md">
                <div className="mb-8">
                    <span className="badge">New account</span>
                    <h1 className="page-title mt-4">Create your habit hub</h1>
                    <p className="section-subtitle">Track progress with clean analytics, quick entries, and memorable daily wins.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <label className="block">
                        <span className="field-label">Name</span>
                        <input type="text" placeholder="Darshan" value={name} onChange={(e) => setName(e.target.value)} className="input-field" required />
                    </label>
                    <label className="block">
                        <span className="field-label">Email</span>
                        <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" required />
                    </label>
                    <label className="block">
                        <span className="field-label">Password</span>
                        <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" required />
                    </label>
                    <button type="submit" className="primary-btn">Signup</button>
                </form>
                <p className="mt-6 text-center text-sm text-slate-400">Have an account? <a href="/login" className="secondary-link">Login</a></p>
            </div>
        </div>
    );
};

export default Signup;