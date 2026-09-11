import React from 'react';

interface MobileContainerProps {
  children: React.ReactNode;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#f3f0e8] md:py-6 flex justify-center items-center font-sans">
      {/* Mobile Shell Frame */}
      <div className="w-full max-w-md md:max-w-[440px] min-h-screen md:min-h-[860px] md:h-[92vh] md:max-h-[920px] bg-[#fcfbf8] md:rounded-[36px] shadow-[0_20px_50px_rgba(62,47,89,0.08)] md:border md:border-[#ece7de] flex flex-col overflow-hidden relative text-[#1e1b24]">
        {/* Top brand accent line */}
        <div className="h-1.5 w-full bg-[#3e2f59] shrink-0" />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden relative bg-[#fcfbf8]">
          {children}
        </div>
      </div>
    </div>
  );
};
export default MobileContainer;
