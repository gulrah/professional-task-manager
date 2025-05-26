
import { useState } from 'react';
import { Task } from "@/types/task";
import { EditTaskModal } from "./EditTaskModal";
import { TaskBoardHeader } from "./TaskBoardHeader";
import { TaskBoardColumn } from "./TaskBoardColumn";
import { DragDropContext } from "react-beautiful-dnd";
import { Clock, Pause } from "lucide-react";

interface TaskBoardProps {
  tasks: Task[];
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onDeleteTask: (taskId: string) => void;
}

const columns = [
  { 
    id: 'todo', 
    title: 'To Do', 
    color: 'bg-slate-100 dark:bg-slate-800',
    icon: Clock,
    description: 'Tasks to start'
  },
  { 
    id: 'in-progress', 
    title: 'In Progress', 
    color: 'bg-blue-50 dark:bg-blue-900/20',
    icon: Clock,
    description: 'Active tasks'
  },
  { 
    id: 'pending', 
    title: 'Pending', 
    color: 'bg-amber-50 dark:bg-amber-900/20',
    icon: Pause,
    description: 'Waiting for review'
  }
];

export function TaskBoard({ tasks, onUpdateTask, onDeleteTask }: TaskBoardProps) {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Filter out completed tasks from board view
  const activeTasks = tasks.filter(task => task.status !== 'completed');

  const getTasksByStatus = (status: string) => {
    const filtered = activeTasks.filter(task => task.status === status);
    console.log(`getTasksByStatus(${status}):`, filtered.map(t => ({ id: t.id, title: t.title, status: t.status })));
    return filtered;
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { draggableId, destination, source } = result;
    const newStatus = destination.droppableId as Task['status'];
    const oldStatus = source.droppableId as Task['status'];
    
    console.log('=== DRAG OPERATION START ===');
    console.log('Drag end - Task ID:', draggableId);
    console.log('Old status:', oldStatus, 'New status:', newStatus);
    
    const taskBeforeUpdate = tasks.find(t => t.id === draggableId);
    console.log('Task before update:', taskBeforeUpdate);
    
    if (!taskBeforeUpdate) {
      console.error('Task not found before update!');
      return;
    }
    
    // Update the task with the new status
    onUpdateTask(draggableId, { status: newStatus });
    
    console.log('Update called for task:', draggableId, 'to status:', newStatus);
    console.log('=== DRAG OPERATION END ===');
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingTask(null);
  };

  // Enhanced debug logging
  console.log('=== TASK BOARD RENDER ===');
  console.log('All tasks:', tasks.length, tasks.map(t => ({ id: t.id, title: t.title, status: t.status })));
  console.log('Active tasks (non-completed):', activeTasks.length, activeTasks.map(t => ({ id: t.id, title: t.title, status: t.status })));
  console.log('Todo tasks:', getTasksByStatus('todo').length);
  console.log('In-progress tasks:', getTasksByStatus('in-progress').length);
  console.log('Pending tasks:', getTasksByStatus('pending').length);

  return (
    <div className="h-full">
      <TaskBoardHeader tasks={tasks} activeTasks={activeTasks} />
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-full">
          {columns.map((column) => {
            const columnTasks = getTasksByStatus(column.id);
            
            return (
              <TaskBoardColumn
                key={column.id}
                column={column}
                tasks={columnTasks}
                onUpdateTask={onUpdateTask}
                onDeleteTask={onDeleteTask}
                onEditTask={handleEditTask}
              />
            );
          })}
        </div>
      </DragDropContext>

      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        task={editingTask}
        onUpdateTask={onUpdateTask}
      />
    </div>
  );
}
