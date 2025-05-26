
import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Project } from '@/types/project';

interface TaskProjectFieldProps {
  selectedProjectId?: string;
  projects: Project[];
  onProjectChange: (projectId: string) => void;
}

export function TaskProjectField({
  selectedProjectId,
  projects,
  onProjectChange
}: TaskProjectFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="project" className="text-sm font-medium">Project (Optional)</Label>
      <Select value={selectedProjectId || 'none'} onValueChange={onProjectChange}>
        <SelectTrigger className="h-10">
          <SelectValue placeholder="Select a project (optional)" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">No Project</SelectItem>
          {projects.map((project) => (
            <SelectItem key={project.id} value={project.id}>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${project.color}`} />
                {project.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
