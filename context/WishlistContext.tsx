'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type WishlistContextType = {
  wishlist: any[];
  isWishlistOpen: boolean;
  setIsWishlistOpen: (isOpen: boolean) => void;
  toggleWishlist: (product: any) => void;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const toggleWishlist = (product: any) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.name === product.name);
      if (exists) {
        return prev.filter(item => item.name !== product.name);
      }
      return [...prev, product];
    });
  };

  return (
    <WishlistContext.Provider value={{
      wishlist,
      isWishlistOpen,
      setIsWishlistOpen,
      toggleWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
