
export type TaskStatus = 'todo' | 'in-progress' | 'completed' | 'pending';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type ViewMode = 'board' | 'list' | 'calendar' | 'timeline' | 'analytics';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'manager' | 'developer' | 'designer' | 'qa';
  department: string;
}

export interface Notification {
  id: string;
  type: 'task_assigned' | 'deadline_approaching' | 'task_completed' | 'team_mention' | 'project_update';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: Date;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignees: string[];
  assigneeAvatars?: string[];
  tags: string[];
  category: string;
  projectId?: string;
  departmentId?: string;
  dueDate: Date;
  beginDate: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  progress: number;
  estimatedHours?: number;
  actualHours?: number;
  subtasks?: Subtask[];
  comments?: Comment[];
  attachments?: Attachment[];
  dependencies?: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
  status: TaskStatus;
  beginDate: Date;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}
