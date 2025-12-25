import { useState } from 'react';
import {
  LayoutDashboard,
  Activity,
  BarChart3,
  Sparkles,
  Calendar,
  Star,
  ChevronRight,
  Target
} from 'lucide-react';
import SidebarMenuGroup from './SidebarMenuGroup';
import SidebarMenuItem from './SidebarMenuItem';

const SidebarNav = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [analyticsOpen, setAnalyticsOpen] = useState(true);

  // Helper a Live badge-hez
  const LiveBadge = (
    <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-rose-500/10 border border-rose-500/20">
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500"></span>
      </span>
      <span className="text-[9px] font-bold text-rose-500 uppercase tracking-wide">Live</span>
    </div>
  );

  return (
    <div className="px-3 py-4 flex-1 overflow-y-auto custom-scrollbar space-y-2">

      {/* --- MAIN MENU --- */}
      <SidebarMenuGroup title="Overview">
        <SidebarMenuItem
          icon={<LayoutDashboard />}
          label="Dashboard"
          isActive={activeItem === 'Dashboard'}
          onClick={() => setActiveItem('Dashboard')}
        />
        <SidebarMenuItem
          icon={<Activity />}
          label="Live Odds"
          isActive={activeItem === 'Live Odds'}
          onClick={() => setActiveItem('Live Odds')}
          badge={LiveBadge}
        />
      </SidebarMenuGroup>

      {/* --- ANALYTICS (Custom Accordion) --- */}
      <SidebarMenuGroup title="Intelligence">
        <div className="relative">
          {/* Parent Item that acts as a Trigger */}
          <SidebarMenuItem 
            icon={<BarChart3 />}
            label="Stats Hub"
            isActive={activeItem === 'Stats Hub' || analyticsOpen}
            onClick={() => setAnalyticsOpen(!analyticsOpen)}
            // Trükk: A badge helyére tesszük a nyilat
            badge={
              <ChevronRight 
                className={`w-3.5 h-3.5 text-zinc-500 transition-transform duration-300 ${analyticsOpen ? 'rotate-90' : ''}`} 
              />
            }
          />

          {/* Submenu Items - Indented & Connected */}
          <div 
             className={`
               overflow-hidden transition-all duration-300 ease-in-out border-l border-white/5 ml-5 my-1
               ${analyticsOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
             `}
          >
             <div className="pl-3 space-y-1 pt-1">
                <SidebarMenuItem
                  icon={<Sparkles />}
                  label="AI Models"
                  size="small"
                  isActive={activeItem === 'AI Models'}
                  onClick={() => setActiveItem('AI Models')}
                />
                <SidebarMenuItem
                  icon={<Target />}
                  label="Predictions"
                  size="small"
                  isActive={activeItem === 'Predictions'}
                  onClick={() => setActiveItem('Predictions')}
                />
             </div>
          </div>
        </div>

        <SidebarMenuItem
          icon={<Calendar />}
          label="Schedule"
          isActive={activeItem === 'Schedule'}
          onClick={() => setActiveItem('Schedule')}
        />
      </SidebarMenuGroup>

      {/* --- LEAGUES --- */}
      <SidebarMenuGroup title="Competitions" collapsible>
        <SidebarMenuItem
          icon={
            <div className="w-5 h-5 rounded-[6px] bg-gradient-to-br from-[#38003c] to-[#111] border border-white/10 flex items-center justify-center text-[8px] font-bold text-[#00ff85]">
              PL
            </div>
          }
          label="Premier League"
          isActive={activeItem === 'Premier League'}
          onClick={() => setActiveItem('Premier League')}
        />
        <SidebarMenuItem
          icon={
            <div className="w-5 h-5 rounded-[6px] bg-gradient-to-br from-[#111] to-black border border-white/10 flex items-center justify-center text-[8px] font-bold text-white">
              LL
            </div>
          }
          label="La Liga"
          isActive={activeItem === 'La Liga'}
          onClick={() => setActiveItem('La Liga')}
        />
        <SidebarMenuItem
          icon={<Star className="fill-[#FBBF24]/20 text-[#FBBF24]" />}
          label="Favorites"
          isActive={activeItem === 'Favorites'}
          onClick={() => setActiveItem('Favorites')}
          badge="12" 
        />
      </SidebarMenuGroup>
    </div>
  );
};

export default SidebarNav;