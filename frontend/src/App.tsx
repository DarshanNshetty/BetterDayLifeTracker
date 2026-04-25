import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Track from './pages/Track';
import Analytics from './pages/Analytics';
import Calendar from './pages/Calendar';
import BottomNav from './components/BottomNav';
import { useAuth } from './contexts/AuthContext';

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
    <Router>
      <div className="min-h-screen transition-colors duration-500">
        {auth.isAuthenticated && (
          <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
            <div className="page-shell flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-slate-400">LifeTracker</p>
                <h1 className="text-2xl font-semibold text-white">Smart habits, beautiful growth.</h1>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white shadow-lg shadow-black/20 transition hover:bg-white/15"
                >
                  {isDark ? 'Light mode' : 'Dark mode'}
                  <span className="inline-block transition-transform duration-300" aria-hidden="true">
                    {isDark ? '☀️' : '🌙'}
                  </span>
                </button>
                <span className="badge">{isDark ? 'Dark' : 'Light'}</span>
              </div>
            </div>
          </header>
        )}

        <main className="min-h-[calc(100vh-72px)]">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={auth.isAuthenticated ? <Dashboard /> : <Login />} />
            <Route path="/track" element={auth.isAuthenticated ? <Track /> : <Login />} />
            <Route path="/analytics" element={auth.isAuthenticated ? <Analytics /> : <Login />} />
            <Route path="/calendar" element={auth.isAuthenticated ? <Calendar /> : <Login />} />
          </Routes>
        </main>

        {auth.isAuthenticated && <BottomNav />}
      </div>
    </Router>
  );
}

export default App;
