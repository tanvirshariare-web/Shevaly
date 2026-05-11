'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type CartItem = {
  product: any;
  quantity: number;
  variants?: any;
};

type CartContextType = {
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  addToCart: (product: any, quantity?: number, variants?: any) => void;
  updateCartQuantity: (item: CartItem, quantity: number) => void;
  removeFromCart: (itemToRemove: CartItem) => void;
  cartCount: number;
  cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: any, quantity: number = 1, variants: any = {}) => {
    setCart(prev => {
      const existingItemIndex = prev.findIndex(item => 
        item.product.name === product.name && 
        JSON.stringify(item.variants) === JSON.stringify(variants)
      );

      if (existingItemIndex > -1) {
        const newCart = [...prev];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      }
      return [...prev, { product, quantity, variants }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (itemToUpdate: CartItem, quantity: number) => {
    setCart(prev => prev.map(item => 
      (item.product.name === itemToUpdate.product.name && JSON.stringify(item.variants) === JSON.stringify(itemToUpdate.variants))
        ? { ...item, quantity: Math.max(1, quantity) }
        : item
    ));
  };

  const removeFromCart = (itemToRemove: CartItem) => {
    setCart(prev => prev.filter(item => 
      !(item.product.name === itemToRemove.product.name && JSON.stringify(item.variants) === JSON.stringify(itemToRemove.variants))
    ));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cart,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      cartCount,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
