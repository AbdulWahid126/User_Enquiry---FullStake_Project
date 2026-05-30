import React from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare, Sparkles, Clock, Shield, ArrowRight, Kanban, Zap } from 'lucide-react';

export default function LandingPage({ user, onLogout }) {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col relative overflow-hidden font-sans">
            
            {/* Header Navigation */}
            <header className="relative w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-10 border-b border-slate-200/60 bg-white/80 backdrop-blur-md sticky top-0">
                <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-slate-900 rounded-xl shadow-sm">
                        <CheckSquare className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-black text-slate-900 tracking-tight">
                        Veloce
                    </span>
                </div>
                
                <nav className="flex items-center gap-6">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-slate-500 text-sm hidden md:inline">
                                Signed in as <strong className="text-slate-800">{user.name}</strong>
                            </span>
                            <Link 
                                to="/todos" 
                                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5"
                            >
                                Enter Workspace <ArrowRight size={14} />
                            </Link>
                            <button 
                                onClick={onLogout}
                                className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                            >
                                Sign out
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-5">
                            <Link 
                                to="/login" 
                                className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                            >
                                Sign in
                            </Link>
                            <Link 
                                to="/register" 
                                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white rounded-lg text-sm font-semibold transition-all shadow-sm flex items-center gap-1.5"
                            >
                                Get Started
                            </Link>
                        </div>
                    )}
                </nav>
            </header>

            {/* Hero Section */}
            <main className="relative flex-1 flex flex-col justify-center items-center text-center max-w-5xl mx-auto px-6 py-16 md:py-24 z-10">
                
                {/* Micro-badge */}
                <div className="mb-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/50 border border-slate-300/80 text-slate-700 text-xs font-bold tracking-wide uppercase">
                    <Sparkles size={12} className="text-slate-950" /> Supercharge Your Routine
                </div>

                {/* Headline */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-950 tracking-tight leading-[1.1] mb-6 max-w-4xl">
                    Organize your tasks. <br />
                    <span className="text-slate-800/80 font-extrabold">
                        Supercharge your productivity.
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-slate-500 max-w-2xl mb-10 leading-relaxed">
                    Veloce combines beautiful minimalist aesthetics with rapid task management to help you organize your daily workflow. Keep your personal data private and secure.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 mb-20 w-full sm:w-auto">
                    {user ? (
                        <Link 
                            to="/todos" 
                            className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-2 group cursor-pointer"
                        >
                            Open Dashboard 
                            <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    ) : (
                        <>
                            <Link 
                                to="/register" 
                                className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-2 group cursor-pointer"
                            >
                                Get Started Free 
                                <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                            <Link 
                                to="/login" 
                                className="px-8 py-3.5 bg-white hover:bg-slate-50 text-slate-900 rounded-xl font-bold transition-all border border-slate-200/80 flex items-center justify-center cursor-pointer"
                            >
                                Learn Features
                            </Link>
                        </>
                    )}
                </div>

                {/* Features Grid */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left border-t border-slate-200 pt-16">
                    
                    <div className="bg-white border border-slate-200 p-6 rounded-2xl transition-all hover:border-slate-350 hover:shadow-sm group">
                        <div className="p-3 bg-slate-100 text-slate-900 rounded-xl w-fit mb-4 group-hover:scale-105 transition-transform">
                            <Kanban size={20} />
                        </div>
                        <h3 className="text-md font-bold text-slate-900 mb-2">Beautiful Layout</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Clean Kanban boards and checklists tailored for ultimate visual clarity.
                        </p>
                    </div>

                    <div className="bg-white border border-slate-200 p-6 rounded-2xl transition-all hover:border-slate-350 hover:shadow-sm group">
                        <div className="p-3 bg-slate-100 text-slate-900 rounded-xl w-fit mb-4 group-hover:scale-105 transition-transform">
                            <Zap size={20} />
                        </div>
                        <h3 className="text-md font-bold text-slate-900 mb-2">Instant Action</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Lightning-fast database interactions provide reactive UI state changes.
                        </p>
                    </div>

                    <div className="bg-white border border-slate-200 p-6 rounded-2xl transition-all hover:border-slate-350 hover:shadow-sm group">
                        <div className="p-3 bg-slate-100 text-slate-900 rounded-xl w-fit mb-4 group-hover:scale-105 transition-transform">
                            <Clock size={20} />
                        </div>
                        <h3 className="text-md font-bold text-slate-900 mb-2">History & Tracking</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Keep tabs on created and completed dates seamlessly.
                        </p>
                    </div>

                    <div className="bg-white border border-slate-200 p-6 rounded-2xl transition-all hover:border-slate-350 hover:shadow-sm group">
                        <div className="p-3 bg-slate-100 text-slate-900 rounded-xl w-fit mb-4 group-hover:scale-105 transition-transform">
                            <Shield size={20} />
                        </div>
                        <h3 className="text-md font-bold text-slate-900 mb-2">Encrypted Vault</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Secured via JSON Web Tokens (JWT) and encrypted bcrypt storage.
                        </p>
                    </div>

                </div>

            </main>

            {/* Footer */}
            <footer className="w-full border-t border-slate-200 py-8 bg-white text-center text-slate-400 text-sm z-10">
                <p>© {new Date().getFullYear()} Veloce Workspace Inc. All rights reserved.</p>
            </footer>

        </div>
    );
}
