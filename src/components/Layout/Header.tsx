import React from 'react';
import { ChevronRight, BookOpen, Volume2, VolumeX, Home } from 'lucide-react';
import type { Screen } from '../../types';
import { isSoundEnabled, setSoundEnabled } from '../../services/sound';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  onOpenLibrary?: () => void;
  onGoHome?: () => void;
  activeScreen?: Screen;
  contentCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  showBack = false,
  onBack,
  onOpenLibrary,
  onGoHome,
  activeScreen = 'home',
  contentCount = 0
}) => {
  const [soundOn, setSoundOn] = React.useState(isSoundEnabled());

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
  };

  const isHome = activeScreen === 'home';
  const isLibrary = activeScreen === 'content_library';

  return (
    <header className="px-5 py-3.5 bg-white/90 backdrop-blur-md border-b border-slate-100 flex items-center justify-between sticky top-0 z-30 shrink-0">
      <div className="flex items-center gap-2">
        {showBack ? (
          <button
            onClick={onBack}
            className="p-2 -mr-2 rounded-xl text-slate-600 hover:text-[#017CC3] hover:bg-slate-100 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
            aria-label="الرجوع"
          >
            <ChevronRight className="w-5 h-5 text-slate-700" />
            <span className="text-xs font-medium text-slate-600">رجوع</span>
          </button>
        ) : (
          <div 
            onClick={onGoHome} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-[#017CC3] flex items-center justify-center text-white font-bold text-base shadow-sm group-hover:scale-105 transition-transform">
              <span className="text-[#FFE902] text-lg leading-none">F</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base text-[#0F172A] tracking-tight">Focus Lab</span>
                <span className="w-2 h-2 rounded-full bg-[#FFE902] inline-block animate-pulse" />
              </div>
              <p className="text-[10px] text-slate-400 font-medium">Learn → Build → Create</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        {!isHome && onGoHome && (
          <button
            onClick={onGoHome}
            className="p-2 rounded-xl text-slate-600 hover:text-[#017CC3] hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
            title="الرئيسية"
          >
            <Home className="w-4 h-4" />
          </button>
        )}

        {onOpenLibrary && (
          <button
            onClick={onOpenLibrary}
            className={
              isLibrary
                ? "bg-[#017CC3] text-white shadow-xs px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
                : "bg-slate-100 text-slate-700 hover:bg-[#ADD4E5]/30 hover:text-[#017CC3] px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
            }
            title="مكتبة المحتوى"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>المكتبة</span>
            {contentCount > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] rounded-full font-bold bg-[#FFE902] text-[#0F172A]">
                {contentCount}
              </span>
            )}
          </button>
        )}

        <button
          onClick={toggleSound}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          title={soundOn ? "كتم الصوت" : "تفعيل الصوت"}
        >
          {soundOn ? <Volume2 className="w-4 h-4 text-[#017CC3]" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
        </button>
      </div>
    </header>
  );
};
