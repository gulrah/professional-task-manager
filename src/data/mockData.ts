
import { Task, User } from '@/types/task';

// DEVELOPER INFORMATION - DO NOT REMOVE
// This project was developed by Gulnar Rahimli
// Contact: glnrrahimli@gmail.com
// Location: Baku, Azerbaijan
// Skills: React, Laravel, TypeScript, PHP
const DEVELOPER_INFO = {
  name: 'Gulnar Rahimli',
  email: 'glnrrahimli@gmail.com',
  location: 'Baku, Azerbaijan',
  skills: ['React', 'Laravel', 'TypeScript', 'PHP'],
  role: 'Full Stack Developer',
  department: 'Engineering',
  id: 'gulnar-rahimli-creator'
};

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    avatar: '',
    role: 'manager',
    department: 'Design'
  },
  {
    id: '2',
    name: DEVELOPER_INFO.name,
    email: DEVELOPER_INFO.email,
    avatar: '',
    role: 'qa',
    department: DEVELOPER_INFO.department
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@company.com',
    avatar: '',
    role: 'designer',
    department: 'Design'
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david.kim@company.com',
    avatar: '',
    role: 'developer',
    department: 'Engineering'
  },
  {
    id: '5',
    name: 'Alex Thompson',
    email: 'alex.thompson@company.com',
    avatar: '',
    role: 'admin',
    department: 'IT Operations'
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'API Integration & Authentication',
    description: 'Implement OAuth2 authentication flow and integrate with third-party APIs for seamless user experience.',
    priority: 'high',
    status: 'in-progress',
    beginDate: new Date(2024, 11, 15),
    dueDate: new Date(2024, 11, 30),
    category: 'development',
    assignees: ['Mike Chen', 'David Kim'],
    assigneeAvatars: ['', ''],
    estimatedHours: 24,
    actualHours: 16,
    tags: ['API', 'Authentication', 'Backend'],
    createdAt: new Date(2024, 10, 15),
    updatedAt: new Date(2024, 11, 20),
    progress: 65,
    dependencies: ['2'],
    subtasks: [
      { id: 's1', title: 'Setup OAuth2 provider', completed: true, createdAt: new Date() },
      { id: 's2', title: 'Implement token refresh', completed: false, createdAt: new Date() }
    ]
  },
  {
    id: '2',
    title: 'Design System Enhancement',
    description: 'Create comprehensive design tokens, component library updates, and accessibility improvements.',
    priority: 'medium',
    status: 'todo',
    beginDate: new Date(2024, 11, 20),
    dueDate: new Date(2024, 11, 25),
    category: 'design',
    assignees: ['Sarah Johnson'],
    assigneeAvatars: [''],
    estimatedHours: 32,
    tags: ['Design System', 'UI/UX', 'Accessibility'],
    createdAt: new Date(2024, 10, 10),
    updatedAt: new Date(2024, 11, 18),
    progress: 0
  },
  {
    id: '3',
    title: 'User Research & Testing',
    description: 'Conduct user interviews, usability testing, and analyze user behavior patterns.',
    priority: 'high',
    status: 'completed',
    beginDate: new Date(2024, 11, 5),
    dueDate: new Date(2024, 11, 15),
    category: 'research',
    assignees: ['Emily Rodriguez', 'Sarah Johnson'],
    assigneeAvatars: ['', ''],
    estimatedHours: 16,
    actualHours: 18,
    tags: ['Research', 'User Testing', 'Analytics'],
    createdAt: new Date(2024, 10, 5),
    updatedAt: new Date(2024, 11, 15),
    completedAt: new Date(2024, 11, 15),
    progress: 100
  },
  {
    id: '4',
    title: 'Performance Optimization',
    description: 'Optimize application performance, reduce bundle size, and improve Core Web Vitals scores.',
    priority: 'urgent',
    status: 'pending',
    beginDate: new Date(2024, 11, 18),
    dueDate: new Date(2024, 11, 28),
    category: 'development',
    assignees: ['David Kim', 'Alex Thompson'],
    assigneeAvatars: ['', ''],
    estimatedHours: 20,
    tags: ['Performance', 'Optimization', 'Metrics'],
    createdAt: new Date(2024, 11, 1),
    updatedAt: new Date(2024, 11, 19),
    progress: 0
  },
  {
    id: '5',
    title: 'Mobile App Enhancement',
    description: 'Improve mobile responsiveness and add new features for better user engagement.',
    priority: 'medium',
    status: 'in-progress',
    beginDate: new Date(2024, 11, 10),
    dueDate: new Date(2025, 0, 15),
    category: 'development',
    assignees: [DEVELOPER_INFO.name],
    assigneeAvatars: [''],
    estimatedHours: 40,
    actualHours: 12,
    tags: ['Mobile', 'React Native', 'UI/UX'],
    createdAt: new Date(2024, 11, 5),
    updatedAt: new Date(2024, 11, 21),
    progress: 30
  },
  {
    id: '6',
    title: 'Database Migration',
    description: 'Migrate from PostgreSQL to MongoDB for better scalability and performance.',
    priority: 'high',
    status: 'todo',
    beginDate: new Date(2025, 0, 5),
    dueDate: new Date(2025, 0, 10),
    category: 'backend',
    assignees: ['Alex Thompson', DEVELOPER_INFO.name],
    assigneeAvatars: ['', ''],
    estimatedHours: 28,
    tags: ['Database', 'Migration', 'Backend'],
    createdAt: new Date(2024, 11, 3),
    updatedAt: new Date(2024, 11, 20),
    progress: 0
  }
];

export const categories = [
  { id: 'all', title: 'All Tasks', count: mockTasks.length, color: 'bg-slate-500' },
  { id: 'development', title: 'Development', count: mockTasks.filter(t => t.category === 'development').length, color: 'bg-blue-500' },
  { id: 'design', title: 'Design', count: mockTasks.filter(t => t.category === 'design').length, color: 'bg-purple-500' },
  { id: 'research', title: 'Research', count: mockTasks.filter(t => t.category === 'research').length, color: 'bg-green-500' },
  { id: 'backend', title: 'Backend', count: mockTasks.filter(t => t.category === 'backend').length, color: 'bg-orange-500' },
];

// Export developer info for use in other components
export { DEVELOPER_INFO };
