
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { DEVELOPER_INFO } from '@/data/mockData';
import { AdminProfile as AdminProfileType } from '@/types/adminProfile';
import { AdminProfileHeader } from './admin/AdminProfileHeader';
import { DeveloperNotice } from './admin/DeveloperNotice';
import { ProfileInformation } from './admin/ProfileInformation';
import { SkillsSection } from './admin/SkillsSection';
import { AdminStats } from './admin/AdminStats';
import { PermissionsSection } from './admin/PermissionsSection';
import { ProfileActions } from './admin/ProfileActions';

// PERMANENT DEVELOPER PROFILE - DO NOT MODIFY
// This profile belongs to the original creator of this project
const adminProfile: AdminProfileType = {
  name: DEVELOPER_INFO.name,
  email: DEVELOPER_INFO.email,
  role: DEVELOPER_INFO.role,
  department: DEVELOPER_INFO.department,
  avatar: '',
  joinDate: 'March 2023',
  lastLogin: 'Today at 2:45 PM',
  location: DEVELOPER_INFO.location,
  skills: DEVELOPER_INFO.skills,
  permissions: ['User Management', 'System Settings', 'Analytics', 'Project Management', 'Full System Access'],
  stats: {
    projectsManaged: 18,
    tasksCompleted: 142,
    teamMembers: 35,
    uptime: '99.2%'
  },
  projectCreator: true // This flag indicates this is the original creator
};

export function AdminProfile() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="p-1">
          <Avatar className="h-8 w-8 ring-2 ring-blue-500 dark:ring-blue-400">
            <AvatarImage src={adminProfile.avatar} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
              {adminProfile.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-96">
        <SheetHeader className="pb-6">
          <AdminProfileHeader profile={adminProfile} />
        </SheetHeader>

        <div className="space-y-6">
          <DeveloperNotice profile={adminProfile} />
          
          <ProfileInformation profile={adminProfile} />
          
          <Separator />
          
          <SkillsSection profile={adminProfile} />
          
          <Separator />
          
          <AdminStats profile={adminProfile} />
          
          <Separator />
          
          <PermissionsSection profile={adminProfile} />
          
          <Separator />
          
          <ProfileActions />
        </div>
      </SheetContent>
    </Sheet>
  );
}
