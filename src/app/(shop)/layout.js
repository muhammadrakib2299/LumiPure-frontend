// import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";

export default function ShopLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col">
            {/* <Navbar /> */}
            <header className="p-4 border-b">Navbar Placeholder</header>
            <main className="flex-1">{children}</main>
            <footer className="p-4 border-t">Footer Placeholder</footer>
            {/* <Footer /> */}
        </div>
    );
}
