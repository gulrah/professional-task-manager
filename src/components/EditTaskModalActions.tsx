
import React from 'react';
import { Button } from "@/components/ui/button";

interface EditTaskModalActionsProps {
  onCancel: () => void;
  onSubmit: () => void;
}

export function EditTaskModalActions({ onCancel, onSubmit }: EditTaskModalActionsProps) {
  return (
    <div className="flex justify-end gap-2 pt-4">
      <Button type="button" variant="outline" onClick={onCancel} className="dark:border-slate-700 dark:text-white dark:hover:bg-slate-700">
        Cancel
      </Button>
      <Button type="submit" onClick={onSubmit} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
        Save Changes
      </Button>
    </div>
  );
}
