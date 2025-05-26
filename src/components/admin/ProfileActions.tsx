
import React from 'react';
import { Button } from "@/components/ui/button";
import { Settings, LogOut } from 'lucide-react';

export function ProfileActions() {
  return (
    <div className="space-y-2">
      <Button variant="outline" className="w-full justify-start" size="sm">
        <Settings className="w-4 h-4 mr-2" />
        Account Settings
      </Button>
      <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700" size="sm">
        <LogOut className="w-4 h-4 mr-2" />
        Sign Out
      </Button>
    </div>
  );
}
