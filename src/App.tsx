import { useState, useEffect } from 'react';
import type { 
  Task, 
  Step, 
  Reflection, 
  ContentIdea, 
  Screen, 
  TaskCategory, 
  EnergyLevel 
} from './types';
import { 
  getTasks, 
  addTask, 
  updateTask, 
  deleteTask, 
  getCurrentTaskId, 
  setCurrentTaskId, 
  getContentIdeas, 
  addContentIdea, 
  updateContentIdea, 
  deleteContentIdea, 
  getCurrentScreen, 
  setCurrentScreen 
} from './services/storage';
import { generateSmartPlan } from './services/planGenerator';

import { MobileContainer } from './components/Layout/MobileContainer';
import { Header } from './components/Layout/Header';

import { HomeScreen } from './components/Screens/HomeScreen';
import { NewTaskScreen } from './components/Screens/NewTaskScreen';
import { SmartPlanScreen } from './components/Screens/SmartPlanScreen';
import { FocusSessionScreen } from './components/Screens/FocusSessionScreen';
import { CaptureLearningScreen } from './components/Screens/CaptureLearningScreen';
import { ContentGeneratorScreen } from './components/Screens/ContentGeneratorScreen';
import { ContentLibraryScreen } from './components/Screens/ContentLibraryScreen';
import { CompletionScreen } from './components/Screens/CompletionScreen';

export function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [contentIdeas, setContentIdeas] = useState<ContentIdea[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [currentScreen, setScreenState] = useState<Screen>('home');
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize data from LocalStorage
  useEffect(() => {
    const loadedTasks = getTasks();
    const loadedIdeas = getContentIdeas();
    const savedScreen = getCurrentScreen();
    const activeId = getCurrentTaskId();

    setTasks(loadedTasks);
    setContentIdeas(loadedIdeas);

    if (activeId) {
      const found = loadedTasks.find(t => t.id === activeId);
      if (found) {
        setActiveTask(found);
      }
    }

    setScreenState(savedScreen);
    setIsLoaded(true);
  }, []);

  const navigateTo = (screen: Screen) => {
    setScreenState(screen);
    setCurrentScreen(screen);
  };

  // 1. Handle New Task Submission & Smart Plan Generation
  const handleCreatePlan = (data: {
    title: string;
    category: TaskCategory;
    timeMinutes: number;
    energy: EnergyLevel;
  }) => {
    const generatedSteps = generateSmartPlan({
      title: data.title,
      category: data.category,
      timeMinutes: data.timeMinutes,
      energy: data.energy
    });

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: data.title,
      category: data.category,
      timeMinutes: data.timeMinutes,
      energy: data.energy,
      status: 'pending',
      steps: generatedSteps,
      currentStepIndex: 0,
      createdAt: new Date().toISOString()
    };

    addTask(newTask);
    setTasks(getTasks());
    setActiveTask(newTask);
    setCurrentTaskId(newTask.id);
    navigateTo('smart_plan');
  };

  // 2. Update Steps in Smart Plan
  const handleUpdateSteps = (steps: Step[]) => {
    if (!activeTask) return;
    const updated = { ...activeTask, steps };
    updateTask(updated);
    setActiveTask(updated);
    setTasks(getTasks());
  };

  // 3. Start Focus Session
  const handleStartFocus = () => {
    if (!activeTask) return;
    const updated: Task = {
      ...activeTask,
      status: 'in_progress',
      currentStepIndex: 0
    };
    updateTask(updated);
    setActiveTask(updated);
    setTasks(getTasks());
    navigateTo('focus_session');
  };

  // 4. Complete Single Step in Focus Session
  const handleStepComplete = (stepIndex: number) => {
    if (!activeTask) return;
    const updatedSteps = [...activeTask.steps];
    if (updatedSteps[stepIndex]) {
      updatedSteps[stepIndex].completed = true;
    }

    const nextIndex = Math.min(stepIndex + 1, activeTask.steps.length - 1);
    const updated: Task = {
      ...activeTask,
      steps: updatedSteps,
      currentStepIndex: nextIndex
    };

    updateTask(updated);
    setActiveTask(updated);
    setTasks(getTasks());
  };

  // 5. Finished all steps -> Move to Capture Learning
  const handleAllStepsFinished = (totalSecondsSpent: number) => {
    if (!activeTask) return;
    const updatedSteps = activeTask.steps.map(s => ({ ...s, completed: true }));
    const updated: Task = {
      ...activeTask,
      steps: updatedSteps,
      actualTimeSpentSeconds: totalSecondsSpent
    };
    updateTask(updated);
    setActiveTask(updated);
    setTasks(getTasks());
    navigateTo('capture_learning');
  };

  // 6. Save Reflection notes from Capture Learning
  const handleSaveReflection = (reflection: Reflection) => {
    if (!activeTask) return;
    const updated: Task = {
      ...activeTask,
      reflection
    };
    updateTask(updated);
    setActiveTask(updated);
    setTasks(getTasks());
    navigateTo('content_generator');
  };

  // 7. Save Content Idea from Generator & mark task completed
  const handleSaveContentIdea = (idea: ContentIdea) => {
    addContentIdea(idea);
    setContentIdeas(getContentIdeas());

    if (activeTask) {
      const completedTask: Task = {
        ...activeTask,
        status: 'completed',
        completedAt: new Date().toISOString(),
        contentIdea: idea
      };
      updateTask(completedTask);
      setActiveTask(completedTask);
      setTasks(getTasks());
    }

    navigateTo('completion');
  };

  // 8. Select Task from Home
  const handleSelectTask = (task: Task) => {
    setActiveTask(task);
    setCurrentTaskId(task.id);

    if (task.status === 'pending') {
      navigateTo('smart_plan');
    } else if (task.status === 'in_progress') {
      navigateTo('focus_session');
    } else if (task.status === 'completed') {
      if (task.contentIdea) {
        navigateTo('completion');
      } else {
        navigateTo('capture_learning');
      }
    }
  };

  // 9. Delete Task
  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
    setTasks(getTasks());
    if (activeTask?.id === taskId) {
      setActiveTask(null);
      setCurrentTaskId(null);
    }
  };

  // 10. Update & Delete Content Ideas
  const handleUpdateIdea = (idea: ContentIdea) => {
    updateContentIdea(idea);
    setContentIdeas(getContentIdeas());
  };

  const handleDeleteIdea = (id: string) => {
    deleteContentIdea(id);
    setContentIdeas(getContentIdeas());
  };

  // Back Button Logic
  const handleBack = () => {
    switch (currentScreen) {
      case 'new_task':
        navigateTo('home');
        break;
      case 'smart_plan':
        navigateTo('home');
        break;
      case 'focus_session':
        navigateTo('smart_plan');
        break;
      case 'capture_learning':
        navigateTo('focus_session');
        break;
      case 'content_generator':
        navigateTo('capture_learning');
        break;
      case 'content_library':
        navigateTo('home');
        break;
      case 'completion':
        navigateTo('home');
        break;
      default:
        navigateTo('home');
    }
  };

  if (!isLoaded) {
    return (
      <MobileContainer>
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#017CC3]" />
        </div>
      </MobileContainer>
    );
  }

  // Header Title Resolver
  const getHeaderTitle = () => {
    switch (currentScreen) {
      case 'home':
        return 'Focus Lab';
      case 'new_task':
        return 'مهمة جديدة';
      case 'smart_plan':
        return 'خطة التنفيذ';
      case 'focus_session':
        return 'جلسة التركيز';
      case 'capture_learning':
        return 'ماذا تعلمت؟';
      case 'content_generator':
        return 'توليد المحتوى';
      case 'content_library':
        return 'مكتبة المحتوى';
      case 'completion':
        return 'إنجاز رائع';
      default:
        return 'Focus Lab';
    }
  };

  return (
    <MobileContainer>
      <Header
        title={getHeaderTitle()}
        showBack={currentScreen !== 'home'}
        onBack={handleBack}
        onOpenLibrary={() => navigateTo('content_library')}
        onGoHome={() => navigateTo('home')}
        activeScreen={currentScreen}
        contentCount={contentIdeas.length}
      />

      <main className="flex-1 flex flex-col overflow-y-auto">
        {currentScreen === 'home' && (
          <HomeScreen
            tasks={tasks}
            activeTask={activeTask}
            contentCount={contentIdeas.length}
            onStartNewTask={() => navigateTo('new_task')}
            onSelectTask={handleSelectTask}
            onDeleteTask={handleDeleteTask}
            onOpenLibrary={() => navigateTo('content_library')}
            onNavigate={navigateTo}
          />
        )}

        {currentScreen === 'new_task' && (
          <NewTaskScreen
            onPlanGenerated={handleCreatePlan}
            onNavigate={navigateTo}
          />
        )}

        {currentScreen === 'smart_plan' && activeTask && (
          <SmartPlanScreen
            task={activeTask}
            onStartFocus={handleStartFocus}
            onUpdateSteps={handleUpdateSteps}
            onNavigate={navigateTo}
          />
        )}

        {currentScreen === 'focus_session' && activeTask && (
          <FocusSessionScreen
            task={activeTask}
            onStepComplete={handleStepComplete}
            onAllStepsFinished={handleAllStepsFinished}
            onNavigate={navigateTo}
          />
        )}

        {currentScreen === 'capture_learning' && activeTask && (
          <CaptureLearningScreen
            task={activeTask}
            onSaveReflection={handleSaveReflection}
            onNavigate={navigateTo}
          />
        )}

        {currentScreen === 'content_generator' && activeTask && (
          <ContentGeneratorScreen
            task={activeTask}
            reflection={activeTask.reflection || { 
              learned: '', 
              challenge: '', 
              experiment: '', 
              result: '', 
              rawNotes: '', 
              timestamp: new Date().toISOString() 
            }}
            onSaveContentIdea={handleSaveContentIdea}
            onNavigate={navigateTo}
          />
        )}

        {currentScreen === 'content_library' && (
          <ContentLibraryScreen
            ideas={contentIdeas}
            onUpdateIdea={handleUpdateIdea}
            onDeleteIdea={handleDeleteIdea}
            onNavigate={navigateTo}
            onNewTask={() => navigateTo('new_task')}
          />
        )}

        {currentScreen === 'completion' && activeTask && (
          <CompletionScreen
            task={activeTask}
            contentIdea={activeTask.contentIdea}
            onNewTask={() => navigateTo('new_task')}
            onViewLibrary={() => navigateTo('content_library')}
            onNavigate={navigateTo}
          />
        )}
      </main>
    </MobileContainer>
  );
}

export default App;
