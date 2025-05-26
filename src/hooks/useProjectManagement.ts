
import { useState } from 'react';
import { Project } from '@/types/project';
import { useToast } from '@/hooks/use-toast';

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Mobile App Redesign',
    description: 'Complete redesign of the mobile application',
    color: 'bg-blue-500',
    departments: [
      { id: 'dept1', name: 'Design', color: 'bg-purple-500' },
      { id: 'dept2', name: 'Development', color: 'bg-green-500' },
      { id: 'dept3', name: 'QA', color: 'bg-orange-500' }
    ],
    status: 'in-progress',
    beginDate: new Date(),
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'API v2.0 Development',
    description: 'Development of the new API version',
    color: 'bg-purple-500',
    departments: [
      { id: 'dept4', name: 'Backend', color: 'bg-blue-500' },
      { id: 'dept5', name: 'DevOps', color: 'bg-red-500' },
      { id: 'dept6', name: 'Testing', color: 'bg-yellow-500' }
    ],
    status: 'todo',
    beginDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const useProjectManagement = () => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const { toast } = useToast();

  const addProject = (newProject: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const project: Project = {
      ...newProject,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setProjects(prev => [...prev, project]);
    toast({
      title: "Project created successfully",
      description: `"${project.name}" has been added.`,
    });
  };

  const updateProject = (projectId: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, ...updates, updatedAt: new Date() }
        : project
    ));
  };

  const deleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
  };

  return {
    projects,
    addProject,
    updateProject,
    deleteProject
  };
};
