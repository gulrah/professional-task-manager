
import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TaskPriority, TaskStatus } from '@/types/task';

interface TaskMetaFieldsProps {
  priority: TaskPriority;
  status: TaskStatus;
  category: string;
  onPriorityChange: (value: TaskPriority) => void;
  onStatusChange: (value: TaskStatus) => void;
  onCategoryChange: (value: string) => void;
}

export function TaskMetaFields({
  priority,
  status,
  category,
  onPriorityChange,
  onStatusChange,
  onCategoryChange
}: TaskMetaFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="category" className="text-sm font-medium">Category</Label>
        <Select value={category} onValueChange={onCategoryChange}>
          <SelectTrigger className="h-10">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="development">Development</SelectItem>
            <SelectItem value="research">Research</SelectItem>
            <SelectItem value="qa">Quality Assurance</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="security">Security</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Priority</Label>
        <Select value={priority} onValueChange={(value: TaskPriority) => onPriorityChange(value)}>
          <SelectTrigger className="h-10">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label className="text-sm font-medium">Status</Label>
        <Select value={status} onValueChange={(value: TaskStatus) => onStatusChange(value)}>
          <SelectTrigger className="h-10">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todo">To Do</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
