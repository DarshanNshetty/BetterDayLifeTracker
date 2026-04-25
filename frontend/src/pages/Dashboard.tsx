import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('http://localhost:5000/api/dashboard');
            setData(res.data);
        };
        fetchData();
    }, []);

    if (!data) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;

    return (
        <div className="page-shell">
            <div className="mb-10">
                <span className="badge">Overview</span>
                <h1 className="page-title mt-4">Your life tracker</h1>
                <p className="section-subtitle">A high-level view of today's score, streak, and category performance in one polished dashboard.</p>
            </div>

            <div className="glass-card mb-8 p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Quick links</p>
                        <h2 className="text-xl font-semibold text-white">Jump to your next action</h2>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Link to="/track" className="tab-button">Track</Link>
                        <Link to="/analytics" className="tab-button">Analytics</Link>
                        <Link to="/calendar" className="tab-button">Calendar</Link>
                    </div>
                </div>
            </div>

            <div className="dashboard-grid">
                <article className="stat-card">
                    <h2>Today's Score</h2>
                    <p className="stat-value">{data.todayScore.toFixed(2)}</p>
                </article>
                <article className="stat-card">
                    <h2>Yesterday</h2>
                    <p className="stat-value">{data.yesterdayScore.toFixed(2)}</p>
                    <p className="text-slate-400">Diff: {(data.todayScore - data.yesterdayScore).toFixed(2)}</p>
                </article>
                <article className="stat-card">
                    <h2>Streak</h2>
                    <p className="stat-value">{data.streak} days</p>
                </article>
                <article className="stat-card">
                    <h2>Best Category</h2>
                    <p className="stat-value">{data.bestCategory}</p>
                </article>
                <article className="stat-card">
                    <h2>Worst Category</h2>
                    <p className="stat-value">{data.worstCategory}</p>
                </article>
            </div>
        </div>
    );
};

export default Dashboard;