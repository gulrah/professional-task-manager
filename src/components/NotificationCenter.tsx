
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Check, Clock, User, Calendar, AlertTriangle } from 'lucide-react';
import { Notification } from '@/types/task';
import { formatDistanceToNow } from 'date-fns';

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
    priority: 'high'
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
  }
];

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'task_assigned':
      return <User className="w-4 h-4" />;
    case 'deadline_approaching':
      return <Clock className="w-4 h-4" />;
    case 'task_completed':
      return <Check className="w-4 h-4" />;
    case 'team_mention':
      return <User className="w-4 h-4" />;
    case 'project_update':
      return <Calendar className="w-4 h-4" />;
    default:
      return <Bell className="w-4 h-4" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'high':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'medium':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    default:
      return 'bg-slate-100 text-slate-800 border-slate-200';
  }
};

export function NotificationCenter() {
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

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="relative p-2">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-96">
        <SheetHeader className="pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle>Notifications</SheetTitle>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark all read
              </Button>
            )}
          </div>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-120px)]">
          <div className="space-y-3 pr-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border transition-all hover:shadow-sm cursor-pointer ${
                  notification.read 
                    ? 'bg-slate-50 border-slate-200' 
                    : 'bg-blue-50 border-blue-200 shadow-sm'
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${getPriorityColor(notification.priority)}`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      )}
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{notification.message}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                      </span>
                      <Badge variant="outline" className={`text-xs ${getPriorityColor(notification.priority)}`}>
                        {notification.priority}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
