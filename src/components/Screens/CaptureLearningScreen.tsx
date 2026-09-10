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
  onSaveReflection
}) => {
  const [rawNotes, setRawNotes] = useState(task.reflection?.rawNotes || '');
  const [learned, setLearned] = useState(task.reflection?.learned || '');
  const [challenge, setChallenge] = useState(task.reflection?.challenge || '');
  const [experiment, setExperiment] = useState(task.reflection?.experiment || '');
  const [result, setResult] = useState(task.reflection?.result || '');
  const [showDetailedFields, setShowDetailedFields] = useState(false);

  const promptQuestions = [
    'وش الشيء الجديد اللي فهمته؟',
    'وش المشكلة أو الخطأ اللي واجهك؟',
    'وش الشيء اللي جربته عملياً؟',
    'وش النتيجة؟'
  ];

  const handlePromptClick = () => {
    setShowDetailedFields(true);
  };

  const handleContinue = () => {
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
    <div className="flex-1 flex flex-col p-5 space-y-5 text-[#31031F]">
      {/* 1. Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#66693E]">
          <Lightbulb className="w-3.5 h-3.5 text-[#66693E]" />
          <span>توثيق رحلة التعلم والتطبيق</span>
        </div>
        <h1 className="text-2xl font-bold text-[#31031F] tracking-tight">
          وش تعلمت؟
        </h1>
        <p className="text-xs text-[#6B5E5B]">
          كل ما تسجلينه هنا سيتحول تلقائياً إلى أفكار محتوى جاهزة للمشاركة والنشر.
        </p>
      </div>

      {/* 2. Source Task Badge */}
      <div className="bg-[#FFFDF9] p-3 rounded-2xl border border-[#EBDDCB] flex items-center justify-between text-xs shadow-2xs">
        <div className="flex items-center gap-2 truncate">
          <CategoryBadge category={task.category} />
          <span className="font-semibold text-[#31031F] truncate">{task.title}</span>
        </div>
        <span className="text-[11px] text-[#393313] font-semibold bg-[#66693E]/20 px-2 py-0.5 rounded-full border border-[#66693E]/40 shrink-0">
          تم الإنجاز ✓
        </span>
      </div>

      {/* 3. Guiding Prompt Chips */}
      <div className="space-y-1.5">
        <span className="text-xs font-bold text-[#31031F] block">
          أسئلة مساعدة لتحفيز التدوين:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {promptQuestions.map((label, idx) => (
            <button
              key={idx}
              type="button"
              onClick={handlePromptClick}
              className="text-[11px] bg-[#66693E]/12 hover:bg-[#66693E]/20 text-[#393313] px-3 py-1.5 rounded-xl border border-[#66693E]/30 transition-all cursor-pointer text-right flex items-center gap-1 font-semibold"
            >
              <span>✨</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Main Interactive Textarea */}
      <div className="space-y-4 flex-1 flex flex-col">
        <div className="space-y-1.5 flex-1 flex flex-col">
          <label className="text-xs font-bold text-[#31031F]">
            اكتبي ملاحظاتك وما تعلمتيه بحرية:
          </label>
          <textarea
            value={rawNotes}
            onChange={(e) => setRawNotes(e.target.value)}
            placeholder="اكتبي ماذا تعلمت اليوم، ما هي المشكلة التي واجهتك، وما النتيجة التي خرجت بها..."
            rows={4}
            className="w-full p-3.5 text-sm font-medium rounded-2xl bg-[#FFFDF9] border border-[#EBDDCB] focus:border-[#66693E] focus:ring-4 focus:ring-[#66693E]/10 outline-none transition-all placeholder:text-[#B8A494] resize-none shadow-2xs text-[#31031F] flex-1 min-h-[120px]"
            autoFocus
          />
        </div>

        {/* Toggle Detailed Prompts */}
        <div className="border border-[#EBDDCB] bg-[#FFFDF9] rounded-2xl overflow-hidden shadow-2xs">
          <button
            type="button"
            onClick={() => setShowDetailedFields(!showDetailedFields)}
            className="w-full px-4 py-3 text-xs font-bold text-[#31031F] flex items-center justify-between hover:bg-[#F4EDE0] transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <PenLine className="w-4 h-4 text-[#66693E]" />
              <span>تفصيل الأسئلة الأربعة (اختياري لنتائج أدق)</span>
            </span>
            {showDetailedFields ? <ChevronUp className="w-4 h-4 text-[#8C7A6B]" /> : <ChevronDown className="w-4 h-4 text-[#8C7A6B]" />}
          </button>

          {showDetailedFields && (
            <div className="p-4 pt-1 space-y-3 border-t border-[#EBDDCB] bg-[#F4EDE0]/40">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#393313]">1. وش الشيء الجديد اللي فهمته؟</label>
                <input
                  type="text"
                  value={learned}
                  onChange={(e) => setLearned(e.target.value)}
                  placeholder="المفهوم أو الفكرة الجديدة..."
                  className="w-full p-2.5 bg-white text-xs rounded-xl border border-[#EBDDCB] outline-none focus:border-[#66693E] text-[#31031F]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#393313]">2. وش المشكلة أو الخطأ اللي واجهك؟</label>
                <input
                  type="text"
                  value={challenge}
                  onChange={(e) => setChallenge(e.target.value)}
                  placeholder="التحدي أو الخطأ وكيف تم التغلب عليه..."
                  className="w-full p-2.5 bg-white text-xs rounded-xl border border-[#EBDDCB] outline-none focus:border-[#66693E] text-[#31031F]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#393313]">3. وش الشيء اللي جربته عملياً؟</label>
                <input
                  type="text"
                  value={experiment}
                  onChange={(e) => setExperiment(e.target.value)}
                  placeholder="التطبيق أو السيناريو الذي بنيته..."
                  className="w-full p-2.5 bg-white text-xs rounded-xl border border-[#EBDDCB] outline-none focus:border-[#66693E] text-[#31031F]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#393313]">4. وش النتيجة؟</label>
                <input
                  type="text"
                  value={result}
                  onChange={(e) => setResult(e.target.value)}
                  placeholder="الأثر أو السرعة أو الفائدة المحققة..."
                  className="w-full p-2.5 bg-white text-xs rounded-xl border border-[#EBDDCB] outline-none focus:border-[#66693E] text-[#31031F]"
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
          icon={<Sparkles className="w-5 h-5 text-[#FFF8ED]" />}
          className="bg-[#66693E] hover:bg-[#525530] text-[#FFF8ED] shadow-md transition-all text-base font-bold"
        >
          حوّلها لفكرة محتوى ✨
        </Button>
        {!hasAnyInput && (
          <p className="text-[11px] text-[#8C7A6B] text-center mt-2 font-medium">
            * اكتبي جملة واحدة على الأقل عما تعلمتيه لتوليد فكرة المحتوى
          </p>
        )}
      </div>
    </div>
  );
};
export default CaptureLearningScreen;
