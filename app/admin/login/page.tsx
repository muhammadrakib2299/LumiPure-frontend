'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, AlertCircle, Loader2, TestTube } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Button, Input } from '@/components/ui';

export default function AdminLoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { login, setUser } = useAuthStore();

    const handleDemoLogin = () => {
        // Set demo mode
        localStorage.setItem('admin_demo_mode', 'true');

        // Set demo admin user
        setUser(
            {
                id: 'demo-admin',
                name: 'Demo Admin',
                email: 'demo@lumipure.com',
                role: 'admin',
            },
            'demo-token'
        );

        // Redirect to admin dashboard
        router.push('/admin');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login(formData.email, formData.password);

            // Check if user is admin after login
            const userData = useAuthStore.getState().user;
            if (userData?.role !== 'admin') {
                setError('Access denied. Admin privileges required.');
                useAuthStore.getState().logout();
                setIsLoading(false);
                return;
            }

            // Clear demo mode
            localStorage.removeItem('admin_demo_mode');

            // Redirect to admin dashboard
            router.push('/admin');
        } catch (err: any) {
            setError(err?.response?.data?.message || 'Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-[var(--color-primary)]/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-3xl" />
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--color-primary)] rounded-2xl mb-4">
                        <Lock className="text-white" size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        LumiPure Admin
                    </h1>
                    <p className="text-gray-400">
                        Sign in to access the dashboard
                    </p>
                </div>

                {/* Login Form */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-start gap-3">
                                <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
                                <p className="text-sm text-red-200">{error}</p>
                            </div>
                        )}

                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    size={20}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="
                                        w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20
                                        rounded-lg text-white placeholder:text-gray-400
                                        focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
                                        focus:border-transparent transition-all
                                    "
                                    placeholder="admin@lumipure.com"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-200 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    size={20}
                                />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="
                                        w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20
                                        rounded-lg text-white placeholder:text-gray-400
                                        focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
                                        focus:border-transparent transition-all
                                    "
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            fullWidth
                            size="lg"
                            disabled={isLoading}
                            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)]"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                'Sign In to Dashboard'
                            )}
                        </Button>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/20"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-transparent text-gray-400">OR</span>
                            </div>
                        </div>

                        {/* Demo Mode Button */}
                        <button
                            type="button"
                            onClick={handleDemoLogin}
                            className="
                                w-full flex items-center justify-center gap-2 px-4 py-3
                                bg-blue-500/20 border-2 border-blue-400/50 rounded-lg
                                text-blue-200 hover:bg-blue-500/30 hover:border-blue-400
                                transition-all font-medium
                            "
                        >
                            <TestTube size={20} />
                            Enter Demo Mode (No Database Required)
                        </button>
                    </form>

                    {/* Demo Mode Info */}
                    <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                        <p className="text-xs text-blue-200 mb-2 font-medium">
                            🧪 Demo Mode Features:
                        </p>
                        <ul className="text-xs text-blue-300 space-y-1 ml-4 list-disc">
                            <li>Access all admin pages</li>
                            <li>View UI and features</li>
                            <li>No database required</li>
                            <li>Perfect for testing interface</li>
                        </ul>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                    <a
                        href="/"
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        ← Back to Main Site
                    </a>
                </div>
            </div>
        </div>
    );
}
