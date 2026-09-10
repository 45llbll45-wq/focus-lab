import React, { useState } from 'react';
import { Sparkles, Lightbulb, ChevronDown, ChevronUp, PenLine } from 'lucide-react';
import type { Task, Reflection, Screen } from '../../types';
import { Button } from '../Common/Button';
import { CategoryBadge } from '../Common/Badge';

interface CaptureLearningScreenProps {
  task: Task;
  onSaveReflection: (reflection: Reflection) => void;
  onNavigate?: (screen: Screen) => void;
}

export const CaptureLearningScreen: React.FC<CaptureLearningScreenProps> = ({
  task,
  onSaveReflection,
  onNavigate: _onNavigate
}) => {
  // Free-form notes or structured fields
  const [rawNotes, setRawNotes] = useState(task.reflection?.rawNotes || '');
  const [learned, setLearned] = useState(task.reflection?.learned || '');
  const [challenge, setChallenge] = useState(task.reflection?.challenge || '');
  const [experiment, setExperiment] = useState(task.reflection?.experiment || '');
  const [result, setResult] = useState(task.reflection?.result || '');
  const [showDetailedFields, setShowDetailedFields] = useState(false);

  // Guiding questions
  const promptQuestions = [
    { label: 'وش الشيء الجديد اللي فهمته؟', field: 'learned', placeholder: 'مثال: الفرق بين Webhooks و Polling وكيف توفر عمليات...' },
    { label: 'وش المشكلة اللي واجهتك؟', field: 'challenge', placeholder: 'مثال: خطأ في قراءة الـ JSON الداخلي، وعالجته بأداة Parse...' },
    { label: 'وش الشيء اللي جربته؟', field: 'experiment', placeholder: 'مثال: ربطت تيليجرام مع شيت Google لتسجيل الإشعارات...' },
    { label: 'وش النتيجة؟', field: 'result', placeholder: 'مثال: السيناريو اشتغل فوري ووفّر علي أكثر من نصف ساعة يومياً...' }
  ];

  const handlePromptClick = (_question: typeof promptQuestions[0]) => {
    setShowDetailedFields(true);
  };

  const handleContinue = () => {
    // Compile everything into reflection
    const reflection: Reflection = {
      learned: learned.trim() || rawNotes.trim(),
      challenge: challenge.trim(),
      experiment: experiment.trim(),
      result: result.trim(),
      rawNotes: rawNotes.trim() || learned.trim(),
      timestamp: new Date().toISOString()
    };

    onSaveReflection(reflection);
  };

  const hasAnyInput = rawNotes.trim().length > 0 || learned.trim().length > 0 || challenge.trim().length > 0;

  return (
    <div className="flex-1 flex flex-col p-5 space-y-5">
      {/* 1. Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#017CC3]">
          <Lightbulb className="w-3.5 h-3.5 text-[#017CC3]" />
          <span>توثيق رحلة التعلم والتطبيق</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
          وش تعلمت؟
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          كل ما تسجلينه هنا سيتحول تلقائياً إلى أفكار محتوى جاهزة للمشاركة والنشر.
        </p>
      </div>

      {/* 2. Source Task Badge */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 truncate">
          <CategoryBadge category={task.category} />
          <span className="font-bold text-slate-700 truncate">{task.title}</span>
        </div>
        <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
          تم الإنجاز ✓
        </span>
      </div>

      {/* 3. Guiding Prompt Chips */}
      <div className="space-y-1.5">
        <span className="text-xs font-bold text-slate-600 block">
          أسئلة مساعدة لتحفيز التدوين:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {promptQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handlePromptClick(q)}
              className="text-[11px] bg-[#ADD4E5]/20 hover:bg-[#ADD4E5]/40 text-[#01588c] px-3 py-1.5 rounded-xl border border-[#ADD4E5]/50 transition-all cursor-pointer text-right flex items-center gap-1"
            >
              <span>✨</span>
              <span>{q.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Main Interactive Textarea */}
      <div className="space-y-4 flex-1 flex flex-col">
        <div className="space-y-1.5 flex-1 flex flex-col">
          <label className="text-xs font-bold text-[#0F172A]">
            اكتبي ملاحظاتك وما تعلمتيه بحرية:
          </label>
          <textarea
            value={rawNotes}
            onChange={(e) => setRawNotes(e.target.value)}
            placeholder="اكتبي ماذا تعلمت اليوم، ما هي المشكلة التي واجهتك، وما النتيجة التي خرجت بها..."
            rows={4}
            className="w-full p-4 text-sm font-medium rounded-2xl bg-white border-2 border-slate-200 focus:border-[#017CC3] focus:ring-4 focus:ring-[#017CC3]/10 outline-none transition-all placeholder:text-slate-400 resize-none shadow-xs text-[#0F172A] flex-1 min-h-[120px]"
            autoFocus
          />
        </div>

        {/* Toggle Detailed Prompts */}
        <div className="border border-slate-200 bg-white rounded-2xl overflow-hidden shadow-xs">
          <button
            type="button"
            onClick={() => setShowDetailedFields(!showDetailedFields)}
            className="w-full px-4 py-3 text-xs font-bold text-slate-700 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <PenLine className="w-4 h-4 text-[#017CC3]" />
              <span>تفصيل الأسئلة الأربعة (اختياري لنتائج أدق)</span>
            </span>
            {showDetailedFields ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          {showDetailedFields && (
            <div className="p-4 pt-1 space-y-3 border-t border-slate-100 bg-slate-50/50">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700">1. وش الشيء الجديد اللي فهمته؟</label>
                <input
                  type="text"
                  value={learned}
                  onChange={(e) => setLearned(e.target.value)}
                  placeholder="المفهوم أو الفكرة الجديدة..."
                  className="w-full p-2.5 bg-white text-xs rounded-xl border border-slate-200 outline-none focus:border-[#017CC3]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700">2. وش المشكلة أو الخطأ اللي واجهك؟</label>
                <input
                  type="text"
                  value={challenge}
                  onChange={(e) => setChallenge(e.target.value)}
                  placeholder="التحدي أو الخطأ وكيف تم التغلب عليه..."
                  className="w-full p-2.5 bg-white text-xs rounded-xl border border-slate-200 outline-none focus:border-[#017CC3]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700">3. وش الشيء اللي جربته عملياً؟</label>
                <input
                  type="text"
                  value={experiment}
                  onChange={(e) => setExperiment(e.target.value)}
                  placeholder="التطبيق أو السيناريو الذي بنيته..."
                  className="w-full p-2.5 bg-white text-xs rounded-xl border border-slate-200 outline-none focus:border-[#017CC3]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700">4. وش النتيجة؟</label>
                <input
                  type="text"
                  value={result}
                  onChange={(e) => setResult(e.target.value)}
                  placeholder="الأثر أو السرعة أو الفائدة المحققة..."
                  className="w-full p-2.5 bg-white text-xs rounded-xl border border-slate-200 outline-none focus:border-[#017CC3]"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 5. Primary CTA: حوّلها لفكرة محتوى */}
      <div className="pt-2 sticky bottom-4 z-20">
        <Button
          onClick={handleContinue}
          variant="primary"
          size="lg"
          fullWidth
          disabled={!hasAnyInput}
          icon={<Sparkles className="w-5 h-5 text-[#FFE902]" />}
          className="transition-all text-base font-bold"
        >
          حوّلها لفكرة محتوى ✨
        </Button>
        {!hasAnyInput && (
          <p className="text-[11px] text-slate-400 text-center mt-2">
            * اكتبي جملة واحدة على الأقل عما تعلمتيه لتوليد فكرة المحتوى
          </p>
        )}
      </div>
    </div>
  );
};
