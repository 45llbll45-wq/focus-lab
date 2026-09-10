import type { Task, ContentIdea, Screen } from '../types';

const TASKS_KEY = 'focus_lab_tasks_v1';
const CONTENT_KEY = 'focus_lab_content_ideas_v1';
const CURRENT_TASK_ID_KEY = 'focus_lab_current_task_id';
const CURRENT_SCREEN_KEY = 'focus_lab_current_screen';

// Initial sample tasks to guide new user immediately
const SAMPLE_TASKS: Task[] = [
  {
    id: 'sample-task-1',
    title: 'فهم وتجربة الـ Webhooks في أتمتة Make مع Telegram',
    category: 'learn',
    timeMinutes: 25,
    energy: 'medium',
    status: 'pending',
    steps: [
      { id: 's1', text: 'إنشاء Custom Webhook في Make ونسخ الرابط', durationMinutes: 5, completed: false },
      { id: 's2', text: 'إرسال Test Payload باستخدام Postman أو cURL', durationMinutes: 10, completed: false },
      { id: 's3', text: 'ربط الـ Data Structure وتمريرها لبوت تيليجرام', durationMinutes: 10, completed: false }
    ],
    currentStepIndex: 0,
    createdAt: new Date(Date.now() - 3600000).toISOString()
  }
];

export const getTasks = (): Task[] => {
  try {
    const raw = localStorage.getItem(TASKS_KEY);
    if (!raw) {
      saveTasks(SAMPLE_TASKS);
      return SAMPLE_TASKS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load tasks', e);
    return SAMPLE_TASKS;
  }
};

export const saveTasks = (tasks: Task[]): void => {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.error('Failed to save tasks', e);
  }
};

export const addTask = (task: Task): void => {
  const tasks = getTasks();
  tasks.unshift(task);
  saveTasks(tasks);
};

export const updateTask = (updatedTask: Task): void => {
  const tasks = getTasks().map((t) => (t.id === updatedTask.id ? updatedTask : t));
  saveTasks(tasks);
};

export const deleteTask = (taskId: string): void => {
  const tasks = getTasks().filter((t) => t.id !== taskId);
  saveTasks(tasks);
};

// Content Ideas
export const getContentIdeas = (): ContentIdea[] => {
  try {
    const raw = localStorage.getItem(CONTENT_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load content ideas', e);
    return [];
  }
};

export const saveContentIdeas = (ideas: ContentIdea[]): void => {
  try {
    localStorage.setItem(CONTENT_KEY, JSON.stringify(ideas));
  } catch (e) {
    console.error('Failed to save content ideas', e);
  }
};

export const addContentIdea = (idea: ContentIdea): void => {
  const ideas = getContentIdeas();
  ideas.unshift(idea);
  saveContentIdeas(ideas);
};

export const updateContentIdea = (updatedIdea: ContentIdea): void => {
  const ideas = getContentIdeas().map((i) => (i.id === updatedIdea.id ? updatedIdea : i));
  saveContentIdeas(ideas);
};

export const deleteContentIdea = (ideaId: string): void => {
  const ideas = getContentIdeas().filter((i) => i.id !== ideaId);
  saveContentIdeas(ideas);
};

// Navigation Persistence
export const getCurrentScreen = (): Screen => {
  return (localStorage.getItem(CURRENT_SCREEN_KEY) as Screen) || 'home';
};

export const setCurrentScreen = (screen: Screen): void => {
  localStorage.setItem(CURRENT_SCREEN_KEY, screen);
};

export const getCurrentTaskId = (): string | null => {
  return localStorage.getItem(CURRENT_TASK_ID_KEY);
};

export const setCurrentTaskId = (taskId: string | null): void => {
  if (taskId) {
    localStorage.setItem(CURRENT_TASK_ID_KEY, taskId);
  } else {
    localStorage.removeItem(CURRENT_TASK_ID_KEY);
  }
};