"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import useCartStore from "@/stores/useCartStore";

export default function CheckoutPage() {
    const { totalAmount } = useCartStore();

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-serif text-primary-900 mb-8">Checkout</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Shipping Form */}
                <div className="space-y-6">
                    <h2 className="text-xl font-medium">Shipping Information</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Input placeholder="First Name" />
                        <Input placeholder="Last Name" />
                    </div>
                    <Input placeholder="Address" />
                    <Input placeholder="City" />
                    <div className="grid grid-cols-2 gap-4">
                        <Input placeholder="State / Province" />
                        <Input placeholder="Postal Code" />
                    </div>
                    <Input placeholder="Phone Number" />
                </div>

                {/* Order Summary */}
                <div className="bg-secondary-50 p-8 rounded-2xl h-fit">
                    <h2 className="text-xl font-medium mb-6">Your Order</h2>
                    {/* Items would be listed here */}
                    <div className="border-t border-gray-200 pt-4 space-y-2">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>${totalAmount}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Shipping</span>
                            <span>Calculated at next step</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg pt-4 border-t border-gray-200 mt-4">
                            <span>Total</span>
                            <span>${totalAmount}</span>
                        </div>
                    </div>
                    <Button className="w-full mt-6" size="lg">Confirm & Pay</Button>
                </div>
            </div>
        </div>
    );
}
