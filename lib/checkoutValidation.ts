import { z } from 'zod';

export const checkoutSchema = z.object({
    // Contact Information
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Please enter a valid email'),
    phone: z
        .string()
        .min(1, 'Phone number is required')
        .min(10, 'Please enter a valid phone number'),

    // Shipping Address
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    address: z.string().min(1, 'Address is required'),
    apartment: z.string().optional(),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zipCode: z.string().min(1, 'ZIP code is required'),
    country: z.string().min(1, 'Country is required'),

    // Billing - make it required with default
    sameAsShipping: z.boolean(),

    // Payment - make it required
    paymentMethod: z.enum(['card', 'cod']),

    // Card Details (optional)
    cardNumber: z.string().optional(),
    cardExpiry: z.string().optional(),
    cardCvc: z.string().optional(),
    cardName: z.string().optional(),

    // Notes
    orderNotes: z.string().optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
