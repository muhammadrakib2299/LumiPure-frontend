// import Sidebar from "@/components/layout/Sidebar";

export default function AdminLayout({ children }) {
    return (
        <div className="flex min-h-screen">
            <aside className="w-64 border-r p-4">Admin Sidebar</aside>
            <main className="flex-1 p-8">{children}</main>
        </div>
    );
}
