
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface AssigneeDropdownProps {
  selectedAssignees: string[];
  availableAssignees: string[];
  onSelectAssignee: (assignee: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AssigneeDropdown({
  selectedAssignees = [],
  availableAssignees = [],
  onSelectAssignee,
  open,
  onOpenChange
}: AssigneeDropdownProps) {
  console.log('AssigneeDropdown - availableAssignees:', availableAssignees);
  
  // Ensure we have valid data
  const safeAvailableAssignees = Array.isArray(availableAssignees) ? availableAssignees : [];
  const safeSelectedAssignees = Array.isArray(selectedAssignees) ? selectedAssignees : [];

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between dark:bg-slate-800 dark:text-white dark:border-slate-700 dark:hover:bg-slate-700"
        >
          {safeSelectedAssignees.length === 0
            ? "Select assignees..."
            : `${safeSelectedAssignees.length} selected`}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 z-50 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        <Command className="dark:bg-slate-800">
          <CommandInput placeholder="Search assignees..." className="dark:text-white" />
          <CommandList>
            <CommandEmpty className="dark:text-slate-300">No assignee found.</CommandEmpty>
            <CommandGroup className="dark:bg-slate-800">
              {safeAvailableAssignees.length > 0 ? (
                safeAvailableAssignees.map((assignee) => (
                  <CommandItem
                    key={assignee}
                    onSelect={() => onSelectAssignee(assignee)}
                    className="dark:text-white dark:hover:bg-slate-700 cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        safeSelectedAssignees.includes(assignee) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {assignee}
                  </CommandItem>
                ))
              ) : (
                <CommandItem disabled className="dark:text-slate-300">
                  No assignees available
                </CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
