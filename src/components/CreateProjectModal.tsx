
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Target, Users } from 'lucide-react'
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (project: any) => void;
}

export function CreateProjectModal({ isOpen, onClose, onCreateProject }: CreateProjectModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('bg-blue-500');
  const [beginDate, setBeginDate] = useState<Date>();
  const [deadline, setDeadline] = useState<Date>();
  const [budget, setBudget] = useState('');
  const [priority, setPriority] = useState('medium');
  const [department, setDepartment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !beginDate || !deadline) return;

    onCreateProject({
      name,
      description,
      color,
      beginDate,
      deadline,
      budget: parseFloat(budget) || 0,
      priority,
      department,
      progress: 0,
      team: [],
      status: 'todo',
      createdAt: new Date(),
    });

    // Reset form
    setName('');
    setDescription('');
    setColor('bg-blue-500');
    setBeginDate(undefined);
    setDeadline(undefined);
    setBudget('');
    setPriority('medium');
    setDepartment('');
    onClose();
  };

  const colorOptions = [
    { value: 'bg-blue-500', label: 'Blue', color: 'bg-blue-500' },
    { value: 'bg-purple-500', label: 'Purple', color: 'bg-purple-500' },
    { value: 'bg-green-500', label: 'Green', color: 'bg-green-500' },
    { value: 'bg-orange-500', label: 'Orange', color: 'bg-orange-500' },
    { value: 'bg-red-500', label: 'Red', color: 'bg-red-500' },
    { value: 'bg-pink-500', label: 'Pink', color: 'bg-pink-500' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Create New Project
          </DialogTitle>
          <DialogDescription>
            Set up a new project with team collaboration and timeline management.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Project Name *</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Enter project name"
                required
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Department</Label>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="hr">Human Resources</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">Description</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="Describe the project goals and scope..."
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Begin Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "h-10 w-full justify-start text-left font-normal",
                      !beginDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {beginDate ? format(beginDate, "PPP") : "Pick start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={beginDate}
                    onSelect={setBeginDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Deadline *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "h-10 w-full justify-start text-left font-normal",
                      !deadline && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {deadline ? format(deadline, "PPP") : "Pick deadline"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={deadline}
                    onSelect={setDeadline}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget" className="text-sm font-medium">Budget ($)</Label>
              <Input 
                type="number" 
                id="budget" 
                value={budget} 
                onChange={(e) => setBudget(e.target.value)} 
                placeholder="0"
                className="h-10"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm font-medium">Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Project Color</Label>
            <Select value={color} onValueChange={setColor}>
              <SelectTrigger className="h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {colorOptions.map((colorOption) => (
                  <SelectItem key={colorOption.value} value={colorOption.value}>
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full ${colorOption.color}`} />
                      {colorOption.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <Users className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-medium text-blue-900 dark:text-blue-100">Team Assignment</p>
              <p className="text-sm text-blue-700 dark:text-blue-300">Team members can be assigned after project creation</p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose} className="px-6">
              Cancel
            </Button>
            <Button 
              type="submit"
              className="px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Create Project
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
