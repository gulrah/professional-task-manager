import { Task } from "@/types/task";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Trash2, Edit, MessageSquare, Paperclip, Users, AlertTriangle, CheckCircle2, Circle, User } from "lucide-react";
import { format, isAfter, differenceInDays } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onUpdate: (updates: Partial<Task>) => void;
  onDelete: () => void;
  onEdit?: () => void;
  variant?: 'default' | 'compact' | 'detailed';
}

const priorityColors = {
  low: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 border-green-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300 border-yellow-200',
  high: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300 border-orange-200',
  urgent: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 border-red-200',
};

const statusColors = {
  todo: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300',
  'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
  completed: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
  pending: 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300',
  outdated: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
};

const categoryColors = {
  design: 'bg-purple-500',
  development: 'bg-blue-500',
  research: 'bg-green-500',
  qa: 'bg-orange-500',
  security: 'bg-red-500',
  marketing: 'bg-pink-500',
};

export function TaskCard({ task, onUpdate, onDelete, onEdit, variant = 'default' }: TaskCardProps) {
  const isOverdue = isAfter(new Date(), task.dueDate) && task.status !== 'completed';
  const daysUntilDue = differenceInDays(task.dueDate, new Date());
  const completedSubtasks = task.subtasks?.filter(st => st.completed).length || 0;
  const totalSubtasks = task.subtasks?.length || 0;
  
  const getPriorityIcon = () => {
    switch (task.priority) {
      case 'urgent':
        return <AlertTriangle className="w-3 h-3" />;
      case 'high':
        return <Circle className="w-3 h-3 fill-current" />;
      case 'medium':
        return <Circle className="w-3 h-3" />;
      default:
        return <Circle className="w-2 h-2 fill-current" />;
    }
  };

  const getStatusIcon = () => {
    switch (task.status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-blue-500" />;
      default:
        return <Circle className="w-4 h-4 text-slate-400" />;
    }
  };

  if (variant === 'compact') {
    return (
      <Card className="p-3 hover:shadow-md transition-all duration-200 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 group">
        <div className="flex items-center gap-3">
          {getStatusIcon()}
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-slate-900 dark:text-white truncate text-sm">
              {task.title}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="secondary" className={cn("text-xs px-1.5 py-0.5", priorityColors[task.priority])}>
                {task.priority}
              </Badge>
              <span className="text-xs text-slate-500">
                {format(task.dueDate, 'MMM dd')}
              </span>
            </div>
          </div>
          <div className="flex -space-x-1">
            {task.assignees.slice(0, 2).map((assignee, index) => (
              <Avatar key={index} className="w-6 h-6 border-2 border-white">
                <AvatarImage src={task.assigneeAvatars?.[index]} />
                <AvatarFallback className="text-xs bg-slate-200 dark:bg-slate-700">
                  {assignee.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            ))}
            {task.assignees.length > 2 && (
              <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white flex items-center justify-center">
                <span className="text-xs text-slate-600 dark:text-slate-300">+{task.assignees.length - 2}</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className={cn(
      "p-4 hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 group relative overflow-hidden",
      isOverdue && "border-l-4 border-l-red-500",
      task.status === 'completed' && "opacity-75"
    )}>
      {/* Priority indicator */}
      <div className={`absolute top-0 left-0 w-full h-1 ${
        task.priority === 'urgent' ? 'bg-red-500' :
        task.priority === 'high' ? 'bg-orange-500' :
        task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
      }`} />
      
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${categoryColors[task.category as keyof typeof categoryColors] || 'bg-slate-500'}`} />
          <Badge variant="secondary" className={cn("text-xs", priorityColors[task.priority])}>
            {getPriorityIcon()}
            <span className="ml-1">{task.priority}</span>
          </Badge>
          <Badge variant="secondary" className={statusColors[task.status]}>
            {task.status.replace('-', ' ')}
          </Badge>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onEdit}
            className="h-6 w-6 p-0 text-slate-400 hover:text-slate-600"
          >
            <Edit className="w-3 h-3" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onDelete}
            className="h-6 w-6 p-0 text-slate-400 hover:text-red-500"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>

      <h4 className={cn(
        "font-semibold text-slate-900 dark:text-white mb-2 line-clamp-2",
        task.status === 'completed' && "line-through text-slate-500"
      )}>
        {task.title}
      </h4>
      
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
        {task.description}
      </p>

      {/* Progress bar */}
      {task.progress > 0 && (
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Progress</span>
            <span>{task.progress}%</span>
          </div>
          <Progress value={task.progress} className="h-2" />
        </div>
      )}

      {/* Subtasks indicator */}
      {totalSubtasks > 0 && (
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
          <CheckCircle2 className="w-3 h-3" />
          <span>{completedSubtasks}/{totalSubtasks} subtasks</span>
        </div>
      )}

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800">
              {tag}
            </Badge>
          ))}
          {task.tags.length > 3 && (
            <Badge variant="outline" className="text-xs px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800">
              +{task.tags.length - 3}
            </Badge>
          )}
        </div>
      )}

      {/* Bottom section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Due date */}
          <div className={cn(
            "flex items-center gap-1 text-xs",
            isOverdue ? 'text-red-500 font-medium' : 'text-slate-500 dark:text-slate-400'
          )}>
            <Calendar className="w-3 h-3" />
            <span>{format(task.dueDate, 'MMM dd')}</span>
            {isOverdue && (
              <Badge variant="destructive" className="text-xs px-1 py-0 ml-1">
                {Math.abs(daysUntilDue)}d overdue
              </Badge>
            )}
          </div>

          {/* Additional indicators */}
          <div className="flex items-center gap-2">
            {task.comments && task.comments.length > 0 && (
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <MessageSquare className="w-3 h-3" />
                <span>{task.comments.length}</span>
              </div>
            )}
            {task.attachments && task.attachments.length > 0 && (
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Paperclip className="w-3 h-3" />
                <span>{task.attachments.length}</span>
              </div>
            )}
            {task.estimatedHours && (
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Clock className="w-3 h-3" />
                <span>{task.estimatedHours}h</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Assignees */}
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1">
            {task.assignees.slice(0, 3).map((assignee, index) => (
              <Avatar key={index} className="w-6 h-6 ring-2 ring-slate-200 dark:ring-slate-700">
                <AvatarImage src={task.assigneeAvatars?.[index]} />
                <AvatarFallback className="text-xs bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                  {assignee.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            ))}
            {task.assignees.length > 3 && (
              <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 ring-2 ring-slate-200 dark:ring-slate-700 flex items-center justify-center">
                <span className="text-xs text-slate-600 dark:text-slate-300">+{task.assignees.length - 3}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
