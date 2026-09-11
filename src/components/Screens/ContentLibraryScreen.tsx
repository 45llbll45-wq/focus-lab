import React, { useState } from 'react';
import { BookOpen, Copy, Check, Trash2, Download, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import type { ContentIdea, ContentStatus, ContentFormat, Screen } from '../../types';
import { Button } from '../Common/Button';
import { ContentFormatBadge } from '../Common/Badge';

interface ContentLibraryScreenProps {
  ideas: ContentIdea[];
  onUpdateIdea: (idea: ContentIdea) => void;
  onDeleteIdea: (id: string) => void;
  onNavigate?: (screen: Screen) => void;
  onNewTask: () => void;
}

export const ContentLibraryScreen: React.FC<ContentLibraryScreenProps> = ({
  ideas,
  onUpdateIdea,
  onDeleteIdea,
  onNewTask
}) => {
  const [statusFilter, setStatusFilter] = useState<'all' | ContentStatus>('all');
  const [formatFilter] = useState<'all' | ContentFormat>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredIdeas = ideas.filter(idea => {
    if (statusFilter !== 'all' && idea.status !== statusFilter) return false;
    if (formatFilter !== 'all' && idea.format !== formatFilter) return false;
    return true;
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleStatusChange = (idea: ContentIdea, nextStatus: ContentStatus) => {
    onUpdateIdea({
      ...idea,
      status: nextStatus,
      updatedAt: new Date().toISOString()
    });
  };

  const handleExportMarkdown = () => {
    if (ideas.length === 0) return;
    let md = '# 📚 مكتبة محتوى Focus Lab\n\n';
    md += `*تاريخ التصدير: ${new Date().toLocaleDateString('ar-SA')}*\n\n---\n\n`;

    ideas.forEach((idea, idx) => {
      md += `## ${idx + 1}. ${idea.title}\n`;
      md += `- **النوع:** ${idea.format.toUpperCase()}\n`;
      md += `- **الحالة:** ${idea.status}\n`;
      if (idea.taskTitle) md += `- **المهمة المصدرية:** ${idea.taskTitle}\n`;
      md += `\n### 🪝 Hook:\n> ${idea.hook}\n\n`;
      md += `### 📝 النص والمسودة:\n${idea.body}\n\n---\n\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `focus-lab-content-${Date.now()}.md`;
    link.click();
  };

  return (
    <div className="flex-1 flex flex-col p-5 space-y-5 text-[#1e1b24]">
      {/* 1. Header */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dbb0cf]/35 text-[#3e2f59] text-xs font-bold border border-[#dbb0cf]/60">
            <BookOpen className="w-3.5 h-3.5" />
            <span>حصيلة التعلم والتطبيق</span>
          </div>
          {ideas.length > 0 && (
            <button
              onClick={handleExportMarkdown}
              className="text-xs text-[#3e2f59] hover:bg-[#dbb0cf]/25 flex items-center gap-1 cursor-pointer font-bold bg-white px-2.5 py-1 rounded-xl border border-[#ece7de] shadow-xs transition-colors"
              title="تصدير كملف Markdown"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تصدير MD</span>
            </button>
          )}
        </div>

        <h1 className="text-2xl font-bold text-[#1e1b24] tracking-tight">
          مكتبة المحتوى
        </h1>
        <p className="text-xs text-[#6b6475]">
          أفكار ومسودات ومقاطع تولدت طبيعياً من تجاربك اليومية في الـ AI Automation.
        </p>
      </div>

      {/* 2. Status Filters */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
        {[
          { id: 'all', label: `الكل (${ideas.length})` },
          { id: 'idea', label: 'فكرة (Idea)' },
          { id: 'draft', label: 'مسودة (Draft)' },
          { id: 'published', label: 'تم النشر ✓' }
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setStatusFilter(f.id as typeof statusFilter)}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer font-bold border ${
              statusFilter === f.id
                ? 'bg-[#3e2f59] text-[#fcfbf8] border-[#3e2f59] shadow-xs'
                : 'bg-white text-[#6b6475] border-[#ece7de] hover:bg-[#fcfbf8]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* 3. Content Ideas Cards */}
      <div className="space-y-3 flex-1">
        {filteredIdeas.length === 0 ? (
          <div className="bg-white border border-dashed border-[#ece7de] rounded-2xl p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#dbb0cf]/30 flex items-center justify-center text-[#3e2f59] mx-auto text-xl">
              ✍️
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-[#1e1b24] text-sm">لا توجد أفكار بعد في هذا القسم</h3>
              <p className="text-xs text-[#6b6475] max-w-[240px] mx-auto">
                ابدئي جلسة تركيز جديدة وسجلي ما تعلمتيه لتوليد أول فكرة محتوى!
              </p>
            </div>
            <Button
              onClick={onNewTask}
              variant="primary"
              size="sm"
              icon={<Plus className="w-4 h-4 text-[#c6ed58]" />}
            >
              جلسة تركيز جديدة
            </Button>
          </div>
        ) : (
          filteredIdeas.map((idea) => {
            const isExpanded = expandedId === idea.id;

            return (
              <div
                key={idea.id}
                className="bg-white p-4 rounded-2xl border border-[#ece7de] shadow-xs space-y-3 hover:border-[#dbb0cf] transition-all"
              >
                {/* Header: Type, Status, Task Source */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <ContentFormatBadge format={idea.format} />
                    {/* Status dropdown */}
                    <div className="relative group">
                      <select
                        value={idea.status}
                        onChange={(e) => handleStatusChange(idea, e.target.value as ContentStatus)}
                        className="text-xs bg-[#fcfbf8] border border-[#ece7de] rounded-full px-2.5 py-0.5 font-bold outline-none cursor-pointer text-[#3e2f59] hover:border-[#3e2f59]"
                      >
                        <option value="idea">فكرة (Idea)</option>
                        <option value="draft">مسودة (Draft)</option>
                        <option value="published">تم النشر (Published) ✓</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => onDeleteIdea(idea.id)}
                    className="text-[#878191] hover:text-rose-600 p-1 transition-colors cursor-pointer"
                    title="حذف"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Title */}
                <h3 className="font-bold text-sm text-[#1e1b24] leading-snug">
                  {idea.title}
                </h3>

                {/* Source Task if any */}
                {idea.taskTitle && (
                  <div className="text-[11px] text-[#6b6475] font-medium">
                    المصدر: <span className="text-[#1e1b24] font-bold">{idea.taskTitle}</span>
                  </div>
                )}

                {/* Hook preview */}
                <div className="bg-[#c6ed58]/15 border border-[#c6ed58]/40 rounded-xl p-2.5 space-y-1">
                  <span className="text-[10px] font-black text-[#1e1b24] block">🪝 Hook:</span>
                  <p className="text-xs font-bold text-[#1e1b24] leading-relaxed">
                    {idea.hook}
                  </p>
                </div>

                {/* Expandable full body */}
                {isExpanded && (
                  <div className="bg-[#fcfbf8] border border-[#ece7de] rounded-xl p-3 text-xs text-[#1e1b24] whitespace-pre-line leading-relaxed font-sans">
                    {idea.body}
                  </div>
                )}

                {/* Actions bottom */}
                <div className="flex items-center justify-between pt-1 border-t border-[#ece7de] text-xs">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : idea.id)}
                    className="text-[#3e2f59] hover:underline font-bold flex items-center gap-1 cursor-pointer text-[11px]"
                  >
                    <span>{isExpanded ? 'إخفاء التفاصيل' : 'عرض كامل النص والمسودة'}</span>
                    {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>

                  <button
                    onClick={() => handleCopy(`${idea.title}\n\n🪝 Hook:\n${idea.hook}\n\n📝 النص:\n${idea.body}`, idea.id)}
                    className="text-[#3e2f59] hover:text-[#1e1b24] flex items-center gap-1 font-bold cursor-pointer text-[11px] bg-[#dbb0cf]/25 hover:bg-[#dbb0cf]/45 px-2.5 py-1 rounded-lg transition-colors border border-[#dbb0cf]/40"
                  >
                    {copiedId === idea.id ? <Check className="w-3 h-3 text-[#3e2f59]" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === idea.id ? 'تم النسخ!' : 'نسخ كامل الفكرة'}</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 4. Bottom Sticky Action */}
      <div className="pt-2 sticky bottom-4 z-20">
        <Button
          onClick={onNewTask}
          variant="primary"
          size="lg"
          fullWidth
          icon={<Plus className="w-5 h-5 text-[#c6ed58]" />}
          className="bg-[#3e2f59] hover:bg-[#2e2243] text-[#fcfbf8] shadow-lg shadow-[#3e2f59]/20 text-base font-bold flex items-center justify-center gap-2"
        >
          جلسة تركيز جديدة 🚀
        </Button>
      </div>
    </div>
  );
};
export default ContentLibraryScreen;
