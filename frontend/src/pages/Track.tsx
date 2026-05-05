import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const scoreOptions = [
    { value: -2, label: '-2' },
    { value: -1, label: '-1' },
    { value: 0, label: '0' },
    { value: 1, label: '+1' },
    { value: 2, label: '+2' },
];

const Track = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [morning, setMorning] = useState(0);
    const [afternoon, setAfternoon] = useState(0);
    const [evening, setEvening] = useState(0);
    const [saving, setSaving] = useState(false);

    const [searchParams] = useSearchParams();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/categories');
                setCategories(res.data);
                if (res.data.length) {
                    const requestedCategory = searchParams.get('category') || '';
                    const matched = res.data.find((cat: any) =>
                        cat._id === requestedCategory ||
                        cat.name.toLowerCase() === requestedCategory.toLowerCase()
                    );
                    setSelectedCategory(matched ? matched._id : res.data[0]._id);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchCategories();
    }, [searchParams]);

    const selectedCategoryLabel = categories.find((cat) => cat._id === selectedCategory)?.name || 'Choose a category';
    const averageScore = useMemo(() => ((morning + afternoon + evening) / 3).toFixed(2), [morning, afternoon, evening]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await axios.post('http://localhost:5000/api/entries', {
                category: selectedCategory,
                date,
                morningScore: morning,
                afternoonScore: afternoon,
                eveningScore: evening,
            });
            alert('Entry saved');
        } catch (error) {
            console.error(error);
            alert('Unable to save entry.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="page-shell">
            <div className="mb-10">
                <span className="badge">Track</span>
                <h1 className="page-title mt-4">Daily performance</h1>
                <p className="section-subtitle">Pick a category and log your morning, afternoon, and evening scores with quick, bold controls.</p>
            </div>

            <section className="glass-card p-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-[#9ca3af]">Selected goal</p>
                        <h2 className="text-2xl font-semibold text-white mt-3">{selectedCategoryLabel}</h2>
                    </div>
                    <div className="metric-card">
                        <p>Total score</p>
                        <strong>{averageScore}</strong>
                    </div>
                </div>

                <div className="mt-8 space-y-6">
                    <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-[#9ca3af] mb-3">Categories</p>
                        <div className="chip-group">
                            {categories.map((category) => (
                                <button
                                    key={category._id}
                                    type="button"
                                    onClick={() => setSelectedCategory(category._id)}
                                    className={`chip ${selectedCategory === category._id ? 'active' : ''}`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        {['Morning', 'Afternoon', 'Evening'].map((label, index) => {
                            const scoreValue = index === 0 ? morning : index === 1 ? afternoon : evening;
                            const setScore = index === 0 ? setMorning : index === 1 ? setAfternoon : setEvening;
                            return (
                                <div key={label} className="metric-card">
                                    <p className="text-sm uppercase tracking-[0.24em] text-[#9ca3af]">{label}</p>
                                    <div className="button-group mt-4">
                                        {scoreOptions.map((option) => (
                                            <button
                                                key={`${label}-${option.value}`}
                                                type="button"
                                                onClick={() => setScore(option.value)}
                                                className={`track-option ${scoreValue === option.value ? 'active' : ''} ${option.value < 0 ? 'negative' : ''}`}
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <label className="block">
                            <span className="field-label">Date</span>
                            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input-field" />
                        </label>
                        <button type="submit" className="primary-btn" disabled={saving || !selectedCategory}>
                            {saving ? 'Saving...' : 'Save track entry'}
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default Track;