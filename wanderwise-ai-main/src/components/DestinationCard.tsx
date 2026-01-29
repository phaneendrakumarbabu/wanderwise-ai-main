import { Heart, MapPin, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScoredDestination } from '@/utils/recommendations';
import { cn } from '@/lib/utils';

interface DestinationCardProps {
  destination: ScoredDestination;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  onViewDetails: () => void;
  index?: number;
}

export function DestinationCard({
  destination,
  isWishlisted,
  onToggleWishlist,
  onViewDetails,
  index = 0
}: DestinationCardProps) {
  return (
    <div 
      className="destination-card group opacity-0 animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
    >
      <div className="relative h-96 overflow-hidden">
        <img
          src={destination.imageUrl}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Brutalist overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
        
        {/* Match score - top left */}
        <div className="absolute top-0 left-0 z-10 bg-primary border-2 border-foreground px-4 py-2">
          <span className="font-mono text-xs uppercase tracking-widest text-primary-foreground">
            {destination.matchScore}% Match
          </span>
        </div>
        
        {/* Wishlist button - top right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist();
          }}
          className={cn(
            "absolute top-0 right-0 z-10 p-3 border-2 border-foreground transition-colors",
            isWishlisted 
              ? "bg-secondary text-foreground" 
              : "bg-background text-foreground hover:bg-secondary"
          )}
        >
          <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} />
        </button>
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <div className="flex items-center gap-2 text-white/90 mb-2">
            <MapPin className="w-4 h-4" />
            <span className="font-mono text-xs uppercase tracking-wider">{destination.country}</span>
          </div>
          
          <h3 className="font-serif text-3xl text-white mb-3">
            {destination.name}
          </h3>
          
          <p className="text-white/80 text-sm line-clamp-2 mb-4 leading-relaxed">
            {destination.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex items-center gap-2 text-white border-2 border-white px-3 py-1">
              <Calendar className="w-3 h-3" />
              <span className="font-mono text-xs">{destination.bestSeason[0]}</span>
            </div>
            <div className="flex items-center gap-2 text-white border-2 border-white px-3 py-1">
              <Clock className="w-3 h-3" />
              <span className="font-mono text-xs">{destination.idealDuration[0]}</span>
            </div>
            <div className="text-white border-2 border-white px-3 py-1">
              <span className="font-mono text-xs">{destination.budgetCategory}</span>
            </div>
          </div>
          
          {/* Match reasons */}
          <div className="space-y-1 mb-4">
            {destination.matchReasons.slice(0, 2).map((reason, i) => (
              <p key={i} className="text-white/80 text-xs flex items-center gap-2">
                <span className="w-1 h-1 bg-secondary" />
                {reason}
              </p>
            ))}
          </div>
          
          <Button 
            onClick={onViewDetails}
            variant="outline" 
            size="sm" 
            className="w-full bg-background text-foreground border-2 border-foreground hover:bg-muted"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}
