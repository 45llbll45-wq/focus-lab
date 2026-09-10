import React from 'react';

interface MobileContainerProps {
  children: React.ReactNode;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#EFE5D6] md:py-6 flex justify-center items-center">
      {/* Mobile Shell Frame */}
      <div className="w-full max-w-md md:max-w-[440px] min-h-screen md:min-h-[860px] md:h-[92vh] md:max-h-[920px] bg-[#FFF8ED] md:rounded-[36px] shadow-[0_20px_60px_rgba(49,3,31,0.08)] md:border md:border-[#EBDDCB] flex flex-col overflow-hidden relative text-[#31031F]">
        {/* Top subtle brand accent line */}
        <div className="h-1.5 w-full bg-[#66693E] shrink-0" />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden relative bg-[#FFF8ED]">
          {children}
        </div>
      </div>
    </div>
  );
};
export default MobileContainer;
