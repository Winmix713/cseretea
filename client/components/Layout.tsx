import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#020617] text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="relative z-10 flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Scrollable Content Area */}
        <div className="relative flex-1 overflow-y-auto scroll-smooth bg-[#090a0b]">
          {children}
        </div>
      </main>
    </div>
  );
}
