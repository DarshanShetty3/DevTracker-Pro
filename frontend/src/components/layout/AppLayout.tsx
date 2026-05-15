import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Activity, LayoutDashboard, KanbanSquare, Database, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AppLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { name: 'Overview', path: '/app', icon: <LayoutDashboard className="w-5 h-5" /> },
        { name: 'Project Tracker', path: '/app/tracker', icon: <KanbanSquare className="w-5 h-5" /> },
        { name: 'The Vault', path: '/app/vault', icon: <Database className="w-5 h-5" /> },
    ];

    return (
        <div className="min-h-screen bg-surface flex text-on-surface">

            {/* PERSISTENT SIDEBAR */}
            <aside className="w-64 border-r border-outline-variant bg-surface-container-low/50 flex flex-col">
                {/* Brand */}
                <div className="h-16 flex items-center gap-3 px-6 border-b border-outline-variant">
                    <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
                        <Activity className="w-5 h-5 text-on-primary" />
                    </div>
                    <span className="font-bold tracking-tight text-lg">DevTracker</span>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-6 px-3 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            end={item.path === '/app'} // Exact match for the overview
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                                }`
                            }
                        >
                            {item.icon}
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                {/* User Footer */}
                <div className="p-4 border-t border-outline-variant">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <div className="w-8 h-8 rounded-full bg-surface-container-highest border border-outline flex items-center justify-center font-bold text-xs">
                            {user?.name?.charAt(0).toUpperCase() || 'D'}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-semibold truncate">{user?.name || 'Developer'}</p>
                            <p className="text-xs text-on-surface-variant truncate">{user?.email}</p>
                        </div>
                    </div>

                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors">
                        <Settings className="w-4 h-4" />
                        Settings
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-400/10 transition-colors mt-1"
                    >
                        <LogOut className="w-4 h-4" />
                        Log Out
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 overflow-auto h-screen bg-surface">
                {/* The <Outlet /> is where the current page gets injected */}
                <Outlet />
            </main>
        </div>
    );
}