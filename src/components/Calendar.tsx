
import { Task } from "@/types/task";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface CalendarProps {
  tasks: Task[];
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
}

const priorityColors = {
  low: 'bg-green-500',
  medium: 'bg-yellow-500',
  high: 'bg-red-500',
};

export function Calendar({ tasks, onUpdateTask }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => isSameDay(task.dueDate, date));
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  return (
    <div className="h-full">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Calendar View</h2>
          <p className="text-slate-600 dark:text-slate-400">View your tasks organized by due dates</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigateMonth('prev')}
            className="h-9 w-9 p-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white min-w-[150px] text-center">
            {format(currentDate, 'MMMM yyyy')}
          </h3>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigateMonth('next')}
            className="h-9 w-9 p-0"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-3 text-center font-medium text-slate-600 dark:text-slate-400 text-sm">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {monthDays.map(day => {
            const dayTasks = getTasksForDate(day);
            const isCurrentDay = isToday(day);
            
            return (
              <div
                key={day.toISOString()}
                className={`min-h-[120px] p-2 border border-slate-100 dark:border-slate-700 rounded-lg transition-colors duration-150 hover:bg-slate-50 dark:hover:bg-slate-800 ${
                  isCurrentDay ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700' : ''
                }`}
              >
                <div className={`text-sm font-medium mb-2 ${
                  isCurrentDay 
                    ? 'text-blue-700 dark:text-blue-300' 
                    : 'text-slate-900 dark:text-white'
                }`}>
                  {format(day, 'd')}
                </div>
                
                <div className="space-y-1">
                  {dayTasks.slice(0, 3).map(task => (
                    <div
                      key={task.id}
                      className="text-xs p-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 hover:shadow-sm transition-shadow cursor-pointer"
                    >
                      <div className="flex items-center gap-1 mb-1">
                        <div className={`w-2 h-2 rounded-full ${priorityColors[task.priority]}`} />
                        <span className="font-medium text-slate-900 dark:text-white line-clamp-1">
                          {task.title}
                        </span>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className="text-xs px-1 py-0 h-4"
                      >
                        {task.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  ))}
                  
                  {dayTasks.length > 3 && (
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      +{dayTasks.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
