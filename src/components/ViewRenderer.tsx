
import { TaskBoard } from "@/components/TaskBoard";
import { TaskList } from "@/components/TaskList";
import { ModernCalendar } from "@/components/ModernCalendar";
import { QuickActions } from "@/components/QuickActions";
import { Analytics } from "@/components/Analytics";
import { TeamManagement } from "@/components/TeamManagement";
import { Task, ViewMode } from "@/types/task";
import { Project } from "@/types/project";

interface ViewRendererProps {
  currentView: ViewMode;
  isTeamManagementOpen: boolean;
  filteredTasks: Task[];
  projects: Project[];
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onDeleteTask: (taskId: string) => void;
  onCreateTask: () => void;
  onCreateProject: () => void;
  onManageTeam: () => void;
}

export const ViewRenderer = ({
  currentView,
  isTeamManagementOpen,
  filteredTasks,
  projects,
  onUpdateTask,
  onDeleteTask,
  onCreateTask,
  onCreateProject,
  onManageTeam
}: ViewRendererProps) => {
  if (isTeamManagementOpen) {
    return <TeamManagement />;
  }

  switch (currentView) {
    case 'board':
      return <TaskBoard tasks={filteredTasks} onUpdateTask={onUpdateTask} onDeleteTask={onDeleteTask} />;
    case 'list':
      return <TaskList tasks={filteredTasks} onUpdateTask={onUpdateTask} onDeleteTask={onDeleteTask} />;
    case 'calendar':
      return <ModernCalendar tasks={filteredTasks} onUpdateTask={onUpdateTask} />;
    case 'timeline':
      return (
        <QuickActions 
          onCreateTask={onCreateTask}
          onCreateProject={onCreateProject}
          onManageTeam={onManageTeam}
        />
      );
    case 'analytics':
      return <Analytics tasks={filteredTasks} />;
    default:
      return <TaskBoard tasks={filteredTasks} onUpdateTask={onUpdateTask} onDeleteTask={onDeleteTask} />;
  }
};
