import { useEffect, useMemo, useState } from 'react';

interface HabitEntry {
    id: string;
    name: string;
    completed: boolean;
}

const habitNames = ['Reading', 'Exercise', 'Diet', 'Sleep'];
const LOCAL_KEY = 'lifetracker-habits';

const Habits = () => {
    const todayKey = new Date().toISOString().split('T')[0];
    const [entries, setEntries] = useState<Record<string, HabitEntry[]>>({});
    const [todayHabits, setTodayHabits] = useState<HabitEntry[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem(LOCAL_KEY);
        const parsed = saved ? JSON.parse(saved) : {};
        const today = parsed[todayKey] || habitNames.map((name, index) => ({ id: `${index}-${name}`, name, completed: false }));
        setEntries(parsed);
        setTodayHabits(today);
    }, [todayKey]);

    const saveToday = (updatedHabits: HabitEntry[]) => {
        const nextEntries = { ...entries, [todayKey]: updatedHabits };
        setEntries(nextEntries);
        setTodayHabits(updatedHabits);
        localStorage.setItem(LOCAL_KEY, JSON.stringify(nextEntries));
    };

    const toggleHabit = (id: string) => {
        const updated = todayHabits.map((habit) => habit.id === id ? { ...habit, completed: !habit.completed } : habit);
        saveToday(updated);
    };

    const completedCount = todayHabits.filter((habit) => habit.completed).length;
    const completionRate = todayHabits.length ? Math.round((completedCount / todayHabits.length) * 100) : 0;

    const streak = useMemo(() => {
        const dates = Object.keys(entries).sort((a, b) => b.localeCompare(a));
        let currentStreak = 0;
        let cursor = new Date(todayKey);

        for (const date of dates) {
            const key = date;
            const dayEntry = entries[key];
            if (!dayEntry) break;
            const finished = dayEntry.every((habit) => habit.completed);
            const expectedKey = cursor.toISOString().split('T')[0];
            if (key !== expectedKey) break;
            if (!finished) break;
            currentStreak += 1;
            cursor.setDate(cursor.getDate() - 1);
        }

        return currentStreak;
    }, [entries, todayKey]);

    const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const todayIndex = new Date().getDay();

    return (
        <div className="page-shell animate-fade-in">
            <div className="mb-10">
                <span className="badge">Habits</span>
                <h1 className="page-title mt-4">Today's habits</h1>
                <p className="section-subtitle">Keep your daily discipline visible, and mark completed routines with a premium stock-app layout.</p>
            </div>

            <div className="glass-card p-6 mb-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-[#9ca3af]">Weekly rhythm</p>
                        <h2 className="text-2xl font-semibold text-white">Stay consistent</h2>
                    </div>
                    <div className="chip-group">
                        {weekDays.map((day, index) => (
                            <span key={day} className={`chip ${index === todayIndex ? 'active' : ''}`}>
                                {day}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    <div className="metric-card">
                        <p className="text-sm uppercase tracking-[0.24em] text-[#9ca3af]">Today's completion</p>
                        <strong>{completionRate}%</strong>
                    </div>
                    <div className="metric-card">
                        <p className="text-sm uppercase tracking-[0.24em] text-[#9ca3af]">Streak</p>
                        <strong>{streak}</strong>
                    </div>
                </div>
            </div>

            <div className="habit-list">
                {todayHabits.map((habit) => (
                    <button
                        key={habit.id}
                        type="button"
                        onClick={() => toggleHabit(habit.id)}
                        className="habit-card"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`habit-checkbox ${habit.completed ? 'completed' : ''}`}>
                                {habit.completed ? '✓' : ''}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white">{habit.name}</p>
                                <p className="text-xs text-[#9ca3af]">{habit.completed ? 'Completed' : 'Pending'}</p>
                            </div>
                        </div>
                        <span className={`score-pill ${habit.completed ? 'green' : 'yellow'}`}>
                            {habit.completed ? 'Done' : 'Pending'}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Habits;
