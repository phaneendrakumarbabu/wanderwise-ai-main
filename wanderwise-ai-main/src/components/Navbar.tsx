import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Menu, X, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/recommend' },
    { name: 'Saved', path: '/wishlist' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b-2 border-foreground">
      <div className="container-editorial px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Editorial */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 border-2 border-foreground bg-primary flex items-center justify-center transition-transform group-hover:rotate-12">
              <Compass className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-serif text-2xl tracking-tight">WanderWise</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "font-mono text-xs uppercase tracking-widest transition-colors relative py-1",
                  location.pathname === link.path
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-foreground" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/wishlist">
              <button className="p-2 hover:bg-muted transition-colors border-2 border-transparent hover:border-foreground">
                <Heart className="w-5 h-5" />
              </button>
            </Link>
            <Link to="/recommend">
              <Button variant="default" size="sm">
                Plan Trip
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 border-2 border-foreground hover:bg-muted transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t-2 border-foreground py-6 animate-slide-up">
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "font-mono text-xs uppercase tracking-widest py-2",
                    location.pathname === link.path
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/recommend" onClick={() => setIsMenuOpen(false)}>
                <Button variant="default" className="w-full">
                  Plan Trip
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
