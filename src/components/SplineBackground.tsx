interface SplineBackgroundProps {
  className?: string;
}

const SplineBackground = ({ className }: SplineBackgroundProps) => {
  return (
    <div className={`fixed inset-0 z-0 ${className || ''}`}>
      <iframe 
        src="https://my.spline.design/interactivesparkletterwithparticleeffect-wiog4FcHWPB2ae9WAPaP25Gv/" 
        frameBorder="0" 
        width="100%" 
        height="100%"
        className="w-full h-full"
        style={{ pointerEvents: 'auto' }}
      />
    </div>
  );
};

export default SplineBackground;