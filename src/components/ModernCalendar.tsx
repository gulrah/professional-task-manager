
import { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Task } from "@/types/task";
import { format, isSameDay } from "date-fns";

interface ModernCalendarProps {
  tasks: Task[];
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
}

export const ModernCalendar = ({ tasks, onUpdateTask }: ModernCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => isSameDay(task.dueDate, date));
  };

  const selectedTasks = selectedDate ? getTasksForDate(selectedDate) : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      <Card className="p-6">
        <CardHeader className="pb-4">
          <CardTitle>Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      <Card className="p-6">
        <CardHeader className="pb-4">
          <CardTitle>
            Tasks for {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Selected Date'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {selectedTasks.length > 0 ? (
              selectedTasks.map(task => (
                <div key={task.id} className="p-3 border rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{task.title}</h4>
                    <Badge variant={task.priority === 'urgent' ? 'destructive' : 'secondary'}>
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{task.description}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{task.status}</Badge>
                    <span className="text-xs text-slate-500">
                      {task.assignees.length > 0 ? task.assignees[0] : 'Unassigned'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500 dark:text-slate-400">No tasks scheduled for this date.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
