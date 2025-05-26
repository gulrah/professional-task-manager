
export interface AdminProfile {
  name: string;
  email: string;
  role: string;
  department: string;
  avatar: string;
  joinDate: string;
  lastLogin: string;
  location: string;
  skills: string[];
  permissions: string[];
  stats: {
    projectsManaged: number;
    tasksCompleted: number;
    teamMembers: number;
    uptime: string;
  };
  projectCreator: boolean;
}
