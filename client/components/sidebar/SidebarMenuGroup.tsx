import React, { useState, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

interface SidebarMenuGroupProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  collapsible?: boolean;
}

const SidebarMenuGroup: React.FC<SidebarMenuGroupProps> = ({
  title,
  children,
  defaultOpen = true,
  collapsible = false
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-6">
      {/* Group Header */}
      <button
        onClick={collapsible ? () => setIsOpen(!isOpen) : undefined}
        className={`
          w-full flex items-center justify-between px-4 py-2 mb-1 
          text-[10px] font-bold uppercase tracking-widest transition-all duration-300
          ${collapsible 
            ? 'cursor-pointer hover:bg-white/5 rounded-lg group' 
            : 'cursor-default'
          }
          ${isOpen ? 'text-zinc-500' : 'text-zinc-600'}
        `}
        aria-expanded={isOpen}
      >
        <span className={`transition-colors ${collapsible ? 'group-hover:text-[#BEF264]' : ''}`}>
          {title}
        </span>

        {collapsible && (
          <ChevronDown 
            className={`
              w-3 h-3 text-zinc-600 transition-all duration-300 
              group-hover:text-zinc-300
              ${isOpen ? 'rotate-180' : 'rotate-0'}
            `}
          />
        )}
      </button>

      {/* Children Container with smooth height transition possibility (CSS Grid trick or simple conditional) */}
      <div 
        className={`
          space-y-0.5 overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0'}
        `}
      >
        {children}
      </div>
    </div>
  );
};

export default SidebarMenuGroup;