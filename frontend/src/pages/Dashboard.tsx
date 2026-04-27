import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaAppleAlt, FaWallet, FaDrumstickBite, FaDumbbell, FaBookOpen, FaEllipsisH } from 'react-icons/fa';
import axios from 'axios';

const categoryItems = [
    { name: 'Food', icon: FaAppleAlt, stat: '+1.20' },
    { name: 'Expense', icon: FaWallet, stat: '-0.50' },
    { name: 'Diet', icon: FaDrumstickBite, stat: '+0.80' },
    { name: 'Exercise', icon: FaDumbbell, stat: '+1.00' },
    { name: 'Learning', icon: FaBookOpen, stat: '+0.30' },
    { name: 'Others', icon: FaEllipsisH, stat: '+0.10' },
];

const Dashboard = () => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/dashboard');
                setData(res.data);
            } catch (error) {
                console.error(error);
                setData({
                    todayScore: 1.2,
                    yesterdayScore: 0.8,
                    weeklyAvg: 0.95,
                    streak: 5,
                    bestCategory: 'Exercise',
                    worstCategory: 'Expense',
                    sparkline: [0.8, 1.0, 0.9, 1.1, 1.2, 1.15, 1.2],
                });
            }
        };
        fetchData();
    }, []);

    const sparkline = data?.sparkline ?? [0.8, 1.0, 0.9, 1.1, 1.2, 1.15, 1.2];

    const scoreDelta = useMemo(() => {
        if (!data) return 0;
        return data.todayScore - data.yesterdayScore;
    }, [data]);

    if (!data) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;

    return (
        <div className="page-shell">
            <div className="mb-8">
                <p className="text-sm uppercase tracking-[0.28em] text-[#9ca3af]">Good evening, Darshan 👋</p>
                <h1 className="page-title mt-3">LifeTracker</h1>
                <p className="section-subtitle">Stay consistent, see progress, and keep your discipline on track.</p>
            </div>

            <div className="grid gap-4">
                <div className="glass-card score-card compact-card p-5">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-xs uppercase tracking-[0.32em] text-[#9ca3af]">Today's score</p>
                            <p className="score-value mt-3">{data.todayScore.toFixed(2)}</p>
                            <div className="score-badge mt-3">
                                <span className={scoreDelta >= 0 ? 'score-chip positive' : 'score-chip negative'}>
                                    {scoreDelta >= 0 ? '↑' : '↓'} {scoreDelta >= 0 ? '+' : ''}{scoreDelta.toFixed(2)}
                                </span>
                                <span className="text-sm text-slate-400 ml-2">{data.weeklyAvg ? `${data.weeklyAvg.toFixed(2)} avg` : 'Weekly average'}</span>
                            </div>
                        </div>
                        <div className="sparkline-card">
                            <div className="sparkline-label">Trend</div>
                            <div className="sparkline-track">
                                {sparkline.map((value: number, index: number) => {
                                    const min = Math.min(...sparkline);
                                    const max = Math.max(...sparkline);
                                    const height = ((value - min) / (max - min || 1)) * 100;
                                    return <span key={index} style={{ height: `${Math.max(height, 16)}%` }} />;
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="glass-card compact-card p-5">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-xs uppercase tracking-[0.32em] text-[#9ca3af]">Quick actions</p>
                            <h2 className="text-xl font-semibold text-white mt-2">Jump into your routine</h2>
                        </div>
                        <Link to="/habits" className="small-pill">Habits</Link>
                    </div>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        <Link to="/track" className="category-card compact">
                            <p className="category-label">Track</p>
                            <p className="category-title">Log your day</p>
                        </Link>
                        <Link to="/analytics" className="category-card compact">
                            <p className="category-label">Analytics</p>
                            <p className="category-title">Review trends</p>
                        </Link>
                        <Link to="/calendar" className="category-card compact">
                            <p className="category-label">Calendar</p>
                            <p className="category-title">View your month</p>
                        </Link>
                        <Link to="/notes" className="category-card compact">
                            <p className="category-label">Notes</p>
                            <p className="category-title">Capture ideas</p>
                        </Link>
                    </div>
                </div>
            </div>

            <section className="mt-7">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <p className="text-xs uppercase tracking-[0.32em] text-[#9ca3af]">Categories</p>
                        <h2 className="text-2xl font-semibold text-white mt-2">Top discipline categories</h2>
                    </div>
                    <Link to="/notes" className="secondary-link">View more →</Link>
                </div>

                <div className="category-grid mt-4">
                    {categoryItems.map((category) => {
                        const Icon = category.icon;
                        return (
                            <button key={category.name} type="button" className="category-card square-card group">
                                <div className="category-icon">
                                    <Icon />
                                </div>
                                <div>
                                    <p className="font-semibold text-white">{category.name}</p>
                                    <p className="mt-2 text-sm text-[#9ca3af]">{category.stat} today</p>
                                </div>
                                <div className="category-mini-line">
                                    <span />
                                </div>
                            </button>
                        );
                    })}
                    <Link to="/notes" className="category-card square-card category-card-more">
                        <div className="view-more-inner">View More →</div>
                    </Link>
                </div>
            </section>

            <div className="dashboard-grid mt-6">
                <article className="stat-card compact-card">
                    <h2>Best category</h2>
                    <p className="stat-value">{data.bestCategory}</p>
                </article>
                <article className="stat-card compact-card">
                    <h2>Lowest category</h2>
                    <p className="stat-value">{data.worstCategory}</p>
                </article>
            </div>
        </div>
    );
};

export default Dashboard;
