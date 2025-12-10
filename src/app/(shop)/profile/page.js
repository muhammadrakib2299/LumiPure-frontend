"use client";

import Button from "@/components/ui/Button";
import useAuthStore from "@/stores/useAuthStore";

export default function ProfilePage() {
    //   const { user, logout } = useAuthStore();
    const user = { name: "Rakib", email: "rakib@example.com" }; // Mock user

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-serif text-primary-900">My Account</h1>
                <Button variant="outline" size="sm">Log Out</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                    <h2 className="text-lg font-medium mb-4">Personal Info</h2>
                    <div className="space-y-2 text-gray-600">
                        <p><span className="font-medium text-gray-900">Name:</span> {user.name}</p>
                        <p><span className="font-medium text-gray-900">Email:</span> {user.email}</p>
                    </div>
                    <Button variant="link" className="mt-4 px-0 text-primary-600">Edit Profile</Button>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm col-span-2">
                    <h2 className="text-lg font-medium mb-4">Recent Orders</h2>
                    <p className="text-gray-500 italic">No orders found.</p>
                </div>
            </div>
        </div>
    );
}
