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
    playCelebrateSound();

    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#31031F', '#66693E', '#393313', '#C5A880']
      });
    } catch (_e) {
      // ignore
    }
  }, []);

  const totalMinutes = Math.max(1, Math.round((task.actualTimeSpentSeconds || task.timeMinutes * 60) / 60));

  return (
    <div className="flex-1 flex flex-col p-5 space-y-5 justify-between text-[#31031F]">
      {/* 1. Header Celebration */}
      <div className="text-center space-y-2 pt-2">
        <div className="w-16 h-16 rounded-3xl bg-[#66693E]/20 border border-[#66693E]/40 text-[#31031F] flex items-center justify-center mx-auto shadow-sm text-3xl animate-bounce">
          🎉
        </div>
        <h1 className="text-3xl font-extrabold text-[#31031F] tracking-tight">
          خلصنا! 🚀
        </h1>
        <p className="text-xs text-[#6B5E5B] font-medium max-w-xs mx-auto">
          أنجزتِ جلسة التركيز ووثقتِ تجربتك وحولتيها لقيمة قابلة للمشاركة.
        </p>
      </div>

      {/* 2. Summary Card */}
      <div className="bg-[#FFFDF9] rounded-2xl border border-[#EBDDCB] shadow-2xs p-4 space-y-4">
        {/* Task & Category */}
        <div className="space-y-1.5 border-b border-[#EBDDCB]/60 pb-3">
          <div className="flex items-center justify-between">
            <CategoryBadge category={task.category} />
            <div className="flex items-center gap-1 text-xs font-semibold text-[#66693E] font-mono">
              <Clock className="w-3.5 h-3.5 text-[#66693E]" />
              <span>{totalMinutes} دقيقة إنجاز</span>
            </div>
          </div>
          <h3 className="font-bold text-sm text-[#31031F]">
            {task.title}
          </h3>
        </div>

        {/* Steps Accomplished */}
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-[#31031F] block">
            الخطوات المنجزة ({task.steps.length}):
          </span>
          <div className="space-y-1">
            {task.steps.map((step) => (
              <div key={step.id} className="flex items-center gap-2 text-xs text-[#6B5E5B]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#66693E] shrink-0" />
                <span className="line-clamp-1">{step.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* What was learned */}
        {task.reflection && (
          <div className="bg-[#66693E]/10 border border-[#66693E]/25 rounded-xl p-3 space-y-1">
            <span className="text-[11px] font-bold text-[#393313] block">
              💡 ماذا تعلمتِ:
            </span>
            <p className="text-xs text-[#31031F] leading-relaxed font-medium">
              {task.reflection.learned || task.reflection.rawNotes}
            </p>
          </div>
        )}

        {/* Generated Content Idea Card */}
        {contentIdea && (
          <div className="bg-[#C5A880]/15 border border-[#C5A880]/40 rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#4A321F] flex items-center gap-1">
                <span>✍️ فكرة المحتوى المولدة</span>
              </span>
              <ContentFormatBadge format={contentIdea.format} />
            </div>
            <p className="text-xs font-bold text-[#31031F]">
              {contentIdea.title}
            </p>
            <div className="text-[11px] text-[#31031F] bg-[#FFFDF9] p-2 rounded-lg border border-[#EBDDCB] font-medium">
              🪝 {contentIdea.hook}
            </div>
          </div>
        )}
      </div>

      {/* 3. Action Buttons */}
      <div className="space-y-2 pt-2 sticky bottom-4 z-20">
        <Button
          onClick={onNewTask}
          variant="primary"
          size="lg"
          fullWidth
          icon={<Plus className="w-5 h-5 text-[#FFF8ED]" />}
          className="bg-[#66693E] hover:bg-[#525530] text-[#FFF8ED] shadow-md text-base font-bold"
        >
          مهمة جديدة 🚀
        </Button>

        <Button
          onClick={onViewLibrary}
          variant="outline"
          size="md"
          fullWidth
          icon={<BookOpen className="w-4 h-4 text-[#66693E]" />}
          className="border-[#EBDDCB] text-[#31031F] hover:bg-[#F4EDE0]"
        >
          عرض مكتبة المحتوى
        </Button>
      </div>
    </div>
  );
};
export default CompletionScreen;
