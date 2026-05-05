import { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AnimatedPlant from '../components/AnimatedPlant';

interface Category {
    id: string | number;
    name: string;
    emoji: string;
}

const Dashboard = () => {
    const navigate = useNavigate();
    const [growthScore, setGrowthScore] = useState(2); // 0-2 (seed, sprout, plant)
    const [streak] = useState(12);
    const [selectedCategory, setSelectedCategory] = useState('Food');
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);

    const API_BASE_URL = 'http://localhost:5000/api';

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/categories`);
                const mappedCategories = response.data.map((cat: any) => ({
                    id: cat._id,
                    name: cat.name,
                    emoji: cat.emoji,
                }));
                setCategories(mappedCategories);
                if (mappedCategories.length > 0) {
                    setSelectedCategory(mappedCategories[0].name);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
                // Fallback to default categories if API fails
                setCategories([
                    { id: 1, name: 'Food', emoji: '🍽️' },
                    { id: 2, name: 'Expenses', emoji: '💸' },
                    { id: 3, name: 'Meditation', emoji: '🧘' },
                    { id: 4, name: 'Exercise', emoji: '💪' },
                    { id: 5, name: 'Work', emoji: '📘' },
                    { id: 6, name: 'Sleep', emoji: '😴' },
                ]);
            }
        };

        fetchCategories();
    }, []);

    const today = new Date();
    const dateString = today.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const handleAddCategory = async () => {
        if (newCategory.trim()) {
            try {
                const response = await axios.post(`${API_BASE_URL}/categories`, {
                    name: newCategory,
                    emoji: '📌',
                });
                const newCat = {
                    id: response.data._id,
                    name: response.data.name,
                    emoji: response.data.emoji,
                };
                setCategories([...categories, newCat]);
                setSelectedCategory(newCategory);
                setNewCategory('');
                setIsAddingCategory(false);
            } catch (error) {
                console.error('Error adding category:', error);
                // Fallback to local state if API fails
                setCategories([
                    ...categories,
                    {
                        id: categories.length + 1,
                        name: newCategory,
                        emoji: '📌',
                    },
                ]);
                setSelectedCategory(newCategory);
                setNewCategory('');
                setIsAddingCategory(false);
            }
        }
    };

    // Container animations
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    const floatingActionVariants = {
        initial: { scale: 0 },
        animate: { scale: 1 },
        hover: { scale: 1.1 },
        tap: { scale: 0.95 },
    };

    const progressVariants: Variants = {
        initial: { scaleX: 0 },
        animate: { scaleX: 1 },
    };

    return (
        <motion.div
            className="min-h-screen pb-32 pt-4 px-4 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Background glow effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
                {/* Plant Growth Hero Card */}
                <motion.div
                    variants={itemVariants}
                    className="mb-8"
                >
                    <motion.div
                        className="relative rounded-2xl bg-gradient-to-br from-emerald-900/40 via-emerald-800/20 to-teal-900/30 border border-emerald-500/20 p-8 backdrop-blur-xl shadow-2xl"
                        whileHover={{ boxShadow: '0 0 30px rgba(16, 185, 129, 0.3)' }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Glowing border effect */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-teal-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="relative z-10 flex flex-col items-center">
                            {/* Animated Plant */}
                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 3, repeat: Infinity, repeatType: 'loop' as const }}
                            >
                                <AnimatedPlant stage={growthScore} />
                            </motion.div>

                            {/* Growth Info */}
                            <div className="text-center mt-6">
                                <motion.h2
                                    className="text-3xl font-bold text-emerald-400 mb-1"
                                    animate={{ scale: [1, 1.02, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' as const }}
                                >
                                    Day {streak} Growth
                                </motion.h2>
                                <p className="text-emerald-300/80 text-sm">
                                    Level {growthScore + 1} • {growthScore === 0 ? 'Tiny Seed' : growthScore === 1 ? 'Healthy Sprout' : 'Thriving Plant'}
                                </p>
                            </div>

                            {/* Status Message */}
                            <motion.div
                                className="mt-6 px-4 py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-center"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <p className="text-emerald-200 text-sm">
                                    ✅ You watered your plant today 🌱
                                </p>
                            </motion.div>

                            {/* Progress Bar */}
                            <div className="w-full mt-6">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="text-emerald-300/70 text-xs font-semibold">STREAK PROGRESS</p>
                                    <p className="text-emerald-400 text-xs font-bold">{streak}%</p>
                                </div>
                                <div className="w-full h-2 bg-slate-800/60 rounded-full overflow-hidden border border-emerald-500/20">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full shadow-lg shadow-emerald-500/50"
                                        variants={progressVariants}
                                        initial="initial"
                                        animate="animate"
                                        transition={{ duration: 1.2 }}
                                        style={{ width: `${streak}%` }}
                                    />
                                </div>
                            </div>

                            {/* Growth Stage Buttons */}
                            <div className="flex gap-2 mt-6">
                                {[0, 1, 2].map((stage) => (
                                    <motion.button
                                        key={stage}
                                        onClick={() => setGrowthScore(stage)}
                                        className={`w-10 h-10 rounded-full border-2 transition-all ${growthScore === stage
                                            ? 'bg-emerald-500/30 border-emerald-400 shadow-lg shadow-emerald-500/50'
                                            : 'bg-slate-800/40 border-slate-700 hover:border-emerald-500/50'
                                            }`}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <span className="text-lg">
                                            {stage === 0 ? '🌱' : stage === 1 ? '🌿' : '🌳'}
                                        </span>
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Daily Track Section */}
                <motion.div
                    variants={itemVariants}
                    className="mb-8"
                >
                    <motion.div
                        className="rounded-2xl bg-slate-900/40 border border-slate-700/50 p-6 backdrop-blur-lg shadow-xl"
                        whileHover={{ borderColor: 'rgba(74, 222, 128, 0.3)' }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Date */}
                        <div className="mb-6">
                            <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
                                TODAY'S DATE
                            </p>
                            <p className="text-slate-200 text-lg font-light mt-1">{dateString}</p>
                        </div>

                        {/* Day Score */}
                        <div className="mb-6 pb-6 border-b border-slate-700/50">
                            <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-2">
                                Daily Score
                            </p>
                            <motion.div
                                className="text-4xl font-bold text-emerald-400"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity, repeatType: 'loop' as const, delay: 0.5 }}
                            >
                                0.0
                            </motion.div>
                        </div>

                        {/* Category Dropdown */}
                        <div className="mb-4">
                            <label className="text-slate-400 text-xs font-semibold uppercase tracking-widest block mb-3">
                                Select Category
                            </label>

                            {!isAddingCategory ? (
                                <div>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => {
                                            if (e.target.value === 'add-new') {
                                                setIsAddingCategory(true);
                                            } else {
                                                setSelectedCategory(e.target.value);
                                            }
                                        }}
                                        className="w-full px-4 py-3 bg-slate-800/60 border border-slate-700/50 rounded-lg text-slate-200 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all"
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.name}>
                                                {cat.emoji} {cat.name}
                                            </option>
                                        ))}
                                        <option value="add-new">+ Add New Category</option>
                                    </select>
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="flex gap-2"
                                >
                                    <input
                                        type="text"
                                        value={newCategory}
                                        onChange={(e) => setNewCategory(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                handleAddCategory();
                                            }
                                        }}
                                        placeholder="Enter category name..."
                                        className="flex-1 px-4 py-3 bg-slate-800/60 border border-emerald-500/30 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all"
                                        autoFocus
                                    />
                                    <motion.button
                                        onClick={handleAddCategory}
                                        className="px-4 py-3 bg-emerald-500/30 border border-emerald-500/50 rounded-lg text-emerald-400 font-semibold hover:bg-emerald-500/40 transition-colors"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Add
                                    </motion.button>
                                    <motion.button
                                        onClick={() => {
                                            setIsAddingCategory(false);
                                            setNewCategory('');
                                        }}
                                        className="px-4 py-3 bg-slate-800/60 border border-slate-700/50 rounded-lg text-slate-400 hover:text-slate-300 transition-colors"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Cancel
                                    </motion.button>
                                </motion.div>
                            )}
                        </div>

                        {/* Category Tags */}
                        <div className="flex flex-wrap gap-2 mt-4">
                            {categories.map((cat) => (
                                <motion.button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.name)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${selectedCategory === cat.name
                                        ? 'bg-emerald-500/30 border-emerald-500/60 text-emerald-300'
                                        : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:border-slate-600'
                                        }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {cat.emoji} {cat.name}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Empty State Message */}
                <motion.div
                    variants={itemVariants}
                    className="text-center py-8"
                >
                    <p className="text-slate-400 text-sm">
                        Track your habits to grow your plant 🌱
                    </p>
                </motion.div>
            </div>

            {/* Floating Action Button */}
            <motion.button
                variants={floatingActionVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="fixed bottom-28 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-emerald-500/50 border border-emerald-300/30 hover:shadow-emerald-500/70 transition-shadow z-40 group"
                onClick={() => navigate('/track')}
            >
                <FaPlus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            </motion.button>
        </motion.div>
    );
};

export default Dashboard;
