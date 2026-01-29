import { useState } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PreferenceForm } from '@/components/PreferenceForm';
import { DestinationCard } from '@/components/DestinationCard';
import { DestinationModal } from '@/components/DestinationModal';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/hooks/useWishlist';
import { getRecommendations, ScoredDestination, UserPreferences } from '@/utils/recommendations';

export default function Recommend() {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<ScoredDestination[]>([]);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<ScoredDestination | null>(null);
  const { isInWishlist, toggleWishlist } = useWishlist();

  const handleSubmit = async (prefs: UserPreferences) => {
    setIsLoading(true);
    setPreferences(prefs);
    
    try {
      // Get AI-powered recommendations
      const results = await getRecommendations(prefs, 6);
      setRecommendations(results);
    } catch (error) {
      console.error('Error getting recommendations:', error);
      // You could show an error toast here if needed
    } finally {
      setIsLoading(false);
      
      // Scroll to results
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleReset = () => {
    setRecommendations([]);
    setPreferences(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container-travel px-4">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              AI-Powered Recommendations
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              Find Your <span className="text-gradient">Perfect Destination</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Tell us about your travel preferences and we'll match you with destinations you'll love.
            </p>
          </div>

          {/* Form or Results */}
          {recommendations.length === 0 ? (
            <div className="max-w-4xl mx-auto">
              <PreferenceForm onSubmit={handleSubmit} isLoading={isLoading} />
            </div>
          ) : (
            <div id="results">
              {/* Results Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                  <h2 className="font-serif text-3xl font-bold mb-2">
                    Your Top Matches
                  </h2>
                  <p className="text-muted-foreground">
                    Based on your preferences, here are the destinations we think you'll love.
                  </p>
                </div>
                <Button variant="outline" onClick={handleReset} className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Start Over
                </Button>
              </div>

              {/* Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map((dest, index) => (
                  <DestinationCard
                    key={dest.id}
                    destination={dest}
                    isWishlisted={isInWishlist(dest.id)}
                    onToggleWishlist={() => toggleWishlist(dest.id)}
                    onViewDetails={() => setSelectedDestination(dest)}
                    index={index}
                  />
                ))}
              </div>

              {/* CTA */}
              <div className="text-center mt-12">
                <p className="text-muted-foreground mb-4">
                  Not finding what you're looking for?
                </p>
                <Button variant="outline" onClick={handleReset}>
                  Try Different Preferences
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Destination Modal */}
      {selectedDestination && preferences && (
        <DestinationModal
          destination={selectedDestination}
          preferences={preferences}
          isWishlisted={isInWishlist(selectedDestination.id)}
          onToggleWishlist={() => toggleWishlist(selectedDestination.id)}
          onClose={() => setSelectedDestination(null)}
        />
      )}

      <Footer />
    </div>
  );
}
