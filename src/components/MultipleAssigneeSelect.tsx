
import React from 'react';
import { AssigneeDropdown } from './AssigneeDropdown';
import { AssigneeBadges } from './AssigneeBadges';

interface MultipleAssigneeSelectProps {
  selectedAssignees: string[];
  onAssigneesChange: (assignees: string[]) => void;
  availableAssignees: string[];
}

export function MultipleAssigneeSelect({
  selectedAssignees = [],
  onAssigneesChange,
  availableAssignees = []
}: MultipleAssigneeSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelectAssignee = (assignee: string) => {
    if (selectedAssignees.includes(assignee)) {
      onAssigneesChange(selectedAssignees.filter(a => a !== assignee));
    } else {
      onAssigneesChange([...selectedAssignees, assignee]);
    }
  };

  const removeAssignee = (assignee: string) => {
    onAssigneesChange(selectedAssignees.filter(a => a !== assignee));
  };

  return (
    <div className="space-y-2">
      <AssigneeDropdown
        selectedAssignees={selectedAssignees}
        availableAssignees={availableAssignees}
        onSelectAssignee={handleSelectAssignee}
        open={open}
        onOpenChange={setOpen}
      />
      
      <AssigneeBadges
        selectedAssignees={selectedAssignees}
        onRemoveAssignee={removeAssignee}
      />
    </div>
  );
}
