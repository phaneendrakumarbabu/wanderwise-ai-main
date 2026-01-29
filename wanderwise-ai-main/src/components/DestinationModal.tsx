import { X, MapPin, Calendar, Clock, Heart, Sparkles, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScoredDestination } from '@/utils/recommendations';
import { generateTripSummary, UserPreferences } from '@/utils/recommendations';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface DestinationModalProps {
  destination: ScoredDestination;
  preferences: UserPreferences;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
  onClose: () => void;
}

export function DestinationModal({
  destination,
  preferences,
  isWishlisted,
  onToggleWishlist,
  onClose
}: DestinationModalProps) {
  const [showSummary, setShowSummary] = useState(false);
  const [tripSummary, setTripSummary] = useState<string>('');
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  const handleGenerateSummary = async () => {
    if (showSummary && tripSummary) {
      setShowSummary(false);
      return;
    }

    if (!tripSummary) {
      setIsGeneratingSummary(true);
      try {
        const summary = await generateTripSummary(destination, preferences);
        setTripSummary(summary);
        setShowSummary(true);
      } catch (error) {
        console.error('Error generating trip summary:', error);
        // Set a fallback message
        setTripSummary('Unable to generate AI summary at this time. Please try again later.');
        setShowSummary(true);
      } finally {
        setIsGeneratingSummary(false);
      }
    } else {
      setShowSummary(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-card rounded-2xl shadow-travel-xl max-w-3xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image header */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={destination.imageUrl}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          
          {/* Match badge */}
          <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground font-semibold px-3 py-1">
            <Sparkles className="w-3 h-3 mr-1" />
            {destination.matchScore}% Match
          </Badge>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-16rem)]">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                <MapPin className="w-4 h-4" />
                <span>{destination.country} • {destination.region}</span>
              </div>
              <h2 className="font-serif text-3xl font-bold">{destination.name}</h2>
            </div>
            
            <Button
              variant={isWishlisted ? "default" : "outline"}
              size="icon"
              onClick={onToggleWishlist}
            >
              <Heart className={cn("w-5 h-5", isWishlisted && "fill-current")} />
            </Button>
          </div>

          <p className="text-muted-foreground mb-6">{destination.description}</p>

          {/* Quick info */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="glass-card rounded-xl p-3 text-center">
              <Calendar className="w-5 h-5 mx-auto mb-1 text-primary" />
              <p className="text-xs text-muted-foreground">Best Season</p>
              <p className="font-semibold text-sm">{destination.bestSeason.join(', ')}</p>
            </div>
            <div className="glass-card rounded-xl p-3 text-center">
              <Clock className="w-5 h-5 mx-auto mb-1 text-ocean" />
              <p className="text-xs text-muted-foreground">Duration</p>
              <p className="font-semibold text-sm">{destination.idealDuration.join(', ')}</p>
            </div>
            <div className="glass-card rounded-xl p-3 text-center">
              <span className="text-xl block mb-1">💰</span>
              <p className="text-xs text-muted-foreground">Budget</p>
              <p className="font-semibold text-sm">{destination.budgetCategory}</p>
            </div>
          </div>

          {/* Why it matches */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Why This Matches You</h3>
            <div className="space-y-2">
              {destination.matchReasons.map((reason, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-forest" />
                  <span>{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Top Highlights</h3>
            <div className="flex flex-wrap gap-2">
              {destination.highlights.map((highlight) => (
                <Badge key={highlight} variant="secondary">
                  {highlight}
                </Badge>
              ))}
            </div>
          </div>

          {/* Activities */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Activities</h3>
            <div className="flex flex-wrap gap-2">
              {destination.activities.map((activity) => (
                <Badge key={activity} variant="outline">
                  {activity}
                </Badge>
              ))}
            </div>
          </div>

          {/* AI Trip Summary */}
          <div className="border-t border-border pt-6">
            <Button
              variant="ocean"
              className="w-full mb-4"
              onClick={handleGenerateSummary}
              disabled={isGeneratingSummary}
            >
              <Sparkles className="w-4 h-4" />
              {isGeneratingSummary 
                ? 'Generating AI Summary...' 
                : showSummary 
                ? 'Hide Trip Summary' 
                : 'Generate AI Trip Summary'}
            </Button>

            {showSummary && tripSummary && (
              <div className="glass-card rounded-xl p-4 animate-fade-up">
                <pre className="whitespace-pre-wrap text-sm font-sans leading-relaxed">
                  {tripSummary}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
