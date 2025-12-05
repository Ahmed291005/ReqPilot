'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { Requirement, ClassifiedRequirement, UserStory, Stakeholder } from '@/lib/types';

interface AppState {
  requirements: Requirement[];
  setRequirements: React.Dispatch<React.SetStateAction<Requirement[]>>;
  classifiedRequirements: ClassifiedRequirement[];
  setClassifiedRequirements: React.Dispatch<React.SetStateAction<ClassifiedRequirement[]>>;
  userStories: UserStory[];
  setUserStories: React.Dispatch<React.SetStateAction<UserStory[]>>;
  stakeholders: Stakeholder[];
  setStakeholders: React.Dispatch<React.SetStateAction<Stakeholder[]>>;
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppStateContext = createContext<AppState | undefined>(undefined);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [classifiedRequirements, setClassifiedRequirements] = useState<
    ClassifiedRequirement[]
  >([]);
  const [userStories, setUserStories] = useState<UserStory[]>([]);
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AppStateContext.Provider
      value={{
        requirements,
        setRequirements,
        classifiedRequirements,
        setClassifiedRequirements,
        userStories,
        setUserStories,
        stakeholders,
        setStakeholders,
        isSidebarOpen,
        setIsSidebarOpen,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppStateProvider');
  }
  return context;
}
