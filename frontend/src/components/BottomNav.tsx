import { NavLink } from 'react-router-dom';
import { FaHome, FaChartLine, FaCalendar, FaHeart, FaPlus } from 'react-icons/fa';

const navItems = [
    { to: '/', label: 'Dashboard', icon: FaHome },
    { to: '/track', label: 'Track', icon: FaPlus },
    { to: '/analytics', label: 'Analytics', icon: FaChartLine },
    { to: '/calendar', label: 'Calendar', icon: FaCalendar },
    { to: '/habits', label: 'Habits', icon: FaHeart },
];

const BottomNav = () => {
    return (
        <nav className="bottom-nav md:hidden">
            <div className="bottom-nav-inner page-shell flex items-center justify-between gap-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.to === '/'}
                            className={({ isActive }) =>
                                `bottom-nav-link ${isActive ? 'bottom-nav-link-active' : ''}`
                            }
                        >
                            <Icon className="nav-icon" />
                            <span>{item.label}</span>
                        </NavLink>
                    );
                })}
            </div>
            <NavLink to="/notes" className="floating-add-action" aria-label="Add note">
                <FaPlus />
            </NavLink>
        </nav>
    );
};

export default BottomNav;