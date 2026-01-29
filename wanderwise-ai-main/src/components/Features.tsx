import { Target, Sparkles, Heart, Zap, Shield, Globe } from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'Smart Matching',
    description: 'Algorithm considers budget, interests, travel style, and 10+ factors for perfect matches.',
    number: '01'
  },
  {
    icon: Sparkles,
    title: 'AI Insights',
    description: 'Personalized trip summaries, packing tips, and local recommendations for each destination.',
    number: '02'
  },
  {
    icon: Heart,
    title: 'Save & Compare',
    description: 'Build your travel wishlist and easily compare destinations before deciding.',
    number: '03'
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'Get personalized recommendations in seconds, not hours of research.',
    number: '04'
  },
  {
    icon: Shield,
    title: 'Curated Selection',
    description: 'Hand-picked destinations across India and international locations, verified for quality.',
    number: '05'
  },
  {
    icon: Globe,
    title: '32+ Destinations',
    description: 'From Himalayan retreats to tropical beaches, find the perfect spot for every traveler.',
    number: '06'
  }
];

export function Features() {
  return (
    <section className="section-padding bg-background">
      <div className="container-editorial">
        {/* Section Header */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-[2px] bg-foreground" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Features</span>
          </div>
          <h2 className="editorial-heading text-5xl md:text-6xl max-w-3xl">
            Built for travelers who value
            <span className="block italic text-secondary mt-2">precision & discovery</span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="brutal-card p-8 opacity-0 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              {/* Number Badge */}
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 border-2 border-foreground bg-primary flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="font-mono text-xs text-muted-foreground">{feature.number}</span>
              </div>
              
              {/* Content */}
              <h3 className="font-serif text-2xl mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
