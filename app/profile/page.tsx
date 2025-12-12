'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Camera,
    Loader2,
    Check,
    Package,
    Heart,
    Settings,
    LogOut,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui';
import { Input } from '@/components/ui';
import Link from 'next/link';

const profileSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
    const router = useRouter();
    const { user, isAuthenticated, updateProfile, logout, isLoading } = useAuthStore();
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
    });

    // Redirect if not authenticated
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login?redirect=/profile');
        }
    }, [isAuthenticated, isLoading, router]);

    // Pre-fill form with user data
    useEffect(() => {
        if (user) {
            reset({
                name: user.name || '',
                email: user.email || '',
            });
        }
    }, [user, reset]);

    const onSubmit = async (data: ProfileFormData) => {
        try {
            setIsSaving(true);
            setError(null);
            await updateProfile(data);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (err) {
            console.error('Failed to update profile:', err);
            setError('Failed to update profile. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    if (isLoading || !isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 size={40} className="animate-spin text-[var(--color-primary)]" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--color-gray-50)] py-8 lg:py-12">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-display font-semibold text-[var(--color-gray-900)]">
                            My Account
                        </h1>
                        <p className="text-[var(--color-gray-500)] mt-1">
                            Manage your account settings and preferences
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar */}
                        <aside className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-28">
                                {/* User Avatar */}
                                <div className="text-center mb-6">
                                    <div className="relative w-20 h-20 mx-auto mb-3">
                                        <div className="w-full h-full rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white text-2xl font-semibold">
                                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                                        </div>
                                        <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center text-[var(--color-gray-600)] hover:text-[var(--color-primary)] transition-colors">
                                            <Camera size={14} />
                                        </button>
                                    </div>
                                    <h3 className="font-semibold text-[var(--color-gray-900)]">{user?.name}</h3>
                                    <p className="text-sm text-[var(--color-gray-500)]">{user?.email}</p>
                                </div>

                                {/* Navigation */}
                                <nav className="space-y-1">
                                    <button
                                        onClick={() => setActiveTab('profile')}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'profile'
                                                ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                                                : 'text-[var(--color-gray-600)] hover:bg-[var(--color-gray-50)]'
                                            }`}
                                    >
                                        <User size={18} />
                                        Profile
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('security')}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'security'
                                                ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]'
                                                : 'text-[var(--color-gray-600)] hover:bg-[var(--color-gray-50)]'
                                            }`}
                                    >
                                        <Settings size={18} />
                                        Security
                                    </button>
                                    <Link
                                        href="/orders"
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--color-gray-600)] hover:bg-[var(--color-gray-50)] transition-colors"
                                    >
                                        <Package size={18} />
                                        Orders
                                    </Link>
                                    <Link
                                        href="/wishlist"
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--color-gray-600)] hover:bg-[var(--color-gray-50)] transition-colors"
                                    >
                                        <Heart size={18} />
                                        Wishlist
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <LogOut size={18} />
                                        Logout
                                    </button>
                                </nav>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            {activeTab === 'profile' && (
                                <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8">
                                    <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-6">
                                        Personal Information
                                    </h2>

                                    {error && (
                                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                                            {error}
                                        </div>
                                    )}

                                    {saveSuccess && (
                                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-green-600 flex items-center gap-2">
                                            <Check size={18} />
                                            Profile updated successfully!
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                        {/* Basic Info */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Input
                                                {...register('name')}
                                                label="Full Name"
                                                placeholder="John Doe"
                                                error={errors.name?.message}
                                                leftIcon={<User size={18} />}
                                                fullWidth
                                            />
                                            <Input
                                                {...register('email')}
                                                type="email"
                                                label="Email Address"
                                                placeholder="you@example.com"
                                                error={errors.email?.message}
                                                leftIcon={<Mail size={18} />}
                                                fullWidth
                                                disabled
                                            />
                                        </div>

                                        <Input
                                            {...register('phone')}
                                            type="tel"
                                            label="Phone Number"
                                            placeholder="+1 (555) 000-0000"
                                            leftIcon={<Phone size={18} />}
                                            fullWidth
                                        />

                                        {/* Address */}
                                        <div className="pt-4 border-t border-[var(--color-gray-200)]">
                                            <h3 className="text-lg font-medium text-[var(--color-gray-900)] mb-4 flex items-center gap-2">
                                                <MapPin size={18} />
                                                Default Address
                                            </h3>
                                            <div className="space-y-4">
                                                <Input
                                                    {...register('address')}
                                                    label="Street Address"
                                                    placeholder="123 Main St"
                                                    fullWidth
                                                />
                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                    <Input
                                                        {...register('city')}
                                                        label="City"
                                                        placeholder="New York"
                                                        fullWidth
                                                    />
                                                    <Input
                                                        {...register('state')}
                                                        label="State"
                                                        placeholder="NY"
                                                        fullWidth
                                                    />
                                                    <Input
                                                        {...register('zipCode')}
                                                        label="ZIP Code"
                                                        placeholder="10001"
                                                        fullWidth
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Submit */}
                                        <div className="flex justify-end pt-4">
                                            <Button type="submit" size="lg" disabled={isSaving}>
                                                {isSaving ? (
                                                    <>
                                                        <Loader2 size={18} className="animate-spin" />
                                                        Saving...
                                                    </>
                                                ) : (
                                                    'Save Changes'
                                                )}
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {activeTab === 'security' && (
                                <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8">
                                    <h2 className="text-xl font-semibold text-[var(--color-gray-900)] mb-6">
                                        Security Settings
                                    </h2>

                                    {/* Change Password */}
                                    <div className="mb-8">
                                        <h3 className="text-lg font-medium text-[var(--color-gray-900)] mb-4">
                                            Change Password
                                        </h3>
                                        <div className="space-y-4">
                                            <Input
                                                type="password"
                                                label="Current Password"
                                                placeholder="Enter current password"
                                                fullWidth
                                            />
                                            <Input
                                                type="password"
                                                label="New Password"
                                                placeholder="Enter new password"
                                                fullWidth
                                            />
                                            <Input
                                                type="password"
                                                label="Confirm New Password"
                                                placeholder="Confirm new password"
                                                fullWidth
                                            />
                                            <div className="flex justify-end">
                                                <Button>Update Password</Button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Delete Account */}
                                    <div className="pt-6 border-t border-[var(--color-gray-200)]">
                                        <h3 className="text-lg font-medium text-[var(--color-gray-900)] mb-2">
                                            Delete Account
                                        </h3>
                                        <p className="text-sm text-[var(--color-gray-500)] mb-4">
                                            Once you delete your account, there is no going back. Please be certain.
                                        </p>
                                        <Button variant="danger">Delete Account</Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
