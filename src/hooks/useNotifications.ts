import { useState, useEffect } from 'react';
import { Notification } from '../types';

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Mock notifications
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'Release Approved',
        message: 'Your release "Summer Vibes" has been approved and is now live!',
        type: 'success',
        read: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'Payout Processed',
        message: 'Your payout request of $124.50 has been processed.',
        type: 'info',
        read: false,
        createdAt: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: '3',
        title: 'Pitching Deadline',
        message: 'Don\'t forget to submit your pitch for "Midnight Dreams" by tomorrow.',
        type: 'warning',
        read: true,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
  };
}