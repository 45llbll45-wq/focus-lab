import React, { useState } from 'react';
import { Clock, Battery, Sparkles } from 'lucide-react';
import type { TaskCategory, EnergyLevel, Screen } from '../../types';
import { Button } from '../Common/Button';

export interface NewTaskScreenProps {
  onPlanGenerated: (data: {
    title: string;
    category: TaskCategory;
    timeMinutes: number;
    energy: EnergyLevel;
  }) => void;
  onNavigate?: (screen: Screen) => void;
}

export const NewTaskScreen: React.FC<NewTaskScreenProps> = ({
  onPlanGenerated
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<TaskCategory | null>('learn');
  const [timeMinutes, setTimeMinutes] = useState<number | null>(30);
  const [isCustomTime, setIsCustomTime] = useState(false);
  const [customTimeValue, setCustomTimeValue] = useState('25');
  const [energy, setEnergy] = useState<EnergyLevel | null>('medium');

  const quickIdeas = [
    'أتعلم Webhooks في Make',
    'أبني Automation لجدولة المنشورات',
    'أجرب AI Agent مع OpenAI',
    'أكتب سكريبت Reel عن الأوتوميشن'
  ];

  const effectiveTime = isCustomTime ? parseInt(customTimeValue, 10) || 0 : timeMinutes || 0;
  const isValid = title.trim().length > 0 && category !== null && effectiveTime > 0 && energy !== null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || !category || !energy) return;

    onPlanGenerated({
      title: title.trim(),
      category,
      timeMinutes: effectiveTime,
      energy
    });
  };

  const categories: { id: TaskCategory; label: string; icon: string }[] = [
    { id: 'learn', label: 'أتعلم', icon: '🧠' },
    { id: 'build', label: 'أبني', icon: '⚡' },
    { id: 'content', label: 'محتوى', icon: '✍️' },
    { id: 'other', label: 'أخرى', icon: '🎯' }
  ];

  const timeOptions = [15, 30, 45, 60];

  const energyLevels: { id: EnergyLevel; label: string; icon: string; desc: string; activeClass: string }[] = [
    { id: 'low', label: 'منخفضة', icon: '🔋', desc: 'خطوات أصغر وتدرج خفيف', activeClass: 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20' },
    { id: 'medium', label: 'متوسطة', icon: '⚡', desc: 'جلسة متوازنة ومباشرة', activeClass: 'border-indigo-500 bg-indigo-50 text-indigo-950 ring-2 ring-indigo-500/20' },
    { id: 'high', label: 'عالية', icon: '🔥', desc: 'تحدي وتركيز عميق', activeClass: 'border-amber-500 bg-amber-50 text-amber-950 ring-2 ring-amber-500/20' }
  ];

  return (
    <form onSubmit={handleSubmit} className="flex-1 flex flex-col p-5 space-y-5 justify-between text-slate-900">
      <div className="space-y-4">
        {/* 1. Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600">
            <span className="bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">الخطوة 1 من 4: تحديد الهدف</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            وش تبين تنجزين؟
          </h1>
          <p className="text-xs text-slate-500">
            اكتبي هدفك بكلماتك البسيطة، والتطبيق سيقسمه لخطوات تناسب وقتك وطاقتك.
          </p>
        </div>

        {/* 2. Real Interactive Textarea */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700">
              المهمة أو الهدف:
            </label>
            <span className="text-[11px] text-slate-400 font-medium">
              {title.length}/120
            </span>
          </div>
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value.slice(0, 120))}
            placeholder="مثال: فهم وتطبيق الـ Webhooks في أداة Make لربط النماذج مع Google Sheets..."
            rows={3}
            className="w-full p-3.5 text-sm font-medium rounded-2xl bg-white border border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-slate-400 resize-none shadow-sm text-slate-900"
            autoFocus
          />

          {/* Quick Idea Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-[11px] text-slate-400 shrink-0 font-medium">أفكار سريعة:</span>
            {quickIdeas.map((idea, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setTitle(idea)}
                className="text-[11px] bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer shrink-0 border border-slate-200"
              >
                + {idea}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Category Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 block">
            التصنيف:
          </label>
          <div className="grid grid-cols-4 gap-2">
            {categories.map((cat) => {
              const selected = category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    selected
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold shadow-sm ring-2 ring-indigo-500/20'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-base">{cat.icon}</span>
                  <span className="text-xs">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Estimated Time */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              <span>الوقت المتوقع للجلسة:</span>
            </label>
            <span className="text-xs font-bold text-indigo-600">
              {effectiveTime > 0 ? `${effectiveTime} دقيقة` : 'غير محدد'}
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {timeOptions.map((t) => {
              const selected = !isCustomTime && timeMinutes === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    setIsCustomTime(false);
                    setTimeMinutes(t);
                  }}
                  className={`py-2 px-1 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    selected
                      ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {t} د
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setIsCustomTime(true)}
              className={`py-2 px-1 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                isCustomTime
                  ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              مخصص
            </button>
          </div>

          {isCustomTime && (
            <div className="flex items-center gap-2 mt-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-600 font-medium">أدخل الدقائق:</span>
              <input
                type="number"
                min="5"
                max="180"
                value={customTimeValue}
                onChange={(e) => setCustomTimeValue(e.target.value)}
                className="w-20 p-1 text-center text-xs font-bold bg-white rounded-lg border border-slate-200 outline-none focus:border-indigo-600 text-slate-900"
                autoFocus
              />
              <span className="text-xs text-slate-400">دقيقة (بين 5 و 180)</span>
            </div>
          )}
        </div>

        {/* 5. Energy Level Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
            <Battery className="w-3.5 h-3.5 text-indigo-600" />
            <span>مستوى طاقتك الآن:</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {energyLevels.map((lvl) => {
              const selected = energy === lvl.id;
              return (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => setEnergy(lvl.id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer text-right flex flex-col items-start gap-1 ${
                    selected
                      ? `${lvl.activeClass} shadow-sm font-bold`
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span>{lvl.icon}</span>
                    <span className="text-xs font-bold">{lvl.label}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-normal leading-tight">
                    {lvl.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 6. Primary Action: توليد الخطة الذكية */}
      <div className="pt-2 sticky bottom-4 z-20">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={!isValid}
          className="shadow-lg shadow-indigo-600/20 text-base font-bold transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>توليد خطة التنفيذ الذكية</span>
        </Button>
        {!isValid && (
          <p className="text-[11px] text-slate-400 text-center mt-2 font-medium">
            * يُرجى كتابة المهمة وتحديد الوقت والتصنيف والطاقة للتفعيل
          </p>
        )}
      </div>
    </form>
  );
};
export default NewTaskScreen;
