import { Link } from 'react-router-dom';
import { FaHome, FaPlus, FaChartLine, FaCalendar } from 'react-icons/fa';

const BottomNav = () => {
    return (
        <nav className="fixed bottom-4 left-1/2 z-50 w-[92%] max-w-xl -translate-x-1/2 transform rounded-3xl border border-white/10 bg-slate-900/90 px-5 py-3 shadow-2xl backdrop-blur-xl flex justify-around md:hidden">
            <Link to="/" className="text-slate-100 hover:text-white transition"><FaHome /></Link>
            <Link to="/track" className="text-slate-100 hover:text-white transition"><FaPlus /></Link>
            <Link to="/analytics" className="text-slate-100 hover:text-white transition"><FaChartLine /></Link>
            <Link to="/calendar" className="text-slate-100 hover:text-white transition"><FaCalendar /></Link>
        </nav>
    );
};

export default BottomNav;