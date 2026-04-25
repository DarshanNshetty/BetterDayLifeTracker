import { useEffect, useState } from 'react';
import axios from 'axios';

const Track = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [morning, setMorning] = useState(0);
    const [afternoon, setAfternoon] = useState(0);
    const [evening, setEvening] = useState(0);

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await axios.get('http://localhost:5000/api/categories');
            setCategories(res.data);
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/entries', {
            category: selectedCategory,
            date,
            morningScore: morning,
            afternoonScore: afternoon,
            eveningScore: evening
        });
        alert('Entry saved');
    };

    return (
        <div className="page-shell">
            <div className="mb-10">
                <span className="badge">Daily log</span>
                <h1 className="page-title mt-4">Track your energy</h1>
                <p className="section-subtitle">Enter how your day felt and keep your performance streak on track.</p>
            </div>
            <section className="track-panel">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <label className="block">
                        <span className="field-label">Category</span>
                        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="select-field" required>
                            <option value="">Select Category</option>
                            {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                        </select>
                    </label>
                    <label className="block">
                        <span className="field-label">Date</span>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input-field" />
                    </label>
                    <label className="block">
                        <span className="field-label">Morning</span>
                        <select value={morning} onChange={(e) => setMorning(parseInt(e.target.value))} className="select-field">
                            <option value={-2}>Very Bad</option>
                            <option value={-1}>Bad</option>
                            <option value={0}>Neutral</option>
                            <option value={1}>Good</option>
                            <option value={2}>Excellent</option>
                        </select>
                    </label>
                    <label className="block">
                        <span className="field-label">Afternoon</span>
                        <select value={afternoon} onChange={(e) => setAfternoon(parseInt(e.target.value))} className="select-field">
                            <option value={-2}>Very Bad</option>
                            <option value={-1}>Bad</option>
                            <option value={0}>Neutral</option>
                            <option value={1}>Good</option>
                            <option value={2}>Excellent</option>
                        </select>
                    </label>
                    <label className="block">
                        <span className="field-label">Evening</span>
                        <select value={evening} onChange={(e) => setEvening(parseInt(e.target.value))} className="select-field">
                            <option value={-2}>Very Bad</option>
                            <option value={-1}>Bad</option>
                            <option value={0}>Neutral</option>
                            <option value={1}>Good</option>
                            <option value={2}>Excellent</option>
                        </select>
                    </label>
                    <button type="submit" className="primary-btn">Save Entry</button>
                </form>
            </section>
        </div>
    );
};

export default Track;