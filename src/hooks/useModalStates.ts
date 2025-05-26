
import { useState } from 'react';

export const useModalStates = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
  const [isTeamManagementOpen, setIsTeamManagementOpen] = useState(false);

  return {
    isCreateModalOpen,
    setIsCreateModalOpen,
    isCreateProjectModalOpen,
    setIsCreateProjectModalOpen,
    isTeamManagementOpen,
    setIsTeamManagementOpen,
  };
};
