import React, { useState } from 'react';
import { Plus, Play, CheckCircle2, Clock, Sparkles, ChevronLeft, Flame, ArrowUpRight, Trash2 } from 'lucide-react';
import type { Task, Screen } from '../../types';
import { Button } from '../Common/Button';
import { CategoryBadge, EnergyBadge } from '../Common/Badge';
import { ProgressBar } from '../Common/ProgressBar';

export interface HomeScreenProps {
  tasks: Task[];
  activeTask?: Task | null;
  contentCount?: number;
  onNavigate?: (screen: Screen) => void;
  onSelectTask: (task: Task) => void;
  onStartNewTask: () => void;
  onDeleteTask?: (taskId: string) => void;
  onOpenLibrary?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  tasks,
  activeTask,
  contentCount = 0,
  onNavigate,
  onSelectTask,
  onStartNewTask,
  onDeleteTask,
  onOpenLibrary
}) => {
  const [filter, setFilter] = useState<'all' | 'in_progress' | 'completed'>('all');

  const filteredTasks = tasks.filter(t => {
    if (filter === 'in_progress') return t.status === 'in_progress' || t.status === 'pending';
    if (filter === 'completed') return t.status === 'completed';
    return true;
  });

  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const totalMinutesSpent = Math.round(
    tasks.reduce((sum, t) => sum + (t.actualTimeSpentSeconds || (t.status === 'completed' ? t.timeMinutes * 60 : 0)), 0) / 60
  );

  return (
    <div className="flex-1 flex flex-col p-5 space-y-5 text-[#0F172A]">
      {/* 1. Header & Greeting */}
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#4F46E5]">
          <Sparkles className="w-3.5 h-3.5 text-[#4F46E5]" />
          <span>مرحباً بك في مساحتك للتركيز والإنتاج</span>
        </div>
        <h1 className="text-2xl font-bold text-[#0F172A] tracking-tight">
          وش بننجز اليوم؟
        </h1>
        <p className="text-xs text-slate-500">
          حوّل جلسة تعلمك في الـ AI Automation إلى مهام مركزة وأفكار محتوى جاهزة.
        </p>
      </div>

      {/* 2. Primary CTA: New Task Button */}
      <div>
        <Button
          onClick={onStartNewTask}
          variant="primary"
          size="lg"
          fullWidth
          icon={<Plus className="w-5 h-5 text-white" />}
          className="bg-[#4F46E5] hover:bg-[#4338CA] text-white shadow-md shadow-indigo-500/20 text-base font-bold"
        >
          مهمة جديدة 🚀
        </Button>
      </div>

      {/* 3. Daily Stats / Momentum Bar */}
      <div className="grid grid-cols-3 gap-2 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50">
          <div className="flex items-center gap-1 text-[#4F46E5] font-bold text-base">
            <CheckCircle2 className="w-4 h-4" />
            <span>{completedCount}</span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium mt-0.5">مهام منجزة</span>
        </div>

        <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50">
          <div className="flex items-center gap-1 text-[#4F46E5] font-bold text-base">
            <Clock className="w-4 h-4" />
            <span>{totalMinutesSpent}د</span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium mt-0.5">وقت التركيز</span>
        </div>

        <div 
          onClick={onOpenLibrary || (() => onNavigate && onNavigate('content_library'))}
          className="flex flex-col items-center justify-center p-2 rounded-xl bg-amber-50/70 border border-amber-200/60 cursor-pointer hover:bg-amber-100/70 transition-colors"
        >
          <div className="flex items-center gap-1 text-amber-700 font-bold text-base">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{contentCount}</span>
          </div>
          <span className="text-[11px] text-amber-700 font-medium mt-0.5">أفكار بالمكتبة</span>
        </div>
      </div>

      {/* 4. Active In-Progress Banner (if exists) */}
      {activeTask && activeTask.status === 'in_progress' && (
        <div 
          onClick={() => onSelectTask(activeTask)}
          className="bg-gradient-to-br from-[#4F46E5] to-[#4338CA] text-white p-4 rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition-all space-y-3 relative overflow-hidden group"
        >
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              جلسة تركيز جارية الآن
            </span>
            <div className="flex items-center gap-1 text-xs text-white/90 group-hover:translate-x-[-3px] transition-transform font-medium">
              <span>متابعة</span>
              <ChevronLeft className="w-4 h-4" />
            </div>
          </div>

          <div>
            <h3 className="font-bold text-sm text-white line-clamp-1">{activeTask.title}</h3>
            <p className="text-xs text-white/80 mt-1">
              الخطوة {(activeTask.currentStepIndex || 0) + 1} من {activeTask.steps.length}: {activeTask.steps[activeTask.currentStepIndex || 0]?.text}
            </p>
          </div>

          <ProgressBar 
            progress={((activeTask.currentStepIndex || 0) / activeTask.steps.length) * 100} 
            size="sm" 
            color="green" 
          />
        </div>
      )}

      {/* 5. Tasks List Section */}
      <div className="space-y-3 flex-1 flex flex-col">
        {/* Filter tabs */}
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#0F172A]">المهام والجلسات</h2>
          <div className="flex gap-1 bg-slate-100 p-0.5 rounded-xl text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                filter === 'all' ? 'bg-white text-[#4F46E5] shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              الكل
            </button>
            <button
              onClick={() => setFilter('in_progress')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                filter === 'in_progress' ? 'bg-white text-[#4F46E5] shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              قيد التنفيذ
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                filter === 'completed' ? 'bg-white text-[#4F46E5] shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              المنجزة
            </button>
          </div>
        </div>

        {/* Task Cards */}
        {filteredTasks.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-dashed border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-[#4F46E5]">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-700 text-sm">لا توجد مهام بعد</h3>
              <p className="text-xs text-slate-400 max-w-[200px] leading-relaxed">
                اضغطي على "+ مهمة جديدة" وابدئي جلسة تركيزك الأولى اليوم!
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredTasks.map((task) => {
              const isCompleted = task.status === 'completed';
              const isInProgress = task.status === 'in_progress';
              const stepsCompleted = task.steps.filter(s => s.completed).length;

              return (
                <div
                  key={task.id}
                  onClick={() => onSelectTask(task)}
                  className={`p-4 rounded-2xl bg-white border transition-all cursor-pointer hover:border-indigo-300 hover:shadow-xs group space-y-2.5 ${
                    isCompleted ? 'border-slate-200 opacity-80' : isInProgress ? 'border-[#4F46E5]/60 ring-1 ring-[#4F46E5]/20 shadow-xs' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <CategoryBadge category={task.category} />
                      <EnergyBadge energy={task.energy} />
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{task.timeMinutes}د</span>
                      </span>

                      {onDeleteTask && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteTask(task.id);
                          }}
                          className="p-1 text-slate-300 hover:text-rose-500 rounded-lg transition-colors cursor-pointer"
                          title="حذف المهمة"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className={`font-bold text-sm leading-snug line-clamp-2 ${
                      isCompleted ? 'text-slate-500 line-through' : 'text-[#0F172A]'
                    }`}>
                      {task.title}
                    </h3>
                  </div>

                  {/* Footer status / progress */}
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <span className="text-[11px] font-medium">
                        {stepsCompleted} من {task.steps.length} خطوات
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[#4F46E5] font-bold text-xs group-hover:translate-x-[-2px] transition-transform">
                      {isCompleted ? (
                        <span className="text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>منجز ✓</span>
                        </span>
                      ) : isInProgress ? (
                        <span className="text-[#4F46E5] flex items-center gap-1">
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>استكمال التركيز</span>
                        </span>
                      ) : (
                        <span className="text-slate-600 flex items-center gap-1">
                          <span>بدء التخطيط</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export default HomeScreen;
