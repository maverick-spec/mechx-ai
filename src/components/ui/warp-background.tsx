
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface WarpBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  backgroundClassName?: string;
  colors?: string[];
}

export const WarpBackground = ({
  children,
  className,
  backgroundClassName,
  colors = ["#7787ff", "#aa87ff", "#c288ff", "#ff88e0", "#ff8888"],
  ...props
}: WarpBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    
    const resizeObserver = new ResizeObserver(() => {
      adjustCanvasSize();
    });
    
    resizeObserver.observe(container);

    function adjustCanvasSize() {
      const { width, height } = container.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    }

    adjustCanvasSize();

    const gradients = colors.map((color) => {
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2
      );
      gradient.addColorStop(0, `${color}00`);
      gradient.addColorStop(0.5, `${color}33`);
      gradient.addColorStop(1, `${color}00`);
      return gradient;
    });

    function render() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const { width, height } = canvas;

      // Update time
      time += 0.003;

      // Draw each gradient with different positions based on time
      gradients.forEach((gradient, i) => {
        const x = width / 2 + Math.sin(time + i * 0.5) * width * 0.25;
        const y = height / 2 + Math.cos(time + i * 0.5) * height * 0.25;
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(x, y, Math.max(width, height) * 0.5, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [colors]);

  return (
    <div 
      ref={containerRef} 
      className={cn("relative overflow-hidden rounded-lg", className)} 
      {...props}
    >
      <canvas 
        ref={canvasRef} 
        className={cn(
          "absolute inset-0 z-0 h-full w-full opacity-60",
          backgroundClassName
        )} 
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
