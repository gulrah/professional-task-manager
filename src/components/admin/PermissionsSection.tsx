
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Shield } from 'lucide-react';
import { AdminProfile } from '@/types/adminProfile';

interface PermissionsSectionProps {
  profile: AdminProfile;
}

export function PermissionsSection({ profile }: PermissionsSectionProps) {
  return (
    <div>
      <h3 className="font-semibold mb-3 flex items-center gap-2">
        <Shield className="w-4 h-4" />
        Permissions
      </h3>
      <div className="flex flex-wrap gap-2">
        {profile.permissions.map((permission) => (
          <Badge key={permission} variant="outline" className="text-xs">
            {permission}
          </Badge>
        ))}
      </div>
    </div>
  );
}
