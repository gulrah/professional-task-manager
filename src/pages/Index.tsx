import { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { CreateTaskModal } from "@/components/CreateTaskModal";
import { CreateProjectModal } from "@/components/CreateProjectModal";
import { ViewRenderer } from "@/components/ViewRenderer";
import { ProjectChart } from "@/components/ProjectChart";
import { DeveloperFooter } from "@/components/DeveloperFooter";
import { ViewMode } from "@/types/task";
import { useTaskManagement } from "@/hooks/useTaskManagement";
import { useProjectManagement } from "@/hooks/useProjectManagement";
import { useModalStates } from "@/hooks/useModalStates";
import { useAutoStatusUpdate } from "@/hooks/useAutoStatusUpdate";

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('board');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('all');

  const { tasks, addTask, updateTask, deleteTask } = useTaskManagement();
  const { projects, addProject } = useProjectManagement();
  const {
    isCreateModalOpen,
    setIsCreateModalOpen,
    isCreateProjectModalOpen,
    setIsCreateProjectModalOpen,
    isTeamManagementOpen,
    setIsTeamManagementOpen
  } = useModalStates();

  // Auto-update task statuses based on begin dates
  useAutoStatusUpdate({
    tasks,
    projects,
    onUpdateTask: updateTask,
  });

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.assignees.some(assignee => assignee.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory;
    const matchesProject = selectedProjectId === 'all' || task.projectId === selectedProjectId;
    return matchesSearch && matchesCategory && matchesProject;
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
        <AppSidebar 
          currentView={currentView} 
          onViewChange={(view) => {
            setCurrentView(view);
            setIsTeamManagementOpen(false);
          }}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedProjectId={selectedProjectId}
          onProjectChange={setSelectedProjectId}
          projects={projects}
          onCreateTask={() => setIsCreateModalOpen(true)}
          onCreateProject={() => setIsCreateProjectModalOpen(true)}
          onManageTeam={() => setIsTeamManagementOpen(true)}
        />
        <main className="flex-1 flex flex-col">
          <Header 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onCreateTask={() => setIsCreateModalOpen(true)}
          />
          <div className="flex-1 p-6">
            {currentView === 'analytics' && (
              <div className="mb-6">
                <ProjectChart tasks={filteredTasks} />
              </div>
            )}
            <ViewRenderer
              currentView={currentView}
              isTeamManagementOpen={isTeamManagementOpen}
              filteredTasks={filteredTasks}
              projects={projects}
              onUpdateTask={updateTask}
              onDeleteTask={deleteTask}
              onCreateTask={() => setIsCreateModalOpen(true)}
              onCreateProject={() => setIsCreateProjectModalOpen(true)}
              onManageTeam={() => setIsTeamManagementOpen(true)}
            />
          </div>
        </main>
        
        <CreateTaskModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreateTask={addTask}
          projects={projects}
        />

        <CreateProjectModal
          isOpen={isCreateProjectModalOpen}
          onClose={() => setIsCreateProjectModalOpen(false)}
          onCreateProject={addProject}
        />
        
        {/* Developer Footer - Always visible */}
        <DeveloperFooter />
      </div>
    </SidebarProvider>
  );
};

export default Index;
