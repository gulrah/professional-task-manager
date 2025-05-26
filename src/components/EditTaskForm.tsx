
import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Task } from "@/types/task";
import { TaskTagsField } from './TaskTagsField';
import { MultipleAssigneeSelect } from './MultipleAssigneeSelect';

interface EditTaskFormProps {
  formData: {
    title: string;
    description: string;
    priority: Task['priority'];
    status: Task['status'];
    category: string;
    dueDate: string;
    beginDate: string;
    progress: number;
    tags: string[];
    assignees: string[];
  };
  onFormDataChange: (updates: Partial<EditTaskFormProps['formData']>) => void;
  availableAssignees: string[];
}

export function EditTaskForm({ formData, onFormDataChange, availableAssignees }: EditTaskFormProps) {
  const updateFormData = (field: keyof EditTaskFormProps['formData'], value: any) => {
    onFormDataChange({ [field]: value });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-slate-700 dark:text-slate-300">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => updateFormData('title', e.target.value)}
            required
            className="dark:bg-slate-800 dark:text-white dark:border-slate-700"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category" className="text-slate-700 dark:text-slate-300">Category</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) => updateFormData('category', e.target.value)}
            className="dark:bg-slate-800 dark:text-white dark:border-slate-700"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-slate-700 dark:text-slate-300">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => updateFormData('description', e.target.value)}
          rows={3}
          className="dark:bg-slate-800 dark:text-white dark:border-slate-700"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="priority" className="text-slate-700 dark:text-slate-300">Priority</Label>
          <Select value={formData.priority} onValueChange={(value: Task['priority']) => updateFormData('priority', value)}>
            <SelectTrigger className="dark:bg-slate-800 dark:text-white dark:border-slate-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
              <SelectItem value="low" className="dark:text-white dark:hover:bg-slate-700">Low</SelectItem>
              <SelectItem value="medium" className="dark:text-white dark:hover:bg-slate-700">Medium</SelectItem>
              <SelectItem value="high" className="dark:text-white dark:hover:bg-slate-700">High</SelectItem>
              <SelectItem value="urgent" className="dark:text-white dark:hover:bg-slate-700">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status" className="text-slate-700 dark:text-slate-300">Status</Label>
          <Select value={formData.status} onValueChange={(value: Task['status']) => updateFormData('status', value)}>
            <SelectTrigger className="dark:bg-slate-800 dark:text-white dark:border-slate-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
              <SelectItem value="todo" className="dark:text-white dark:hover:bg-slate-700">To Do</SelectItem>
              <SelectItem value="in-progress" className="dark:text-white dark:hover:bg-slate-700">In Progress</SelectItem>
              <SelectItem value="pending" className="dark:text-white dark:hover:bg-slate-700">Pending</SelectItem>
              <SelectItem value="completed" className="dark:text-white dark:hover:bg-slate-700">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="beginDate" className="text-slate-700 dark:text-slate-300">Begin Date</Label>
          <Input
            id="beginDate"
            type="date"
            value={formData.beginDate}
            onChange={(e) => updateFormData('beginDate', e.target.value)}
            className="dark:bg-slate-800 dark:text-white dark:border-slate-700"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dueDate" className="text-slate-700 dark:text-slate-300">Due Date</Label>
          <Input
            id="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={(e) => updateFormData('dueDate', e.target.value)}
            required
            className="dark:bg-slate-800 dark:text-white dark:border-slate-700"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="progress" className="text-slate-700 dark:text-slate-300">Progress (%)</Label>
        <Input
          id="progress"
          type="number"
          min="0"
          max="100"
          value={formData.progress}
          onChange={(e) => updateFormData('progress', parseInt(e.target.value) || 0)}
          className="dark:bg-slate-800 dark:text-white dark:border-slate-700"
        />
      </div>

      <TaskTagsField
        tags={formData.tags}
        onTagsChange={(tags) => updateFormData('tags', tags)}
      />

      <div className="space-y-2">
        <Label className="text-slate-700 dark:text-slate-300">Assignees</Label>
        <MultipleAssigneeSelect
          selectedAssignees={formData.assignees}
          onAssigneesChange={(assignees) => updateFormData('assignees', assignees)}
          availableAssignees={availableAssignees}
        />
      </div>
    </>
  );
}
