
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Target } from 'lucide-react';
import { AdminProfile } from '@/types/adminProfile';

interface SkillsSectionProps {
  profile: AdminProfile;
}

export function SkillsSection({ profile }: SkillsSectionProps) {
  return (
    <div>
      <h3 className="font-semibold mb-3 flex items-center gap-2">
        <Target className="w-4 h-4" />
        Technical Skills
      </h3>
      <div className="flex flex-wrap gap-2">
        {profile.skills.map((skill) => (
          <Badge key={skill} variant="secondary" className="text-xs">
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
}
