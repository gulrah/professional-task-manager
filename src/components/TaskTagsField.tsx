
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface TaskTagsFieldProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
}

export function TaskTagsField({ tags, onTagsChange }: TaskTagsFieldProps) {
  const [newTag, setNewTag] = React.useState('');

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      onTagsChange([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="space-y-2">
      <Label className="text-slate-700 dark:text-slate-300">Tags</Label>
      <div className="flex gap-2 mb-2">
        <Input
          placeholder="Add tag..."
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
          className="dark:bg-slate-800 dark:text-white dark:border-slate-700"
        />
        <Button type="button" onClick={addTag} variant="outline" className="dark:border-slate-700 dark:text-white dark:hover:bg-slate-700">Add</Button>
      </div>
      <div className="flex flex-wrap gap-1">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="flex items-center gap-1 dark:bg-slate-700 dark:text-white">
            {tag}
            <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag(tag)} />
          </Badge>
        ))}
      </div>
    </div>
  );
}
