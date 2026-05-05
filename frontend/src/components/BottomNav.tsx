import { NavLink } from 'react-router-dom';
import { FaHome, FaChartLine, FaCalendar, FaHeart, FaPlus } from 'react-icons/fa';
import { motion } from 'framer-motion';

const navItems = [
    { to: '/', label: 'Dashboard', icon: FaHome },
    { to: '/track', label: 'Track', icon: FaPlus },
    { to: '/analytics', label: 'Analytics', icon: FaChartLine },
    { to: '/calendar', label: 'Calendar', icon: FaCalendar },
    { to: '/habits', label: 'Habits', icon: FaHeart },
];

const BottomNav = () => {
    return (
        <motion.nav
            className="fixed bottom-0 left-0 right-0 md:hidden z-50"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/95 to-slate-900/80 backdrop-blur-lg" />

            {/* Glass effect border */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

            <div className="relative px-4 py-4 flex items-center justify-around">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.to === '/'}
                            className="flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-all relative group"
                        >
                            {({ isActive }) => (
                                <motion.div
                                    className="flex flex-col items-center gap-1 relative"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-highlight"
                                            className="absolute inset-0 bg-emerald-500/20 rounded-lg -z-10 border border-emerald-500/40"
                                            transition={{
                                                type: 'spring',
                                                stiffness: 300,
                                                damping: 30,
                                            }}
                                        />
                                    )}

                                    <Icon
                                        className={`w-6 h-6 transition-all ${isActive
                                            ? 'text-emerald-400 drop-shadow-lg drop-shadow-emerald-500/50'
                                            : 'text-slate-400 group-hover:text-slate-300'
                                            }`}
                                    />
                                    <span
                                        className={`text-xs font-medium transition-all ${isActive
                                            ? 'text-emerald-400'
                                            : 'text-slate-400 group-hover:text-slate-300'
                                            }`}
                                    >
                                        {item.label}
                                    </span>

                                    {/* Glow effect for active */}
                                    {isActive && (
                                        <motion.div
                                            className="absolute -bottom-1 w-1 h-1 bg-emerald-400 rounded-full"
                                            animate={{
                                                boxShadow: [
                                                    '0 0 4px rgba(52, 211, 153, 0.6)',
                                                    '0 0 8px rgba(52, 211, 153, 0.8)',
                                                    '0 0 4px rgba(52, 211, 153, 0.6)',
                                                ],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                            }}
                                        />
                                    )}
                                </motion.div>
                            )}
                        </NavLink>
                    );
                })}
            </div>
        </motion.nav>
    );
};

export default BottomNav;