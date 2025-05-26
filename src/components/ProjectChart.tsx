
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Task } from "@/types/task";
import { Project } from "@/types/project";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ProjectChartProps {
  tasks: Task[];
  projects?: Project[];
}

export function ProjectChart({ tasks, projects = [] }: ProjectChartProps) {
  // Task status distribution
  const taskStatusData = {
    labels: ['To Do', 'In Progress', 'Pending', 'Completed'],
    datasets: [
      {
        data: [
          tasks.filter(t => t.status === 'todo').length,
          tasks.filter(t => t.status === 'in-progress').length,
          tasks.filter(t => t.status === 'pending').length,
          tasks.filter(t => t.status === 'completed').length,
        ],
        backgroundColor: [
          '#ef4444',
          '#3b82f6',
          '#f59e0b',
          '#10b981',
        ],
        borderWidth: 0,
      },
    ],
  };

  // Weekly task completion trend
  const weeklyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Tasks Completed',
        data: [12, 19, 8, 15, 22, 8, 14],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
      {
        label: 'Tasks Created',
        data: [8, 15, 12, 20, 18, 10, 16],
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Task Status Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <Doughnut data={taskStatusData} options={doughnutOptions} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <Bar data={weeklyData} options={chartOptions} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
