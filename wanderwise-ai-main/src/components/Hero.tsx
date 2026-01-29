import { ArrowRight, MapPin, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onStartPlanning: () => void;
}

export function Hero({ onStartPlanning }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Grid pattern background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `repeating-linear-gradient(0deg, hsl(var(--foreground)) 0px, hsl(var(--foreground)) 1px, transparent 1px, transparent 40px),
                         repeating-linear-gradient(90deg, hsl(var(--foreground)) 0px, hsl(var(--foreground)) 1px, transparent 1px, transparent 40px)`
      }} />

      {/* Decorative elements - brutalist shapes */}
      <div className="absolute top-20 right-12 w-32 h-32 border-2 border-secondary rotate-12 opacity-20" />
      <div className="absolute bottom-32 left-16 w-24 h-24 bg-accent opacity-10" />
      <div className="absolute top-1/3 left-1/4 w-2 h-40 bg-primary opacity-15 -rotate-12" />

      <div className="container-editorial relative z-10 px-6">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-3 mb-8 opacity-0 animate-slide-up">
          <div className="w-12 h-[2px] bg-foreground" />
          <span className="font-mono text-xs uppercase tracking-widest">AI-Powered Discovery</span>
        </div>

        {/* Main heading - Editorial style */}
        <h1 className="editorial-heading text-6xl md:text-8xl lg:text-9xl mb-8 max-w-5xl opacity-0 animate-slide-up stagger-1">
          Find places that
          <span className="block italic text-secondary">move you</span>
        </h1>

        {/* Subtitle - Constrained width for readability */}
        <div className="max-w-xl mb-12 opacity-0 animate-slide-up stagger-2">
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
            Share your travel aspirations. We'll match you with destinations that align with your budget, interests, and style.
          </p>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-20 opacity-0 animate-slide-up stagger-3">
          <button 
            onClick={onStartPlanning}
            className="btn-brutal px-8 py-4 group flex items-center gap-3 justify-center"
          >
            <span>Start Planning</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
          <button className="px-8 py-4 border-2 border-foreground bg-background hover:bg-muted transition-colors duration-200 font-medium uppercase tracking-wider text-sm">
            View Destinations
          </button>
        </div>

        {/* Stats - Editorial layout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl opacity-0 animate-slide-up stagger-4">
          <div className="border-l-2 border-foreground pl-6">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-serif text-5xl">32</span>
              <MapPin className="w-5 h-5 text-secondary" />
            </div>
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Curated Destinations</p>
          </div>
          <div className="border-l-2 border-foreground pl-6">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-serif text-5xl">98</span>
              <span className="font-mono text-sm">%</span>
            </div>
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Match Accuracy</p>
          </div>
          <div className="border-l-2 border-foreground pl-6">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="font-serif text-5xl">10k</span>
              <span className="font-mono text-sm">+</span>
            </div>
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Travelers Served</p>
          </div>
        </div>
      </div>

      {/* Scroll indicator - minimal */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in stagger-5">
        <div className="flex flex-col items-center gap-2">
          <Compass className="w-5 h-5 text-muted-foreground animate-pulse" />
          <div className="w-[1px] h-12 bg-muted-foreground/30" />
        </div>
      </div>
    </section>
  );
}
