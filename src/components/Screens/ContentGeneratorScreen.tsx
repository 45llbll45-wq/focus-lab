import React, { useState, useEffect } from 'react';
import { Sparkles, Save, Copy, Check, RefreshCw, Edit3, Film, Layers, FileText, Wrench } from 'lucide-react';
import type { Task, ContentIdea, ContentFormat, Screen, Reflection } from '../../types';
import { Button } from '../Common/Button';
import { generateContentFromReflection } from '../../services/contentGenerator';

interface ContentGeneratorScreenProps {
  task: Task;
  reflection: Reflection;
  onSaveContentIdea: (idea: ContentIdea) => void;
  onNavigate?: (screen: Screen) => void;
}

export const ContentGeneratorScreen: React.FC<ContentGeneratorScreenProps> = ({
  task,
  reflection,
  onSaveContentIdea
}) => {
  const [format, setFormat] = useState<ContentFormat>('reel');
  const [title, setTitle] = useState('');
  const [hook, setHook] = useState('');
  const [body, setBody] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const regenerate = (fmt: ContentFormat = format) => {
    const draft = generateContentFromReflection({
      taskId: task.id,
      taskTitle: task.title,
      reflection,
      format: fmt
    });
    setTitle(draft.title);
    setHook(draft.hook);
    setBody(draft.body);
  };

  useEffect(() => {
    regenerate(format);
  }, [format]);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSave = () => {
    const idea: ContentIdea = {
      id: `content-${Date.now()}`,
      taskId: task.id,
      taskTitle: task.title,
      title: title.trim(),
      hook: hook.trim(),
      body: body.trim(),
      format,
      status: 'idea',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSaveContentIdea(idea);
  };

  const formats: { id: ContentFormat; label: string; icon: React.ReactNode }[] = [
    { id: 'reel', label: 'Reel 🎥', icon: <Film className="w-3.5 h-3.5" /> },
    { id: 'carousel', label: 'Carousel 📑', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'post', label: 'Post 📝', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'tutorial', label: 'Tutorial 🛠️', icon: <Wrench className="w-3.5 h-3.5" /> }
  ];

  return (
    <div className="flex-1 flex flex-col p-5 space-y-4 text-slate-900">
      {/* 1. Header */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>الخطوة 4 من 4: توليد مسودة المحتوى</span>
          </div>
          <button
            onClick={() => regenerate(format)}
            className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer font-semibold bg-indigo-50 px-2.5 py-1 rounded-xl border border-indigo-100 transition-colors"
            title="إعادة الصياغة"
          >
            <RefreshCw className="w-3 h-3" />
            <span>صياغة جديدة</span>
          </button>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          وش أقدر أنشر؟
        </h1>
        <p className="text-xs text-slate-500">
          حوّلنا ما تعلمتيه إلى مسودة محتوى قابلة للتعديل والمشاركة فوراً.
        </p>
      </div>

      {/* 2. Format Switcher */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 block">نوع القالب:</label>
        <div className="grid grid-cols-4 gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200">
          {formats.map((fmt) => {
            const active = format === fmt.id;
            return (
              <button
                key={fmt.id}
                type="button"
                onClick={() => setFormat(fmt.id)}
                className={`py-2 px-1 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  active
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{fmt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Editable Content Fields */}
      <div className="space-y-3 flex-1 flex flex-col">
        {/* Title / Angle */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
            <span>فكرة المحتوى (العنوان/الزاوية)</span>
            <Edit3 className="w-3 h-3 text-slate-400" />
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2.5 bg-white text-xs sm:text-sm font-bold rounded-xl border border-slate-200 focus:border-indigo-600 outline-none shadow-xs text-slate-900"
          />
        </div>

        {/* Hook */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <span>Hook (خطاف الثواني الأولى)</span>
              <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded text-[10px] font-bold border border-indigo-200">
                عالي التفاعل ⚡
              </span>
            </label>
            <button
              onClick={() => handleCopy(hook, 'hook')}
              className="text-[11px] text-slate-600 hover:text-indigo-600 flex items-center gap-1 cursor-pointer font-semibold bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded-lg border border-slate-200 transition-colors"
            >
              {copiedField === 'hook' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copiedField === 'hook' ? 'تم النسخ!' : 'نسخ'}</span>
            </button>
          </div>
          <textarea
            value={hook}
            onChange={(e) => setHook(e.target.value)}
            rows={2}
            className="w-full p-2.5 bg-indigo-50/50 border border-indigo-200/80 text-xs sm:text-sm font-medium rounded-xl focus:border-indigo-600 outline-none resize-none shadow-xs text-indigo-950"
          />
        </div>

        {/* Core Script / Body */}
        <div className="space-y-1 flex-1 flex flex-col">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <span>الفكرة الأساسية والمسودة</span>
              <span className="text-[10px] text-slate-400 font-normal">(قابلة للتعديل)</span>
            </label>
            <button
              onClick={() => handleCopy(body, 'body')}
              className="text-[11px] text-slate-600 hover:text-indigo-600 flex items-center gap-1 cursor-pointer font-semibold bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded-lg border border-slate-200 transition-colors"
            >
              {copiedField === 'body' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copiedField === 'body' ? 'تم النسخ!' : 'نسخ النص'}</span>
            </button>
          </div>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={6}
            className="w-full p-3 bg-white border border-slate-200 text-xs sm:text-sm font-normal rounded-2xl focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/10 outline-none resize-none shadow-xs text-slate-800 leading-relaxed flex-1 min-h-[140px]"
          />
        </div>
      </div>

      {/* 4. Primary CTA: حفظ الفكرة */}
      <div className="pt-2 sticky bottom-4 z-20">
        <Button
          onClick={handleSave}
          variant="primary"
          size="lg"
          fullWidth
          icon={<Save className="w-5 h-5 text-white" />}
          className="shadow-lg shadow-indigo-600/20 font-bold text-base flex items-center justify-center gap-2"
        >
          حفظ الفكرة في المكتبة 💾
        </Button>
      </div>
    </div>
  );
};
export default ContentGeneratorScreen;
