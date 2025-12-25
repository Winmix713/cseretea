import React from 'react';
import { User, Settings, LogOut, MoreVertical } from 'lucide-react';
import HeadlessMenu from '../ui/HeadlessMenu';

const SidebarUserMenu = () => {
  const userMenuItems = [
    { label: 'My Profile', icon: <User className="w-4 h-4" />, onClick: () => {} },
    { label: 'Preferences', icon: <Settings className="w-4 h-4" />, onClick: () => {} },
    { label: 'Log Out', icon: <LogOut className="w-4 h-4" />, onClick: () => {}, danger: true },
  ];

  return (
    <div className="p-4 relative z-20">
      <HeadlessMenu
        button={
          <button className="group w-full flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-[#BEF264]/20 transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#BEF264]/50">

            {/* Avatar Container with Status Ring */}
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full p-[1px] bg-gradient-to-br from-[#BEF264] to-transparent">
                 <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900 border border-black">
                    <img
                      src="https://ui-avatars.com/api/?name=Win+Mix&background=111&color=BEF264"
                      alt="User"
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                 </div>
              </div>

              {/* Status Indicator */}
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#BEF264] rounded-full border-[2px] border-[#0A0A0A] shadow-sm"></div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-left overflow-hidden">
              <div className="text-sm font-bold text-white truncate group-hover:text-[#BEF264] transition-colors">
                WinMix User
              </div>
              <div className="text-[10px] font-medium text-zinc-500 truncate flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Premium Plan
              </div>
            </div>

            {/* Action Icon */}
            <div className="text-zinc-600 group-hover:text-white transition-colors">
              <MoreVertical className="w-4 h-4" />
            </div>
          </button>
        }
        items={userMenuItems}
        align="top"
        menuClassName="w-[240px] mb-2 glass-card border border-white/10 shadow-2xl"
      />
    </div>
  );
};

export default SidebarUserMenu;