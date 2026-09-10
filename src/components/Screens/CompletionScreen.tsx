import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Clock, BookOpen, Plus } from 'lucide-react';
import type { Task, ContentIdea, Screen } from '../../types';
import { Button } from '../Common/Button';
import { CategoryBadge, ContentFormatBadge } from '../Common/Badge';
import { playCelebrateSound } from '../../services/sound';

interface CompletionScreenProps {
  task: Task;
  contentIdea?: ContentIdea;
  onNewTask: () => void;
  onViewLibrary: () => void;
  onNavigate?: (screen: Screen) => void;
}

export const CompletionScreen: React.FC<CompletionScreenProps> = ({
  task,
  contentIdea,
  onNewTask,
  onViewLibrary
}) => {
  useEffect(() => {
    // Play celebratory sound and trigger confetti
    playCelebrateSound();

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#017CC3', '#FFE902', '#ADD4E5', '#10B981']
      });
    } catch (_e) {
      // ignore
    }
  }, []);

  const totalMinutes = Math.max(1, Math.round((task.actualTimeSpentSeconds || task.timeMinutes * 60) / 60));

  return (
    <div className="flex-1 flex flex-col p-5 space-y-5 justify-between">
      {/* 1. Header Celebration */}
      <div className="text-center space-y-2 pt-2">
        <div className="w-16 h-16 rounded-3xl bg-[#FFE902] text-[#0F172A] flex items-center justify-center mx-auto shadow-lg shadow-[#FFE902]/30 text-3xl animate-bounce">
          🎉
        </div>
        <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
          خلصنا! 🚀
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-xs mx-auto">
          أنجزتِ جلسة التركيز ووثقتِ تجربتك وحولتيها لقيمة قابلة للمشاركة.
        </p>
      </div>

      {/* 2. Summary Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 space-y-4">
        {/* Task & Category */}
        <div className="space-y-1.5 border-b border-slate-100 pb-3">
          <div className="flex items-center justify-between">
            <CategoryBadge category={task.category} />
            <div className="flex items-center gap-1 text-xs font-semibold text-slate-500 font-mono">
              <Clock className="w-3.5 h-3.5 text-[#017CC3]" />
              <span>{totalMinutes} دقيقة إنجاز</span>
            </div>
          </div>
          <h3 className="font-bold text-base text-[#0F172A]">
            {task.title}
          </h3>
        </div>

        {/* Steps Accomplished */}
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-slate-700 block">
            الخطوات المنجزة ({task.steps.length}):
          </span>
          <div className="space-y-1">
            {task.steps.map((step) => (
              <div key={step.id} className="flex items-center gap-2 text-xs text-slate-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="line-clamp-1">{step.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* What was learned */}
        {task.reflection && (
          <div className="bg-[#ADD4E5]/15 border border-[#ADD4E5]/40 rounded-2xl p-3 space-y-1">
            <span className="text-[11px] font-bold text-[#01588c] block">
              💡 ماذا تعلمتِ:
            </span>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {task.reflection.learned || task.reflection.rawNotes}
            </p>
          </div>
        )}

        {/* Generated Content Idea Card */}
        {contentIdea && (
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-900 flex items-center gap-1">
                <span>✍️ فكرة المحتوى المولدة</span>
              </span>
              <ContentFormatBadge format={contentIdea.format} />
            </div>
            <p className="text-xs font-bold text-amber-950">
              {contentIdea.title}
            </p>
            <div className="text-[11px] text-amber-900 bg-white/70 p-2 rounded-xl border border-amber-200/60 font-medium">
              🪝 {contentIdea.hook}
            </div>
          </div>
        )}
      </div>

      {/* 3. Action Buttons */}
      <div className="space-y-2.5 pt-2 sticky bottom-4 z-20">
        <Button
          onClick={onNewTask}
          variant="primary"
          size="lg"
          fullWidth
          icon={<Plus className="w-5 h-5" />}
          className="bg-[#017CC3] hover:bg-[#0169a5] shadow-xl text-base font-bold"
        >
          مهمة جديدة 🚀
        </Button>

        <Button
          onClick={onViewLibrary}
          variant="secondary"
          size="md"
          fullWidth
          icon={<BookOpen className="w-4 h-4 text-[#017CC3]" />}
        >
          عرض مكتبة المحتوى
        </Button>
      </div>
    </div>
  );
};
