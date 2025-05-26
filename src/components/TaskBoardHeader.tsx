
import { Task } from "@/types/task";
import { TaskBoardStats } from "./TaskBoardStats";

interface TaskBoardHeaderProps {
  tasks: Task[];
  activeTasks: Task[];
}

export function TaskBoardHeader({ tasks, activeTasks }: TaskBoardHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-2">
            Task Board
          </h2>
          <p className="text-slate-600 dark:text-slate-400">Organize and track your tasks with a visual kanban board</p>
        </div>
        
        <TaskBoardStats tasks={tasks} activeTasks={activeTasks} />
      </div>
    </div>
  );
}
