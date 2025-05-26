
import { useEffect } from 'react';
import { Task } from '@/types/task';
import { Project } from '@/types/project';

interface UseAutoStatusUpdateProps {
  tasks: Task[];
  projects: Project[];
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onUpdateProject?: (projectId: string, updates: Partial<Project>) => void;
}

export const useAutoStatusUpdate = ({
  tasks,
  projects,
  onUpdateTask,
  onUpdateProject
}: UseAutoStatusUpdateProps) => {
  useEffect(() => {
    const now = new Date();
    
    // Update task statuses based on begin dates
    tasks.forEach(task => {
      if (task.status === 'todo' && task.beginDate <= now) {
        onUpdateTask(task.id, { status: 'pending' });
      }
    });

    // Update project statuses based on begin dates
    if (onUpdateProject) {
      projects.forEach(project => {
        if (project.status === 'todo' && project.beginDate <= now) {
          onUpdateProject(project.id, { status: 'pending' });
        }
      });
    }
  }, [tasks, projects, onUpdateTask, onUpdateProject]);
};
