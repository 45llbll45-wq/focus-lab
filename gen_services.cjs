const fs = require('fs');

fs.writeFileSync('src/types/index.ts', export type TaskCategory = 'learn' | 'build' | 'content' | 'other';

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
, 'utf8');

fs.writeFileSync('src/services/sound.ts', let audioCtx: AudioContext | null = null;
let soundEnabled = true;

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const setSoundEnabled = (enabled: boolean) => {
  soundEnabled = enabled;
};

export const isSoundEnabled = () => soundEnabled;

export const playStepDoneSound = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  } catch (e) {
    console.warn('Audio feedback error:', e);
  }
};

export const playTimerDoneSound = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const now = ctx.currentTime + idx * 0.12;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);
    });
  } catch (e) {
    console.warn('Audio feedback error:', e);
  }
};

export const playCelebrateSound = () => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const chord = [523.25, 659.25, 783.99, 987.77, 1046.50];
    chord.forEach((freq, idx) => {
      const now = ctx.currentTime + idx * 0.08;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.65);
    });
  } catch (e) {
    console.warn('Audio feedback error:', e);
  }
};
, 'utf8');

fs.writeFileSync('src/services/storage.ts', import { Task, ContentIdea, Screen } from '../types';

const TASKS_KEY = 'focus_lab_tasks_v1';
const CURRENT_TASK_KEY = 'focus_lab_active_task_id_v1';
const CONTENT_KEY = 'focus_lab_content_ideas_v1';
const SCREEN_KEY = 'focus_lab_current_screen_v1';

const INITIAL_TASKS: Task[] = [
  {
    id: 'task-seed-1',
    title: 'ÃÊÚáã Webhooks İí Make',
    category: 'learn',
    timeMinutes: 30,
    energy: 'medium',
    status: 'completed',
    currentStepIndex: 3,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    completedAt: new Date(Date.now() - 3600000 * 23).toISOString(),
    steps: [
      { id: 's1', text: 'İÊÍ ÓíäÇÑíæ ÌÏíÏ İí Make æÇÎÊíÇÑ Custom Webhook', durationMinutes: 5, completed: true },
      { id: 's2', text: 'ÊÌÑÈÉ ÅÑÓÇá Payload ÊÌÑíÈí ÚÈÑ Postman Ãæ Webhook.site', durationMinutes: 10, completed: true },
      { id: 's3', text: 'ÑÈØ ÇáÜ Data Structure ÇáãÓÊáãÉ ãÚ Google Sheets', durationMinutes: 10, completed: true },
      { id: 's4', text: 'ÊÏæíä ãáÇÍÙÉ ÓÑíÚÉ Úä ÇáİÑŞ Èíä Instant Webhook æ Polling', durationMinutes: 5, completed: true }
    ],
    reflection: {
      learned: 'İåãÊ ßíİ ÇÓÊŞÈá Webhooks İæÑíÉ ÈÏáÇğ ãä ÇáÜ Polling Çááí íÓÊåáß ÚãáíÇÊ¡ æßíİ ÃÓæí Data Structure.',
      challenge: 'æÇÌåÊ ãÔßáÉ İí ŞÑÇÁÉ ÇáÜ Nested JSON æÓÇÚÏÊäí ÃÏÇÉ Parse JSON İí Make.',
      experiment: 'ÑÈØÊ İæÑã ÊíáíÌÑÇã íÍæá ÇáÑÓÇÆá ãÈÇÔÑÉ áÔíÊ ÇáãäÔæÑÇÊ.',
      result: 'ÇáÈíÇäÇÊ æÕáÊ İí ÃŞá ãä ËÇäíÉ æÈÏæä Ãí ÊÃÎíÑ!',
      rawNotes: 'ÇáÜ Webhooks åí ÇáÃÓÇÓ áÃí Real-time Automation ŞæíÉ.',
      timestamp: new Date(Date.now() - 3600000 * 23).toISOString()
    },
    actualTimeSpentSeconds: 1800
  }
];

const INITIAL_CONTENT: ContentIdea[] = [
  {
    id: 'content-seed-1',
    taskId: 'task-seed-1',
    taskTitle: 'ÃÊÚáã Webhooks İí Make',
    title: 'áíå æŞİÊ ÃÓÊÎÏã Polling æÈÏÃÊ ÃÚÊãÏ 100% Úáì Webhooks¿',
    hook: 'ÅĞÇ ÊÈäí ÃæÊæãíÔä æáÓå ÊÓÊÎÏã Polling¡ İÃäÊ ÊÖíÚ İáæÓß æÚãáíÇÊß Úáì ÇáİÇÖí! ?',
    body: '?? İßÑÉ ÇáãÍÊæì:\\nãŞÇÑäÉ ÚãáíÉ ÓÑíÚÉ Èíä ÇáÜ Polling æ ÇáÜ Webhooks İí Make.\\n\\n?? ãÍÇæÑ ÇáİíÏíæ/ÇáãäÔæÑ:\\n1. ÇáİÑŞ: Polling íİÍÕ ßá 15 ÏŞíŞÉ (íÓÊåáß ÚãáíÇÊ ÍÊì áæ ãÇ İíå ÏÇÊÇ)¡ Webhook íäÊÙÑ ÇáÅÔÇÑÉ æíÔÊÛá İæÑÇğ.\\n2. ßíİ ÊÌåÒ Custom Webhook İí ÏŞíŞÊíä.\\n3. ÎØæÉ Íá ãÔßáÉ ÇáÜ Nested JSON ÈÇÓÊÎÏÇã Parse JSON.\\n4. ÇáäÊíÌÉ: ÓíäÇÑíæ ÃÓÑÚ ÈÜ 10 ÃÖÚÇİ æÊæİíÑ ÃßËÑ ãä 70% ãä ÇáÜ Operations.\\n\\n?? Call to Action:\\nÇßÊÈ \ ÃæÊæãíÔä\\ İí ÇáÊÚáíŞÇÊ áÃÑÓá áß ÇáŞÇáÈ ÇáãÌÇäí ÌÇåÒ ááäÓÎ!',
    format: 'reel',
    status: 'draft',
    createdAt: new Date(Date.now() - 3600000 * 23).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 23).toISOString()
  }
];

export const getTasks = (): Task[] => {
  try {
    const data = localStorage.getItem(TASKS_KEY);
    if (!data) {
      localStorage.setItem(TASKS_KEY, JSON.stringify(INITIAL_TASKS));
      return INITIAL_TASKS;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error('Failed to load tasks from storage', e);
    return [];
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
  const tasks = getTasks();
  const index = tasks.findIndex(t => t.id === updatedTask.id);
  if (index !== -1) {
    tasks[index] = updatedTask;
    saveTasks(tasks);
  } else {
    tasks.unshift(updatedTask);
    saveTasks(tasks);
  }
};

export const deleteTask = (taskId: string): void => {
  const tasks = getTasks().filter(t => t.id !== taskId);
  saveTasks(tasks);
};

export const getTaskById = (taskId: string): Task | undefined => {
  const tasks = getTasks();
  return tasks.find(t => t.id === taskId);
};

export const getCurrentTaskId = (): string | null => {
  return localStorage.getItem(CURRENT_TASK_KEY);
};

export const setCurrentTaskId = (id: string | null): void => {
  if (id) {
    localStorage.setItem(CURRENT_TASK_KEY, id);
  } else {
    localStorage.removeItem(CURRENT_TASK_KEY);
  }
};

export const getContentIdeas = (): ContentIdea[] => {
  try {
    const data = localStorage.getItem(CONTENT_KEY);
    if (!data) {
      localStorage.setItem(CONTENT_KEY, JSON.stringify(INITIAL_CONTENT));
      return INITIAL_CONTENT;
    }
    return JSON.parse(data);
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
  const ideas = getContentIdeas();
  const index = ideas.findIndex(i => i.id === updatedIdea.id);
  if (index !== -1) {
    ideas[index] = updatedIdea;
    saveContentIdeas(ideas);
  } else {
    ideas.unshift(updatedIdea);
    saveContentIdeas(ideas);
  }
};

export const deleteContentIdea = (ideaId: string): void => {
  const ideas = getContentIdeas().filter(i => i.id !== ideaId);
  saveContentIdeas(ideas);
};

export const getCurrentScreen = (): Screen => {
  return (localStorage.getItem(SCREEN_KEY) as Screen) || 'home';
};

export const setCurrentScreen = (screen: Screen): void => {
  localStorage.setItem(SCREEN_KEY, screen);
};
, 'utf8');

fs.writeFileSync('src/services/planGenerator.ts', import { Step, EnergyLevel, TaskCategory } from '../types';

interface PlanGenParams {
  title: string;
  category: TaskCategory;
  timeMinutes: number;
  energy: EnergyLevel;
}

export const generateSmartPlan = (params: PlanGenParams): Step[] => {
  const { title, category, timeMinutes, energy } = params;
  const cleanTitle = title.trim();
  const lower = cleanTitle.toLowerCase();

  const isLowEnergy = energy === 'low';

  const hasMake = lower.includes('make') || cleanTitle.includes('ãíß') || cleanTitle.includes('ÇäÊíÌÑæãÇÊ');
  const hasN8n = lower.includes('n8n') || cleanTitle.includes('Çä ÇíÊ Çä');
  const hasZapier = lower.includes('zapier') || cleanTitle.includes('ÒÇÈííÑ');
  const hasWebhook = lower.includes('webhook') || cleanTitle.includes('æíÈ åæß') || cleanTitle.includes('æíÈ åæßÓ');
  const hasAgent = lower.includes('agent') || cleanTitle.includes('ÇíÌäÊ') || cleanTitle.includes('æßíá');
  const hasApi = lower.includes('api') || cleanTitle.includes('Çí Èí Çí') || cleanTitle.includes('ÑÈØ');
  const hasReel = lower.includes('reel') || cleanTitle.includes('ÑíáÒ') || cleanTitle.includes('İíÏíæ') || cleanTitle.includes('ãŞØÚ');
  const hasCarousel = lower.includes('carousel') || cleanTitle.includes('ßÇÑæÓíá') || cleanTitle.includes('ãäÔæÑ');
  const hasBot = lower.includes('bot') || cleanTitle.includes('ÈæÊ') || cleanTitle.includes('ÊíáíÌÑÇã') || cleanTitle.includes('telegram');

  const steps: Step[] = [];

  const addStep = (text: string, duration: number, isMicro = false) => {
    steps.push({
      id: 'step-' + Date.now() + '-' + (steps.length + 1),
      text,
      durationMinutes: duration,
      completed: false,
      isMicroStep: isMicro
    });
  };

  // STEP 1: Micro-step or Warmup
  if (isLowEnergy) {
    if (category === 'learn') {
      addStep('ÇİÊÍí ÏÑÓ/ÊæËíŞ ' + cleanTitle + ' æÔÇåÏí Ãæá 3 ÏŞÇÆŞ İŞØ ÈÏæä ÖÛØ ááÊÌåíÒ', 4, true);
    } else if (category === 'build') {
      addStep('ÇİÊÍí ÇáÃÏÇÉ æÌåÒí ãÓÇÍÉ ÇáÚãá ãÚ ÊÓãíÉ ÇáÓíäÇÑíæ/ÇáãÔÑæÚ İŞØ', 3, true);
    } else if (category === 'content') {
      addStep('ÇİÊÍí ÕİÍÉ ÈíÖÇÁ æÇßÊÈí İßÑÉ æÇÍÏÉ ÃÓÇÓíÉ İí ÓØÑ æÇÍÏ', 3, true);
    } else {
      addStep('ÊÍÏíÏ Ãæá ÅÌÑÇÁ ÈÓíØ áÇ íÓÊÛÑŞ Óæì ÏŞíŞÊíä áÈÏÁ ' + cleanTitle, 3, true);
    }
  } else {
    // Normal / High energy start
    if (hasWebhook) {
      addStep('ÅäÔÇÁ Custom Webhook İí ÇáÓíäÇÑíæ æİÍÕ ÇáÚäæÇä ÇáãæáÏ', Math.min(5, Math.floor(timeMinutes * 0.2)));
    } else if (hasAgent) {
      addStep('ÊÍÏíÏ ÏæÑ ÇáÜ AI Agent æÇáãÏÎáÇÊ æÇáãÎÑÌÇÊ ÇáãØáæÈÉ', Math.min(7, Math.floor(timeMinutes * 0.2)));
    } else if (hasApi) {
      addStep('ãÑÇÌÚÉ ÇáÜ API Endpoint æÊÌåíÒ ÇáÜ Headers æãİÊÇÍ ÇáÜ Auth İí Postman', Math.min(6, Math.floor(timeMinutes * 0.2)));
    } else if (category === 'learn') {
      addStep('ÇÓÊÚÑÇÖ Çáãİåæã ÇáÃÓÇÓí áÜ ' + cleanTitle + ' æÊÍÏíÏ ÇáåÏİ ÇáÚãáí ãä ÌáÓÉ Çáíæã', Math.min(6, Math.floor(timeMinutes * 0.2)));
    } else if (category === 'build') {
      addStep('ÑÓã Flow ãÓÇÑ ÇáÚãá ÇáÓÑíÚ (Trigger ? Action ? Output)', Math.min(6, Math.floor(timeMinutes * 0.2)));
    } else if (category === 'content') {
      addStep('ÊÍÏíÏ ÒÇæíÉ ÇáãÍÊæì æÇáÌãåæÑ ÇáãÓÊåÏİ áÜ ' + cleanTitle, Math.min(5, Math.floor(timeMinutes * 0.2)));
    } else {
      addStep('ÊÌåíÒ ãÊØáÈÇÊ ' + cleanTitle + ' æÊİßíß ÇáåÏİ áÎØæÇÊ ÓÑíÚÉ', Math.min(5, Math.floor(timeMinutes * 0.2)));
    }
  }

  // STEP 2 & 3: Deep Work / Building / Experimenting
  const remainingTime = timeMinutes - (steps[0]?.durationMinutes || 5) - 5;

  if (category === 'learn') {
    if (hasWebhook) {
      addStep('ÅÑÓÇá Payload ÊÌÑíÈí ÚÈÑ Webhook æÇáÊÍŞŞ ãä ÈäíÉ ÇáÈíÇäÇÊ (Data Structure)', Math.max(5, Math.floor(remainingTime * 0.5)));
      addStep('ÑÈØ ÇáÈíÇäÇÊ ÇáãÓÊáãÉ ãÚ æÍÏÉ ãÚÇáÌÉ Ãæ ÊÎÒíä áÇÎÊÈÇÑ ÇáÊÏİŞ ÇáßÇãá', Math.max(5, Math.floor(remainingTime * 0.5)));
    } else if (hasAgent) {
      addStep('ÇÎÊÈÇÑ æÊÌÑÈÉ ÇáÜ Tool Calling Ãæ ÇáÑÈØ ãÚ ŞÇÚÏÉ ãÚÑİÉ æİÍÕ ÏŞÉ ÇáÇÓÊÌÇÈÇÊ', Math.max(7, Math.floor(remainingTime * 0.6)));
      addStep('ãÚÇáÌÉ ÍÇáÇÊ ÇáÎØÃ æÍæÇİ ÇáÇÓÊÌÇÈÉ (Edge Cases)', Math.max(5, Math.floor(remainingTime * 0.4)));
    } else {
      addStep('ÇáÊØÈíŞ ÇáÚãáí ÎØæÉ ÈÎØæÉ Úáì ãËÇá Íí áÜ ' + cleanTitle + ' æÇáÊÌÑÈÉ ÇáãÈÇÔÑÉ', Math.max(6, Math.floor(remainingTime * 0.6)));
      addStep('İÍÕ ÇáäÊíÌÉ æÇßÊÔÇİ Ãí ÚÇÆŞ Ãæ ÎØÃ æİåã ÓÈÈå', Math.max(5, Math.floor(remainingTime * 0.4)));
    }
  } else if (category === 'build') {
    if (hasMake || hasN8n || hasZapier) {
      addStep('ÈäÇÁ ÇáÜ Trigger æÑÈØ ÇáÜ Modules ÎØæÉ ÈÎØæÉ ãÚ ÊãÑíÑ ÇáãÊÛíÑÇÊ', Math.max(7, Math.floor(remainingTime * 0.6)));
      addStep('ÊÔÛíá ÓíäÇÑíæ ÊÌÑíÈí (Run Once) æÇáÊÃßÏ ãä äÌÇÍ ÊÏİŞ ÇáÈíÇäÇÊ æÊäÓíŞ ÇáãÎÑÌÇÊ', Math.max(5, Math.floor(remainingTime * 0.4)));
    } else if (hasBot) {
      addStep('ÈÑãÌÉ ÇÓÊŞÈÇá ÃæÇãÑ ÇáÈæÊ æÑÈØå ãÚ ÇáäãæĞÌ ÇáĞßí / ÇáÃæÊæãíÔä', Math.max(7, Math.floor(remainingTime * 0.6)));
      addStep('ÇÎÊÈÇÑ ÅÑÓÇá ÇáÑÏæÏ æÊÌÑÈÉ ÇáÊİÇÚá Úáì ÊØÈíŞ ÇáãÍÇÏËÉ', Math.max(5, Math.floor(remainingTime * 0.4)));
    } else {
      addStep('ÊäİíĞ ÇáÌÒÁ ÇáÃÓÇÓí ãä ÇáãåãÉ: ÈäÇÁ æÇÎÊÈÇÑ ' + cleanTitle, Math.max(7, Math.floor(remainingTime * 0.6)));
      addStep('ãÚÇáÌÉ ÇáãáÇÍÙÇÊ æÇáÊÍÓíä æÊËÈíÊ ÇáÅÚÏÇÏÇÊ ÇáäåÇÆíÉ', Math.max(5, Math.floor(remainingTime * 0.4)));
    }
  } else if (category === 'content') {
    if (hasReel) {
      addStep('ßÊÇÈÉ Hook Şæí İí Ãæá 3 ËæÇäò íÎØİ ÇáÇäÊÈÇå æíËíÑ ÇáİÖæá', Math.max(4, Math.floor(remainingTime * 0.35)));
      addStep('ÕíÇÛÉ ÇáãÔßáÉ æÇáÍá ÇáÚãáí (Body) ãÚ äÕÇÆÍ ŞÇÈáÉ ááÊØÈíŞ ãÈÇÔÑÉ', Math.max(6, Math.floor(remainingTime * 0.45)));
      addStep('ÅÖÇİÉ Call to Action ãÍÏÏ æÊÌåíÒ æÕİ ÇáİíÏíæ (Caption) æÇáßáãÇÊ ÇáãİÊÇÍíÉ', Math.max(4, Math.floor(remainingTime * 0.2)));
    } else if (hasCarousel) {
      addStep('ÊÕãíã åíßá ÇáÔÑÇÆÍ: ÇáÛáÇİ (Hook) + 3-4 ÔÑÇÆÍ ŞíãÉ + ÔÑíÍÉ ÇáÎáÇÕÉ æ CTA', Math.max(8, Math.floor(remainingTime * 0.7)));
      addStep('ãÑÇÌÚÉ ÇáäÕæÕ æÊäÓíŞ ÇáäŞÇØ áÊßæä ÓåáÉ ÇáŞÑÇÁÉ İí 10 ËæÇäò', Math.max(4, Math.floor(remainingTime * 0.3)));
    } else {
      addStep('ßÊÇÈÉ ÇáãÓæÏÉ ÇáÃæáì ááİßÑÉ ÈÃÓáæÈ ÓÑÏí íÌĞÈ ÇáãåÊãíä ÈÇáÜ AI Automation', Math.max(7, Math.floor(remainingTime * 0.6)));
      addStep('ÊäŞíÍ ÇáäÕ æÇÎÊíÇÑ Hook ÌĞÇÈ æÅÖÇİÉ ÎáÇÕÉ ÊİÇÚáíÉ', Math.max(5, Math.floor(remainingTime * 0.4)));
    }
  } else {
    addStep('ÇáÊÑßíÒ Úáì ÅäÌÇÒ ÇáÌÒÆíÉ ÇáãÑßÒíÉ İí ' + cleanTitle, Math.max(7, Math.floor(remainingTime * 0.6)));
    addStep('ãÑÇÌÚÉ ÇáãÎÑÌÇÊ æÇáÊÃßÏ ãä ÅÊãÇã ÇáãÚÇííÑ ÇáãØáæÈÉ', Math.max(5, Math.floor(remainingTime * 0.4)));
  }

  // FINAL STEP
  addStep('ÊÏæíä ãáÎÕ ÓÑíÚ áÃåã İßÑÉ Ãæ äÊíÌÉ İåãÊåÇ ÇÓÊÚÏÇÏÇğ áÊÍæíáåÇ áãÍÊæì', 4);

  const total = steps.reduce((acc, s) => acc + s.durationMinutes, 0);
  if (total !== timeMinutes && steps.length > 2) {
    const diff = timeMinutes - total;
    steps[1].durationMinutes = Math.max(3, steps[1].durationMinutes + diff);
  }

  return steps;
};
, 'utf8');

fs.writeFileSync('src/services/contentGenerator.ts', import { Reflection, ContentFormat, ContentIdea } from '../types';

interface GenerateContentParams {
  taskId?: string;
  taskTitle: string;
  reflection: Reflection;
  format?: ContentFormat;
}

export const generateContentFromReflection = (params: GenerateContentParams): Omit<ContentIdea, 'id' | 'createdAt' | 'updatedAt'> => {
  const { taskId, taskTitle, reflection, format = 'reel' } = params;

  const learnedText = reflection.learned.trim();
  const challengeText = reflection.challenge.trim();
  const resultText = reflection.result.trim();
  const experimentText = reflection.experiment.trim();
  const rawNotes = reflection.rawNotes.trim();

  const issue = challengeText || 'ÊÍÏíÇÊ ÇáÃæÊæãíÔä ÇáÔÇÆÚÉ';
  const outcome = resultText || experimentText || 'äÊíÌÉ ÃÓÑÚ æÃßËÑ ßİÇÁÉ';

  let title = '';
  let hook = '';
  let body = '';

  switch (format) {
    case 'reel':
      title = 'ÊÌÑÈÊí İí ' + taskTitle + ': ßíİ ÍáíÊ ãÔßáÉ ' + issue.slice(0, 40) + '¿';
      hook = 'áæ ÊÈäí ÃæÊæãíÔä ÈÜ AI æÊæÇÌåß åĞå ÇáãÔßáÉ.. åĞÇ ÇáÍá æİøÑ Úáí ÓÇÚÇÊ! ?';
      body = '?? ÓßÑíÈÊ ÑíáÒ (30-45 ËÇäíÉ):\\n\\n' +
        '[0-3 ËæÇäò] Hook ãÑÆí:\\n' +
        '\áæ ÊÈäí ÃæÊæãíÔä İí  + taskTitle +  .. æŞøİ ÊÓæí åĞÇ ÇáÎØÃ!\\\n\\n' +
        '[3-15 ËÇäíÉ] ÇáãÔßáÉ æÇáÊÌÑÈÉ:\\n' +
        '- Çáíæã ÃËäÇÁ ÔÛáí Úáì ' + taskTitle + '¡ æÇÌåÊ: ' + (issue || 'ÊÍÏí ÊŞäí ÛíÑ ãÊæŞÚ') + '.\\n' +
        '- ÇáÍá ÇáãÚÊÇÏ íÓÊåáß æŞÊ¡ áßä ÌÑÈÊ ØÑíŞÉ ãÎÊáİÉ ÊãÇãÇğ: ' + (experimentText || 'ÊÈÓíØ ÇáÊÏİŞ æÇÓÊÎÏÇã ÊŞäíÉ ĞßíÉ') + '.\\n\\n' +
        '[15-30 ËÇäíÉ] ÇáÓÑ æÇáÎáÇÕÉ:\\n' +
        '- ÇáÔíÁ ÇáÃÓÇÓí Çááí ÊÚáãÊå: ' + (learnedText || 'ÇáÊÑßíÒ Úáì ÊÏİŞ ÇáÈíÇäÇÊ ÇáÕÍíÍ åæ 80% ãä äÌÇÍ ÇáÃæÊæãíÔä') + '.\\n' +
        '- ÇáäÊíÌÉ: ' + outcome + '.\\n\\n' +
        '[30-40 ËÇäíÉ] Call to Action:\\n' +
        '\ÇÍİÙ ÇáãŞØÚ áÊÌÑÈå İí ãÔÑæÚß ÇáŞÇÏã¡ æÔÇÑßäí İí ÇáÊÚáíŞÇÊ: æÔ ÃßËÑ ÃÏÇÉ AI automation ÊÓÊÎÏãåÇ ÍÇáíÇğ¿\';
      break;

    case 'carousel':
      title = 'Ïáíá Úãáí: ' + taskTitle + ' ÎØæÉ ÈÎØæÉ ãä ÇáÕİÑ';
      hook = '5 ÏÑæÓ ĞåÈíÉ ÊÚáãÊåÇ Çáíæã ÃËäÇÁ ÈäÇÁ ' + taskTitle + ' (æİÑÊ Úáí ÃíÇã ÊÌÇÑÈ)! ??';
      body = '?? ãÍÊæì ÇáßÇÑæÓíá (5 ÔÑÇÆÍ):\\n\\n' +
        '?? ÇáÔÑíÍÉ 1 (ÇáÛáÇİ):\\n' +
        hook + '\\n\\n' +
        '?? ÇáÔÑíÍÉ 2 (ÇáãÔßáÉ æÇáÊÍÏí):\\n' +
        'æÇÌåÊ ÚÇÆŞ: \ + issue + \\\n' +
        'áíÔ ÃÛáÈ ÇáãÈÊÏÆíä íÊÚØáæä åäÇ¿ áÃäåã íÊÌÇåáæä åíßáÉ ÇáÈíÇäÇÊ ãä ÇáÈÏÇíÉ.\\n\\n' +
        '?? ÇáÔÑíÍÉ 3 (ÇáÍá æÇáÊÌÑÈÉ):\\n' +
        'ãÇĞÇ İÚáÊ áÍá ÇáãÔßáÉ¿\\n' +
        '- ÇáÎØæÉ 1: ' + (experimentText || 'ÅÚÇÏÉ ÖÈØ ÇáÊÏİŞ æÇÎÊÈÇÑ ÇáãÏÎáÇÊ') + '.\\n' +
        '- ÇáÎØæÉ 2: ' + (learnedText || 'ÇáÇÓÊİÇÏÉ ãä ÇáÜ Webhooks æÇáÜ JSON ÈÔßá Óáíã') + '.\\n\\n' +
        '?? ÇáÔÑíÍÉ 4 (ÇáäÊíÌÉ ÈÇáÃÑŞÇã):\\n' +
        '?? ' + outcome + '\\n' +
        'ÇáİÑŞ Èíä ŞÈá æÈÚÏ: ÊæİíÑ æŞÊ æÓíäÇÑíæ íÚãá 24/7 ÈÏæä ÃÎØÇÁ.\\n\\n' +
        '?? ÇáÔÑíÍÉ 5 (ÇáÎáÇÕÉ + ÊİÇÚá):\\n' +
        'ÊÇÈÚ ÑÍáÊí İí ÊÚáã æÈäÇÁ ÇáÜ AI Automation íæãíÇğ ??\\n' +
        'æÇßÊÈ İí ÇáÊÚáíŞÇÊ \ŞÇáÈ\ áæ æÏß ÃÔÇÑßß ÇáÓíäÇÑíæ ÌÇåÒ!';
      break;

    case 'post':
      title = 'ÎÇØÑÉ ãæËŞÉ ãä ÑÍáÊí İí ' + taskTitle;
      hook = 'ÃßÈÑ ÏÑÓ ÊÚáãÊå Çáíæã İí ÇáÜ AI Automation: ÇáÈÓÇØÉ ÊßÓÈ ÏÇÆãÇğ. ??';
      body = 'ÎáÇá ÓÇÚÊí İí ÇáÚãá Úáì \ + taskTitle + \¡ ÎÑÌÊ ÈãáÇÍÙÉ ãåãÉ ÌÏÇğ ÃÍÈÈÊ ãÔÇÑßÊåÇ ãÚßã:\\n\\n' +
        '1?? ÇáÊÍÏí Çááí æÇÌåÊå:\\n' +
        issue + '\\n\\n' +
        '2?? ßíİ ÊÚÇãáÊ ãÚå¿\\n' +
        (experimentText || 'ÈÏáÇğ ãä ÊÚŞíÏ ÇáÓíäÇÑíæ¡ ŞãÊ ÈÊÈÓíØ ÇáãÏÎáÇÊ æÇÎÊÈÇÑ ßá ÎØæÉ ãäİÕáÉ') + '\\n\\n' +
        '3?? Ãåã ÇÓÊäÊÇÌ:\\n' +
        learnedText + '\\n\\n' +
        '4?? ÇáäÊíÌÉ:\\n' +
        outcome + '\\n\\n' +
        'ÊæËíŞ ÑÍáÉ ÇáÊÚáã æÇáÊØÈíŞ íÈíä áß ßíİ Ãä ßá ãÔßáÉ ÊæÇÌåß åí İí ÇáÍŞíŞÉ ãíÒÉ ÊäÇİÓíÉ æÎÈÑÉ ÚãáíÉ ÊÑÇßãíÉ.\\n\\n' +
        'ÓÄÇáí áßã: ßíİ ÊæËŞæä ÊÌÇÑÈßã ÇáÈÑãÌíÉ æÇáÊŞäíÉ¿ ??';
      break;

    case 'tutorial':
      title = 'ÔÑÍ ÊØÈíŞí: ßíİ ÊäİĞ ' + taskTitle + ' ÈÏæä ÊÚŞíÏ';
      hook = 'ÎØæÉ ÈÎØæÉ: ÔÑÍ Úãáí áØÑíŞÉ ÅäÌÇÒ ' + taskTitle + ' æÍá ' + issue.slice(0, 30) + '! ???';
      body = '??? ÎØæÇÊ ÇáÊØÈíŞ:\\n\\n' +
        '?? ÇáãÊØáÈÇÊ:\\n' +
        '- ÍÓÇÈ İí ÇáÃÏÇÉ æãÓÇÍÉ Úãá ÌÇåÒÉ.\\n' +
        '- ÊÍÏíÏ ÇáåÏİ ÈæÖæÍ: ' + taskTitle + '.\\n\\n' +
        '?? ÇáÎØæÉ ÇáÃæáì: ÇáÊÌåíÒ\\n' +
        (experimentText || 'ÅÚÏÇÏ ÇáÜ Trigger æÈäÇÁ ÇáãÊÛíÑÇÊ ÇáÃÓÇÓíÉ') + '\\n\\n' +
        '?? ÇáÎØæÉ ÇáËÇäíÉ: Íá ÇáÊÍÏí\\n' +
        'ÅĞÇ æÇÌåÊß ãÔßáÉ \ + issue + \¡ ÇáÍá íßãä İí:\\n' +
        (learnedText || 'ÇáÊÍŞŞ ãä ÕÍÉ ÇáÇÓÊÌÇÈÉ æãØÇÈŞÉ ÇáÍŞæá ÈÏŞÉ') + '.\\n\\n' +
        '?? ÇáäÊíÌÉ ÇáäåÇÆíÉ:\\n' +
        outcome + '\\n\\n' +
        '?? äÕíÍÉ ÓÑíÚÉ:\\n' +
        'áÇ ÊÈÏÃ ÈÈäÇÁ ÓíäÇÑíæ ÖÎã ÏİÚÉ æÇÍÏÉ. ÇÈäö Module æÇÍÏ æÇÎÊÈÑå İæÑÇğ Ëã ÇäÊŞá ááÎØæÉ ÇáÊÇáíÉ.';
      break;
  }

  return {
    taskId,
    taskTitle,
    title,
    hook,
    body,
    format,
    status: 'idea'
  };
};
, 'utf8');

console.log('Services generated.');
