'use client';

import { FirebaseProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import { WishlistProvider } from '../context/WishlistContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseProvider>
      <WishlistProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </WishlistProvider>
    </FirebaseProvider>
  );
}
