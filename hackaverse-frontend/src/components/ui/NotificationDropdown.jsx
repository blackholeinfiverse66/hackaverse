import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import UIPortal from './UIPortal';

const NotificationDropdown = ({ isOpen, onClose, triggerRef }) => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Mock notifications data
  const [notifications] = useState([
    {
      id: 1,
      type: 'submission',
      title: 'New Submission Received',
      message: 'Team Alpha submitted their AI/ML project',
      time: '2 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'judge',
      title: 'Judge Assigned',
      message: 'Dr. Sarah Chen has been assigned to evaluate your project',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'deadline',
      title: 'Deadline Reminder',
      message: 'Submission deadline is approaching in 24 hours',
      time: '3 hours ago',
      read: true
    },
    {
      id: 4,
      type: 'announcement',
      title: 'Hackathon Update',
      message: 'New judging criteria have been published',
      time: '1 day ago',
      read: true
    }
  ]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target) &&
          triggerRef.current && !triggerRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleScroll = () => {
      if (window.scrollY > 24) {
        onClose();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        triggerRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('scroll', handleScroll);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, triggerRef]);

  const handleNotificationClick = (notification) => {
    // Mark as read (in a real app, this would update the backend)
    notification.read = true;

    // Navigate based on notification type
    switch (notification.type) {
      case 'submission':
        navigate('/admin/submissions');
        break;
      case 'judge':
        navigate('/judge/queue');
        break;
      case 'deadline':
        navigate('/app/submissions');
        break;
      case 'announcement':
        navigate('/logs');
        break;
    }

    onClose();
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'submission':
        return 'uil-file-upload';
      case 'judge':
        return 'uil-user-check';
      case 'deadline':
        return 'uil-clock';
      case 'announcement':
        return 'uil-megaphone';
      default:
        return 'uil-bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'submission':
        return 'text-blue-400';
      case 'judge':
        return 'text-green-400';
      case 'deadline':
        return 'text-orange-400';
      case 'announcement':
        return 'text-purple-400';
      default:
        return 'text-gray-400';
    }
  };

  const getPosition = () => {
    if (!triggerRef.current) return {};

    const rect = triggerRef.current.getBoundingClientRect();
    const dropdownWidth = 400;

    // Position to the left of the trigger
    let left = rect.right - dropdownWidth;
    let top = rect.bottom + 8;

    // Ensure the dropdown doesn't go off the right edge of the screen
    if (left + dropdownWidth > window.innerWidth - 16) {
      left = window.innerWidth - dropdownWidth - 16;
    }

    // Ensure the dropdown doesn't go off the left edge of the screen
    if (left < 16) {
      left = 16;
    }

    // Ensure the dropdown doesn't go off the top edge of the screen
    if (top < 16) {
      top = 16;
    }

    return {
      top: top,
      left: left
    };
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  const position = getPosition();

  return (
    <UIPortal>
      <div
        ref={dropdownRef}
        className="notification-dropdown glass-card"
        style={position}
        role="menu"
        aria-label="Notifications"
      >
        <div className="notification-header">
          <h3 className="notification-title">Notifications</h3>
          {unreadCount > 0 && (
            <span className="notification-count">{unreadCount}</span>
          )}
        </div>

        <div className="notification-list">
          {notifications.length === 0 ? (
            <div className="notification-empty">
              <i className="uil uil-bell-slash text-2xl text-gray-400 mb-2"></i>
              <p className="text-gray-400 text-sm">No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`notification-item ${!notification.read ? 'unread' : ''}`}
                role="menuitem"
                tabIndex={0}
                onClick={() => handleNotificationClick(notification)}
                onKeyDown={(e) => e.key === 'Enter' && handleNotificationClick(notification)}
              >
                <div className="notification-icon">
                  <i className={`uil ${getNotificationIcon(notification.type)} ${getNotificationColor(notification.type)}`}></i>
                </div>

                <div className="notification-content">
                  <div className="notification-title-text">{notification.title}</div>
                  <div className="notification-message">{notification.message}</div>
                  <div className="notification-time">{notification.time}</div>
                </div>

                {!notification.read && (
                  <div className="notification-unread-indicator"></div>
                )}
              </div>
            ))
          )}
        </div>

        {notifications.length > 0 && (
          <div className="notification-footer">
            <button
              className="notification-view-all"
              onClick={() => {
                navigate('/logs');
                onClose();
              }}
            >
              View All Notifications
            </button>
          </div>
        )}
      </div>
    </UIPortal>
  );
};

export default NotificationDropdown;
