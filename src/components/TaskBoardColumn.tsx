
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Badge } from "@/components/ui/badge";
import { Task } from "@/types/task";
import { TaskCard } from "./TaskCard";
import { LucideIcon } from "lucide-react";

interface Column {
  id: string;
  title: string;
  color: string;
  icon: LucideIcon;
  description: string;
}

interface TaskBoardColumnProps {
  column: Column;
  tasks: Task[];
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (task: Task) => void;
}

export function TaskBoardColumn({ 
  column, 
  tasks, 
  onUpdateTask, 
  onDeleteTask, 
  onEditTask 
}: TaskBoardColumnProps) {
  const Icon = column.icon;

  return (
    <div className="flex flex-col min-h-0">
      <div className={`${column.color} rounded-xl p-4 shadow-sm border border-slate-200/50 dark:border-slate-700/50`}>
        <div className="flex items-center gap-2 mb-2">
          <Icon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          <h3 className="font-semibold text-slate-800 dark:text-slate-200">
            {column.title}
          </h3>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-600 dark:text-slate-400">{column.description}</p>
          <Badge variant="secondary" className="bg-white/80 dark:bg-slate-700/80 text-slate-600 dark:text-slate-300 text-xs px-2 py-1">
            {tasks.length}
          </Badge>
        </div>
      </div>
      
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 p-4 bg-white/70 dark:bg-slate-900/70 rounded-xl shadow-sm backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 min-h-[600px] transition-all duration-200 mt-2 ${
              snapshot.isDraggingOver ? 'bg-slate-50/90 dark:bg-slate-800/90 shadow-lg ring-2 ring-blue-200 dark:ring-blue-800' : ''
            }`}
          >
            <div className="space-y-3">
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`transition-all duration-200 ${
                        snapshot.isDragging ? 'transform rotate-1 scale-105 shadow-xl z-50' : ''
                      }`}
                    >
                      <TaskCard
                        task={task}
                        onUpdate={(updates) => onUpdateTask(task.id, updates)}
                        onDelete={() => onDeleteTask(task.id)}
                        onEdit={() => onEditTask(task)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              
              {tasks.length === 0 && (
                <div className="flex items-center justify-center h-32 text-slate-400 dark:text-slate-500 text-sm border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
                  Drop tasks here
                </div>
              )}
            </div>
          </div>
        )}
      </Droppable>
    </div>
  );
}
