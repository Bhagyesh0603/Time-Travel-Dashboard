"use client";

import { useEffect, useRef } from "react";

export function MouseTrailProvider({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const pointsRef = useRef<{ x: number; y: number; age: number; color: string }[]>([]);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    canvasRef.current = canvas;
    document.body.appendChild(canvas);

    // Set canvas size to window size
    const resizeCanvas = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize context
    if (canvasRef.current) {
      contextRef.current = canvasRef.current.getContext('2d');
      if (contextRef.current) {
        contextRef.current.globalCompositeOperation = 'lighter';
      }
    }

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    // Touch move handler
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mousePositionRef.current = { 
          x: e.touches[0].clientX, 
          y: e.touches[0].clientY 
        };
      }
    };

    // Animation function
    const animate = () => {
      if (!contextRef.current || !canvasRef.current) return;
      
      // Clear canvas
      contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      
      // Generate random color
      const hue = (Date.now() * 0.1) % 360;
      const color = `hsl(${hue}, 100%, 50%)`;
      
      // Add new point
      pointsRef.current.push({
        x: mousePositionRef.current.x,
        y: mousePositionRef.current.y,
        age: 0,
        color: color
      });
      
      // Update and draw points
      for (let i = 0; i < pointsRef.current.length; i++) {
        const point = pointsRef.current[i];
        point.age++;
        
        // Remove old points
        if (point.age > 30) {
          pointsRef.current.splice(i, 1);
          i--;
          continue;
        }
        
        // Calculate alpha based on age
        const alpha = 1 - point.age / 30;
        
        // Draw point
        contextRef.current.beginPath();
        contextRef.current.arc(point.x, point.y, 10 * alpha, 0, Math.PI * 2);
        contextRef.current.fillStyle = point.color.replace(')', `, ${alpha})`).replace('hsl', 'hsla');
        contextRef.current.fill();
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation and add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', resizeCanvas);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (canvasRef.current && document.body.contains(canvasRef.current)) {
        document.body.removeChild(canvasRef.current);
      }
    };
  }, []);

  return <>{children}</>;
}