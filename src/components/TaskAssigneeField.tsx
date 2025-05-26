
import React from 'react';
import { Label } from "@/components/ui/label";
import { MultipleAssigneeSelect } from './MultipleAssigneeSelect';

interface TaskAssigneeFieldProps {
  assignees: string[];
  availableAssignees: string[];
  onAssigneesChange: (assignees: string[]) => void;
}

export function TaskAssigneeField({
  assignees,
  availableAssignees,
  onAssigneesChange
}: TaskAssigneeFieldProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Assignees (Optional)</Label>
      <MultipleAssigneeSelect
        selectedAssignees={assignees}
        onAssigneesChange={onAssigneesChange}
        availableAssignees={availableAssignees}
      />
    </div>
  );
}
