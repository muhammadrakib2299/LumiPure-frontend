'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    Loader2,
    Check,
    MessageSquare,
} from 'lucide-react';
import { Input } from '@/components/ui';
import { Button } from '@/components/ui';

const contactSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email address'),
    subject: z.string().min(1, 'Subject is required'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        console.log('Form data:', data);
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSuccess(true);
        reset();
        setTimeout(() => setIsSuccess(false), 5000);
    };

    return (
        <div className="min-h-screen bg-[var(--color-gray-50)]">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] py-16 lg:py-24">
                <div className="container mx-auto px-4 lg:px-8 text-center">
                    <h1 className="text-4xl lg:text-5xl font-display font-semibold text-white mb-4">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto">
                        Have a question or need help? We&apos;re here to assist you. Reach out to us anytime.
                    </p>
                </div>
            </section>

            {/* Contact Content */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Contact Info */}
                        <div className="lg:col-span-1 space-y-8">
                            <div>
                                <h2 className="text-2xl font-display font-semibold text-[var(--color-gray-900)] mb-6">
                                    Contact Information
                                </h2>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                                            <Mail size={22} className="text-[var(--color-primary)]" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-[var(--color-gray-900)]">Email</p>
                                            <a
                                                href="mailto:support@lumipure.com"
                                                className="text-[var(--color-gray-600)] hover:text-[var(--color-primary)]"
                                            >
                                                support@lumipure.com
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                                            <Phone size={22} className="text-[var(--color-primary)]" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-[var(--color-gray-900)]">Phone</p>
                                            <a
                                                href="tel:+1-800-LUMIPURE"
                                                className="text-[var(--color-gray-600)] hover:text-[var(--color-primary)]"
                                            >
                                                +1 (800) LUMIPURE
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                                            <MapPin size={22} className="text-[var(--color-primary)]" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-[var(--color-gray-900)]">Address</p>
                                            <p className="text-[var(--color-gray-600)]">
                                                123 Beauty Lane<br />
                                                Los Angeles, CA 90001<br />
                                                United States
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center flex-shrink-0">
                                            <Clock size={22} className="text-[var(--color-primary)]" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-[var(--color-gray-900)]">Business Hours</p>
                                            <p className="text-[var(--color-gray-600)]">
                                                Mon - Fri: 9:00 AM - 6:00 PM<br />
                                                Sat: 10:00 AM - 4:00 PM<br />
                                                Sun: Closed
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-sm p-8 lg:p-10">
                                <div className="flex items-center gap-3 mb-8">
                                    <MessageSquare size={24} className="text-[var(--color-primary)]" />
                                    <h2 className="text-2xl font-display font-semibold text-[var(--color-gray-900)]">
                                        Send us a Message
                                    </h2>
                                </div>

                                {isSuccess && (
                                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-700">
                                        <Check size={20} />
                                        <span>Your message has been sent successfully! We&apos;ll get back to you soon.</span>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Input
                                            {...register('name')}
                                            label="Your Name"
                                            placeholder="John Doe"
                                            error={errors.name?.message}
                                            fullWidth
                                        />
                                        <Input
                                            {...register('email')}
                                            type="email"
                                            label="Email Address"
                                            placeholder="you@example.com"
                                            error={errors.email?.message}
                                            fullWidth
                                        />
                                    </div>
                                    <Input
                                        {...register('subject')}
                                        label="Subject"
                                        placeholder="How can we help?"
                                        error={errors.subject?.message}
                                        fullWidth
                                    />
                                    <div>
                                        <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            {...register('message')}
                                            rows={6}
                                            placeholder="Tell us more about your inquiry..."
                                            className={`
                        w-full px-4 py-3 border rounded-lg resize-none
                        focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]
                        ${errors.message
                                                    ? 'border-red-500'
                                                    : 'border-[var(--color-gray-200)]'
                                                }
                      `}
                                        />
                                        {errors.message && (
                                            <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                                        )}
                                    </div>
                                    <Button type="submit" size="lg" disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 size={18} className="animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={18} />
                                                Send Message
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
