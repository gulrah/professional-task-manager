
import React from 'react';
import { Activity, Clock, Target, User } from 'lucide-react';
import { AdminProfile } from '@/types/adminProfile';

interface AdminStatsProps {
  profile: AdminProfile;
}

export function AdminStats({ profile }: AdminStatsProps) {
  return (
    <div>
      <h3 className="font-semibold mb-3 flex items-center gap-2">
        <Activity className="w-4 h-4" />
        Statistics
      </h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <Target className="w-4 h-4" />
            <span className="text-sm font-medium">Projects</span>
          </div>
          <div className="text-2xl font-bold">{profile.stats.projectsManaged}</div>
        </div>
        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="flex items-center gap-2 text-green-600 mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">Tasks</span>
          </div>
          <div className="text-2xl font-bold">{profile.stats.tasksCompleted}</div>
        </div>
        <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <div className="flex items-center gap-2 text-purple-600 mb-1">
            <User className="w-4 h-4" />
            <span className="text-sm font-medium">Team</span>
          </div>
          <div className="text-2xl font-bold">{profile.stats.teamMembers}</div>
        </div>
        <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
          <div className="flex items-center gap-2 text-orange-600 mb-1">
            <Activity className="w-4 h-4" />
            <span className="text-sm font-medium">Uptime</span>
          </div>
          <div className="text-2xl font-bold">{profile.stats.uptime}</div>
        </div>
      </div>
    </div>
  );
}
