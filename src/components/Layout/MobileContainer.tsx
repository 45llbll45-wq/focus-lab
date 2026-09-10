import React from 'react';

interface MobileContainerProps {
  children: React.ReactNode;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F1F5F9] md:py-6 flex justify-center items-center">
      {/* Mobile Shell Frame */}
      <div className="w-full max-w-md md:max-w-[440px] min-h-screen md:min-h-[860px] md:h-[92vh] md:max-h-[920px] bg-[#F8FAFC] md:rounded-[36px] shadow-[0_20px_50px_rgba(15,23,42,0.06)] md:border md:border-slate-200/80 flex flex-col overflow-hidden relative text-[#0F172A]">
        {/* Top subtle brand accent line */}
        <div className="h-1.5 w-full bg-[#4F46E5] shrink-0" />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden relative bg-[#F8FAFC]">
          {children}
        </div>
      </div>
    </div>
  );
};
export default MobileContainer;
