
import React from 'react';
import { Shield } from 'lucide-react';
import { AdminProfile } from '@/types/adminProfile';

interface DeveloperNoticeProps {
  profile: AdminProfile;
}

export function DeveloperNotice({ profile }: DeveloperNoticeProps) {
  if (!profile.projectCreator) {
    return null;
  }

  return (
    <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
      <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 mb-1">
        <Shield className="w-4 h-4" />
        <span className="text-sm font-semibold">Original Developer</span>
      </div>
      <p className="text-xs text-blue-600 dark:text-blue-400">
        This project was created and developed by {profile.name}. Full system access and ownership.
      </p>
    </div>
  );
}
