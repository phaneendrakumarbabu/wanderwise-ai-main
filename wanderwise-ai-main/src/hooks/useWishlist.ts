import { useState, useEffect } from 'react';
import { Destination } from '@/data/destinations';

const WISHLIST_KEY = 'travelmate_wishlist';

export function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(WISHLIST_KEY);
    if (stored) {
      setWishlist(JSON.parse(stored));
    }
  }, []);

  const addToWishlist = (destinationId: string) => {
    setWishlist(prev => {
      const newWishlist = [...prev, destinationId];
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(newWishlist));
      return newWishlist;
    });
  };

  const removeFromWishlist = (destinationId: string) => {
    setWishlist(prev => {
      const newWishlist = prev.filter(id => id !== destinationId);
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(newWishlist));
      return newWishlist;
    });
  };

  const isInWishlist = (destinationId: string) => {
    return wishlist.includes(destinationId);
  };

  const toggleWishlist = (destinationId: string) => {
    if (isInWishlist(destinationId)) {
      removeFromWishlist(destinationId);
    } else {
      addToWishlist(destinationId);
    }
  };

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist
  };
}
