export type TaskCategory = 'learn' | 'build' | 'content' | 'other';

export type EnergyLevel = 'low' | 'medium' | 'high';

export type ContentFormat = 'reel' | 'carousel' | 'post' | 'tutorial';

export type ContentStatus = 'idea' | 'draft' | 'published';

export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface Step {
  id: string;
  text: string;
  durationMinutes: number;
  completed: boolean;
  isMicroStep?: boolean;
}

export interface Reflection {
  learned: string;
  challenge: string;
  experiment: string;
  result: string;
  rawNotes: string;
  timestamp: string;
}

export interface ContentIdea {
  id: string;
  taskId?: string;
  taskTitle?: string;
  title: string;
  hook: string;
  body: string;
  format: ContentFormat;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  timeMinutes: number;
  energy: EnergyLevel;
  status: TaskStatus;
  steps: Step[];
  currentStepIndex: number;
  createdAt: string;
  completedAt?: string;
  reflection?: Reflection;
  contentIdea?: ContentIdea;
  actualTimeSpentSeconds?: number;
}

export type Screen = 
  | 'home'
  | 'new_task'
  | 'smart_plan'
  | 'focus_session'
  | 'capture_learning'
  | 'content_generator'
  | 'content_library'
  | 'completion';
