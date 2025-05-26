
import React from 'react';
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function EditTaskModalHeader() {
  return (
    <DialogHeader>
      <DialogTitle className="text-slate-900 dark:text-white">Edit Task</DialogTitle>
    </DialogHeader>
  );
}
