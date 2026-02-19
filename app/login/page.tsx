'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react';
import { loginSchema, LoginFormData } from '@/lib/validations';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui';
import { Input } from '@/components/ui';
import { GoogleIcon } from '@/components/icons';

export default function LoginPage() {
    const router = useRouter();
    const { login, isLoading } = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            setError(null);
            await login(data.email, data.password);
            router.push('/');
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Invalid email or password';
            setError(errorMessage);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            setIsGoogleLoading(true);
            setError(null);
            // Redirect to backend Google OAuth endpoint
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
            window.location.href = `${API_URL}/auth/google`;
        } catch (err) {
            console.error('Google sign-in error:', err);
            setError('Failed to sign in with Google. Please try again.');
            setIsGoogleLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--color-cream)] via-white to-[var(--color-secondary-light)]/30 py-12 px-4">
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-[var(--color-primary-light)]/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[var(--color-accent-light)]/10 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block">
                        <span className="font-display text-3xl font-semibold text-[var(--color-gray-900)]">
                            Lumi<span className="text-[var(--color-primary)]">Pure</span>
                        </span>
                    </Link>
                    <p className="mt-2 text-[var(--color-gray-600)]">Welcome back! Sign in to continue.</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Error Alert */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    {/* Google Sign In */}
                    <button
                        onClick={handleGoogleSignIn}
                        disabled={isGoogleLoading}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-[var(--color-gray-200)] rounded-lg font-medium text-[var(--color-gray-700)] hover:bg-[var(--color-gray-50)] hover:border-[var(--color-gray-300)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isGoogleLoading ? (
                            <Loader2 size={20} className="animate-spin" />
                        ) : (
                            <GoogleIcon />
                        )}
                        Continue with Google
                    </button>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[var(--color-gray-200)]" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-[var(--color-gray-500)]">
                                or sign in with email
                            </span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Email */}
                        <div>
                            <Input
                                {...register('email')}
                                type="email"
                                label="Email Address"
                                placeholder="you@example.com"
                                error={errors.email?.message}
                                leftIcon={<Mail size={18} />}
                                fullWidth
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <Input
                                {...register('password')}
                                type={showPassword ? 'text' : 'password'}
                                label="Password"
                                placeholder="Enter your password"
                                error={errors.password?.message}
                                leftIcon={<Lock size={18} />}
                                rightIcon={
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-[var(--color-gray-400)] hover:text-[var(--color-gray-600)]"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                }
                                fullWidth
                            />
                        </div>

                        {/* Forgot Password */}
                        <div className="flex justify-end">
                            <span
                                className="text-sm text-[var(--color-gray-400)] cursor-not-allowed"
                                title="Coming soon"
                            >
                                Forgot password?
                            </span>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            fullWidth
                            size="lg"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[var(--color-gray-200)]" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-[var(--color-gray-500)]">
                                New to LumiPure?
                            </span>
                        </div>
                    </div>

                    {/* Register Link */}
                    <Link href="/register">
                        <Button variant="outline" fullWidth size="lg">
                            Create an Account
                        </Button>
                    </Link>
                </div>

                {/* Footer */}
                <p className="mt-8 text-center text-sm text-[var(--color-gray-500)]">
                    By signing in, you agree to our{' '}
                    <Link href="/terms" className="text-[var(--color-primary)] hover:underline">
                        Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-[var(--color-primary)] hover:underline">
                        Privacy Policy
                    </Link>
                </p>
            </div>
        </div>
    );
}
