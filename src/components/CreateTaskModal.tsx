import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { TaskPriority, TaskStatus } from '@/types/task';
import { Project } from '@/types/project';
import { TaskFormFields } from './TaskFormFields';
import { TaskMetaFields } from './TaskMetaFields';
import { TaskDateFields } from './TaskDateFields';
import { TaskAssigneeField } from './TaskAssigneeField';
import { TaskProjectField } from './TaskProjectField';
import { mockUsers } from '@/data/mockData';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (task: Omit<any, 'id' | 'createdAt' | 'updatedAt'>) => void;
  projects: Project[];
}

export function CreateTaskModal({ isOpen, onClose, onCreateTask, projects }: CreateTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [beginDate, setBeginDate] = useState<Date>();
  const [dueDate, setDueDate] = useState<Date>();
  const [category, setCategory] = useState('');
  const [assignees, setAssignees] = useState<string[]>([]);
  const [projectId, setProjectId] = useState<string>('');

  // Ensure availableAssignees is always an array
  const availableAssignees = mockUsers && Array.isArray(mockUsers) 
    ? mockUsers.map(user => user.name).filter(Boolean)
    : ['John Doe', 'Jane Smith', 'Mike Johnson']; // Fallback data

  console.log('mockUsers:', mockUsers);
  console.log('availableAssignees:', availableAssignees);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !beginDate || !dueDate) return;

    onCreateTask({
      title,
      description,
      priority,
      status,
      beginDate,
      dueDate,
      category,
      assignees,
      projectId: projectId === 'none' ? undefined : projectId, // Convert 'none' back to undefined
      progress: 0,
      tags: [],
      subtasks: [],
      comments: [],
    });

    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setStatus('todo');
    setBeginDate(undefined);
    setDueDate(undefined);
    setCategory('');
    setAssignees([]);
    setProjectId('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="relative pb-4">
          <DialogTitle className="text-xl font-semibold">Create New Task</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new task for your team.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TaskFormFields
              title={title}
              description={description}
              onTitleChange={setTitle}
              onDescriptionChange={setDescription}
            />
            
            <TaskMetaFields
              priority={priority}
              status={status}
              category={category}
              onPriorityChange={setPriority}
              onStatusChange={setStatus}
              onCategoryChange={setCategory}
            />
          </div>

          <TaskProjectField
            selectedProjectId={projectId}
            projects={projects}
            onProjectChange={setProjectId}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TaskDateFields
              beginDate={beginDate}
              dueDate={dueDate}
              onBeginDateChange={setBeginDate}
              onDueDateChange={setDueDate}
            />
          </div>

          <TaskAssigneeField
            assignees={assignees}
            availableAssignees={availableAssignees}
            onAssigneesChange={setAssignees}
          />

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose} className="px-6">
              Cancel
            </Button>
            <Button type="submit" className="px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Create Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
