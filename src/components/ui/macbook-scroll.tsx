import React, { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";

interface MacbookScrollProps {
  src: string;
  alt: string;
  className?: string;
}

export function MacbookScroll({
  src,
  alt,
  className,
}: MacbookScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (isInView && !hasLoaded) {
      setHasLoaded(true);
    }
  }, [isInView, hasLoaded]);

  return (
    <div
      ref={containerRef}
      className={`relative mx-auto max-w-4xl md:h-[46rem] ${className}`}
    >
      <div className="relative aspect-[1200/820] w-full">
        {/* Macbook frame */}
        <div className="absolute inset-0 mx-auto">
          <svg
            className="h-full w-full"
            viewBox="0 0 1200 820"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* SVG for Macbook frame would go here */}
            <rect x="180" y="50" width="840" height="525" rx="22" fill="black" />
          </svg>
        </div>
        
        {/* Screen Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute top-[50px] left-[180px] right-[180px] bottom-[245px] overflow-hidden rounded-t-[22px]">
            <img 
              src={src} 
              alt={alt}
              className="h-full w-full object-cover" 
              style={{
                transform: isInView ? "translateY(0%)" : "translateY(20%)",
                opacity: isInView ? 1 : 0,
                transition: "transform 2s ease, opacity 1.5s ease",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
