import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import PageHeader from './PageHeader';

const DashboardLayout = () => {
  return (
    <div className="bg-[#0A0A0A] text-white font-sans min-h-screen flex overflow-hidden selection:bg-[#BEF264] selection:text-black antialiased relative">

      {/* --- GLOBAL ATMOSPHERE LAYER --- */}
      {/* Static Noise Texture for "Film Grain" look */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] mix-blend-soft-light" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* Ambient Glows (Fixed position so they don't scroll) */}
      <div className="fixed top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-[#BEF264] rounded-full blur-[150px] opacity-[0.04] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-[#6EE7B7] rounded-full blur-[150px] opacity-[0.03] pointer-events-none z-0"></div>
      <div className="fixed top-[30%] right-[20%] w-[20vw] h-[20vw] bg-purple-500 rounded-full blur-[120px] opacity-[0.02] pointer-events-none z-0"></div>

      {/* --- LAYOUT STRUCTURE --- */}
      <Sidebar />

      <main className="flex-1 lg:ml-[270px] flex flex-col h-screen overflow-hidden relative z-10 transition-all duration-300">
        <PageHeader />

        <div className="flex-1 overflow-y-auto scroll-smooth custom-scrollbar relative">
          <div className="p-4 md:p-6 lg:p-8 max-w-[1920px] mx-auto space-y-8 pb-24">
            <Outlet />
          </div>

          {/* Bottom Fade Gradient for Scroll */}
          <div className="sticky bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none z-20" />
        </div>
      </main>

    </div>
  );
};

export default DashboardLayout;