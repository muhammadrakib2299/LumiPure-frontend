'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Mail, Lock, User, Loader2, Check } from 'lucide-react';
import { registerSchema, RegisterFormData } from '@/lib/validations';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui';
import { Input } from '@/components/ui';
import { GoogleIcon } from '@/components/icons';

export default function RegisterPage() {
    const router = useRouter();
    const { register: registerUser, isLoading } = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const password = watch('password', '');

    // Password strength indicators
    const hasMinLength = password.length >= 6;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    const onSubmit = async (data: RegisterFormData) => {
        try {
            setError(null);
            await registerUser(data.name, data.email, data.password);
            router.push('/');
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Registration failed. Please try again.';
            setError(errorMessage);
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            setIsGoogleLoading(true);
            setError(null);
            // Redirect to backend Google OAuth endpoint
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
            window.location.href = `${API_URL}/auth/google`;
        } catch (err) {
            console.error('Google sign-up error:', err);
            setError('Failed to sign up with Google. Please try again.');
            setIsGoogleLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--color-cream)] via-white to-[var(--color-secondary-light)]/30 py-12 px-4">
            {/* Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-[var(--color-primary-light)]/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[var(--color-accent-light)]/10 rounded-full blur-3xl" />
            </div>

            <div className="relative w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block">
                        <span className="font-display text-3xl font-semibold text-[var(--color-gray-900)]">
                            Lumi<span className="text-[var(--color-primary)]">Pure</span>
                        </span>
                    </Link>
                    <p className="mt-2 text-[var(--color-gray-600)]">Create your account to get started.</p>
                </div>

                {/* Register Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Error Alert */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    {/* Google Sign Up */}
                    <button
                        onClick={handleGoogleSignUp}
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
                                or register with email
                            </span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Name */}
                        <div>
                            <Input
                                {...register('name')}
                                type="text"
                                label="Full Name"
                                placeholder="John Doe"
                                error={errors.name?.message}
                                leftIcon={<User size={18} />}
                                fullWidth
                            />
                        </div>

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
                                placeholder="Create a password"
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

                            {/* Password Strength Indicators */}
                            {password && (
                                <div className="mt-2 space-y-1">
                                    <div className="flex items-center gap-2 text-xs">
                                        <Check
                                            size={14}
                                            className={hasMinLength ? 'text-green-500' : 'text-[var(--color-gray-300)]'}
                                        />
                                        <span className={hasMinLength ? 'text-green-600' : 'text-[var(--color-gray-500)]'}>
                                            At least 6 characters
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                        <Check
                                            size={14}
                                            className={hasUppercase ? 'text-green-500' : 'text-[var(--color-gray-300)]'}
                                        />
                                        <span className={hasUppercase ? 'text-green-600' : 'text-[var(--color-gray-500)]'}>
                                            One uppercase letter
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                        <Check
                                            size={14}
                                            className={hasNumber ? 'text-green-500' : 'text-[var(--color-gray-300)]'}
                                        />
                                        <span className={hasNumber ? 'text-green-600' : 'text-[var(--color-gray-500)]'}>
                                            One number
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <Input
                                {...register('confirmPassword')}
                                type={showConfirmPassword ? 'text' : 'password'}
                                label="Confirm Password"
                                placeholder="Confirm your password"
                                error={errors.confirmPassword?.message}
                                leftIcon={<Lock size={18} />}
                                rightIcon={
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="text-[var(--color-gray-400)] hover:text-[var(--color-gray-600)]"
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                }
                                fullWidth
                            />
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
                                    Creating account...
                                </>
                            ) : (
                                'Create Account'
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
                                Already have an account?
                            </span>
                        </div>
                    </div>

                    {/* Login Link */}
                    <Link href="/login">
                        <Button variant="outline" fullWidth size="lg">
                            Sign In
                        </Button>
                    </Link>
                </div>

                {/* Footer */}
                <p className="mt-8 text-center text-sm text-[var(--color-gray-500)]">
                    By creating an account, you agree to our{' '}
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
