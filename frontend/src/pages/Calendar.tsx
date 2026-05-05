import { type FormEvent, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const scoreOptions = [
    { value: -2, label: 'Very Bad' },
    { value: -1, label: 'Bad' },
    { value: 0, label: 'Neutral' },
    { value: 1, label: 'Good' },
    { value: 2, label: 'Excellent' },
];

const Calendar = () => {
    const now = new Date();
    const [entries, setEntries] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [month, setMonth] = useState(now.getMonth() + 1);
    const [year, setYear] = useState(now.getFullYear());
    const [selectedDay, setSelectedDay] = useState<number | null>(now.getDate());
    const [selectedEntry, setSelectedEntry] = useState<any>(null);

    const changeMonth = (offset: number) => {
        const next = new Date(year, month - 1 + offset, 1);
        setMonth(next.getMonth() + 1);
        setYear(next.getFullYear());
    };
    const [selectedCategory, setSelectedCategory] = useState('');
    const [morning, setMorning] = useState(0);
    const [afternoon, setAfternoon] = useState(0);
    const [evening, setEvening] = useState(0);
    const [saving, setSaving] = useState(false);

    const fetchEntries = async () => {
        const res = await axios.get('http://localhost:5000/api/entries');
        setEntries(res.data);
    };

    const fetchCategories = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/categories');
            setCategories(res.data);
            if (!selectedCategory && res.data.length) {
                setSelectedCategory(res.data[0]._id);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchEntries();
        fetchCategories();
    }, []);

    useEffect(() => {
        if (selectedDay === null) return;
        const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
        const existing = entries.find((entry) => entry.date.startsWith(dateKey));
        setSelectedEntry(existing || null);
        setSelectedCategory(existing?.category?._id || '');
        setMorning(existing?.morningScore ?? 0);
        setAfternoon(existing?.afternoonScore ?? 0);
        setEvening(existing?.eveningScore ?? 0);
    }, [selectedDay, month, year, entries]);

    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayIndex = new Date(year, month - 1, 1).getDay();

    useEffect(() => {
        if (selectedDay && selectedDay > daysInMonth) {
            setSelectedDay(daysInMonth);
        }
    }, [daysInMonth, selectedDay]);

    const calendarDays = useMemo(() => {
        return Array.from({ length: firstDayIndex + daysInMonth }, (_, index) => {
            if (index < firstDayIndex) return null;
            return index - firstDayIndex + 1;
        });
    }, [daysInMonth, firstDayIndex]);

    const scoreByDay = useMemo(() => {
        return entries.reduce((map: Record<number, number[]>, entry) => {
            const entryDate = new Date(entry.date);
            const entryDay = entryDate.getDate();
            map[entryDay] = map[entryDay] || [];
            map[entryDay].push(entry.totalScore);
            return map;
        }, {} as Record<number, number[]>);
    }, [entries]);

    const getColorClass = (score: number | null) => {
        if (score === null) return 'calendar-day neutral';
        if (score < 0) return 'calendar-day negative';
        if (score > 0) return 'calendar-day positive';
        return 'calendar-day neutral';
    };

    const handleSave = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedDay || !selectedCategory) return;
        setSaving(true);
        try {
            const date = `${year}-${String(month).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
            await axios.post('http://localhost:5000/api/entries', {
                category: selectedCategory,
                date,
                morningScore: morning,
                afternoonScore: afternoon,
                eveningScore: evening,
            });
            await fetchEntries();
            alert('Entry saved successfully.');
        } catch (error) {
            console.error(error);
            alert('Unable to save entry.');
        } finally {
            setSaving(false);
        }
    };

    const currentMonthName = new Date(year, month - 1, 1).toLocaleString('default', { month: 'long' });
    const selectedDateLabel = selectedDay ? `${currentMonthName} ${selectedDay}, ${year}` : 'Select a day';

    return (
        <div className="page-shell animate-slide-up">
            <div className="mb-10">
                <span className="badge">Monthly view</span>
                <h1 className="page-title mt-4">Calendar</h1>
                <p className="section-subtitle">Tap a day to pick a date, review your score, and log a track entry right from the calendar.</p>
            </div>

            <div className="grid gap-8 xl:grid-cols-[1.6fr_1fr]">
                <div className="glass-card p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">{currentMonthName} {year}</p>
                            <h2 className="text-3xl font-semibold text-white">Day tracker</h2>
                        </div>
                        <div className="flex gap-2">
                            <button type="button" className="tab-button" onClick={() => changeMonth(-1)}>←</button>
                            <button type="button" className="tab-button" onClick={() => changeMonth(1)}>→</button>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-7 gap-2 text-center text-sm font-semibold text-slate-400">
                        {weekdayLabels.map((label) => (
                            <div key={label}>{label}</div>
                        ))}
                    </div>

                    <div className="calendar-grid mt-4">
                        {calendarDays.map((day, index) => {
                            if (day === null) {
                                return <div key={`blank-${index}`} className="calendar-day neutral opacity-0" />;
                            }
                            const scores = scoreByDay[day];
                            const score = scores ? scores.reduce((sum, value) => sum + value, 0) / scores.length : null;
                            const selected = day === selectedDay;
                            return (
                                <button
                                    type="button"
                                    key={day}
                                    onClick={() => setSelectedDay(day)}
                                    className={`${getColorClass(score)} ${selected ? 'selected' : ''}`}
                                >
                                    <span>{day}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="selected-panel">
                    <div className="mb-6">
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Selected date</p>
                        <h2 className="mt-3 text-3xl font-semibold">{selectedDateLabel}</h2>
                        <p className="mt-2 text-slate-400">{selectedEntry ? 'Existing entry found. Update by saving a new log for the day.' : 'No entry yet. Use the form below to log a tracked day.'}</p>
                    </div>

                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <p className="text-sm text-slate-400">Day score</p>
                            <div className="inline-flex items-center gap-3 rounded-full bg-slate-950/70 px-4 py-3 text-sm text-white shadow-xl shadow-black/20">
                                <span className="text-lg font-semibold">{selectedEntry ? selectedEntry.totalScore.toFixed(1) : scoreByDay[selectedDay ?? 0]?.length ? (scoreByDay[selectedDay ?? 0].reduce((sum, value) => sum + value, 0) / scoreByDay[selectedDay ?? 0].length).toFixed(1) : '0.0'}</span>
                                <span className="text-slate-400">score</span>
                            </div>
                        </div>

                        <form onSubmit={handleSave} className="space-y-4">
                            <label className="block">
                                <span className="field-label">Category</span>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="select-field"
                                    required
                                >
                                    <option value="">Choose category</option>
                                    {categories.map((category) => (
                                        <option key={category._id} value={category._id}>{category.name}</option>
                                    ))}
                                </select>
                            </label>

                            <div className="grid gap-4 sm:grid-cols-3">
                                <label className="block">
                                    <span className="field-label">Morning</span>
                                    <select value={morning} onChange={(e) => setMorning(parseInt(e.target.value))} className="select-field">
                                        {scoreOptions.map((option) => (
                                            <option key={option.value} value={option.value}>{option.label}</option>
                                        ))}
                                    </select>
                                </label>
                                <label className="block">
                                    <span className="field-label">Afternoon</span>
                                    <select value={afternoon} onChange={(e) => setAfternoon(parseInt(e.target.value))} className="select-field">
                                        {scoreOptions.map((option) => (
                                            <option key={option.value} value={option.value}>{option.label}</option>
                                        ))}
                                    </select>
                                </label>
                                <label className="block">
                                    <span className="field-label">Evening</span>
                                    <select value={evening} onChange={(e) => setEvening(parseInt(e.target.value))} className="select-field">
                                        {scoreOptions.map((option) => (
                                            <option key={option.value} value={option.value}>{option.label}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>

                            <button type="submit" className="primary-btn" disabled={saving || !selectedDay || !selectedCategory}>
                                {saving ? 'Saving...' : 'Save track entry'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendar;