
import { useState } from 'react';
import { Task } from "@/types/task";
import { EditTaskModal } from "./EditTaskModal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";

interface TaskListProps {
  tasks: Task[];
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onDeleteTask: (taskId: string) => void;
}

const priorityColors = {
  low: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
  high: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
  urgent: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
};

const statusColors = {
  todo: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300',
  'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
  completed: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
  pending: 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300',
};

export function TaskList({ tasks, onUpdateTask, onDeleteTask }: TaskListProps) {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleStatusChange = (taskId: string, completed: boolean) => {
    onUpdateTask(taskId, { status: completed ? 'completed' : 'todo' });
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Task List</h2>
        <p className="text-slate-600 dark:text-slate-400">Detailed view of all your tasks with sorting and filtering options</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 dark:bg-slate-800">
              <TableHead className="w-12"></TableHead>
              <TableHead className="font-semibold">Task</TableHead>
              <TableHead className="font-semibold">Priority</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Due Date</TableHead>
              <TableHead className="font-semibold">Assignees</TableHead>
              <TableHead className="font-semibold w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => {
              const isOverdue = task.dueDate < new Date() && task.status !== 'completed';
              
              return (
                <TableRow 
                  key={task.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-150"
                >
                  <TableCell>
                    <Checkbox
                      checked={task.status === 'completed'}
                      onCheckedChange={(checked) => handleStatusChange(task.id, checked as boolean)}
                      className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className={`font-medium ${task.status === 'completed' ? 'line-through text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                        {task.title}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400 line-clamp-1">
                        {task.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={priorityColors[task.priority]}>
                      {task.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[task.status]}>
                      {task.status.replace('-', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className={`flex items-center gap-2 text-sm ${isOverdue ? 'text-red-500 font-medium' : 'text-slate-600 dark:text-slate-400'}`}>
                      <Calendar className="w-4 h-4" />
                      {format(task.dueDate, 'MMM dd, yyyy')}
                      {isOverdue && (
                        <Badge variant="destructive" className="text-xs px-1 py-0">
                          Overdue
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1">
                        {task.assignees.slice(0, 2).map((assignee, index) => (
                          <Avatar key={index} className="w-6 h-6 border-2 border-white">
                            <AvatarFallback className="text-xs bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                              {assignee.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {task.assignees.length > 2 && (
                          <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white flex items-center justify-center">
                            <span className="text-xs text-slate-600 dark:text-slate-300">+{task.assignees.length - 2}</span>
                          </div>
                        )}
                      </div>
                      <span className="text-sm text-slate-600 dark:text-slate-400 hidden sm:inline">
                        {task.assignees.length > 1 ? `${task.assignees.length} assignees` : task.assignees[0]}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEditTask(task)}
                        className="h-8 w-8 p-0 text-slate-400 hover:text-slate-600"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => onDeleteTask(task.id)}
                        className="h-8 w-8 p-0 text-slate-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        task={editingTask}
        onUpdateTask={onUpdateTask}
      />
    </div>
  );
}
