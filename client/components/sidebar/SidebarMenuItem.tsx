  import React, { ReactNode, memo } from 'react';

  interface SidebarMenuItemProps {
    icon: ReactNode;
    label: string;
    isActive?: boolean;
    onClick?: () => void;
    badge?: ReactNode;
    size?: 'normal' | 'small';
    className?: string; // Extra rugalmasság
  }

  const SidebarMenuItem: React.FC<SidebarMenuItemProps> = memo(({
    icon,
    label,
    isActive = false,
    onClick,
    badge,
    size = 'normal',
    className = ''
  }) => {
    // Méretezés logika
    const isSmall = size === 'small';
    const paddingClass = isSmall ? 'py-2 px-3' : 'py-3 px-4';
    const iconSizeClass = isSmall ? 'w-5 h-5' : 'w-5 h-5'; // Ikon méretét egységesítettem a tisztább look érdekében
    const textSizeClass = isSmall ? 'text-xs' : 'text-[0.9rem]';

    return (
      <button
        onClick={onClick}
        type="button"
        aria-current={isActive ? 'page' : undefined}
        className={`
          group relative w-full flex items-center outline-none select-none
          rounded-xl transition-all duration-300 ease-out
          ${paddingClass} ${className}
          focus-visible:ring-2 focus-visible:ring-[#BEF264]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]
        `}
      >
        {/* 1. RÉTEG: Háttér és Hover State (Glass hatás) */}
        <div 
          className={`
            absolute inset-0 rounded-xl transition-all duration-300
            ${isActive 
              ? 'bg-gradient-to-r from-[#BEF264]/10 to-transparent opacity-100' 
              : 'bg-white/0 group-hover:bg-white/[0.03] opacity-0 group-hover:opacity-100'
            }
          `}
        />

        {/* 2. RÉTEG: Aktív Indikátor (A "Fénycsík") */}
        <div 
          className={`
            absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[60%] rounded-r-full
            bg-[#BEF264] shadow-[0_0_12px_rgba(190,242,100,0.6)]
            transition-all duration-300 ease-spring
            ${isActive ? 'opacity-100 scale-y-100 translate-x-0' : 'opacity-0 scale-y-50 -translate-x-2'}
          `}
        />

        {/* 3. RÉTEG: Tartalom (Ikon és Szöveg) */}
        <div className="relative z-10 flex items-center w-full overflow-hidden">

          {/* Ikon Konténer */}
          <span 
            className={`
              flex items-center justify-center transition-all duration-300 mr-3
              ${iconSizeClass}
              ${isActive 
                ? 'text-[#BEF264] drop-shadow-[0_0_8px_rgba(190,242,100,0.5)] scale-110' 
                : 'text-zinc-400 group-hover:text-zinc-200 group-hover:scale-105'
              }
            `}
          >
            {icon}
          </span>

          {/* Szöveg */}
          <span 
            className={`
              font-medium tracking-wide truncate flex-1 text-left transition-colors duration-300
              ${textSizeClass}
              ${isActive 
                ? 'text-white' 
                : 'text-zinc-400 group-hover:text-white'
              }
            `}
          >
            {label}
          </span>

          {/* Badge / Értesítés */}
          {badge && (
            <div 
              className={`
                ml-auto pl-2 transition-all duration-300 transform
                ${isActive ? 'opacity-100 translate-x-0' : 'opacity-70 group-hover:opacity-100 group-hover:translate-x-0'}
              `}
            >
              {/* Automatikus stílus a badge-nek, ha csak stringet kap, de elfogad ReactNode-ot is */}
              {typeof badge === 'string' || typeof badge === 'number' ? (
                <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#BEF264]/10 text-[#BEF264] border border-[#BEF264]/20 tabular-nums shadow-[0_0_10px_rgba(190,242,100,0.1)]">
                  {badge}
                </span>
              ) : (
                badge
              )}
            </div>
          )}
        </div>

        {/* 4. RÉTEG: Finom élfény hoverkor (Border light) */}
        <div 
          className={`
            absolute inset-0 rounded-xl border border-transparent pointer-events-none transition-colors duration-300
            ${isActive ? 'border-[#BEF264]/10' : 'group-hover:border-white/5'}
          `}
        />
      </button>
    );
  });

  SidebarMenuItem.displayName = 'SidebarMenuItem';

  export default SidebarMenuItem;