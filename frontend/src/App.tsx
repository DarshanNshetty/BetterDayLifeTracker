import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Track from './pages/Track';
import Analytics from './pages/Analytics';
import Calendar from './pages/Calendar';
import Habits from './pages/Habits';
import Notes from './pages/Notes';
import Profile from './pages/Profile.tsx';
import BottomNav from './components/BottomNav';
import { useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  const auth = useAuth();
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem('theme');
    return stored ? stored === 'dark' : true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <ThemeProvider value={{ isDark, setIsDark }}>
      <Router>
        <div className="min-h-screen page-base">
          {auth.isAuthenticated ? (
            <div className="app-shell">
              <header className="top-header">
                <div className="header-inner page-shell flex items-center justify-between gap-4">
                  <div className="brand-group flex items-center gap-3">
                    <div className="brand-mark">L</div>
                    <div>
                      <p className="brand-label">LifeTracker</p>
                      <p className="brand-subtitle">Your discipline dashboard</p>
                    </div>
                  </div>

                  <div className="header-actions flex items-center gap-3">
                    <button type="button" onClick={() => setIsDark(!isDark)} className="theme-circle">
                      {isDark ? '☀️' : '🌙'}
                    </button>
                    <Link to="/profile" className="avatar-circle" title="Profile">
                      <span>DL</span>
                    </Link>
                  </div>
                </div>
              </header>

              <main className="main-area page-shell">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/track" element={<Track />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/habits" element={<Habits />} />
                  <Route path="/notes" element={<Notes />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </main>
            </div>
          ) : (
            <main className="min-h-screen">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/*" element={<Login />} />
              </Routes>
            </main>
          )}

          {auth.isAuthenticated && <BottomNav />}
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
