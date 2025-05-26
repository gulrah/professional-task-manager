
import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Task } from "@/types/task";
import { format } from "date-fns";
import { mockUsers } from '@/data/mockData';
import { EditTaskModalHeader } from './EditTaskModalHeader';
import { EditTaskForm } from './EditTaskForm';
import { EditTaskModalActions } from './EditTaskModalActions';

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
}

export const EditTaskModal = ({ isOpen, onClose, task, onUpdateTask }: EditTaskModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as Task['priority'],
    status: 'todo' as Task['status'],
    category: '',
    dueDate: '',
    beginDate: '',
    progress: 0,
    tags: [] as string[],
    assignees: [] as string[]
  });

  const availableAssignees = mockUsers.map(user => user.name);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        category: task.category,
        dueDate: format(task.dueDate, 'yyyy-MM-dd'),
        beginDate: format(task.beginDate, 'yyyy-MM-dd'),
        progress: task.progress,
        tags: [...task.tags],
        assignees: [...task.assignees]
      });
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task) return;

    onUpdateTask(task.id, {
      ...formData,
      dueDate: new Date(formData.dueDate),
      beginDate: new Date(formData.beginDate),
      updatedAt: new Date()
    });
    onClose();
  };

  const handleFormDataChange = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  if (!task) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <EditTaskModalHeader />
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <EditTaskForm
            formData={formData}
            onFormDataChange={handleFormDataChange}
            availableAssignees={availableAssignees}
          />

          <EditTaskModalActions
            onCancel={onClose}
            onSubmit={() => {}}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};
