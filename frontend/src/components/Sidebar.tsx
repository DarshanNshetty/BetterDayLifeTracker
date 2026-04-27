import { NavLink } from 'react-router-dom';
import { FaHome, FaPlus, FaChartLine, FaCalendar, FaHeart, FaStickyNote } from 'react-icons/fa';

const navItems = [
    { to: '/', label: 'Dashboard', icon: FaHome },
    { to: '/track', label: 'Track', icon: FaPlus },
    { to: '/analytics', label: 'Analytics', icon: FaChartLine },
    { to: '/calendar', label: 'Calendar', icon: FaCalendar },
    { to: '/habits', label: 'Habits', icon: FaHeart },
    { to: '/notes', label: 'Notes', icon: FaStickyNote },
];

const Sidebar = () => {
    return (
        <aside className="sidebar hidden h-screen flex-col border-r border-solid border-[#2a2a2a] bg-[#0f0f0f] p-6 text-white md:flex">
            <div className="mb-10 flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-[#22c55e] flex items-center justify-center text-xl">L</div>
                <div>
                    <p className="text-sm text-[#9ca3af] uppercase tracking-[0.24em]">LifeTrack</p>
                    <h2 className="mt-1 text-xl font-bold">Discipline</h2>
                </div>
            </div>

            <nav className="space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.to === '/'}
                            className={({ isActive }) =>
                                `sidebar-link group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${isActive
                                    ? 'bg-[#141414] text-[#22c55e] shadow-[0_18px_55px_rgba(34,197,94,0.12)]'
                                    : 'text-[#cbd5e1] hover:bg-[#1f1f1f] hover:text-white'
                                }`
                            }
                        >
                            <Icon className="text-base" />
                            <span>{item.label}</span>
                        </NavLink>
                    );
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;
