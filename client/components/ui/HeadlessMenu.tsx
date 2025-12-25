import React, { Fragment, ReactNode } from 'react';
import { Menu, Transition } from '@headlessui/react';

interface MenuItem {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
}

interface HeadlessMenuProps {
  button: ReactNode;
  items: MenuItem[];
  align?: 'left' | 'right' | 'top';
}

const HeadlessMenu: React.FC<HeadlessMenuProps> = ({ button, items, align = 'right' }) => {
  const positionClass = align === 'top' ? 'bottom-full mb-2' : 'mt-2';
  const horizontalAlign = align === 'right' || align === 'top' ? 'right-0' : 'left-0';
  const originClass = align === 'top' ? 'origin-bottom-right' : `origin-top-${align === 'right' ? 'right' : 'left'}`;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button as={Fragment}>{button}</Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={`absolute ${horizontalAlign} ${positionClass} w-56 ${originClass} rounded-xl bg-gradient-to-b from-k-card/30 to-k-card/20 border border-k-borderLight dark:border-k-border/10 dark:border-t-k-borderLight/20 dark:border-b-k-border/5 backdrop-blur-xl shadow-2xl ring-1 ring-black/10 focus:outline-none z-50 overflow-hidden`}
        >
          <div className="py-1">
            {items.map((item, index) => (
              <Menu.Item key={index} disabled={item.disabled}>
                {({ active }) => (
                  <button
                    onClick={item.onClick}
                    disabled={item.disabled}
                    className={`${
                      active ? 'bg-white/5 text-white backdrop-blur-sm' : 'text-gray-400'
                    } ${item.danger ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10' : ''} ${
                      item.disabled ? 'opacity-50 cursor-not-allowed' : ''
                    } group flex w-full items-center px-4 py-3 text-sm font-medium transition-all duration-200`}
                  >
                    {item.icon && (
                      <span className="mr-3 w-5 h-5 flex items-center justify-center">
                        {item.icon}
                      </span>
                    )}
                    {item.label}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default HeadlessMenu;
