
export interface Department {
  id: string;
  name: string;
  color: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
  departments: Department[];
  status: 'todo' | 'in-progress' | 'completed' | 'pending';
  beginDate: Date;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}
