import React, { useRef, useEffect, useState } from 'react';

const ReferenceRow = ({ numbers, title = "Numbers in this level:" }) => {
  const containerRef = useRef(null);
  const [boxSize, setBoxSize] = useState({ width: 40, fontSize: 14 });

  // Calculate optimal box size based on container width
  useEffect(() => {
    const updateBoxSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const totalNumbers = numbers.length;
        const minGap = 4; // Minimum gap between boxes
        const minBoxSize = 28; // Minimum box size
        const maxBoxSize = 40; // Maximum box size
        
        // Calculate available width accounting for padding and gaps
        const availableWidth = containerWidth - (20 * 2); // 20px padding on each side
        const totalGapWidth = (totalNumbers - 1) * minGap;
        const remainingWidth = availableWidth - totalGapWidth;
        
        // Calculate box size that would fit
        let idealBoxSize = Math.floor(remainingWidth / totalNumbers);
        idealBoxSize = Math.max(minBoxSize, Math.min(maxBoxSize, idealBoxSize));
        
        // Scale font size proportionally
        const fontSize = Math.max(12, Math.min(14, Math.floor(idealBoxSize * 0.35)));
        
        setBoxSize({ width: idealBoxSize, fontSize });
      }
    };

    // Initial calculation
    updateBoxSize();
    
    // Recalculate on window resize
    window.addEventListener('resize', updateBoxSize);
    return () => window.removeEventListener('resize', updateBoxSize);
  }, [numbers.length]);

  return (
    <div className="flex flex-col items-center w-full px-2">
      <div className="text-sm font-medium text-gray-700 mb-2">{title}</div>
      <div 
        ref={containerRef}
        className="w-full flex justify-center"
      >
        <div className="flex gap-1 flex-wrap justify-center">
          {numbers.map((num, idx) => (
            <div
              key={idx}
              style={{
                width: `${boxSize.width}px`,
                height: `${boxSize.width}px`,
                fontSize: `${boxSize.fontSize}px`
              }}
              className="border border-gray-200 rounded flex items-center justify-center bg-blue-50 text-blue-700 transition-all duration-200"
            >
              {num}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReferenceRow; 