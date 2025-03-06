
"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface SpotlightProps {
  className?: string;
  children?: React.ReactNode;
}

export function Spotlight({
  children,
  className,
}: SpotlightProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setPosition({ x, y });
    setOpacity(1);
    setIsActive(true);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    setIsActive(false);
  };

  useEffect(() => {
    const currentContainer = containerRef.current;
    if (!currentContainer) return;

    currentContainer.addEventListener("mousemove", handleMouseMove as any);
    currentContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      currentContainer.removeEventListener("mousemove", handleMouseMove as any);
      currentContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden",
        className
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px z-30 opacity-0 transition-opacity duration-500"
        style={{
          opacity,
          background: isActive
            ? `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(120, 119, 198, 0.15), transparent 40%)`
            : "",
        }}
      />
      {children}
    </div>
  );
}
