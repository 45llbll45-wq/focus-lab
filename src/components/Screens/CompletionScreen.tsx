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
        colors: ['#3e2f59', '#c6ed58', '#dbb0cf', '#2e2243']
      });
    } catch (_e) {
      // ignore
    }
  }, []);

  const totalMinutes = Math.max(1, Math.round((task.actualTimeSpentSeconds || task.timeMinutes * 60) / 60));

  return (
    <div className="flex-1 flex flex-col p-5 space-y-5 justify-between text-[#1e1b24]">
      {/* 1. Header Celebration */}
      <div className="text-center space-y-2 pt-2">
        <div className="w-16 h-16 rounded-3xl bg-[#c6ed58]/35 border border-[#c6ed58] text-[#3e2f59] flex items-center justify-center mx-auto shadow-sm text-3xl animate-bounce">
          🎉
        </div>
        <h1 className="text-3xl font-black text-[#1e1b24] tracking-tight">
          خلصنا! 🚀
        </h1>
        <p className="text-xs text-[#6b6475] font-medium max-w-xs mx-auto">
          أنجزتِ جلسة التركيز ووثقتِ تجربتك وحولتيها لقيمة قابلة للمشاركة.
        </p>
      </div>

      {/* 2. Summary Card */}
      <div className="bg-white rounded-2xl border border-[#ece7de] shadow-xs p-4 space-y-4">
        {/* Task & Category */}
        <div className="space-y-1.5 border-b border-[#ece7de] pb-3">
          <div className="flex items-center justify-between">
            <CategoryBadge category={task.category} />
            <div className="flex items-center gap-1 text-xs font-bold text-[#3e2f59] font-mono">
              <Clock className="w-3.5 h-3.5 text-[#3e2f59]" />
              <span>{totalMinutes} دقيقة إنجاز</span>
            </div>
          </div>
          <h3 className="font-bold text-sm text-[#1e1b24]">
            {task.title}
          </h3>
        </div>

        {/* Steps Accomplished */}
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-[#1e1b24] block">
            الخطوات المنجزة ({task.steps.length}):
          </span>
          <div className="space-y-1">
            {task.steps.map((step) => (
              <div key={step.id} className="flex items-center gap-2 text-xs text-[#6b6475]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#3e2f59] shrink-0" />
                <span className="line-clamp-1">{step.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* What was learned */}
        {task.reflection && (
          <div className="bg-[#dbb0cf]/25 border border-[#dbb0cf]/45 rounded-xl p-3 space-y-1">
            <span className="text-[11px] font-bold text-[#3e2f59] block">
              💡 ماذا تعلمتِ:
            </span>
            <p className="text-xs text-[#1e1b24] leading-relaxed font-medium">
              {task.reflection.learned || task.reflection.rawNotes}
            </p>
          </div>
        )}

        {/* Generated Content Idea Card */}
        {contentIdea && (
          <div className="bg-[#c6ed58]/15 border border-[#c6ed58]/45 rounded-xl p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#1e1b24] flex items-center gap-1">
                <span>✍️ فكرة المحتوى المولدة</span>
              </span>
              <ContentFormatBadge format={contentIdea.format} />
            </div>
            <p className="text-xs font-bold text-[#1e1b24]">
              {contentIdea.title}
            </p>
            <div className="text-[11px] text-[#1e1b24] bg-white p-2 rounded-lg border border-[#ece7de] font-medium">
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
          icon={<Plus className="w-5 h-5 text-[#c6ed58]" />}
          className="bg-[#3e2f59] hover:bg-[#2e2243] text-[#fcfbf8] shadow-lg shadow-[#3e2f59]/20 text-base font-bold flex items-center justify-center gap-2"
        >
          مهمة جديدة 🚀
        </Button>

        <Button
          onClick={onViewLibrary}
          variant="outline"
          size="md"
          fullWidth
          icon={<BookOpen className="w-4 h-4 text-[#3e2f59]" />}
          className="border-[#ece7de] text-[#3e2f59] hover:bg-[#dbb0cf]/20 font-bold"
        >
          عرض مكتبة المحتوى
        </Button>
      </div>
    </div>
  );
};
export default CompletionScreen;
