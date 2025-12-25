import React, { Fragment, ReactNode } from 'react';
import { Popover, Transition } from '@headlessui/react';

interface HeadlessPopoverProps {
  button: ReactNode;
  children: ReactNode;
  align?: 'left' | 'right' | 'center';
  className?: string;
}

const HeadlessPopover: React.FC<HeadlessPopoverProps> = ({
  button,
  children,
  align = 'center',
  className = '',
}) => {
  const alignClasses = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 -translate-x-1/2',
  };

  return (
    <Popover className="relative">
      <Popover.Button as={Fragment}>{button}</Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel
          className={`absolute ${alignClasses[align]} z-50 mt-3 ${className}`}
        >
          <div className="overflow-hidden rounded-xl bg-gradient-to-b from-k-card/30 to-k-card/20 border border-k-borderLight dark:border-k-border/10 dark:border-t-k-borderLight/20 dark:border-b-k-border/5 backdrop-blur-xl shadow-2xl ring-1 ring-black/10">
            {children}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default HeadlessPopover;
