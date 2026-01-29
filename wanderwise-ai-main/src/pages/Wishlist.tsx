import { Heart, Trash2, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/hooks/useWishlist';
import { destinations } from '@/data/destinations';

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  
  const wishlistedDestinations = destinations.filter(dest => 
    wishlist.includes(dest.id)
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container-travel px-4">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Heart className="w-4 h-4" />
              Your Saved Destinations
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              My <span className="text-gradient">Wishlist</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              {wishlistedDestinations.length > 0 
                ? `You have ${wishlistedDestinations.length} destination${wishlistedDestinations.length > 1 ? 's' : ''} saved`
                : 'Start exploring and save destinations you love'}
            </p>
          </div>

          {/* Content */}
          {wishlistedDestinations.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-muted-foreground" />
              </div>
              <h2 className="font-serif text-2xl font-semibold mb-4">
                Your wishlist is empty
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Explore destinations and click the heart icon to save them here for later.
              </p>
              <Link to="/recommend">
                <Button variant="hero" size="lg" className="gap-2">
                  Discover Destinations
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4 max-w-3xl mx-auto">
              {wishlistedDestinations.map((dest, index) => (
                <div
                  key={dest.id}
                  className="glass-card rounded-2xl p-4 flex gap-4 opacity-0 animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
                >
                  <img
                    src={dest.imageUrl}
                    alt={dest.name}
                    className="w-32 h-24 object-cover rounded-xl"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 text-muted-foreground text-sm mb-1">
                      <MapPin className="w-3 h-3" />
                      <span>{dest.country}</span>
                    </div>
                    <h3 className="font-serif text-xl font-semibold mb-1 truncate">
                      {dest.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {dest.description}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                        {dest.bestSeason[0]}
                      </span>
                      <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                        {dest.budgetCategory}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromWishlist(dest.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              ))}

              <div className="text-center pt-8">
                <Link to="/recommend">
                  <Button variant="outline" className="gap-2">
                    Explore More Destinations
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
