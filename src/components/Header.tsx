
import { Search, Plus, Moon, Sun, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NotificationCenter } from "@/components/NotificationCenter";
import { AdminProfile } from "@/components/AdminProfile";
import { useTheme } from "@/components/ThemeProvider";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onCreateTask: () => void;
}

export function Header({ searchQuery, onSearchChange, onCreateTask }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="border-b border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl sticky top-0 z-10">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white" />
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 w-80 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            onClick={onCreateTask}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/messages')}
            className="relative p-2"
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
          
          <NotificationCenter />
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="relative p-2"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
          
          <AdminProfile />
        </div>
      </div>
    </header>
  );
}
