
import React from 'react';
import { User } from 'lucide-react';
import { AdminProfile } from '@/types/adminProfile';

interface ProfileInformationProps {
  profile: AdminProfile;
}

export function ProfileInformation({ profile }: ProfileInformationProps) {
  return (
    <div>
      <h3 className="font-semibold mb-3 flex items-center gap-2">
        <User className="w-4 h-4" />
        Profile Information
      </h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-600">Department:</span>
          <span>{profile.department}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600">Location:</span>
          <span>{profile.location}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600">Joined:</span>
          <span>{profile.joinDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600">Last Login:</span>
          <span>{profile.lastLogin}</span>
        </div>
      </div>
    </div>
  );
}
