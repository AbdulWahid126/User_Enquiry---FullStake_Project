import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            return toast.warn('Please enter your email and password');
        }
        
        setLoading(true);
        try {
            const res = await api.post('/auth/login', { email, password });
            if (res.data.status) {
                toast.success('Logged in successfully');
                localStorage.setItem('veloce_token', res.data.token);
                onLoginSuccess(res.data.user);
                navigate('/todos');
            } else {
                toast.error(res.data.message || 'Incorrect credentials');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md w-full mx-auto my-16 px-4">
            <div className="bg-white border border-slate-200 p-8 rounded-xl shadow-sm">
                
                {/* Header */}
                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Sign in</h2>
                    <p className="text-slate-500 text-sm mt-1">
                        Welcome back! Please enter your details to manage your tasks.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-white border border-slate-300 rounded-lg pl-3 pr-10 py-2 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-all"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer flex items-center justify-center"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer mt-2"
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>

                {/* Register toggle */}
                <div className="mt-8 pt-6 border-t border-slate-100 text-center text-sm text-slate-500">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-indigo-600 font-semibold hover:underline">
                        Create an account
                    </Link>
                </div>

            </div>
        </div>
    );
}
