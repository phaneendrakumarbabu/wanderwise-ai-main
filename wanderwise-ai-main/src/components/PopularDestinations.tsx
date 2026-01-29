import { MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { destinations } from '@/data/destinations';

const popularDestinations = destinations.slice(0, 6);

export function PopularDestinations() {
  return (
    <section className="section-padding">
      <div className="container-travel">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-2">
              Popular <span className="text-gradient">Destinations</span>
            </h2>
            <p className="text-muted-foreground">
              Trending spots loved by travelers worldwide
            </p>
          </div>
          <Link to="/recommend">
            <Button variant="outline" className="gap-2">
              View All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularDestinations.map((dest, index) => (
            <Link
              key={dest.id}
              to="/recommend"
              className="group relative h-80 rounded-2xl overflow-hidden opacity-0 animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <img
                src={dest.imageUrl}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-1 text-white/80 text-sm mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{dest.country}</span>
                </div>
                <h3 className="font-serif text-2xl font-semibold text-white mb-2">
                  {dest.name}
                </h3>
                <div className="flex gap-2">
                  <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full">
                    {dest.bestSeason[0]}
                  </span>
                  <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded-full">
                    {dest.budgetCategory} Budget
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
