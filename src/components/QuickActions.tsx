
import React from 'react';
import { Plus, FolderOpen, Users, Target, Calendar, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface QuickActionsProps {
  onCreateTask: () => void;
  onCreateProject: () => void;
  onManageTeam: () => void;
}

export function QuickActions({ onCreateTask, onCreateProject, onManageTeam }: QuickActionsProps) {
  const actions = [
    {
      id: 'new-task',
      title: 'Create Task',
      description: 'Add a new task with details',
      icon: Plus,
      action: onCreateTask,
      shortcut: 'Cmd+N',
      color: 'bg-blue-500',
      stats: '245 created this month'
    },
    {
      id: 'new-project',
      title: 'New Project',
      description: 'Start a new project',
      icon: FolderOpen,
      action: onCreateProject,
      shortcut: 'Cmd+P',
      color: 'bg-green-500',
      stats: '12 active projects'
    },
    {
      id: 'team',
      title: 'Team Management',
      description: 'Manage team members',
      icon: Users,
      action: onManageTeam,
      shortcut: 'Cmd+T',
      color: 'bg-purple-500',
      stats: '24 team members'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Quick Actions</h2>
          <p className="text-slate-600">Streamline your workflow with these shortcuts</p>
        </div>
        <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          Pro Features
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {actions.map((action) => (
          <Card key={action.id} className="hover:shadow-lg transition-all duration-200 cursor-pointer group border-0 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <kbd className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                  {action.shortcut}
                </kbd>
              </div>
              <CardTitle className="text-lg">{action.title}</CardTitle>
              <CardDescription>{action.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-slate-500">{action.stats}</p>
                <Button 
                  onClick={action.action}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  {action.title}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
