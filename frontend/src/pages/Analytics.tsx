import { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Analytics = () => {
    const [data, setData] = useState<any[]>([]);
    const [period, setPeriod] = useState('1w');
    const [loading, setLoading] = useState(false);
    const [averageScore, setAverageScore] = useState(0);
    const [trendPercent, setTrendPercent] = useState(0);
    const [bestDay, setBestDay] = useState('—');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`http://localhost:5000/api/dashboard/analytics?period=${period}`);
                const chartData = res.data || [];
                setData(chartData);

                if (chartData.length) {
                    const total = chartData.reduce((sum: number, item: any) => sum + item.score, 0);
                    setAverageScore(total / chartData.length);
                    const first = chartData[0].score;
                    const last = chartData[chartData.length - 1].score;
                    setTrendPercent(first ? (((last - first) / Math.abs(first)) * 100) : 0);
                    const best = chartData.reduce((bestItem: any, item: any) => item.score > bestItem.score ? item : bestItem, chartData[0]);
                    setBestDay(best.date);
                } else {
                    setAverageScore(0);
                    setTrendPercent(0);
                    setBestDay('—');
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [period]);

    const periodOptions = [
        { value: '1d', label: '1 Day' },
        { value: '1w', label: '1 Week' },
        { value: '1m', label: '1 Month' },
        { value: '1y', label: '1 Year' },
    ];

    return (
        <div className="page-shell animate-fade-in">
            <div className="mb-10">
                <span className="badge">Analytics</span>
                <h1 className="page-title mt-4">Performance trends</h1>
                <p className="section-subtitle">Explore how your score changes over time, then turn insights into better daily routines.</p>
            </div>

            <section className="analytics-panel space-y-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-slate-400">Choose a period and review the trend in your habit score.</p>
                        <div className="tab-group mt-4">
                            {periodOptions.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => setPeriod(option.value)}
                                    className={`tab-button ${period === option.value ? 'active' : ''}`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="grid w-full gap-3 sm:grid-cols-3 md:w-auto">
                        <div className="glass-card p-5">
                            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Average score</p>
                            <p className="stat-value mt-3">{averageScore ? averageScore.toFixed(1) : '0.0'}</p>
                        </div>
                        <div className="glass-card p-5">
                            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Best day</p>
                            <p className="stat-value mt-3">{bestDay}</p>
                        </div>
                        <div className="glass-card p-5">
                            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Momentum</p>
                            <p className="stat-value mt-3">{trendPercent >= 0 ? '+' : ''}{trendPercent.toFixed(1)}%</p>
                        </div>
                    </div>
                </div>

                <div className="glass-card p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-slate-400">Your performance pattern</p>
                            <h2 className="text-2xl font-semibold text-white">Score projection</h2>
                        </div>
                        <p className="text-sm text-slate-400">{loading ? 'Refreshing chart...' : `${data.length} data points loaded`}</p>
                    </div>

                    <div className="chart-wrapper mt-8">
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={data} margin={{ top: 20, right: 24, left: 0, bottom: 8 }}>
                                <CartesianGrid strokeDasharray="4 4" stroke="rgba(148,163,184,0.16)" />
                                <XAxis dataKey="date" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 12 }} tickLine={false} axisLine={false} />
                                <YAxis stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 12 }} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.96)', border: '1px solid rgba(148,163,184,0.18)' }} itemStyle={{ color: '#e2e8f0' }} />
                                <Line type="monotone" dataKey="score" stroke="#7c3aed" strokeWidth={4} dot={{ fill: '#fff', stroke: '#7c3aed', strokeWidth: 3 }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {!data.length && !loading && (
                        <div className="mt-6 rounded-3xl border border-dashed border-white/10 bg-slate-950/80 p-6 text-center text-slate-400">
                            No data available for this period yet. Log a few entries to populate your trend and see the chart come alive.
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Analytics;