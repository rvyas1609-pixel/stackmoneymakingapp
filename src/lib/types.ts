// Types for the application
export type SubscriptionTier = 'free' | 'starter' | 'pro' | 'elite';
export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type PromptCategory = 'copywriting' | 'video' | 'marketing' | 'automation' | 'coding' | 'business' | 'research';

export interface User {
  id: string;
  email: string;
  username?: string;
  displayName?: string;
  profileImage?: string;
  primarySkill?: string;
  weeklyHours?: number;
  incomeGoal?: number;
  tier: SubscriptionTier;
  xp: number;
  level: number;
  createdAt: Date;
}

export interface Playbook {
  id: string;
  title: string;
  description: string;
  slug: string;
  icon?: string;
  category: string;
  difficulty: Difficulty;
  range?: string;
  timeCommitment?: string;
  content: string;
  steps: PlaybookStep[];
  tools: string[];
  tier: SubscriptionTier;
  views: number;
  saved: number;
}

export interface PlaybookStep {
  id: string;
  number: number;
  heading: string;
  body: string;
}

export interface PromptPack {
  id: string;
  title: string;
  description: string;
  prompts: Prompt[];
  tier: SubscriptionTier;
  month: number;
  year: number;
  published: boolean;
}

export interface Prompt {
  id: string;
  title: string;
  content: string;
  category: PromptCategory;
  tags: string[];
  useCount: number;
  rating: number;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  downloadUrl?: string;
  content?: string;
  type: string;
  tags: string[];
  tier: SubscriptionTier;
  downloads: number;
  saved: number;
}

export interface AITool {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo?: string;
  website?: string;
  pricing: string;
  categories: string[];
  incomeAngle?: string;
  rating: number;
  reviews: number;
}

export interface Roadmap {
  id: string;
  title: string;
  description: string;
  slug: string;
  duration: number;
  difficulty: Difficulty;
  milestones: Milestone[];
}

export interface Milestone {
  id: string;
  day: number;
  title: string;
  description: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  unlockedAt: Date;
}

export interface CommunityPost {
  id: string;
  userId: string;
  username: string;
  content: string;
  channel: string;
  reactions: string[];
  comments: number;
  isPinned: boolean;
  createdAt: Date;
}

export interface HustleIdea {
  title: string;
  description: string;
  range: string;
  timeCommitment: string;
  difficulty: string;
  icon: string;
  tag: string;
  category: string;
}
