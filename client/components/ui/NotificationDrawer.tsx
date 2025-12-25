import React, { useState, useEffect, useCallback } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X } from 'lucide-react';

// Notification interfész
export interface Notification {
  id: string;
  user: string;
  avatar: string;
  action: string;
  target: string;
  time: string;
  isRead?: boolean;
}

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications?: Notification[];
  onMarkAsRead?: (id: string) => void;
  onDelete?: (id: string) => void;
}

// NotificationItem - React.memo-val
const NotificationItem: React.FC<{
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}> = React.memo(({ notification, onMarkAsRead, onDelete }) => {
  const handleMarkAsRead = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    onMarkAsRead(notification.id);
  }, [notification.id, onMarkAsRead]);

  const handleDelete = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(notification.id);
  }, [notification.id, onDelete]);

  return (
    <div className="group relative flex items-center p-5 cursor-pointer rounded-2xl hover:bg-white/5 transition-all duration-200">
      {/* Gradient Card Background on Hover */}
      <div className="absolute inset-0 rounded-2xl invisible opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 bg-gradient-to-br from-k-lime/20 via-k-lime/10 to-transparent backdrop-blur-sm">
        <div className="absolute inset-[1.5px] bg-gradient-to-b from-k-surface/90 to-k-surface/80 rounded-[14.5px]"></div>
      </div>
      
      {/* User Avatar */}
      <button 
        onClick={handleMarkAsRead}
        className="relative z-10 shrink-0 w-12 h-12 rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-k-lime focus:ring-offset-2 focus:ring-offset-k-surface"
      >
        <img alt={notification.user} className="w-full h-full object-cover" src={notification.avatar} />
      </button>
      
      {/* Notification Content */}
      <div className="relative z-10 flex-1 pl-4 pr-8">
        <div className={`text-sm leading-relaxed ${!notification.isRead ? 'font-semibold text-white' : 'text-gray-400'}`}>
          <button
            onClick={handleMarkAsRead}
            className="font-semibold hover:text-k-lime transition-colors focus:outline-none focus:underline"
          >
            {notification.user}
          </button>{' '}
          {notification.action}{' '}
          <button 
            onClick={handleMarkAsRead}
            className="font-semibold hover:text-k-lime transition-colors focus:outline-none focus:underline"
          >
            {notification.target}
          </button>
        </div>
        <div className="mt-1 text-xs text-gray-500">{notification.time}</div>
      </div>
      
      {/* Delete button */}
      <button
        onClick={handleDelete}
        className="relative z-20 p-1 text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
        aria-label={`Törölni ${notification.user} értesítést`}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
});

NotificationItem.displayName = 'NotificationItem';

const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications: externalNotifications,
  onMarkAsRead: externalOnMarkAsRead,
  onDelete: externalOnDelete
}) => {
  const [internalNotifications, setInternalNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock adatok
  const mockNotifications: Notification[] = [
    { id: '1', user: 'conceptual_artist', avatar: 'https://ui-avatars.com/api/?name=CA&background=CCFF00&color=000&bold=true', action: 'megvásárolta', target: '3D Artistry Pack', time: '1ó 5p e.' },
    { id: '2', user: 'imaginative_vision', avatar: 'https://ui-avatars.com/api/?name=IV&background=3b82f6&color=fff', action: 'kedvelte', target: 'Interactive Design Assets', time: '1ó 12p e.', isRead: true },
    { id: '3', user: 'aesthetic_explorer', avatar: 'https://ui-avatars.com/api/?name=AE&background=8b5cf6&color=fff', action: 'kommentelt', target: 'CreativeSpace UI Kit', time: '5ó e.' },
    { id: '4', user: 'style_savant', avatar: 'https://ui-avatars.com/api/?name=SS&background=ec4899&color=fff', action: 'kedvelte', target: 'GraphicGenius Fonts', time: '7ó e.' },
    { id: '5', user: 'visual_vortex', avatar: 'https://ui-avatars.com/api/?name=VV&background=f59e0b&color=fff', action: 'megvásárolta', target: 'DesignWave Toolkit', time: '12ó e.' },
  ];

  // API szimuláció
  useEffect(() => {
    if (!externalNotifications?.length) {
      setLoading(true);
      const fetchNotifications = async () => {
        try {
          await new Promise(resolve => setTimeout(resolve, 500));
          setInternalNotifications(mockNotifications);
        } catch (err) {
          setError('Nem sikerült betölteni az értesítéseket.');
        } finally {
          setLoading(false);
        }
      };
      fetchNotifications();
    }
  }, []);

  const notifications = externalNotifications || internalNotifications;

  const markAsRead = useCallback((id: string) => {
    if (externalOnMarkAsRead) {
      externalOnMarkAsRead(id);
    } else {
      setInternalNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, isRead: true } : n)
      );
    }
  }, [externalOnMarkAsRead]);

  const deleteNotification = useCallback((id: string) => {
    if (externalOnDelete) {
      externalOnDelete(id);
    } else {
      setInternalNotifications(prev => prev.filter(n => n.id !== id));
    }
  }, [externalOnDelete]);

  return (
    <Transition.Root show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-[9999]" onClose={onClose}>
        {/* Headless UI Backdrop */}
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80 transition-opacity" aria-hidden="true" />
        </Transition.Child>

        {/* Drawer Panel */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
              <Transition.Child
                as={React.Fragment}
                enter="transform transition ease-in-out duration-300 sm:duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300 sm:duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-gradient-to-b from-k-card/100 to-k-card/80 border-l border-k-borderLight dark:border-k-border/10 dark:border-t-k-borderLight/20 backdrop-blur-xl shadow-2xl">
                    {/* Header */}
                    <div className="flex-shrink-0 px-10 pt-10 pb-5">
                      <div className="flex h-12 items-center justify-between">
                        <Dialog.Title className="text-xl font-semibold text-white">
                          Értesítések
                        </Dialog.Title>
                        <div className="ml-2 flex h-12 items-center">
                          <button
                            type="button"
                            className="group inline-flex items-center justify-center rounded-full bg-gradient-to-b from-k-surfaceHighlight/60 to-k-surfaceHighlight/40 backdrop-blur-sm border border-k-borderLight/20 p-2 text-gray-400 hover:border-k-lime hover:text-white hover:shadow-[0_0_20px_rgba(204,255,0,0.3)] focus:outline-none focus:ring-2 focus:ring-k-lime transition-all duration-200"
                            onClick={onClose}
                          >
                            <X className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto px-5 pb-20" aria-live="polite">
                      {loading && (
                        <div className="flex items-center justify-center h-32 text-gray-400">
                          Értesítések betöltése...
                        </div>
                      )}
                      
                      {error && (
                        <div className="flex items-center justify-center h-32 text-red-400 p-8 text-center">
                          {error}
                          <button 
                            onClick={() => window.location.reload()} 
                            className="ml-2 text-k-lime hover:underline focus:outline-none focus:ring-2 focus:ring-k-lime"
                          >
                            Újratöltés
                          </button>
                        </div>
                      )}
                      
                      {!loading && !error && notifications.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-400 text-center">
                          <div className="text-2xl mb-4">🔔</div>
                          <div className="text-lg mb-2">Nincs értesítés</div>
                          <div className="text-sm">Később értesülhetsz az új tevékenységekről</div>
                        </div>
                      )}
                      
                      {!loading && !error && notifications.map((notification) => (
                        <NotificationItem
                          key={notification.id}
                          notification={notification}
                          onMarkAsRead={markAsRead}
                          onDelete={deleteNotification}
                        />
                      ))}
                    </div>

                    {/* Footer Button */}
                    <div className="flex-shrink-0 border-t border-k-borderLight/20 backdrop-blur-sm px-6 pb-6 pt-6">
                      <button className="w-full inline-flex items-center justify-center h-12 rounded-full text-sm font-semibold transition-all duration-200 bg-gradient-to-b from-k-surfaceHighlight/60 to-k-surfaceHighlight/40 backdrop-blur-sm text-white border border-k-borderLight/20 hover:border-k-lime hover:text-k-lime hover:shadow-[0_0_20px_rgba(204,255,0,0.3)] focus:outline-none focus:ring-2 focus:ring-k-lime">
                        Összes értesítés megtekintése
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default NotificationDrawer;
