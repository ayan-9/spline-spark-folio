import { useEffect, useState } from 'react';

interface SplineBackgroundProps {
  className?: string;
}

const SplineBackground = ({ className }: SplineBackgroundProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className={`fixed inset-0 z-0 ${className || ''}`}>
        <div className="w-full h-full bg-gradient-to-br from-background via-background/90 to-primary/10" />
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 z-0 ${className || ''}`}>
      <iframe 
        src="https://my.spline.design/prismcoin-HAV3dbCekEf5sAr3Q2XY3UUm/"
        frameBorder="0" 
        width="100%" 
        height="100%"
        className="w-full h-full"
        style={{ pointerEvents: 'auto' }}
      />
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
    </div>
  );
};

export default SplineBackground;