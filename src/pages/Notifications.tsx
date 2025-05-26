
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Check, Clock, User, Calendar, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

interface Notification {
  id: string;
  type: 'task_assigned' | 'deadline_approaching' | 'task_completed' | 'team_mention' | 'project_update';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'task_assigned',
    title: 'New Task Assigned',
    message: 'You have been assigned to "API Integration & Authentication"',
    read: false,
    createdAt: new Date(Date.now() - 10 * 60 * 1000),
    actionUrl: '/tasks/1',
    priority: 'high'
  },
  {
    id: '2',
    type: 'deadline_approaching',
    title: 'Deadline Approaching',
    message: 'Design System Enhancement is due in 2 days',
    read: false,
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
    actionUrl: '/tasks/2',
    priority: 'urgent'
  },
  {
    id: '3',
    type: 'task_completed',
    title: 'Task Completed',
    message: 'User Research & Testing has been marked as completed',
    read: true,
    createdAt: new Date(Date.now() - 60 * 60 * 1000),
    actionUrl: '/tasks/3',
    priority: 'medium'
  },
  {
    id: '4',
    type: 'team_mention',
    title: 'Team Mention',
    message: 'Sarah Johnson mentioned you in Performance Optimization',
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    actionUrl: '/tasks/4',
    priority: 'medium'
  },
  {
    id: '5',
    type: 'project_update',
    title: 'Project Update',
    message: 'TaskFlow Enhancement project progress updated to 75%',
    read: true,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    actionUrl: '/projects/1',
    priority: 'low'
  },
  {
    id: '6',
    type: 'deadline_approaching',
    title: 'Urgent Deadline',
    message: 'Mobile App Enhancement deadline is in 6 hours',
    read: false,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    actionUrl: '/tasks/5',
    priority: 'urgent'
  }
];

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'task_assigned':
      return <User className="w-5 h-5" />;
    case 'deadline_approaching':
      return <Clock className="w-5 h-5" />;
    case 'task_completed':
      return <CheckCircle2 className="w-5 h-5" />;
    case 'team_mention':
      return <User className="w-5 h-5" />;
    case 'project_update':
      return <Calendar className="w-5 h-5" />;
    default:
      return <AlertTriangle className="w-5 h-5" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent':
      return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800';
    case 'high':
      return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800';
    case 'medium':
      return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800';
    default:
      return 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
  }
};

const Notifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="hover:bg-slate-100 dark:hover:bg-slate-800">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Notifications Center
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Stay updated with your latest activities
              </p>
            </div>
          </div>
          
          {unreadCount > 0 && (
            <Button onClick={markAllAsRead} variant="outline" className="gap-2">
              <Check className="w-4 h-4" />
              Mark all read ({unreadCount})
            </Button>
          )}
        </div>

        <div className="grid gap-4">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`transition-all hover:shadow-md cursor-pointer ${
                notification.read 
                  ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700' 
                  : 'bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800 shadow-sm'
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${getPriorityColor(notification.priority)}`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      )}
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getPriorityColor(notification.priority)}`}
                      >
                        {notification.priority}
                      </Badge>
                    </div>
                    
                    <p className="text-slate-600 dark:text-slate-400 mb-3">
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                      </span>
                      
                      <div className="flex gap-2">
                        {notification.actionUrl && (
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                        >
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {notifications.length === 0 && (
          <Card className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              All caught up!
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              You have no new notifications at this time.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Notifications;
