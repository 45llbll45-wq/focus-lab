import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Plus } from 'lucide-react';
import type { Task, Step, Screen } from '../../types';
import { Button } from '../Common/Button';
import { CategoryBadge, EnergyBadge } from '../Common/Badge';
import { ProgressBar } from '../Common/ProgressBar';
import { playStepDoneSound, playTimerDoneSound } from '../../services/sound';

interface FocusSessionScreenProps {
  task: Task;
  onStepComplete: (stepIndex: number) => void;
  onAllStepsFinished: (totalSecondsSpent: number) => void;
  onNavigate?: (screen: Screen) => void;
}

export const FocusSessionScreen: React.FC<FocusSessionScreenProps> = ({
  task,
  onStepComplete,
  onAllStepsFinished
}) => {
  const currentStepIndex = task.currentStepIndex || 0;
  const currentStep: Step | undefined = task.steps[currentStepIndex];

  // Duration in seconds for current step
  const stepTargetSeconds = (currentStep?.durationMinutes || 10) * 60;

  const [timeLeft, setTimeLeft] = useState<number>(stepTargetSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [totalSecondsSpent, setTotalSecondsSpent] = useState<number>(task.actualTimeSpentSeconds || 0);

  // Sync when currentStepIndex changes
  useEffect(() => {
    if (currentStep) {
      setTimeLeft(currentStep.durationMinutes * 60);
      setIsRunning(true);
    }
  }, [currentStepIndex, currentStep]);

  // Main timer tick
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            playTimerDoneSound();
            return 0;
          }
          return prev - 1;
        });
        setTotalSecondsSpent((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    if (currentStep) {
      setTimeLeft(currentStep.durationMinutes * 60);
      setIsRunning(false);
    }
  };

  const addFiveMinutes = () => {
    setTimeLeft((prev) => prev + 300);
  };

  const handleDoneStep = () => {
    playStepDoneSound();
    onStepComplete(currentStepIndex);

    if (currentStepIndex + 1 >= task.steps.length) {
      onAllStepsFinished(totalSecondsSpent);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = ((currentStepIndex) / task.steps.length) * 100;
  const timerCircleProgress = stepTargetSeconds > 0 ? (timeLeft / stepTargetSeconds) * 100 : 0;

  return (
    <div className="flex-1 flex flex-col p-5 justify-between space-y-5">
      {/* 1. Header: Current Task & Step Indicator */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <CategoryBadge category={task.category} />
            <EnergyBadge energy={task.energy} />
          </div>
          <span className="text-xs font-semibold text-[#0284C7] bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
            خطوة {currentStepIndex + 1} من {task.steps.length}
          </span>
        </div>

        {/* Task Title */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs">
          <span className="text-[10px] font-bold text-slate-400 block mb-0.5">المهمة الحالية:</span>
          <h2 className="text-xs sm:text-sm font-bold text-slate-700 line-clamp-1">
            {task.title}
          </h2>
        </div>

        {/* Progress bar across steps */}
        <ProgressBar progress={progressPercent} size="sm" color="blue" />
      </div>

      {/* 2. Central Focus Area: Step & Timer */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-5 py-2">
        {/* Prominent Current Step Card */}
        <div className="w-full bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm text-center space-y-2 relative overflow-hidden">
          <span className="inline-block text-[11px] font-bold text-[#0284C7] bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200/60">
            الخطوة الحالية
          </span>
          <p className="text-base sm:text-lg font-bold text-[#0F172A] leading-relaxed">
            {currentStep?.text || 'الخطوة جاهزة'}
          </p>
        </div>

        {/* Visual Countdown Timer */}
        <div className="relative flex flex-col items-center justify-center">
          {/* SVG Circular Progress */}
          <div className="relative w-52 h-52 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="42"
                className="text-slate-100 stroke-current"
                strokeWidth="6"
                fill="transparent"
              />
              {/* Animated Progress Circle */}
              <circle
                cx="50"
                cy="50"
                r="42"
                className={`transition-all duration-1000 ease-linear stroke-current ${
                  timeLeft === 0 ? 'text-amber-500' : 'text-[#0284C7]'
                }`}
                strokeWidth="6"
                strokeDasharray="264"
                strokeDashoffset={264 - (264 * timerCircleProgress) / 100}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Timer digits in center */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className={`text-4xl font-extrabold tracking-tight font-mono ${
                timeLeft === 0 ? 'text-amber-600 animate-pulse' : 'text-[#0F172A]'
              }`}>
                {formatTime(timeLeft)}
              </span>
              <span className="text-xs text-slate-500 mt-1 font-medium">
                {timeLeft === 0 ? 'انتهى الوقت المقترح' : isRunning ? 'مؤقت التركيز نشط' : 'مؤقت موقوف مؤقتاً'}
              </span>
            </div>
          </div>

          {/* Quick Timer Controls */}
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={toggleTimer}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isRunning
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  : 'bg-[#0284C7] text-white hover:bg-[#0369A1] shadow-xs'
              }`}
            >
              {isRunning ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isRunning ? 'إيقاف مؤقت' : 'استئناف'}</span>
            </button>

            <button
              onClick={addFiveMinutes}
              className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer border border-slate-200/60"
              title="إضافة 5 دقائق"
            >
              <Plus className="w-3 h-3" />
              <span>5د+</span>
            </button>

            <button
              onClick={resetTimer}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-all cursor-pointer border border-slate-200/60"
              title="إعادة تعيين المؤقت"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Primary CTA: أنجزت الخطوة ✓ */}
      <div className="space-y-2 pt-2 sticky bottom-4 z-20">
        <Button
          onClick={handleDoneStep}
          variant="primary"
          size="lg"
          fullWidth
          className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 font-bold text-base"
        >
          {currentStepIndex + 1 === task.steps.length ? 'أنجزت آخر خطوة! 🎉' : 'أنجزت الخطوة ✓'}
        </Button>
      </div>
    </div>
  );
};
