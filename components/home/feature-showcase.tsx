"use client";

import { useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, BarChart3, Shield, History } from 'lucide-react';
import anime from 'animejs';

type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
};

function FeatureCard({ title, description, icon, delay }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && cardRef.current) {
            anime({
              targets: cardRef.current,
              opacity: [0, 1],
              translateY: [50, 0],
              scale: [0.9, 1],
              easing: 'easeOutExpo',
              duration: 1000,
              delay: delay
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  return (
    <Card 
      ref={cardRef} 
      className="opacity-0 backdrop-blur-md bg-card/50 border-border/40 overflow-hidden group hover:shadow-lg transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-chart-1/10 via-chart-2/10 to-chart-3/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <CardHeader className="relative z-10">
        <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 mb-4">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-chart-1 to-chart-2 w-3/4 rounded-full"></div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function FeatureShowcase() {
  const features = [
    {
      title: "Time Selection Interface",
      description: "Precision time selection with visual timeline slider and preset time periods",
      icon: <Clock className="w-6 h-6 text-chart-1" />,
      delay: 0
    },
    {
      title: "Status Display",
      description: "Real-time system status with animated warning indicators and health metrics",
      icon: <BarChart3 className="w-6 h-6 text-chart-2" />,
      delay: 100
    },
    {
      title: "Control Center",
      description: "Interactive control panel with emergency shutdown and system calibration",
      icon: <Shield className="w-6 h-6 text-chart-3" />,
      delay: 200
    },
    {
      title: "Travel History",
      description: "Scrollable log with filterable timeline view and detailed jump records",
      icon: <History className="w-6 h-6 text-chart-4" />,
      delay: 300
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Advanced Features</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
          Our time travel control system offers cutting-edge tools for precise temporal navigation and system management.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}