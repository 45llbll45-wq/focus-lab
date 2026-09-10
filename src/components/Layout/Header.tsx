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
    <header className="px-5 py-3.5 bg-[#FFF8ED]/95 backdrop-blur-md border-b border-[#EBDDCB] flex items-center justify-between sticky top-0 z-30 shrink-0 text-[#31031F]">
      <div className="flex items-center gap-2">
        {showBack ? (
          <button
            onClick={onBack}
            className="p-2 -mr-2 rounded-xl text-[#31031F] hover:bg-[#F2E5D3] active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
            aria-label="الرجوع"
          >
            <ChevronRight className="w-5 h-5 text-[#31031F]" />
            <span className="text-xs font-semibold text-[#31031F]">رجوع</span>
          </button>
        ) : (
          <div 
            onClick={onGoHome} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-[#31031F] flex items-center justify-center text-[#FFF8ED] font-bold text-sm shadow-xs group-hover:scale-105 transition-transform">
              <span>FL</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-[#31031F] tracking-tight">Focus Lab</span>
              </div>
              <p className="text-[10px] text-[#66693E] font-medium">Learn → Build → Create</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        {!isHome && onGoHome && (
          <button
            onClick={onGoHome}
            className="p-2 rounded-xl text-[#393313] hover:text-[#31031F] hover:bg-[#F2E5D3] active:scale-95 transition-all cursor-pointer"
            title="الرئيسية"
          >
            <Home className="w-4 h-4" />
          </button>
        )}

        {onOpenLibrary && (
          <button
            onClick={onOpenLibrary}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
              isLibrary
                ? "bg-[#66693E] text-[#FFF8ED] border-[#66693E] shadow-xs"
                : "bg-[#F4EDE0] text-[#31031F] border-[#EBDDCB] hover:bg-[#EBDDCB]"
            }`}
            title="مكتبة المحتوى"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>المكتبة</span>
            {contentCount > 0 && (
              <span className={`px-1.5 py-0.2 text-[10px] rounded-full font-bold ${
                isLibrary ? "bg-[#FFF8ED] text-[#66693E]" : "bg-[#66693E] text-[#FFF8ED]"
              }`}>
                {contentCount}
              </span>
            )}
          </button>
        )}

        <button
          onClick={toggleSound}
          className="p-2 rounded-xl text-[#66693E] hover:text-[#31031F] hover:bg-[#F2E5D3] transition-colors cursor-pointer"
          title={soundOn ? "كتم الصوت" : "تفعيل الصوت"}
        >
          {soundOn ? <Volume2 className="w-4 h-4 text-[#66693E]" /> : <VolumeX className="w-4 h-4 text-[#8C7A6B]" />}
        </button>
      </div>
    </header>
  );
};
export default Header;
