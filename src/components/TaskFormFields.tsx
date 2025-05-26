
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface TaskFormFieldsProps {
  title: string;
  description: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

export function TaskFormFields({
  title,
  description,
  onTitleChange,
  onDescriptionChange
}: TaskFormFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium">Task Title *</Label>
        <Input 
          id="title" 
          value={title} 
          onChange={(e) => onTitleChange(e.target.value)} 
          placeholder="Enter task title"
          required
          className="h-10"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">Description</Label>
        <Textarea 
          id="description" 
          value={description} 
          onChange={(e) => onDescriptionChange(e.target.value)} 
          placeholder="Describe the task in detail..."
          rows={3}
          className="resize-none"
        />
      </div>
    </>
  );
}
