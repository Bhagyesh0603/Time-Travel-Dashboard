"use client";

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';
import Link from 'next/link';
import anime from 'animejs';

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Animate title with typing effect
    if (titleRef.current) {
      anime({
        targets: titleRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        easing: 'easeOutExpo',
        duration: 1000,
        delay: 300
      });
    }
    
    // Animate subtitle
    if (subtitleRef.current) {
      anime({
        targets: subtitleRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        easing: 'easeOutExpo',
        duration: 1000,
        delay: 600
      });
    }
    
    // Animate buttons
    if (buttonsRef.current) {
      anime({
        targets: buttonsRef.current.children,
        opacity: [0, 1],
        translateY: [20, 0],
        easing: 'easeOutExpo',
        duration: 800,
        delay: anime.stagger(200, {start: 900})
      });
    }
    
    // Animate orbital elements
    if (orbitRef.current) {
      anime({
        targets: orbitRef.current.children,
        opacity: [0, 1],
        scale: [0, 1],
        easing: 'easeOutElastic(1, .6)',
        duration: 1500,
        delay: anime.stagger(150, {start: 1200})
      });
      
      // Continuous rotation animation
      anime({
        targets: orbitRef.current,
        rotate: '360deg',
        duration: 30000,
        easing: 'linear',
        loop: true
      });
    }
  }, []);

  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Decorative orbital elements */}
      <div ref={orbitRef} className="absolute w-[800px] h-[800px] pointer-events-none">
        <div className="absolute w-4 h-4 rounded-full bg-chart-1 left-[20%] top-[10%]"></div>
        <div className="absolute w-6 h-6 rounded-full bg-chart-2 right-[30%] top-[20%]"></div>
        <div className="absolute w-3 h-3 rounded-full bg-chart-3 left-[15%] bottom-[25%]"></div>
        <div className="absolute w-5 h-5 rounded-full bg-chart-4 right-[15%] bottom-[15%]"></div>
        <div className="absolute w-7 h-7 rounded-full bg-chart-5 left-[40%] top-[15%]"></div>
      </div>
      
      {/* Hero content */}
      <div className="container mx-auto text-center z-10 relative">
        <div className="inline-flex items-center px-4 py-2 mb-6 bg-secondary/30 backdrop-blur-md rounded-full">
          <Sparkles className="w-4 h-4 mr-2 text-chart-1" />
          <span className="text-sm font-medium">Chronos 1.0 - Time Navigation System</span>
        </div>
        
        <h1 
          ref={titleRef} 
          className="opacity-0 text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-500 to-blue-500"
        >
          Master Time. Control Reality.
        </h1>
        
        <p 
          ref={subtitleRef}
          className="opacity-0 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
        >
          The most advanced temporal navigation system ever created. Journey through the timestream with precision and confidence.
        </p>
        
        <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="opacity-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500">
            <Link href="/dashboard">
              Enter Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          
          <Button variant="outline" size="lg" className="opacity-0">
            <Clock className="mr-2 h-4 w-4" />
            System Status
          </Button>
        </div>
      </div>
      
      {/* Glass effect card at the bottom */}
      <div className="absolute bottom-8 w-full max-w-lg mx-auto">
        <div className="px-4 py-3 bg-background/30 backdrop-blur-md rounded-lg border border-border/50 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-3 animate-pulse"></div>
            <span className="text-sm font-medium">System Online</span>
          </div>
          <span className="text-xs text-muted-foreground">
            Quantum Stabilizer: 98.7%
          </span>
        </div>
      </div>
    </section>
  );
}