export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 border rounded-lg shadow-sm">
                    <h3 className="font-semibold">Total Orders</h3>
                    <p className="text-2xl">124</p>
                </div>
                <div className="p-6 border rounded-lg shadow-sm">
                    <h3 className="font-semibold">Total Revenue</h3>
                    <p className="text-2xl">$12,450</p>
                </div>
                <div className="p-6 border rounded-lg shadow-sm">
                    <h3 className="font-semibold">Products</h3>
                    <p className="text-2xl">45</p>
                </div>
            </div>
        </div>
    );
}
