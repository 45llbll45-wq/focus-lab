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
    <div className="flex-1 flex flex-col p-5 space-y-5 text-[#31031F]">
      {/* 1. Header & Greeting */}
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#66693E]">
          <Sparkles className="w-3.5 h-3.5 text-[#66693E]" />
          <span>مرحباً بك في مساحتك للتركيز والإنتاج</span>
        </div>
        <h1 className="text-2xl font-bold text-[#31031F] tracking-tight">
          وش بننجز اليوم؟
        </h1>
        <p className="text-xs text-[#6B5E5B]">
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
          icon={<Plus className="w-5 h-5 text-[#FFF8ED]" />}
          className="bg-[#66693E] hover:bg-[#525530] text-[#FFF8ED] shadow-md shadow-[#66693E]/20 text-base font-bold"
        >
          مهمة جديدة 🚀
        </Button>
      </div>

      {/* 3. Daily Stats / Momentum Bar */}
      <div className="grid grid-cols-3 gap-2 bg-[#FFFDF9] p-3 rounded-2xl border border-[#EBDDCB] shadow-2xs">
        <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#F4EDE0]/60">
          <div className="flex items-center gap-1 text-[#66693E] font-bold text-base">
            <CheckCircle2 className="w-4 h-4" />
            <span>{completedCount}</span>
          </div>
          <span className="text-[11px] text-[#393313] font-medium mt-0.5">مهام منجزة</span>
        </div>

        <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#F4EDE0]/60">
          <div className="flex items-center gap-1 text-[#66693E] font-bold text-base">
            <Clock className="w-4 h-4" />
            <span>{totalMinutesSpent}د</span>
          </div>
          <span className="text-[11px] text-[#393313] font-medium mt-0.5">وقت التركيز</span>
        </div>

        <div 
          onClick={onOpenLibrary || (() => onNavigate && onNavigate('content_library'))}
          className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#C5A880]/20 border border-[#C5A880]/40 cursor-pointer hover:bg-[#C5A880]/30 transition-colors"
        >
          <div className="flex items-center gap-1 text-[#31031F] font-bold text-base">
            <Flame className="w-4 h-4 text-[#31031F] fill-[#31031F]" />
            <span>{contentCount}</span>
          </div>
          <span className="text-[11px] text-[#31031F] font-medium mt-0.5">أفكار بالمكتبة</span>
        </div>
      </div>

      {/* 4. Active In-Progress Banner (if exists) */}
      {activeTask && activeTask.status === 'in_progress' && (
        <div 
          onClick={() => onSelectTask(activeTask)}
          className="bg-gradient-to-br from-[#31031F] to-[#393313] text-[#FFF8ED] p-4 rounded-2xl shadow-sm cursor-pointer hover:shadow-md transition-all space-y-3 relative overflow-hidden group border border-[#31031F]"
        >
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-[#FFF8ED] text-xs font-semibold backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-[#FFF8ED] animate-pulse" />
              جلسة تركيز جارية الآن
            </span>
            <div className="flex items-center gap-1 text-xs text-[#FFF8ED]/90 group-hover:translate-x-[-3px] transition-transform font-medium">
              <span>متابعة</span>
              <ChevronLeft className="w-4 h-4" />
            </div>
          </div>

          <div>
            <h3 className="font-bold text-sm text-[#FFF8ED] line-clamp-1">{activeTask.title}</h3>
            <p className="text-xs text-[#FFF8ED]/80 mt-1">
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
          <h2 className="text-sm font-bold text-[#31031F]">المهام والجلسات</h2>
          <div className="flex gap-1 bg-[#F4EDE0] p-0.5 rounded-xl text-xs border border-[#EBDDCB]">
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                filter === 'all' ? 'bg-[#66693E] text-[#FFF8ED] shadow-2xs' : 'text-[#393313] hover:text-[#31031F]'
              }`}
            >
              الكل
            </button>
            <button
              onClick={() => setFilter('in_progress')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                filter === 'in_progress' ? 'bg-[#66693E] text-[#FFF8ED] shadow-2xs' : 'text-[#393313] hover:text-[#31031F]'
              }`}
            >
              قيد التنفيذ
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                filter === 'completed' ? 'bg-[#66693E] text-[#FFF8ED] shadow-2xs' : 'text-[#393313] hover:text-[#31031F]'
              }`}
            >
              المنجزة
            </button>
          </div>
        </div>

        {/* Task Cards */}
        {filteredTasks.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#FFFDF9] rounded-2xl border border-dashed border-[#EBDDCB] text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#66693E]/15 flex items-center justify-center text-[#66693E]">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-[#31031F] text-sm">لا توجد مهام بعد</h3>
              <p className="text-xs text-[#6B5E5B] max-w-[200px] leading-relaxed">
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
                  className={`p-4 rounded-2xl bg-[#FFFDF9] border transition-all cursor-pointer hover:border-[#66693E] hover:shadow-2xs group space-y-2.5 ${
                    isCompleted ? 'border-[#EBDDCB] opacity-80' : isInProgress ? 'border-[#66693E] ring-1 ring-[#66693E]/30 shadow-2xs' : 'border-[#EBDDCB]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <CategoryBadge category={task.category} />
                      <EnergyBadge energy={task.energy} />
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-[#8C7A6B] font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#8C7A6B]" />
                        <span>{task.timeMinutes}د</span>
                      </span>

                      {onDeleteTask && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteTask(task.id);
                          }}
                          className="p-1 text-[#B8A494] hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                          title="حذف المهمة"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className={`font-bold text-sm leading-snug line-clamp-2 ${
                      isCompleted ? 'text-[#8C7A6B] line-through' : 'text-[#31031F]'
                    }`}>
                      {task.title}
                    </h3>
                  </div>

                  {/* Footer status / progress */}
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <div className="flex items-center gap-1.5 text-[#6B5E5B]">
                      <span className="text-[11px] font-medium">
                        {stepsCompleted} من {task.steps.length} خطوات
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[#66693E] font-bold text-xs group-hover:translate-x-[-2px] transition-transform">
                      {isCompleted ? (
                        <span className="text-[#66693E] flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>منجز ✓</span>
                        </span>
                      ) : isInProgress ? (
                        <span className="text-[#66693E] flex items-center gap-1">
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>استكمال التركيز</span>
                        </span>
                      ) : (
                        <span className="text-[#393313] flex items-center gap-1">
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
