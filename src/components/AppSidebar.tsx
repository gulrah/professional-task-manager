import { Calendar, List, Trello, Home, Settings, Plus, Filter, BarChart3, Clock, Users, FolderOpen, Bell, Zap } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { ViewMode } from "@/types/task";
import { Project } from "@/types/project";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { categories } from "@/data/mockData";
import { Link } from "react-router-dom";

interface AppSidebarProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedProjectId: string;
  onProjectChange: (projectId: string) => void;
  projects: Project[];
  onCreateTask?: () => void;
  onCreateProject?: () => void;
  onManageTeam?: () => void;
}

const views = [
  { id: 'board' as ViewMode, title: "Board", icon: Trello, description: "Kanban view" },
  { id: 'list' as ViewMode, title: "List", icon: List, description: "Table view" },
  { id: 'calendar' as ViewMode, title: "Calendar", icon: Calendar, description: "Calendar view" },
  { id: 'analytics' as ViewMode, title: "Analytics", icon: BarChart3, description: "Reports & insights" },
];

const quickActions = [
  { id: 'new-task', title: 'New Task', icon: Plus, shortcut: 'Cmd+N' },
  { id: 'new-project', title: 'New Project', icon: FolderOpen, shortcut: 'Cmd+P' },
  { id: 'team', title: 'Team', icon: Users, shortcut: 'Cmd+T' },
];

const navigationItems = [
  { id: 'notifications', title: 'Notifications', icon: Bell, route: '/notifications' },
  { id: 'schedule', title: 'Schedule', icon: Calendar, route: '/schedule' },
  { id: 'settings', title: 'Settings', icon: Settings, route: '/settings' },
];

export function AppSidebar({ 
  currentView, 
  onViewChange, 
  selectedCategory, 
  onCategoryChange, 
  selectedProjectId,
  onProjectChange,
  projects,
  onCreateTask, 
  onCreateProject, 
  onManageTeam 
}: AppSidebarProps) {
  const handleQuickAction = (actionId: string) => {
    switch (actionId) {
      case 'new-task':
        onCreateTask?.();
        break;
      case 'new-project':
        onCreateProject?.();
        break;
      case 'team':
        onManageTeam?.();
        break;
    }
  };

  return (
    <Sidebar className="border-r-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
      <SidebarHeader className="border-b border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TaskFlow Pro
            </h1>
            <p className="text-xs text-slate-500">Enterprise Task Manager</p>
          </div>
        </div>
        
        {/* Quick stats */}
        <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-2">
            <span>This Week</span>
            <span>12/15 tasks</span>
          </div>
          <Progress value={80} className="h-2" />
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        {/* Quick Actions */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-slate-500 mb-3 flex items-center gap-2">
            <Zap className="w-3 h-3" />
            Quick Actions
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {quickActions.map((action) => (
                <SidebarMenuItem key={action.id}>
                  <SidebarMenuButton 
                    onClick={() => handleQuickAction(action.id)}
                    className="w-full justify-between hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-300 group"
                  >
                    <div className="flex items-center gap-2">
                      <action.icon className="w-4 h-4" />
                      <span className="font-medium text-sm">{action.title}</span>
                    </div>
                    <kbd className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {action.shortcut}
                    </kbd>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Views */}
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-xs font-medium text-slate-500 mb-3 flex items-center gap-2">
            <List className="w-3 h-3" />
            Views
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {views.map((view) => (
                <SidebarMenuItem key={view.id}>
                  <SidebarMenuButton 
                    onClick={() => onViewChange(view.id)}
                    className={`w-full justify-start transition-all duration-200 group ${
                      currentView === view.id 
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-500 shadow-sm' 
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <view.icon className={`w-4 h-4 ${currentView === view.id ? 'text-blue-600' : ''}`} />
                    <div className="flex flex-col items-start">
                      <span className="font-medium text-sm">{view.title}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{view.description}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Projects */}
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-xs font-medium text-slate-500 mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderOpen className="w-3 h-3" />
              Projects
            </div>
            <Button variant="ghost" size="sm" className="h-5 w-5 p-0 text-slate-400 hover:text-slate-600" onClick={onCreateProject}>
              <Plus className="w-3 h-3" />
            </Button>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => onProjectChange('all')}
                  className={`w-full justify-start transition-all duration-200 ${
                    selectedProjectId === 'all' 
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' 
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="w-3 h-3 rounded-full bg-slate-400" />
                  <span className="font-medium text-sm">All Projects</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {projects.map((project) => (
                <SidebarMenuItem key={project.id}>
                  <SidebarMenuButton 
                    onClick={() => onProjectChange(project.id)}
                    className={`w-full justify-between transition-all duration-200 group ${
                      selectedProjectId === project.id 
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' 
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${project.color} shadow-sm`} />
                      <span className="font-medium text-sm">{project.name}</span>
                    </div>
                    <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs px-2 py-0.5">
                      {project.departments.length}
                    </Badge>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Categories */}
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-xs font-medium text-slate-500 mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-3 h-3" />
              Categories
            </div>
            <Button variant="ghost" size="sm" className="h-5 w-5 p-0 text-slate-400 hover:text-slate-600">
              <Plus className="w-3 h-3" />
            </Button>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((category) => (
                <SidebarMenuItem key={category.id}>
                  <SidebarMenuButton 
                    onClick={() => onCategoryChange(category.id)}
                    className={`w-full justify-between transition-all duration-200 group ${
                      selectedCategory === category.id 
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' 
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${category.color} shadow-sm`} />
                      <span className="font-medium text-sm">{category.title}</span>
                    </div>
                    <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs px-2 py-0.5">
                      {category.count}
                    </Badge>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-slate-200 dark:border-slate-700">
        <div className="space-y-2">
          {navigationItems.map((item) => (
            <Link key={item.id} to={item.route}>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.title}</span>
                {item.id === 'notifications' && (
                  <Badge variant="destructive" className="ml-auto text-xs px-1.5 py-0.5">3</Badge>
                )}
              </Button>
            </Link>
          ))}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
