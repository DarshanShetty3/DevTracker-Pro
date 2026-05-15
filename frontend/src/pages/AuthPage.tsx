import { useState } from 'react';
import { Mail, Phone, Lock, User, Eye, EyeOff, Loader2, Kanban, Database } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            if (!isLogin && !formData.email && !formData.phone) {
                throw new Error('Please provide either an email or a phone number.');
            }
            if (formData.password.length < 6) {
                throw new Error('Password must be at least 6 characters.');
            }

            const endpoint = isLogin ? '/login' : '/register';
            const payload = isLogin
                ? { identifier: formData.email, password: formData.password }
                : { name: formData.name, email: formData.email, phone: formData.phone, password: formData.password };

            const response = await fetch(`http://localhost:5000/api/auth${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Authentication failed');
            }

            if (!isLogin) {
                setIsLogin(true);
                setError('');
                alert('Account created! You can now log in.');
            } else {
                login(data.user, data.token);
                navigate('/app')
            }

        } catch (err: any) {
            setError(err.message || 'Network error. Is the server running?');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white">

            {/* LEFT SIDE: Landing Page / Hero Section (Hidden on Mobile) */}
            <div className="hidden lg:flex lg:w-1/2 bg-slate-900 text-white p-12 flex-col justify-between relative overflow-hidden">
                {/* Abstract Background Element */}
                <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-blue-600 opacity-20 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-emerald-500 opacity-20 blur-3xl"></div>

                <div className="relative z-10">
                    <div className="flex items-center space-x-2 mb-16">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="font-bold text-lg">D</span>
                        </div>
                        <span className="text-xl font-semibold tracking-wide">DevTracker Pro</span>
                    </div>

                    <h1 className="text-5xl font-bold leading-tight mb-6">
                        Build. Track. <span className="text-blue-500">Store.</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-md mb-12">
                        Your personal command center. No enterprise bloat, just the tools you need to maintain momentum on your builds.
                    </p>

                    <div className="space-y-8">
                        <div className="flex items-start space-x-4">
                            <div className="mt-1 p-3 bg-slate-800 rounded-xl">
                                <Kanban className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-1">Project Tracking</h3>
                                <p className="text-slate-400 text-sm">Visual kanban boards to manage tasks from 'To-Do' to 'Deployed'. Never lose track of where you left off.</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="mt-1 p-3 bg-slate-800 rounded-xl">
                                <Database className="w-6 h-6 text-emerald-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-1">The Knowledge Vault</h3>
                                <p className="text-slate-400 text-sm">Your second brain. Store code snippets, daily logs, and attach essential project files all in one searchable place.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-slate-500 text-sm font-medium">
                    Built by Darshan • Powered by React & Node.js
                </div>
            </div>

            {/* RIGHT SIDE: Auth Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
                <div className="w-full max-w-md space-y-8">

                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            {isLogin ? 'Welcome back' : 'Create your workspace'}
                        </h2>
                        <p className="text-gray-500">
                            {isLogin ? 'Enter your credentials to access your dashboard.' : 'Start tracking your projects today.'}
                        </p>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* SIGN UP ONLY FIELDS */}
                        {!isLogin && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required={!isLogin}
                                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number <span className="text-gray-400 font-normal">(Optional)</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Phone className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {/* UNIVERSAL FIELDS */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {isLogin ? 'Email or Phone' : 'Email Address '}
                                {!isLogin && <span className="text-gray-400 font-normal">(Optional)</span>}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required={isLogin}
                                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                                    placeholder={isLogin ? "you@example.com" : "you@example.com"}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-70 transition-all"
                        >
                            {isLoading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                isLogin ? 'Sign In to Workspace' : 'Create Account'
                            )}
                        </button>
                    </form>

                    <div className="text-center text-sm text-gray-600">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setError('');
                            }}
                            className="font-medium text-blue-600 hover:text-blue-500 transition-colors focus:outline-none"
                        >
                            {isLogin ? 'Sign up' : 'Log in'}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}