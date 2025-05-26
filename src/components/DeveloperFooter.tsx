
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { DEVELOPER_INFO } from '@/data/mockData';
import { Code, Heart, MapPin } from 'lucide-react';

export function DeveloperFooter() {
  return (
    <div className="fixed bottom-0 right-0 p-4 z-50">
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg p-3 max-w-sm">
        <div className="flex items-center gap-2 mb-2">
          <Code className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-semibold text-slate-900 dark:text-white">
            Developed by {DEVELOPER_INFO.name}
          </span>
          <Heart className="w-3 h-3 text-red-500 fill-current" />
        </div>
        
        <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>{DEVELOPER_INFO.location}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {DEVELOPER_INFO.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs px-1 py-0">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-500 dark:text-slate-500">
            Contact: {DEVELOPER_INFO.email}
          </p>
        </div>
      </div>
    </div>
  );
}
