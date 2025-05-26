
import { useState } from 'react';
import { Task } from "@/types/task";
import { mockTasks } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

export const useTaskManagement = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const { toast } = useToast();

  const addTask = (newTask: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks(prev => [...prev, task]);
    toast({
      title: "Task created successfully",
      description: `"${task.title}" has been added with ${task.assignees.length} assignee(s).`,
    });
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    console.log('=== UPDATE TASK START ===');
    console.log('updateTask called with taskId:', taskId, 'updates:', updates);
    
    setTasks(prev => {
      console.log('Tasks before update:', prev.length, prev.map(t => ({ id: t.id, title: t.title, status: t.status })));
      
      const taskToUpdate = prev.find(t => t.id === taskId);
      console.log('Task to update found:', taskToUpdate);
      
      if (!taskToUpdate) {
        console.error('Task not found for update!');
        return prev;
      }
      
      const updatedTasks = prev.map(task => 
        task.id === taskId 
          ? { 
              ...task, 
              ...updates, 
              updatedAt: new Date(),
              completedAt: updates.status === 'completed' ? new Date() : task.completedAt
            }
          : task
      );
      
      const updatedTask = updatedTasks.find(t => t.id === taskId);
      console.log('Task after update:', updatedTask);
      console.log('All tasks after update:', updatedTasks.length, updatedTasks.map(t => ({ id: t.id, title: t.title, status: t.status })));
      console.log('=== UPDATE TASK END ===');
      
      return updatedTasks;
    });
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask
  };
};
