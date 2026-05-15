import { Outlet } from "@tanstack/react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function SiteLayout() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <Header />
      <main className="animate-pagefade">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}