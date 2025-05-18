import Hero from '@/components/home/hero';
import FeatureShowcase from '@/components/home/feature-showcase';
import BackgroundCanvas from '@/components/background/background-canvas';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <BackgroundCanvas />
      <div className="relative z-10">
        <Hero />
        <FeatureShowcase />
      </div>
    </main>
  );
}