
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Clock } from "lucide-react";
import { Task } from "@/types/task";

interface TaskBoardStatsProps {
  tasks: Task[];
  activeTasks: Task[];
}

export function TaskBoardStats({ tasks, activeTasks }: TaskBoardStatsProps) {
  const getTotalProgress = () => {
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    return tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;
  };

  const getUrgentCount = () => {
    return activeTasks.filter(task => task.priority === 'urgent').length;
  };

  const getOverdueTasks = () => {
    return activeTasks.filter(task => {
      const isOverdue = new Date() > task.dueDate;
      return isOverdue;
    });
  };

  const overdueTasks = getOverdueTasks();

  return (
    <div className="flex items-center gap-4">
      {getUrgentCount() > 0 && (
        <Badge variant="destructive" className="flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {getUrgentCount()} urgent
        </Badge>
      )}
      {overdueTasks.length > 0 && (
        <Badge variant="outline" className="flex items-center gap-1 border-orange-500 text-orange-600">
          <Clock className="w-3 h-3" />
          {overdueTasks.length} overdue
        </Badge>
      )}
      <div className="text-right">
        <div className="text-2xl font-bold text-slate-900 dark:text-white">{getTotalProgress()}%</div>
        <div className="text-xs text-slate-500">Complete</div>
      </div>
    </div>
  );
}
