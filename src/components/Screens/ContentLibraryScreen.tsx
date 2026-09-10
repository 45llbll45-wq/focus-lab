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
    <div className="flex-1 flex flex-col p-5 space-y-5 text-[#31031F]">
      {/* 1. Header */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#66693E]/15 text-[#393313] text-xs font-semibold border border-[#66693E]/30">
            <BookOpen className="w-3.5 h-3.5" />
            <span>حصيلة التعلم والتطبيق</span>
          </div>
          {ideas.length > 0 && (
            <button
              onClick={handleExportMarkdown}
              className="text-xs text-[#393313] hover:text-[#31031F] flex items-center gap-1 cursor-pointer font-semibold bg-[#FFFDF9] px-2.5 py-1 rounded-xl border border-[#EBDDCB] shadow-2xs transition-colors"
              title="تصدير كملف Markdown"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تصدير MD</span>
            </button>
          )}
        </div>

        <h1 className="text-2xl font-bold text-[#31031F] tracking-tight">
          مكتبة المحتوى
        </h1>
        <p className="text-xs text-[#6B5E5B]">
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
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer font-semibold border ${
              statusFilter === f.id
                ? 'bg-[#66693E] text-[#FFF8ED] border-[#66693E] shadow-2xs'
                : 'bg-[#FFFDF9] text-[#393313] border-[#EBDDCB] hover:bg-[#F4EDE0]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* 3. Content Ideas Cards */}
      <div className="space-y-3 flex-1">
        {filteredIdeas.length === 0 ? (
          <div className="bg-[#FFFDF9] border border-dashed border-[#EBDDCB] rounded-2xl p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#66693E]/15 flex items-center justify-center text-[#66693E] mx-auto text-xl">
              ✍️
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-[#31031F] text-sm">لا توجد أفكار بعد في هذا القسم</h3>
              <p className="text-xs text-[#8C7A6B] max-w-[240px] mx-auto">
                ابدئي جلسة تركيز جديدة وسجلي ما تعلمتيه لتوليد أول فكرة محتوى!
              </p>
            </div>
            <Button
              onClick={onNewTask}
              variant="primary"
              size="sm"
              icon={<Plus className="w-4 h-4 text-[#FFF8ED]" />}
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
                className="bg-[#FFFDF9] p-4 rounded-2xl border border-[#EBDDCB] shadow-2xs space-y-3 hover:border-[#66693E] transition-all"
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
                        className="text-xs bg-[#F4EDE0] border border-[#EBDDCB] rounded-full px-2.5 py-0.5 font-bold outline-none cursor-pointer text-[#31031F] hover:border-[#66693E]"
                      >
                        <option value="idea">فكرة (Idea)</option>
                        <option value="draft">مسودة (Draft)</option>
                        <option value="published">تم النشر (Published) ✓</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => onDeleteIdea(idea.id)}
                    className="text-[#B8A494] hover:text-rose-600 p-1 transition-colors cursor-pointer"
                    title="حذف"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Title */}
                <h3 className="font-bold text-sm text-[#31031F] leading-snug">
                  {idea.title}
                </h3>

                {/* Source Task if any */}
                {idea.taskTitle && (
                  <div className="text-[11px] text-[#8C7A6B] font-medium">
                    المصدر: <span className="text-[#393313] font-semibold">{idea.taskTitle}</span>
                  </div>
                )}

                {/* Hook preview */}
                <div className="bg-[#C5A880]/15 border border-[#C5A880]/40 rounded-xl p-2.5 space-y-1">
                  <span className="text-[10px] font-bold text-[#4A321F] block">🪝 Hook:</span>
                  <p className="text-xs font-semibold text-[#31031F] leading-relaxed">
                    {idea.hook}
                  </p>
                </div>

                {/* Expandable full body */}
                {isExpanded && (
                  <div className="bg-[#F4EDE0]/60 border border-[#EBDDCB] rounded-xl p-3 text-xs text-[#31031F] whitespace-pre-line leading-relaxed font-sans">
                    {idea.body}
                  </div>
                )}

                {/* Actions bottom */}
                <div className="flex items-center justify-between pt-1 border-t border-[#EBDDCB]/60 text-xs">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : idea.id)}
                    className="text-[#66693E] hover:underline font-bold flex items-center gap-1 cursor-pointer text-[11px]"
                  >
                    <span>{isExpanded ? 'إخفاء التفاصيل' : 'عرض كامل النص والمسودة'}</span>
                    {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>

                  <button
                    onClick={() => handleCopy(`${idea.title}\n\n🪝 Hook:\n${idea.hook}\n\n📝 النص:\n${idea.body}`, idea.id)}
                    className="text-[#393313] hover:text-[#31031F] flex items-center gap-1 font-semibold cursor-pointer text-[11px] bg-[#F4EDE0] hover:bg-[#EBDDCB] px-2.5 py-1 rounded-lg transition-colors border border-[#EBDDCB]"
                  >
                    {copiedId === idea.id ? <Check className="w-3 h-3 text-[#66693E]" /> : <Copy className="w-3 h-3" />}
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
          icon={<Plus className="w-5 h-5 text-[#FFF8ED]" />}
          className="bg-[#66693E] hover:bg-[#525530] text-[#FFF8ED] shadow-md text-base font-bold"
        >
          جلسة تركيز جديدة 🚀
        </Button>
      </div>
    </div>
  );
};
export default ContentLibraryScreen;
