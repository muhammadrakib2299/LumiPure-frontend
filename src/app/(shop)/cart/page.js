"use client";

import Button from "@/components/ui/Button";
import Link from "next/link";
import useCartStore from "@/stores/useCartStore";

export default function CartPage() {
    const { cart, totalAmount } = useCartStore();

    if (cart.length === 0) {
        return (
            <div className="container mx-auto py-20 text-center">
                <h2 className="text-3xl font-serif text-primary-900 mb-4">Your Bag is Empty</h2>
                <p className="text-gray-600 mb-8">Looks like you haven't found your perfect match yet.</p>
                <Link href="/products">
                    <Button>Continue Shopping</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-serif text-primary-900 mb-8">Shopping Bag</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    {/* Cart Items List would go here */}
                    {cart.map(item => (
                        <div key={item.id} className="border-b py-4">
                            {item.name} - ${item.price} x {item.quantity}
                        </div>
                    ))}
                </div>
                <div className="bg-secondary-50 p-6 rounded-xl h-fit">
                    <h3 className="text-xl font-medium mb-4">Order Summary</h3>
                    <div className="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span>${totalAmount}</span>
                    </div>
                    <div className="flex justify-between mb-6">
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>
                    <div className="border-t pt-4 mb-6">
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>${totalAmount}</span>
                        </div>
                    </div>
                    <Link href="/checkout">
                        <Button className="w-full">Proceed to Checkout</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
