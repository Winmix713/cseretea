import React from 'react';
import { Switch } from '@headlessui/react';

interface HeadlessSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label?: string;
  description?: string;
}

const HeadlessSwitch: React.FC<HeadlessSwitchProps> = ({
  enabled,
  onChange,
  label,
  description,
}) => {
  return (
    <Switch.Group>
      <div className="flex items-center justify-between">
        <span className="flex flex-col flex-grow">
          {label && (
            <Switch.Label className="text-sm font-medium text-white cursor-pointer">
              {label}
            </Switch.Label>
          )}
          {description && (
            <Switch.Description className="text-xs text-gray-400 mt-1">
              {description}
            </Switch.Description>
          )}
        </span>
        <Switch
          checked={enabled}
          onChange={onChange}
          className={`${
            enabled ? 'bg-k-lime shadow-lg shadow-k-lime/30' : 'bg-gradient-to-b from-k-surfaceHighlight/60 to-k-surfaceHighlight/40 border border-k-borderLight/20 backdrop-blur-sm'
          } relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-k-lime focus:ring-offset-2 focus:ring-offset-k-surface`}
        >
          <span
            className={`${
              enabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-black transition-transform`}
          />
        </Switch>
      </div>
    </Switch.Group>
  );
};

export default HeadlessSwitch;
