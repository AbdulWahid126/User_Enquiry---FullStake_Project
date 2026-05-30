import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from './utils/api';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TodoPage from './pages/TodoPage';
import LandingPage from './pages/LandingPage';

// Protected Route Component
function ProtectedRoute({ children, user, loading }) {
    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="h-6 w-6 border-2 border-slate-800 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

// Public Route (redirects if already logged in)
function PublicRoute({ children, user, loading }) {
    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="h-6 w-6 border-2 border-slate-800 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }
    if (user) {
        return <Navigate to="/todos" replace />;
    }
    return children;
}

export default function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuthStatus = async () => {
        const token = localStorage.getItem('veloce_token');
        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        try {
            const res = await api.get('/auth/me');
            if (res.data.status) {
                setUser(res.data.user);
            } else {
                localStorage.removeItem('veloce_token');
                setUser(null);
            }
        } catch (err) {
            localStorage.removeItem('veloce_token');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('veloce_token');
        setUser(null);
        toast.info('Signed out successfully');
    };

    return (
        <BrowserRouter>
            <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
                <ToastContainer 
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar
                    theme="light"
                    toastClassName="bg-white border border-slate-200 text-slate-800 rounded-lg shadow-sm font-sans"
                />
                <Routes>
                    {/* Public Cover/Landing Page */}
                    <Route 
                        path="/" 
                        element={<LandingPage user={user} onLogout={handleLogout} />} 
                    />

                    {/* Secure primary Todo panel */}
                    <Route 
                        path="/todos" 
                        element={
                            <ProtectedRoute user={user} loading={loading}>
                                <TodoPage user={user} onLogout={handleLogout} />
                            </ProtectedRoute>
                        } 
                    />
                    
                    {/* Auth portals */}
                    <Route 
                        path="/login" 
                        element={
                            <PublicRoute user={user} loading={loading}>
                                <LoginPage onLoginSuccess={setUser} />
                            </PublicRoute>
                        } 
                    />
                    <Route 
                        path="/register" 
                        element={
                            <PublicRoute user={user} loading={loading}>
                                <RegisterPage />
                            </PublicRoute>
                        } 
                    />

                    {/* Fallback route */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
