"use client";

import { useState, useEffect } from "react";
import { Bell, CheckCircle, AlertTriangle, XCircle, Info, Megaphone, X } from "lucide-react";

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationSystemProps {
  onNewNotification?: (notification: Notification) => void;
}

export default function NotificationSystem({ onNewNotification }: NotificationSystemProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Check browser notification permission
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }

    // Load saved notifications
    const saved = localStorage.getItem('notifications');
    if (saved) {
      const parsed = JSON.parse(saved);
      setNotifications(parsed.map((n: any) => ({
        ...n,
        timestamp: new Date(n.timestamp)
      })));
    }

    // Simulate some initial notifications
    setTimeout(() => {
      addNotification({
        type: 'info',
        title: 'Welcome to D-CODE Marketplace!',
        message: 'Browse our verified accounts and join our community for exclusive deals.',
      });
    }, 2000);

    setTimeout(() => {
      addNotification({
        type: 'success',
        title: 'New Account Available!',
        message: 'Legendary Mythic Account just listed - check it out before it\'s gone!',
        action: {
          label: 'View Account',
          onClick: () => {
            window.location.href = '/marketplace';
          }
        }
      });
    }, 5000);
  }, []);

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result === 'granted';
    }
    return false;
  };

  const showBrowserNotification = (notification: Notification) => {
    if (permission === 'granted' && 'Notification' in window) {
      const browserNotification = new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: notification.id,
      });

      browserNotification.onclick = () => {
        window.focus();
        browserNotification.close();
        if (notification.action) {
          notification.action.onClick();
        }
      };

      // Auto close after 5 seconds
      setTimeout(() => {
        browserNotification.close();
      }, 5000);
    }
  };

  const addNotification = (notificationData: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const notification: Notification = {
      ...notificationData,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };

    setNotifications(prev => [notification, ...prev]);

    // Save to localStorage
    const updated = [notification, ...notifications];
    localStorage.setItem('notifications', JSON.stringify(updated));

    // Show browser notification if permitted
    showBrowserNotification(notification);

    // Notify parent component
    if (onNewNotification) {
      onNewNotification(notification);
    }

    // Auto remove after 10 seconds if not read
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 10000);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    localStorage.removeItem('notifications');
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <CheckCircle size={18} />;
      case 'warning': return <AlertTriangle size={18} />;
      case 'error': return <XCircle size={18} />;
      case 'info': return <Info size={18} />;
      default: return <Megaphone size={18} />;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'success': return '#4CAF50';
      case 'warning': return '#FFC107';
      case 'error': return '#F44336';
      case 'info': return '#2196F3';
      default: return 'var(--accent)';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      {/* Notification Bell */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <button
          onClick={() => setShowSettings(!showSettings)}
          style={{
            position: 'relative',
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-glass)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)',
            color: 'var(--text-primary)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--bg-glass-hover)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--bg-glass)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-6px',
              right: '-6px',
              background: '#F44336',
              color: 'white',
              borderRadius: '50%',
              width: '18px',
              height: '18px',
              fontSize: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
            }}>
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Notification Panel */}
      {showSettings && (
        <div style={{
          position: 'absolute',
          top: '60px',
          left: '0',
          width: '380px',
          maxHeight: '500px',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-glass)',
          borderRadius: '12px',
          zIndex: 1000,
          overflow: 'hidden',
          boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
        }}>
          {/* Header */}
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-glass)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>
              Notifications
            </h3>
            <div style={{ display: 'flex', gap: '8px' }}>
              {permission === 'default' && (
                <button
                  onClick={requestNotificationPermission}
                  className="btn-outline"
                  style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                >
                  Enable Browser
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearAllNotifications}
                  className="btn-outline"
                  style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {notifications.length === 0 ? (
              <div style={{
                padding: '40px 20px',
                textAlign: 'center',
                color: 'var(--text-tertiary)',
              }}>
                <div style={{ color: "var(--accent)", fontSize: '3rem', marginBottom: '16px', display: "flex", justifyContent: "center" }}>
                  <Bell size={60} />
                </div>
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`glass-card ${!notification.read ? 'unread' : ''}`}
                  style={{
                    margin: '8px',
                    padding: '16px',
                    borderLeft: `4px solid ${getNotificationColor(notification.type)}`,
                    background: notification.read ? 'transparent' : 'var(--bg-glass)',
                  }}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <span style={{ color: getNotificationColor(notification.type), marginTop: '2px' }}>
                      {getNotificationIcon(notification.type)}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                        <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700 }}>
                          {notification.title}
                        </h4>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNotification(notification.id);
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-tertiary)',
                            cursor: 'pointer',
                            padding: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                        {notification.message}
                      </p>
                      {notification.action && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            notification.action!.onClick();
                          }}
                          className="btn-primary"
                          style={{ marginTop: '8px', padding: '6px 12px', fontSize: '0.8rem' }}
                        >
                          {notification.action.label}
                        </button>
                      )}
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '8px' }}>
                        {notification.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Overlay */}
      {showSettings && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 999,
          }}
          onClick={() => setShowSettings(false)}
        />
      )}

      <style jsx>{`
        .unread {
          animation: slideInRight 0.3s ease;
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @media (max-width: 768px) {
          div[style*="width: 380px"] {
            width: calc(100vw - 40px) !important;
            maxWidth: '350px' !important;
            left: '50%' !important;
            transform: 'translateX(-50%)' !important;
          }
        }
        
        @media (max-width: 480px) {
          div[style*="width: 380px"] {
            width: calc(100vw - 20px) !important;
            left: '50%' !important;
            transform: 'translateX(-50%)' !important;
            top: '50px' !important;
          }
        }
      `}</style>
    </>
  );
}
