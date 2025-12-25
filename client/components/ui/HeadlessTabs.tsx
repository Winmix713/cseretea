import React, { Fragment, ReactNode } from 'react';
import { Tab } from '@headlessui/react';

interface TabItem {
  name: string;
  icon?: ReactNode;
  content: ReactNode;
}

interface HeadlessTabsProps {
  tabs: TabItem[];
  defaultIndex?: number;
}

const HeadlessTabs: React.FC<HeadlessTabsProps> = ({ tabs, defaultIndex = 0 }) => {
  return (
    <Tab.Group defaultIndex={defaultIndex}>
      <Tab.List className="flex space-x-1 rounded-xl bg-gradient-to-b from-k-surfaceHighlight/60 to-k-surfaceHighlight/40 backdrop-blur-sm p-1 border border-k-borderLight dark:border-k-border/10">
        {tabs.map((tab) => (
          <Tab key={tab.name} as={Fragment}>
            {({ selected }) => (
              <button
                className={`w-full rounded-lg py-2.5 px-4 text-sm font-medium leading-5 transition-all focus:outline-none focus:ring-2 focus:ring-k-lime focus:ring-offset-2 focus:ring-offset-k-surface ${
                  selected
                    ? 'bg-k-lime text-black shadow-lg shadow-k-lime/20'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white backdrop-blur-sm'
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  {tab.icon}
                  {tab.name}
                </span>
              </button>
            )}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-4">
        {tabs.map((tab, idx) => (
          <Tab.Panel
            key={idx}
            className="rounded-xl focus:outline-none focus:ring-2 focus:ring-k-lime focus:ring-offset-2 focus:ring-offset-k-surface"
          >
            {tab.content}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default HeadlessTabs;
