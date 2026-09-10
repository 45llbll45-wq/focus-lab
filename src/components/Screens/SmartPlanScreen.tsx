import React, { useState } from 'react';
import { Play, Plus, Trash2, Clock, Sparkles } from 'lucide-react';
import type { Task, Step, Screen } from '../../types';
import { Button } from '../Common/Button';
import { CategoryBadge, EnergyBadge } from '../Common/Badge';

interface SmartPlanScreenProps {
  task: Task;
  onStartFocus: () => void;
  onUpdateSteps: (steps: Step[]) => void;
  onNavigate?: (screen: Screen) => void;
}

export const SmartPlanScreen: React.FC<SmartPlanScreenProps> = ({
  task,
  onStartFocus,
  onUpdateSteps,
  onNavigate: _onNavigate
}) => {
  const [steps, setSteps] = useState<Step[]>(task.steps);

  const totalCalculatedMinutes = steps.reduce((sum, s) => sum + s.durationMinutes, 0);

  const handleStepTextChange = (id: string, newText: string) => {
    const updated = steps.map((s) => (s.id === id ? { ...s, text: newText } : s));
    setSteps(updated);
    onUpdateSteps(updated);
  };

  const handleStepDurationChange = (id: string, newDuration: number) => {
    const updated = steps.map((s) =>
      s.id === id ? { ...s, durationMinutes: Math.max(1, newDuration) } : s
    );
    setSteps(updated);
    onUpdateSteps(updated);
  };

  const handleAddStep = () => {
    const newStep: Step = {
      id: `step-${Date.now()}`,
      text: 'خطوة جديدة إضافية',
      durationMinutes: 5,
      completed: false
    };
    const updated = [...steps, newStep];
    setSteps(updated);
    onUpdateSteps(updated);
  };

  const handleDeleteStep = (id: string) => {
    if (steps.length <= 1) return; // Keep at least 1 step
    const updated = steps.filter((s) => s.id !== id);
    setSteps(updated);
    onUpdateSteps(updated);
  };

  return (
    <div className="flex-1 flex flex-col p-5 space-y-5 justify-between">
      <div className="space-y-4">
        {/* 1. Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#017CC3]">
            <span>الخطوة 2 من 4: خطة التنفيذ</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
            كيف بنسويه؟
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            قسمنا المهمة إلى خطوات صغيرة قابلة للتركيز والتنفيذ خطوة بخطوة.
          </p>
        </div>

        {/* 2. Task Summary Card */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <CategoryBadge category={task.category} />
              <EnergyBadge energy={task.energy} />
            </div>
            <div className="flex items-center gap-1 text-xs text-[#017CC3] font-bold font-mono">
              <Clock className="w-3.5 h-3.5" />
              <span>{totalCalculatedMinutes} دقيقة إجمالية</span>
            </div>
          </div>
          <h2 className="text-base font-bold text-[#0F172A] leading-snug">
            {task.title}
          </h2>
        </div>

        {/* 3. Steps Breakdown List */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700">
              خطوات الجلسة ({steps.length}):
            </label>
            <button
              type="button"
              onClick={handleAddStep}
              className="text-xs font-bold text-[#017CC3] hover:text-[#01588c] flex items-center gap-1 cursor-pointer bg-[#ADD4E5]/20 hover:bg-[#ADD4E5]/40 px-2.5 py-1 rounded-xl transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة خطوة</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {steps.map((step, idx) => {
              const isFirstMicro = step.isMicroStep || (idx === 0 && task.energy === 'low');

              return (
                <div
                  key={step.id}
                  className={`p-3.5 rounded-2xl bg-white border-2 transition-all space-y-2 relative group ${
                    isFirstMicro ? 'border-[#FFE902] shadow-xs' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {isFirstMicro && (
                    <div className="flex items-center gap-1 text-[10px] font-bold text-amber-900 bg-[#FFE902]/40 px-2 py-0.5 rounded-full w-fit mb-1">
                      <Sparkles className="w-3 h-3 text-amber-700" />
                      <span>بداية ميسرة (&lt; 5 دقائق) لبناء الزخم</span>
                    </div>
                  )}

                  <div className="flex items-start gap-2.5">
                    {/* Step Number Circle */}
                    <div className="w-6 h-6 rounded-full bg-[#017CC3]/10 text-[#017CC3] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 font-mono">
                      {idx + 1}
                    </div>

                    {/* Step Text Input */}
                    <div className="flex-1 space-y-1">
                      <input
                        type="text"
                        value={step.text}
                        onChange={(e) => handleStepTextChange(step.id, e.target.value)}
                        className="w-full text-xs sm:text-sm font-semibold text-[#0F172A] bg-transparent outline-none border-b border-transparent focus:border-[#017CC3] transition-colors"
                      />
                    </div>

                    {/* Duration input */}
                    <div className="flex items-center gap-1 shrink-0 bg-slate-50 px-2 py-1 rounded-xl border border-slate-200">
                      <input
                        type="number"
                        min="1"
                        max="120"
                        value={step.durationMinutes}
                        onChange={(e) => handleStepDurationChange(step.id, parseInt(e.target.value, 10) || 1)}
                        className="w-8 text-center text-xs font-bold font-mono bg-transparent outline-none"
                      />
                      <span className="text-[10px] text-slate-400 font-medium">د</span>
                    </div>

                    {/* Delete button if > 1 step */}
                    {steps.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleDeleteStep(step.id)}
                        className="text-slate-300 hover:text-rose-500 p-1 transition-colors cursor-pointer shrink-0"
                        title="حذف الخطوة"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Primary CTA: بدء جلسة التركيز */}
      <div className="pt-4 sticky bottom-4 z-20">
        <Button
          onClick={onStartFocus}
          variant="primary"
          size="lg"
          fullWidth
          icon={<Play className="w-5 h-5 fill-current text-[#FFE902]" />}
          className="bg-[#017CC3] hover:bg-[#0169a5] shadow-xl text-base font-bold"
        >
          ابدأ جلسة التركيز ⚡
        </Button>
      </div>
    </div>
  );
};
