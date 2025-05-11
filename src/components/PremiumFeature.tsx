
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface PremiumFeatureProps {
  children: React.ReactNode;
  tooltipText?: string;
}

const PremiumFeature: React.FC<PremiumFeatureProps> = ({ 
  children, 
  tooltipText = "This feature requires a premium account"
}) => {
  const { isPremium } = useAuth();
  
  if (isPremium) {
    return <>{children}</>;
  }
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative group cursor-not-allowed opacity-70">
            {children}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PremiumFeature;
