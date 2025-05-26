
import React from 'react';
import { X } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface AssigneeBadgesProps {
  selectedAssignees: string[];
  onRemoveAssignee: (assignee: string) => void;
}

export function AssigneeBadges({
  selectedAssignees,
  onRemoveAssignee
}: AssigneeBadgesProps) {
  if (selectedAssignees.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {selectedAssignees.map((assignee) => (
        <Badge key={assignee} variant="secondary" className="pr-1 dark:bg-slate-700 dark:text-white">
          {assignee}
          <Button
            variant="ghost"
            size="sm"
            className="ml-1 h-4 w-4 p-0 hover:bg-transparent dark:hover:bg-transparent"
            onClick={() => onRemoveAssignee(assignee)}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      ))}
    </div>
  );
}
