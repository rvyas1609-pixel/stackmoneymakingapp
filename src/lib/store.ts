import { create } from 'zustand';

export interface AuthStore {
  userId: string | null;
  email: string | null;
  tier: 'free' | 'starter' | 'pro' | 'elite';
  primarySkill: string | null;
  weeklyHours: number | null;
  incomeGoal: number | null;
  isLoading: boolean;
  setUser: (data: Partial<AuthStore>) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  userId: null,
  email: null,
  tier: 'free',
  primarySkill: null,
  weeklyHours: null,
  incomeGoal: null,
  isLoading: false,
  setUser: (data) => set((state) => ({ ...state, ...data })),
  logout: () =>
    set({
      userId: null,
      email: null,
      tier: 'free',
      primarySkill: null,
      weeklyHours: null,
      incomeGoal: null,
    }),
}));

export interface UIStore {
  currentTab: string;
  sidebarOpen: boolean;
  notificationCount: number;
  setTab: (tab: string) => void;
  setSidebarOpen: (open: boolean) => void;
  setNotificationCount: (count: number) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  currentTab: 'dashboard',
  sidebarOpen: true,
  notificationCount: 0,
  setTab: (tab) => set({ currentTab: tab }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setNotificationCount: (count) => set({ notificationCount: count }),
}));

export interface ContentStore {
  savedPrompts: string[];
  savedResources: string[];
  completedModules: string[];
  xp: number;
  level: number;
  addSavedPrompt: (id: string) => void;
  removeSavedPrompt: (id: string) => void;
  addSavedResource: (id: string) => void;
  removeSavedResource: (id: string) => void;
  addCompletedModule: (id: string) => void;
  addXP: (amount: number) => void;
}

export const useContentStore = create<ContentStore>((set) => ({
  savedPrompts: [],
  savedResources: [],
  completedModules: [],
  xp: 0,
  level: 1,
  addSavedPrompt: (id) =>
    set((state) => ({
      savedPrompts: [...state.savedPrompts, id],
    })),
  removeSavedPrompt: (id) =>
    set((state) => ({
      savedPrompts: state.savedPrompts.filter((p) => p !== id),
    })),
  addSavedResource: (id) =>
    set((state) => ({
      savedResources: [...state.savedResources, id],
    })),
  removeSavedResource: (id) =>
    set((state) => ({
      savedResources: state.savedResources.filter((r) => r !== id),
    })),
  addCompletedModule: (id) =>
    set((state) => ({
      completedModules: [...state.completedModules, id],
    })),
  addXP: (amount) =>
    set((state) => {
      const newXP = state.xp + amount;
      const newLevel = Math.floor(newXP / 1000) + 1;
      return { xp: newXP, level: newLevel };
    }),
}));
