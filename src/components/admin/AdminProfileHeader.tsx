
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SheetTitle } from "@/components/ui/sheet";
import { Shield } from 'lucide-react';
import { AdminProfile } from '@/types/adminProfile';

interface AdminProfileHeaderProps {
  profile: AdminProfile;
}

export function AdminProfileHeader({ profile }: AdminProfileHeaderProps) {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-16 w-16 ring-4 ring-blue-500 dark:ring-blue-400">
        <AvatarImage src={profile.avatar} />
        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl font-semibold">
          {profile.name.split(' ').map(n => n[0]).join('')}
        </AvatarFallback>
      </Avatar>
      <div>
        <SheetTitle className="text-xl">{profile.name}</SheetTitle>
        <p className="text-slate-600 dark:text-slate-400">{profile.email}</p>
        <div className="flex flex-col gap-1 mt-1">
          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <Shield className="w-3 h-3 mr-1" />
            {profile.role}
          </Badge>
          {profile.projectCreator && (
            <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs">
              🏆 Project Creator
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
