import { FaMoon, FaSyncAlt, FaUserEdit, FaSignOutAlt } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

const Profile = () => {
    const { isDark, setIsDark } = useTheme();

    const handleToggleTheme = () => {
        setIsDark((prev) => !prev);
    };

    return (
        <div className="page-shell animate-fade-in">
            <div className="mb-10">
                <span className="badge">Profile</span>
                <h1 className="page-title mt-4">Darshan</h1>
                <p className="section-subtitle">Stay disciplined, stay free.</p>
            </div>

            <div className="grid gap-4">
                <div className="glass-card p-6 profile-header-card">
                    <div className="profile-avatar">DL</div>
                    <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-[#9ca3af]">Account</p>
                        <h2 className="text-3xl font-semibold text-white mt-2">Darshan</h2>
                        <p className="mt-2 text-slate-400">Everything you need to stay focused and in control.</p>
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                    <div className="stat-card">
                        <p>Total score</p>
                        <p className="stat-value">124.5</p>
                    </div>
                    <div className="stat-card">
                        <p>Best streak</p>
                        <p className="stat-value">14d</p>
                    </div>
                    <div className="stat-card">
                        <p>Average</p>
                        <p className="stat-value">+0.96</p>
                    </div>
                </div>

                <div className="glass-card p-6 profile-actions-card">
                    <button type="button" className="action-row">
                        <FaUserEdit className="action-icon" />
                        <div>
                            <p>Edit Profile</p>
                            <span>Update your name and goals</span>
                        </div>
                    </button>
                    <button type="button" className="action-row" onClick={handleToggleTheme}>
                        <FaMoon className="action-icon" />
                        <div>
                            <p>Theme toggle</p>
                            <span>{isDark ? 'Switch to light mode' : 'Switch to dark mode'}</span>
                        </div>
                    </button>
                    <button type="button" className="action-row">
                        <FaSyncAlt className="action-icon" />
                        <div>
                            <p>Reset Data</p>
                            <span>Clear entries and start fresh</span>
                        </div>
                    </button>
                    <button type="button" className="action-row danger-row">
                        <FaSignOutAlt className="action-icon" />
                        <div>
                            <p>Logout</p>
                            <span>Sign out of your account</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
