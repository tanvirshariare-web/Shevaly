'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, Search, Smartphone, User, Heart, ShoppingCart, Banknote, RotateCcw, Truck, Tag, X, Home as HomeIcon, LayoutGrid, MessageCircle, ChevronDown, ChevronRight, ChevronLeft, Filter, ArrowUpDown, Star, Store, Upload, CheckCircle, Clock, SlidersHorizontal, Eye, Headphones, Mail, Phone, ExternalLink, Share2, ShoppingBag, RefreshCcw, ArrowLeftRight, Play, Apple, Facebook, Instagram, Music, Youtube, Zap, Timer, Sparkles, HandCoins } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { ProductReviews } from './components/ProductReviews';
import { motion, useScroll, useTransform } from 'motion/react';
import UserProfileModal from './UserProfileModal';
import AuthModal from './AuthModal';
import TermsModal from './TermsModal';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Logo = ({ className = "h-12 w-auto", textClassName = "", variant = "light" }) => {
  const filterStyle = variant === 'dark' 
    ? { filter: 'invert(1) grayscale(1) contrast(200%)' }
    : {};
  const imageClassName = variant === 'dark'
    ? "object-contain object-left mix-blend-screen"
    : "object-contain object-left mix-blend-multiply";

  const defaultTextColor = variant === 'dark' ? 'text-white' : 'text-[#80091B]';
  const appliedTextClassName = textClassName || `text-2xl font-black tracking-tight ${defaultTextColor}`;

  return (
    <div className="flex items-center gap-1.5 md:gap-2">
      <div className={`relative ${className} aspect-square`}>
        <Image 
          src="https://i.postimg.cc/RZfy16hW/Whats-App-Image-2026-05-04-at-3-12-21-PM.jpg" 
          alt="Shevaly Logo" 
          fill
          referrerPolicy="no-referrer"
          className={imageClassName}
          style={filterStyle}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
          />
      </div>
      <span className={appliedTextClassName} style={{ fontFamily: 'var(--font-logo)', marginTop: '2px' }}>
        Shevaly
      </span>
    </div>
  );
};

const AppPromoBanner = () => (
  <div className="md:hidden bg-white px-4 py-2 flex items-center justify-between border-b sticky top-0 z-50">
    <div className="flex items-center gap-3">
      <Logo className="h-10 w-auto" textClassName="font-bold text-gray-900 leading-tight text-lg" />
      <div>
        <div className="text-xs text-gray-500">Get exciting deals in app</div>
      </div>
    </div>
    <button onClick={() => { document.getElementById('product-section')?.scrollIntoView({ behavior: 'smooth' }) }} className="bg-[#80091B] text-white border border-[#FDE2E4] shadow-sm px-4 py-2 rounded-full text-sm font-bold">
      Open App
    </button>
  </div>
);

const hierarchicalCategories = [
  {
    name: 'Women\'s Clothing',
    subcategories: [
      { name: 'Traditional', items: ['Saree', 'Salwar Kameez', 'Kurti', 'Lehenga'] },
      { name: 'Western', items: ['Dresses', 'Tops', 'Jeans', 'Skirts', 'Jumpsuits'] },
      { name: 'Winterwear', items: ['Sweaters', 'Jackets', 'Cardigans', 'Shawls'] }
    ]
  },
  {
    name: 'Footwear',
    subcategories: [
      { name: 'Flats & Sandals', items: ['Sandals', 'Flip Flops', 'Ballet Flats'] },
      { name: 'Heels', items: ['Stilettos', 'Block Heels', 'Wedges'] },
      { name: 'Shoes', items: ['Sneakers', 'Boots'] }
    ]
  },
  {
    name: 'Beauty & Makeup',
    subcategories: [
      { name: 'Makeup', items: ['Lipstick', 'Foundation', 'Eye Shadow', 'Mascara'] },
      { name: 'Skincare', items: ['Face Wash', 'Moisturizer', 'Serum', 'Sunscreen'] },
      { name: 'Hair Care', items: ['Shampoo', 'Conditioner', 'Hair Oil', 'Styling'] }
    ]
  },
  {
    name: 'Jewelry & Accessories',
    subcategories: [
      { name: 'Jewelry', items: ['Earrings', 'Necklaces', 'Rings', 'Bracelets'] },
      { name: 'Bags', items: ['Handbags', 'Tote Bags', 'Clutches', 'Backpacks'] },
      { name: 'Accessories', items: ['Watches', 'Sunglasses', 'Belts'] }
    ]
  },
  {
    name: 'Lingerie & Sleepwear',
    subcategories: [
      { name: 'Lingerie', items: ['Bras', 'Panties', 'Sets'] },
      { name: 'Sleepwear', items: ['Nightgowns', 'Pajamas', 'Robes'] }
    ]
  }
];

const Header = ({ cart, sellerStatus, onOpenSellerModal, wishlistCount, onOpenWishlist, onOpenCart, onOpenProfile }: { cart: any[], sellerStatus: string, onOpenSellerModal: () => void, wishlistCount: number, onOpenWishlist: () => void, onOpenCart: () => void, onOpenProfile: () => void }) => {
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [expandedSubcategories, setExpandedSubcategories] = useState<string[]>([]);
  
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  const toggleCategory = (name: string) => {
    setExpandedCategories(prev => 
      prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]
    );
  };

  const toggleSubcategory = (name: string) => {
    setExpandedSubcategories(prev => 
      prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]
    );
  };

  return (
    <header className="hidden md:block bg-[#80091B] text-white border border-[#FDE2E4] shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4 relative">
          <Menu 
            className="w-6 h-6 cursor-pointer" 
            onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
          />
          
          {isCategoryDropdownOpen && (
            <div className="fixed inset-0 z-[100] bg-white flex flex-col h-screen overflow-hidden animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white sticky top-0 z-10 shrink-0">
                <div className="flex items-center gap-2 cursor-pointer">
                  <Logo className="h-10 w-auto" textClassName="text-2xl font-bold tracking-tight text-black" />
                </div>
                <button onClick={() => setIsCategoryDropdownOpen(false)} className="p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto w-full max-w-4xl mx-auto p-4 md:p-8">
                <h2 className="text-3xl font-black text-black mb-8">All Categories</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                  {hierarchicalCategories.map((category, idx) => (
                    <div key={idx} className="bg-white border text-black border-[#ebeced] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div 
                        className="p-5 hover:bg-[#FDE2E4] transition-colors duration-200 cursor-pointer flex items-center justify-between"
                        onClick={() => toggleCategory(category.name)}
                      >
                        <span className="font-bold text-lg">{category.name}</span>
                        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ease-in-out ${expandedCategories.includes(category.name) ? 'rotate-180 text-black' : ''}`} />
                      </div>
                      
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedCategories.includes(category.name) ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="px-5 pb-5 space-y-3 pt-2">
                          {category.subcategories.map((sub, subIdx) => (
                            <div key={subIdx} className="bg-[#FDE2E4]/80 rounded-xl overflow-hidden border border-gray-100 hover:shadow-sm transition-shadow duration-200">
                              <div 
                                className="px-4 py-3 text-sm font-bold text-gray-800 hover:text-black hover:bg-gray-200/50 transition-colors duration-200 cursor-pointer flex items-center justify-between"
                                onClick={() => toggleSubcategory(sub.name)}
                              >
                                <span>{sub.name}</span>
                                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ease-in-out ${expandedSubcategories.includes(sub.name) ? 'rotate-180' : ''}`} />
                              </div>
                              
                              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedSubcategories.includes(sub.name) ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="px-4 pb-3 flex flex-col gap-1.5 pt-1">
                                  {sub.items.map((item, itemIdx) => (
                                    <button
                                      key={itemIdx}
                                      onClick={() => {
                                        setIsCategoryDropdownOpen(false);
                                        document.getElementById('product-section')?.scrollIntoView({ behavior: 'smooth' });
                                      }}
                                      className="text-sm font-medium text-gray-500 hover:text-black py-1.5 flex items-center gap-2 pl-3 border-l-2 border-transparent hover:border-zinc-800 transition-colors rounded-r-md hover:bg-white w-full text-left"
                                    >
                                      {item}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-[#FDE2E4] border-t border-[#ebeced] p-4 sm:p-6 shrink-0 z-10 w-full mt-auto">
                <div className="max-w-4xl flex flex-col md:flex-row flex-wrap gap-4 mx-auto w-full items-center justify-center md:justify-between text-black">
                  <button onClick={() => { setIsCategoryDropdownOpen(false); document.getElementById('product-section')?.scrollIntoView({ behavior: 'smooth' }); }} className="flex items-center justify-between md:justify-start bg-white px-5 py-3 rounded-xl border border-[#ebeced] hover:border-zinc-800 hover:shadow-sm transition-all group w-full md:w-auto md:min-w-[200px]">
                    <div className="flex items-center gap-3">
                      <Headphones className="w-5 h-5 text-gray-600 group-hover:text-black transition-colors" />
                      <span className="font-bold text-gray-800 text-sm">Shevaly Helpline</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-black md:hidden" />
                  </button>
                  
                  <a href="mailto:shevalyofficial@gmail.com" className="flex items-center justify-between md:justify-start bg-white px-5 py-3 rounded-xl border border-[#ebeced] hover:border-zinc-800 hover:shadow-sm transition-all group w-full md:w-auto md:min-w-[200px]">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-gray-600 group-hover:text-black transition-colors" />
                      <span className="font-bold text-gray-800 text-sm truncate">shevalyofficial@gmail.com</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-black md:hidden" />
                  </a>
                  
                  <a href="tel:+8809611806424" className="flex items-center justify-between md:justify-start bg-white px-5 py-3 rounded-xl border border-[#ebeced] hover:border-zinc-800 hover:shadow-sm transition-all group w-full md:w-auto md:min-w-[200px]">
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-600 group-hover:text-black transition-colors" />
                      <span className="font-bold text-gray-800 text-sm">+8809611806424</span>
                    </div>
                  </a>

                  <button onClick={() => { setIsCategoryDropdownOpen(false); document.getElementById('product-section')?.scrollIntoView({ behavior: 'smooth' }); }} className="flex items-center justify-between md:justify-start bg-white px-5 py-3 rounded-xl border border-[#ebeced] hover:border-zinc-800 hover:shadow-sm transition-all group w-full md:w-auto md:min-w-[200px]">
                    <div className="flex items-center gap-3">
                      <MessageCircle className="w-5 h-5 text-gray-600 group-hover:text-black transition-colors" />
                      <span className="font-bold text-gray-800 text-sm">01907104920</span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-black md:hidden" />
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 cursor-pointer">
            <Logo className="h-12 w-auto" variant="dark" />
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm">
          {sellerStatus === 'none' && (
            <div onClick={onOpenSellerModal} className="flex items-center gap-2 border-r border-white/30 pr-6 cursor-pointer hover:text-zinc-200 transition font-bold">
              <Store className="w-5 h-5" />
              <span>Become a Seller</span>
            </div>
          )}
          {sellerStatus === 'pending' && (
            <div className="flex items-center gap-2 border-r border-white/30 pr-6 cursor-pointer text-zinc-200 transition font-bold">
              <Store className="w-5 h-5" />
              <span>Verification Pending</span>
            </div>
          )}
          {sellerStatus === 'verified' && (
            <Link href="/seller" className="flex items-center gap-2 border-r border-white/30 pr-6 cursor-pointer hover:text-zinc-200 transition font-bold">
              <Store className="w-5 h-5" />
              <span>Seller Dashboard</span>
            </Link>
          )}
          <div className="flex items-center gap-2 border-r border-white/30 pr-6 cursor-pointer">
            <Smartphone className="w-6 h-6" />
            <div className="leading-tight">
              <div>Download the</div>
              <div className="font-semibold">Shevaly App</div>
            </div>
          </div>
          <div className="flex flex-col items-center cursor-pointer hover:text-zinc-200 transition" onClick={onOpenProfile}>
            <User className="w-5 h-5 mb-0.5" />
            <span>Profile</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer hover:text-zinc-200 transition relative" onClick={onOpenWishlist}>
            <div className="relative">
              <Heart className="w-5 h-5 mb-0.5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-white text-gray-800 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </div>
            <span>Wishlist</span>
          </div>
          <div className="relative">
            <div 
              className="flex flex-col items-center cursor-pointer hover:text-zinc-200 transition"
              onClick={onOpenCart}
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 mb-0.5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-white text-gray-800 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span>Cart</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const Hero = ({ 
  searchQuery, 
  setSearchQuery, 
  onFilterClick,
  user,
  onOpenAuth
}: { 
  searchQuery: string, 
  setSearchQuery: (q: string) => void,
  onFilterClick: () => void,
  user: any,
  onOpenAuth: (mode: 'login' | 'signup') => void
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>(['Elegant Saree', 'Smart Watch', 'Women Perfume']);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setSearchHistory(prev => {
      const newHistory = [searchQuery.trim(), ...prev.filter(q => q.toLowerCase() !== searchQuery.trim().toLowerCase())];
      return newHistory.slice(0, 5); // Keep top 5
    });
    setIsSearchFocused(false);
    
    setTimeout(() => {
      const el = document.getElementById('product-section');
      if (el) {
        const yOffset = -80; 
        const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="relative bg-gray-900 min-h-[400px] md:min-h-[500px] flex flex-col z-40">
      {/* Large Banner Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image referrerPolicy="no-referrer" src="https://picsum.photos/seed/fashionbanner/1920/800" alt="Fashion Banner" fill className="object-cover opacity-80" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 md:pt-6 md:pb-16 relative z-10 flex flex-col flex-1 w-full">
        <div className="flex justify-end text-sm font-medium mb-auto items-center gap-2 text-white">
          {user ? (
            <span className="font-bold">Hi, {user.name || user.email?.split('@')[0]}</span>
          ) : (
            <>
              <button onClick={() => onOpenAuth('login')} className="hover:underline underline-offset-4">Log In</button>
              <span>or</span>
              <button onClick={() => onOpenAuth('signup')} className="bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full hover:bg-white/30 transition">Sign Up</button>
            </>
          )}
        </div>
        
        <div className="max-w-3xl space-y-4 mb-4 md:mb-8 mt-4 md:mt-12">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white drop-shadow-lg">
            Bangladesh&apos;s Favorite <br className="hidden md:block" />
            <span className="text-gray-200">Online Fashion Mall</span>
          </h1>
          <p className="text-gray-200 text-sm md:text-lg max-w-2xl font-medium drop-shadow">Discover the latest trends in women&apos;s fashion. Shop premium quality at affordable prices.</p>
        </div>
        
        <div className="max-w-3xl relative w-full mt-auto mb-12 md:mb-16">
          <form onSubmit={handleSearch} className="relative z-20">
            <div className="absolute inset-y-0 left-4 md:left-5 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              placeholder="Search products..." 
              className="w-full bg-white pl-12 pr-32 md:pl-14 md:pr-40 py-3.5 md:py-4 rounded-full text-gray-900 outline-none border border-transparent focus:border-2 focus:border-[#80091B] shadow-sm focus:shadow-md transition-all text-base md:text-lg"
            />
            <div className="absolute right-1.5 md:right-2 top-1.5 md:top-2 bottom-1.5 md:bottom-2 flex gap-1">
              <button type="button" onClick={onFilterClick} className="bg-gray-100 text-gray-700 px-3 md:px-4 rounded-full flex items-center justify-center hover:bg-gray-200 transition">
                <SlidersHorizontal className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <button type="submit" className="bg-[#80091B] text-white border border-[#FDE2E4] shadow-sm px-5 md:px-8 rounded-full font-bold hover:bg-[#5A0613] hover:shadow-lg transition text-sm md:text-lg">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const categories = [
  { name: 'Traditional Wear', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80' },
  { name: 'Western Wear', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&q=80' },
  { name: 'Footwear', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80' },
  { name: 'Beauty', image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400&q=80' },
  { name: 'Jewelry', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80' },
  { name: 'Bags', image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=400&q=80' },
  { name: 'Topwear', image: 'https://placehold.co/400x400/f3f4f6/6b7280?text=Topwear' },
  { name: 'Bottomwear', image: 'https://placehold.co/400x400/f3f4f6/6b7280?text=Bottomwear' },
  { name: 'Grooming', image: 'https://placehold.co/400x400/f3f4f6/6b7280?text=Grooming' },
  { name: 'Accessories', image: 'https://placehold.co/400x400/f3f4f6/6b7280?text=Accessories' },
  { name: 'Fragrances', image: 'https://placehold.co/400x400/f3f4f6/6b7280?text=Fragrances' },
];

const Categories = ({ onCategoryClick }: { onCategoryClick: (category: string) => void }) => (
  <div className="py-6 md:py-8">
    <div className="flex items-center justify-between mb-4 px-4 sm:px-0">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900">Shop by Category</h2>
      <button onClick={() => { document.getElementById('product-section')?.scrollIntoView({ behavior: 'smooth' }) }} className="text-gray-800 font-medium hover:underline flex items-center gap-1 text-sm md:text-base">
        View All <ChevronRight className="w-4 h-4" />
      </button>
    </div>
    <div className="overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
      <div className="flex gap-4 w-max">
        {categories.map((cat, i) => (
          <div key={i} onClick={() => onCategoryClick(cat.name)} className="flex flex-col items-center gap-2 w-[100px] md:w-[120px] cursor-pointer group shrink-0">
            <div className="w-full aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-sm group-hover:shadow-md transition relative">
              <Image referrerPolicy="no-referrer" src={cat.image || `https://placehold.co/400x400/f3f4f6/6b7280?text=${encodeURIComponent(cat.name)}`} alt={cat.name} fill className="object-cover group-hover:scale-110 transition duration-500" />
            </div>
            <span className="text-xs md:text-sm text-center font-medium text-gray-700 group-hover:text-gray-800 transition">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Features = () => (
  <div className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 py-2">
    <div onClick={() => { document.getElementById('product-section')?.scrollIntoView({ behavior: 'smooth' }) }} className="min-w-[240px] md:min-w-0 bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-xl border border-gray-100 hover:border-indigo-100 transition-all duration-300 hover:-translate-y-1.5 group cursor-pointer">
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform duration-300">
        <HandCoins className="w-6 h-6 text-gray-900" />
      </div>
      <div className="flex flex-col">
        <span className="font-extrabold text-gray-900 text-sm md:text-base whitespace-nowrap">Cash On Delivery</span>
        <span className="text-xs text-gray-500 font-medium">Pay at your doorstep</span>
      </div>
    </div>
    <div onClick={() => { document.getElementById('product-section')?.scrollIntoView({ behavior: 'smooth' }) }} className="min-w-[240px] md:min-w-0 bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-xl border border-gray-100 hover:border-rose-100 transition-all duration-300 hover:-translate-y-1.5 group cursor-pointer">
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-400 to-zinc-700 flex items-center justify-center shrink-0 shadow-lg shadow-[#e6e8ea]/50 group-hover:scale-110 transition-transform duration-300">
        <RefreshCcw className="w-6 h-6 text-gray-900" />
      </div>
      <div className="flex flex-col">
        <span className="font-extrabold text-gray-900 text-sm md:text-base whitespace-nowrap">Instant Return</span>
        <span className="text-xs text-gray-500 font-medium">Hassle-free process</span>
      </div>
    </div>
    <div onClick={() => { document.getElementById('product-section')?.scrollIntoView({ behavior: 'smooth' }) }} className="min-w-[240px] md:min-w-0 bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-xl border border-gray-100 hover:border-blue-100 transition-all duration-300 hover:-translate-y-1.5 group cursor-pointer">
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
        <Truck className="w-6 h-6 text-gray-900" />
      </div>
      <div className="flex flex-col">
        <span className="font-extrabold text-gray-900 text-sm md:text-base whitespace-nowrap">Delivery in 24h</span>
        <span className="text-xs text-gray-500 font-medium">Express fast shipping</span>
      </div>
    </div>
    <div onClick={() => { document.getElementById('product-section')?.scrollIntoView({ behavior: 'smooth' }) }} className="min-w-[240px] md:min-w-0 bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-xl border border-gray-100 hover:border-emerald-100 transition-all duration-300 hover:-translate-y-1.5 group cursor-pointer">
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-300">
        <Tag className="w-6 h-6 text-gray-900" />
      </div>
      <div className="flex flex-col">
        <span className="font-extrabold text-gray-900 text-sm md:text-base whitespace-nowrap">Best Price Deal</span>
        <span className="text-xs text-gray-500 font-medium">Guaranteed savings</span>
      </div>
    </div>
  </div>
);

const PromoBanners = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const { scrollYProgress: scroll1 } = useScroll({ target: ref1, offset: ["start end", "end start"] });
  const { scrollYProgress: scroll2 } = useScroll({ target: ref2, offset: ["start end", "end start"] });

  const y1 = useTransform(scroll1, [0, 1], ["-15%", "15%"]);
  const y2 = useTransform(scroll2, [0, 1], ["-15%", "15%"]);

  return (
    <div className="flex md:grid md:grid-cols-2 gap-4 md:gap-6 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
      <div ref={ref1} onClick={() => { document.getElementById('product-section')?.scrollIntoView({ behavior: 'smooth' }) }} className="relative rounded-2xl overflow-hidden aspect-[2/1] md:aspect-[2/1] bg-[#FDE2E4] group cursor-pointer min-w-[85vw] md:min-w-0">
        <motion.div style={{ y: y1 }} className="absolute -top-[20%] -bottom-[20%] left-0 right-0">
          <Image referrerPolicy="no-referrer" src="https://picsum.photos/seed/womensfashion1/800/400" alt="Women's Fashion" fill className="object-cover group-hover:scale-105 transition duration-700" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent p-6 md:p-12 flex flex-col justify-center pointer-events-none">
          <span className="text-gray-800 font-bold tracking-[0.2em] text-[10px] md:text-sm mb-1 md:mb-2 text-shadow-sm">CHOOSE TO</span>
          <h3 className="text-4xl md:text-5xl font-black text-gray-800 leading-none mb-1 drop-shadow-md">ELEVATE</h3>
          <span className="text-xl md:text-3xl font-serif italic text-black drop-shadow-sm">Your Style</span>
        </div>
      </div>
      <div ref={ref2} onClick={() => { document.getElementById('product-section')?.scrollIntoView({ behavior: 'smooth' }) }} className="relative rounded-2xl overflow-hidden aspect-[2/1] md:aspect-[2/1] bg-[#FDE2E4] group cursor-pointer min-w-[85vw] md:min-w-0">
        <motion.div style={{ y: y2 }} className="absolute -top-[20%] -bottom-[20%] left-0 right-0">
          <Image referrerPolicy="no-referrer" src="https://picsum.photos/seed/womensshoes/800/400" alt="Women's Footwear" fill className="object-cover group-hover:scale-105 transition duration-700" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent p-6 md:p-12 flex flex-col justify-center pointer-events-none">
          <span className="text-gray-800 font-bold tracking-[0.2em] text-[10px] md:text-sm mb-1 md:mb-2 text-shadow-sm">PREMIUM</span>
          <h3 className="text-4xl md:text-5xl font-black text-gray-800 leading-none mb-1 drop-shadow-md">FOOTWEAR</h3>
          <span className="text-xl md:text-3xl font-serif italic text-gray-600">Collection</span>
        </div>
      </div>
    </div>
  );
};

const offers = [
  { discount: '15%', title: 'Premium Women Fragrances', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&q=80' },
  { discount: '20%', title: 'Branded Women Casual Shoes', image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&q=80' },
  { discount: '30%', title: 'Trendy Hats & Fashion Accessories', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&q=80' },
  { discount: '25%', title: 'Gym & Fitness Accessories', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&q=80' },
  { discount: '40%', title: 'Smart Watches & Bands', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80' },
];

const Offers = () => (
  <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
    {offers.map((offer, i) => (
      <div key={i} onClick={() => { document.getElementById('product-section')?.scrollIntoView({ behavior: 'smooth' }) }} className="min-w-[240px] bg-white rounded-xl overflow-hidden shadow-sm border border-zinc-50 flex flex-col cursor-pointer group">
        <div className="h-40 bg-[#e8f4fd] relative overflow-hidden">
          <Image referrerPolicy="no-referrer" src={offer.image} alt={offer.title} fill className="object-cover mix-blend-multiply group-hover:scale-110 transition duration-500" />
        </div>
        <div className="p-4 flex items-center gap-4">
          <div className="text-gray-800 font-bold leading-tight text-center shrink-0">
            <div className="text-2xl">{offer.discount}</div>
            <div className="text-sm">OFF</div>
          </div>
          <div className="w-px h-10 bg-gray-200 shrink-0"></div>
          <div className="text-sm font-medium text-gray-700 leading-snug">
            {offer.title}
          </div>
        </div>
      </div>
    ))}
  </div>
);

const SingleBanner = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div ref={ref} onClick={() => { document.getElementById('product-section')?.scrollIntoView({ behavior: 'smooth' }) }} className="relative rounded-3xl overflow-hidden bg-[#0f172a] group cursor-pointer shadow-2xl min-h-[280px] md:min-h-[360px] flex items-center my-4 md:my-8 border border-gray-800">
      {/* Background Image with Gradient Mask */}
      <motion.div style={{ y }} className="absolute -top-[20%] -bottom-[20%] left-0 right-0">
        <Image referrerPolicy="no-referrer" src="https://picsum.photos/seed/makeup/1200/600" alt="Beauty and Makeup" fill className="object-cover opacity-50 group-hover:scale-110 group-hover:opacity-70 transition-all duration-1000 ease-out" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/80 to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent md:hidden pointer-events-none"></div>

      {/* Decorative Glows */}
      <div className="absolute -left-32 -top-32 w-96 h-96 bg-[#e6e8ea] shadow-sm text-gray-900 rounded-full mix-blend-screen filter blur-[128px] opacity-30 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none"></div>
      <div className="absolute right-0 bottom-0 w-64 h-64 bg-zinc-700 rounded-full mix-blend-screen filter blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 p-6 md:p-12 w-full md:w-2/3 flex flex-col justify-center items-start">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-white text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase mb-4 md:mb-6 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-zinc-400 animate-pulse"></span>
          Premium Collection
        </div>
        
        <h3 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tight leading-none drop-shadow-md">
          BEAUTY &amp; MAKEUP
        </h3>
        <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 drop-shadow-lg mb-6 md:mb-8">
          ESSENTIALS
        </h2>
        
        <button onClick={() => { document.getElementById('product-section')?.scrollIntoView({ behavior: 'smooth' }) }} className="bg-white text-gray-900 px-8 py-3.5 rounded-full font-bold text-sm flex items-center gap-3 hover:bg-[#5A0613] shadow-sm text-gray-900 hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(144,18,53,0.4)] group/btn transform hover:-translate-y-1">
          Shop Collection <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

const topBrandsData = [
  { name: 'Nike', logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80' },
  { name: 'Adidas', logo: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=200&q=80' },
  { name: 'Zara', logo: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&q=80' },
  { name: 'H&M', logo: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200&q=80' },
  { name: 'Levi\'s', logo: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&q=80' },
  { name: 'Puma', logo: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=200&q=80' },
  { name: 'Gucci', logo: 'https://picsum.photos/seed/gucci/200/200' },
  { name: 'Calvin Klein', logo: 'https://picsum.photos/seed/calvinklein/200/200' },
  { name: 'Tommy Hilfiger', logo: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=200&q=80' },
  { name: 'ZUQO', logo: 'https://images.unsplash.com/photo-1557683311-eac922347aa1?w=200&q=80' },
  { name: 'WishCare', logo: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=200&q=80' },
  { name: 'DIAGRAM', logo: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&q=80' },
  { name: 'HEAD GEAR', logo: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=200&q=80' },
  { name: 'BOSPHORUS', logo: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=200&q=80' },
  { name: 'Urban Outfitters', logo: 'https://images.unsplash.com/photo-1520975661595-6453be3f7070?w=200&q=80' },
];

const TopBrands = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 inline-block border-b-2 border-zinc-800 pb-2 px-2">Top Sellers & Brands</h2>
      </div>
      <div 
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex overflow-x-auto gap-3 md:gap-4 pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 ${isDown ? 'cursor-grabbing' : 'cursor-grab'}`}
      >
        {topBrandsData.map((brand, i) => (
          <div key={i} onClick={() => { document.getElementById('product-section')?.scrollIntoView({ behavior: 'smooth' }) }} className="min-w-[130px] md:min-w-[150px] bg-white rounded-2xl shadow-sm border border-[#FDE2E4] flex flex-col items-center justify-center p-4 hover:shadow-lg hover:-translate-y-1.5 hover:border-zinc-800/50 transition-all duration-300 select-none group cursor-pointer">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-gray-100 overflow-hidden relative shadow-sm group-hover:scale-105 group-hover:shadow-md transition-all duration-300 mb-3">
              <Image referrerPolicy="no-referrer" src={brand.logo} alt={brand.name} fill className="object-cover" />
            </div>
            <span className="font-bold text-sm md:text-base text-gray-800 tracking-tight text-center pointer-events-none group-hover:text-gray-800 transition-colors duration-300 w-full truncate">{brand.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const affordableItems = [
  { title: 'Classic Kurtis', price: 1499, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&q=80' },
  { title: 'Classic Time', price: 1999, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&q=80' },
  { title: 'Street Sneakers', price: 2500, image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=300&q=80' },
  { title: 'Caps & Hats', price: 950, image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=300&q=80' },
  { title: 'Travel Duffel', price: 2999, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&q=80' },
  { title: 'Women Fragrance', price: 1155, image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=300&q=80' },
  { title: 'Premium Suits', price: 4500, image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=300&q=80' },
  { title: 'Leather Wallets', price: 850, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&q=80' },
  { title: 'Dark Shades', price: 999, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300&q=80' },
  { title: 'Hoodies & Jackets', price: 1850, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&q=80' },
  { title: 'Denim Jeans', price: 1650, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&q=80' },
  { title: 'Formal Shoes', price: 2200, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&q=80' }
];

const AffordableCollectionModal = ({ isOpen, onClose, onOpenFilters, onProductClick }: { isOpen: boolean; onClose: () => void; onOpenFilters?: () => void; onProductClick?: (product: any) => void }) => {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] bg-white md:bg-[#fdf2f5] overflow-y-auto w-full h-full flex flex-col font-sans">
      {/* Mobile Top Bar */}
      <div className="md:hidden sticky top-0 bg-white z-20 w-full shadow-sm">
        <div className="flex items-center px-2 py-3 gap-2 border-b border-[#ebeced]">
           <button onClick={onClose} className="p-2 active:bg-gray-100 rounded-full transition-colors"><ChevronLeft className="w-6 h-6 text-gray-800" /></button>
           <div className="font-bold text-gray-900 text-lg">Affordable collection</div>
        </div>
        <div className="flex border-b border-[#ebeced]">
          <button className="flex-1 flex items-center justify-center gap-2 py-3 border-r border-[#ebeced] text-[15px] text-gray-800 font-medium active:bg-gray-50 transition-colors">
             <ArrowUpDown className="w-4 h-4" /> Sort by
          </button>
          <button 
             onClick={onOpenFilters}
             className="flex-1 flex items-center justify-center gap-2 py-3 text-[15px] text-gray-800 font-medium active:bg-gray-50 transition-colors">
             Filters <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Desktop Close Button */}
      <div className="hidden md:flex justify-end p-4 sticky top-0 z-40 bg-[#fdf2f5]/80 backdrop-blur-md">
         <button onClick={onClose} className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors"><X className="w-6 h-6 text-black"/></button>
      </div>

      <div className="flex flex-1 md:max-w-[1400px] md:mx-auto w-full md:px-6 md:pb-8">
        
        {/* Desktop Sidebar */}
        <div className="hidden md:flex flex-col w-[240px] shrink-0 bg-white mr-6 rounded-xl shadow-sm h-fit sticky top-[80px]">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="text-lg font-bold flex items-center gap-2"><SlidersHorizontal className="w-5 h-5"/> Filters</h2>
            <button onClick={() => setSelectedSizes([])} className="text-gray-900 text-sm font-medium hover:underline">Clear Filters</button>
          </div>
          
          <div className="p-5 space-y-6">
            <div>
              <h3 className="font-bold mb-3 text-gray-900">Category</h3>
              <div className="border-b border-gray-100 pb-4"></div>
            </div>
            
            <div>
              <h3 className="font-bold mb-3 text-gray-900">Brand</h3>
              <div className="border-b border-gray-100 pb-4"></div>
            </div>
            
            <div>
              <h3 className="font-bold mb-3 text-gray-900">Price (0 - 1597)</h3>
              <div className="px-1 border-b border-gray-100 pb-6">
                <div className="h-1.5 bg-gray-200 rounded-full relative mt-4">
                  <div className="absolute left-0 right-0 h-full bg-[#80091B] rounded-full"></div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#80091B] rounded-full border-2 border-white shadow-sm cursor-pointer"></div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#80091B] rounded-full border-2 border-white shadow-sm cursor-pointer"></div>
                </div>
                <div className="flex justify-between mt-3 text-sm text-gray-600 font-medium">
                  <span>৳0</span>
                  <span>-</span>
                  <span>৳1597</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold mb-3 text-gray-900">Size</h3>
              <div className="space-y-3">
                {['6', '7', '8', '9', '10', '11-12', '12'].map(s => (
                  <label key={s} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                       type="checkbox" 
                       className="peer hidden" 
                       checked={selectedSizes.includes(s)}
                       onChange={(e) => {
                          if (e.target.checked) {
                             setSelectedSizes(prev => [...prev, s]);
                          } else {
                             setSelectedSizes(prev => prev.filter(v => v !== s));
                          }
                       }}
                    />
                    <div className="w-4 h-4 rounded border border-gray-300 flex items-center justify-center group-hover:border-[#80091B] peer-checked:bg-[#80091B] peer-checked:border-[#80091B] transition-colors">
                       <CheckCircle className="w-3 h-3 text-white hidden peer-checked:block" />
                    </div>
                    <span className="text-sm text-gray-700">{s}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid Area */}
        <div className="flex-1 flex flex-col w-full">
          {/* Desktop Top Bar */}
          <div className="hidden md:flex justify-between items-center mb-4 px-2">
            <span className="text-sm text-gray-700 font-medium">{affordableItems.length} results</span>
            <div className="flex items-center gap-2 text-sm bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm">
               <ArrowUpDown className="w-4 h-4 text-gray-500" />
               <span className="text-gray-500">Sort by:</span>
               <select className="border-none bg-transparent font-medium text-gray-900 focus:ring-0 cursor-pointer outline-none">
                 <option>Recommended</option>
                 <option>Price: Low to High</option>
                 <option>Price: High to Low</option>
               </select>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[1px] md:gap-4 bg-[#80091B] md:bg-transparent">
            {affordableItems.map((item, i) => {
              const originalPrice = Math.round(item.price * 1.25);
              const discountPercent = Math.round(((originalPrice - item.price) / originalPrice) * 100);

              return (
                <div 
                  key={i} 
                  className="flex flex-col bg-white overflow-hidden cursor-pointer md:rounded-xl md:shadow-sm md:hover:shadow-md transition-shadow relative group"
                  onClick={() => {
                    if (onProductClick) {
                      onProductClick({
                        name: item.title,
                        price: item.price,
                        oldPrice: originalPrice,
                        discount: discountPercent,
                        image: item.image,
                        images: [item.image]
                      });
                    }
                  }}
                >
                    <div className="relative w-full aspect-[4/5] bg-[#f9f9f9]">
                     <Image referrerPolicy="no-referrer" src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                     <button 
                        className="absolute bottom-3 right-3 p-2 bg-white rounded-full shadow-md focus:outline-none md:opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Toggle wishlist logic could go here
                          const target = e.currentTarget;
                          const icon = target.querySelector('svg');
                          if (icon) {
                             icon.setAttribute('fill', icon.getAttribute('fill') === 'currentColor' ? 'none' : 'currentColor');
                             icon.setAttribute('class', icon.getAttribute('fill') === 'currentColor' ? 'w-5 h-5 text-gray-900' : 'w-5 h-5 text-gray-900');
                          }
                        }}
                     >
                       <Heart className="w-5 h-5 text-gray-900" strokeWidth={2.5} />
                     </button>
                   </div>
                   <div className="p-3 md:p-4 bg-white flex flex-col gap-1.5 cursor-pointer">
                     <h3 className="text-[14px] md:text-[15px] font-medium text-gray-900 truncate">{item.title}</h3>
                     <div className="flex items-center gap-1.5 flex-wrap">
                       <span className="text-gray-900 font-bold text-[15px] md:text-base">৳{item.price}</span>
                       <span className="text-gray-400 line-through text-xs md:text-sm font-medium">৳{originalPrice}</span>
                       <span className="text-[#e28e21] text-xs font-bold">({discountPercent}% OFF)</span>
                     </div>
                   </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const Affordable = ({ onOpenCollection }: { onOpenCollection?: () => void }) => {
  const topRow = affordableItems.slice(0, Math.ceil(affordableItems.length / 2));
  const bottomRow = affordableItems.slice(Math.ceil(affordableItems.length / 2));

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDown(true);
    setIsDragging(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
    setTimeout(() => setIsDragging(false), 50);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    if (Math.abs(walk) > 5) {
      setIsDragging(true);
    }
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleItemClick = () => {
    if (!isDragging && onOpenCollection) {
      onOpenCollection();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 inline-block border-b-2 border-[#ebeced] pb-2 px-2">Affordable and reliable with great quality</h2>
      </div>
      
      <div 
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 ${isDown ? 'cursor-grabbing' : 'cursor-grab'}`}
      >
        <div className="flex flex-col gap-3 md:gap-4 w-max">
          <div className="flex gap-3 md:gap-4">
            {topRow.map((item, i) => (
              <div 
                key={`top-${i}`} 
                onClick={handleItemClick}
                className="w-[140px] md:w-44 bg-white rounded-2xl border border-pink-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col relative shrink-0 cursor-pointer"
              >
                <div className="h-28 md:h-32 w-full relative bg-[#fff0f5] overflow-hidden pointer-events-none">
                   <Image referrerPolicy="no-referrer" src={item.image} alt={item.title} fill className="object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                   <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent"></div>
                </div>
                <div className="p-3 md:p-4 bg-white relative z-10 flex flex-col flex-1 pb-4 pointer-events-none">
                  <span className="text-[10px] md:text-sm text-gray-600 mb-0.5">Shop Under</span>
                  <span className="text-xl md:text-2xl font-black text-gray-900 mb-0.5 leading-none">৳{item.price}</span>
                  <span className="text-xs md:text-base font-bold text-gray-800 leading-tight tracking-tight mt-1 truncate">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-3 md:gap-4">
            {bottomRow.map((item, i) => (
              <div 
                key={`bottom-${i}`} 
                onClick={handleItemClick}
                className="w-[140px] md:w-44 bg-white rounded-2xl border border-pink-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col relative shrink-0 cursor-pointer"
              >
                <div className="h-28 md:h-32 w-full relative bg-[#fff0f5] overflow-hidden pointer-events-none">
                   <Image referrerPolicy="no-referrer" src={item.image} alt={item.title} fill className="object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                   <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent"></div>
                </div>
                <div className="p-3 md:p-4 bg-white relative z-10 flex flex-col flex-1 pb-4 pointer-events-none">
                  <span className="text-[10px] md:text-sm text-gray-600 mb-0.5">Shop Under</span>
                  <span className="text-xl md:text-2xl font-black text-gray-900 mb-0.5 leading-none">৳{item.price}</span>
                  <span className="text-xs md:text-base font-bold text-gray-800 leading-tight tracking-tight mt-1 truncate">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const products = [
  { 
    name: 'Elegant Silk Saree', category: 'Traditional Wear', price: 4500, oldPrice: 5999, discount: 25, 
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80', 
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80', 
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80'
    ], 
    sizes: ['Free Size'], colors: ['Maroon', 'Gold'], stock: 10, rating: 4.8, reviews: 156,
    tags: ['Best Seller', 'Trending']
  },
  { 
    name: 'Floral Chiffon Dress', category: 'Western Wear', price: 1899, oldPrice: 2499, discount: 24, 
    image: 'https://images.unsplash.com/photo-1495385794356-15371f348c31?w=500&q=80', 
    images: [
      'https://images.unsplash.com/photo-1495385794356-15371f348c31?w=500&q=80',
      'https://images.unsplash.com/photo-1515347619145-ea48cc0b6cc8?w=500&q=80'
    ], 
    sizes: ['S', 'M', 'L'], colors: ['Pink', 'White'], stock: 25, rating: 4.9, reviews: 204,
    tags: ['Trending']
  },
  { 
    name: 'Rose Gold Plated Necklace', category: 'Jewelry', price: 999, oldPrice: 1499, discount: 33, 
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80', 
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80'
    ], 
    sizes: ['Standard'], colors: ['Rose Gold'], stock: 45, rating: 4.7, reviews: 89,
    tags: ['Gift Idea']
  },
  { 
    name: 'Matte Liquid Lipstick', category: 'Beauty', price: 650, oldPrice: 850, discount: 23, 
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&q=80', 
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&q=80'
    ], 
    sizes: ['5ml'], colors: ['Ruby Red', 'Nude Blush', 'Deep Berry'], stock: 100, rating: 4.6, reviews: 420,
    tags: ['Best Seller']
  },
  { 
    name: 'Designer Leather Handbag', category: 'Bags', price: 3200, oldPrice: 4500, discount: 28, 
    image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=500&q=80', 
    images: [
      'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=500&q=80'
    ], 
    sizes: ['Medium'], colors: ['Maroon', 'Black'], stock: 12, rating: 4.9, reviews: 67,
    tags: ['Premium']
  },
  { 
    name: 'Stiletto Party Heels', category: 'Footwear', price: 2100, oldPrice: 2999, discount: 30, 
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80', 
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80'
    ], 
    sizes: ['36', '37', '38', '39', '40'], colors: ['Silver', 'Black'], stock: 18, rating: 4.5, reviews: 112,
    tags: ['Party Wear']
  },
  { 
    name: 'Cotton Printed Kurti', category: 'Traditional Wear', price: 1299, oldPrice: 1899, discount: 31, 
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80', 
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80'
    ], 
    sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['Blue', 'Yellow'], stock: 35, rating: 4.6, reviews: 245,
    tags: ['Casual']
  },
  { 
    name: 'Hydrating Face Serum', category: 'Beauty', price: 1100, oldPrice: 1500, discount: 26, 
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80', 
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80'
    ], 
    sizes: ['30ml'], colors: ['Clear'], stock: 50, rating: 4.8, reviews: 315,
    tags: ['Must Have']
  }
];

const ProductCardSkeleton = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col animate-pulse">
    <div className="relative aspect-[4/5] bg-gray-200"></div>
    <div className="p-2 md:p-3 flex flex-col flex-1 space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      <div className="flex items-center gap-2 mt-1">
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
      </div>
      <div className="mt-auto pt-2">
        <div className="h-11 bg-gray-200 rounded-md w-full"></div>
      </div>
    </div>
  </div>
);

const ProductDetailSkeleton = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 bg-white z-[70] overflow-y-auto flex flex-col animate-pulse">
    <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center gap-3 z-10">
      <button onClick={onClose} className="p-2 -ml-2 bg-[#FDE2E4]text-gray-600">
        <ChevronRight className="w-5 h-5 rotate-180" />
      </button>
      <div className="h-6 bg-gray-200 rounded w-1/3"></div>
    </div>
    
    <div className="flex-1 max-w-4xl mx-auto w-full p-4 md:p-8 flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2 space-y-4">
        <div className="relative aspect-[4/5] bg-gray-200 rounded-2xl"></div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-20 h-24 shrink-0 rounded-lg bg-gray-200"></div>
          ))}
        </div>
      </div>
      
      <div className="md:w-1/2 space-y-6">
        <div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-5 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          </div>
          
          <div className="h-14 bg-gray-200 rounded-xl w-full"></div>
        </div>
        
        <div className="border-t pt-6 space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          {[1, 2].map((i) => (
            <div key={i} className="bg-[#FDE2E4] p-4 rounded-xl space-y-2">
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/6"></div>
              </div>
              <div className="h-3 bg-gray-200 rounded w-1/5"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ProductDetail = ({ 
  product, 
  onClose, 
  onAddToCart,
  onBuyNow,
  reviews,
  onAddReview
}: { 
  product: any, 
  onClose: () => void, 
  onAddToCart: (product: any, quantity?: number, variants?: any) => void,
  onBuyNow: (product: any, quantity?: number, variants?: any) => void,
  reviews: any[],
  onAddReview: (review: any) => void
}) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : null);
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  
  const images = product.images || [product.image];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !comment.trim()) return;
    
    onAddReview({
      user: userName,
      rating,
      comment,
    });
    
    setComment('');
    setUserName('');
    setRating(5);
  };

  const avgRating = reviews && reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : Number(product.rating || 5).toFixed(1);
    
  const reviewCount = reviews && reviews.length > 0 ? reviews.length : (product.reviews || 0);

  return (
    <div className="fixed inset-0 bg-[#FDE2E4] z-[70] overflow-y-auto flex flex-col pb-20 md:pb-0">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center gap-3 z-40">
        <button onClick={onClose} className="p-2 -ml-2 bg-[#FDE2E4] rounded-full text-gray-600 hover:bg-gray-100">
          <ChevronRight className="w-5 h-5 rotate-180" />
        </button>
        <h2 className="font-bold text-lg flex-1 truncate">{product.name}</h2>
      </div>

      <div className="flex-1 w-full max-w-md mx-auto md:max-w-4xl md:p-8 md:flex md:gap-8 md:bg-white">
        
        {/* Left/Top: Image */}
        <div className="md:w-1/2 bg-white relative">
          {/* Mobile Image Viewer with Pinch-to-Zoom */}
          <div className="md:hidden relative aspect-[4/5] overflow-hidden group">
            <TransformWrapper
              initialScale={1}
              minScale={1}
              maxScale={4}
              centerOnInit
              wheel={{ disabled: true }}
              doubleClick={{ disabled: false }}
              panning={{ velocityDisabled: true }}
            >
              <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }} contentStyle={{ width: '100%', height: '100%' }}>
                <Image referrerPolicy="no-referrer" 
                  src={images[currentImageIdx]} 
                  alt={product.name} 
                  fill 
                  className="object-cover"
                />
              </TransformComponent>
            </TransformWrapper>

            {/* Overlays for Mobile */}
            <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 text-xs font-bold shadow-sm transition-opacity duration-200 pointer-events-none">
              <span>{avgRating}</span>
              <Star className="w-3 h-3 fill-gray-800 text-gray-800" />
              <span className="text-gray-400 mx-1">|</span>
              <span>16 sold</span>
            </div>

            <button 
              onClick={(e) => {
                 e.stopPropagation();
                 const target = e.currentTarget;
                 const icon = target.querySelector('svg');
                 if (icon) {
                    icon.setAttribute('fill', icon.getAttribute('fill') === 'currentColor' ? 'transparent' : 'currentColor');
                    icon.setAttribute('class', icon.getAttribute('fill') === 'currentColor' ? 'w-8 h-8 text-gray-900' : 'w-8 h-8 text-gray-800');
                 }
              }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-800 hover:scale-110 transition-all duration-200 z-10"
            >
               <Heart className="w-8 h-8" fill="transparent" strokeWidth={2} />
            </button>

            <button 
              onClick={(e) => e.stopPropagation()} 
              className="absolute bottom-4 right-4 bg-white/80 hover:bg-white backdrop-blur-sm px-3 py-1.5 rounded-md flex items-center gap-2 text-xs font-bold shadow-sm transition-all duration-200 z-10"
            >
              <LayoutGrid className="w-4 h-4" /> View Similar
            </button>

            {/* Dots */}
            {images.length > 1 && (
              <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-1.5 z-30 transition-opacity duration-200 pointer-events-none">
                {images.map((img: string, idx: number) => (
                  <div 
                    key={idx} 
                    className={`w-2 h-2 rounded-full transition-colors ${idx === currentImageIdx ? 'bg-[#e6e8ea] shadow-sm text-gray-900' : 'bg-white/50'}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Desktop Image Viewer with Zoom-on-Hover */}
          <div 
            className="hidden md:block relative aspect-[4/5] md:rounded-2xl overflow-hidden cursor-zoom-in group"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            <div 
              className="absolute inset-0 transition-transform duration-200 ease-out"
              style={{
                transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                transform: isZoomed ? 'scale(2.5)' : 'scale(1)'
              }}
            >
              <Image referrerPolicy="no-referrer" 
                src={images[currentImageIdx]} 
                alt={product.name} 
                fill 
                className="object-cover"
              />
            </div>
            
            {/* Magnifying Glass Icon (Desktop only) */}
            <div className={`absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm text-gray-700 pointer-events-none transition-opacity duration-300 hidden md:block ${isZoomed ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}>
              <Search className="w-5 h-5" />
            </div>

            {/* Overlays */}
            <div className={`absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 text-xs font-bold shadow-sm transition-opacity duration-200 ${isZoomed ? 'opacity-0' : 'opacity-100'}`}>
              <span>{avgRating}</span>
              <Star className="w-3 h-3 fill-gray-800 text-gray-800" />
              <span className="text-gray-400 mx-1">|</span>
              <span>16 sold</span>
            </div>

            <button 
              onClick={(e) => {
                 e.stopPropagation();
                 const target = e.currentTarget;
                 const icon = target.querySelector('svg');
                 if (icon) {
                    icon.setAttribute('fill', icon.getAttribute('fill') === 'currentColor' ? 'transparent' : 'currentColor');
                    icon.setAttribute('class', icon.getAttribute('fill') === 'currentColor' ? 'w-8 h-8 text-gray-900' : 'w-8 h-8 text-gray-800');
                 }
              }}
              className={`absolute bottom-4 left-1/2 -translate-x-1/2 text-gray-800 hover:scale-110 transition-all duration-200 ${isZoomed ? 'opacity-0' : 'opacity-100'}`}
            >
               <Heart className="w-8 h-8" fill="transparent" strokeWidth={2} />
            </button>

            <button 
              onClick={(e) => e.stopPropagation()} 
              className={`absolute bottom-4 right-4 bg-white/80 hover:bg-white backdrop-blur-sm px-3 py-1.5 rounded-md flex items-center gap-2 text-xs font-bold shadow-sm transition-all duration-200 ${isZoomed ? 'opacity-0' : 'opacity-100'}`}
            >
              <LayoutGrid className="w-4 h-4" /> View Similar
            </button>

            {/* Dots */}
            {images.length > 1 && (
              <div className={`absolute bottom-16 left-0 right-0 flex justify-center gap-1.5 z-30 transition-opacity duration-200 ${isZoomed ? 'opacity-0' : 'opacity-100'}`}>
                {images.map((img: string, idx: number) => (
                  <div 
                    key={idx} 
                    className={`w-2 h-2 rounded-full transition-colors ${idx === currentImageIdx ? 'bg-[#e6e8ea] shadow-sm text-gray-900' : 'bg-white/50'}`}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Desktop thumbnails */}
          {images.length > 1 && (
            <div className="hidden md:flex gap-2 overflow-x-auto scrollbar-hide py-4">
              {images.map((img: string, idx: number) => (
                <button 
                  key={idx} 
                  onClick={() => setCurrentImageIdx(idx)}
                  className={`relative w-20 h-24 shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${idx === currentImageIdx ? 'border-zinc-800' : 'border-transparent hover:border-gray-300'}`}
                >
                  <Image referrerPolicy="no-referrer" src={img} alt={`${product.name} thumbnail ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right/Bottom: Details */}
        <div className="md:w-1/2 flex flex-col gap-2 relative">
          
          {/* Title & Stats & Price */}
          <div className="p-4 bg-white md:rounded-2xl md:shadow-sm md:sticky md:top-16 z-20 border-b md:border-b-0 border-gray-100">
            <div className="flex justify-between items-start gap-4 mb-2">
              <h1 className="text-xl md:text-2xl font-medium text-gray-900 leading-tight">{product.name}</h1>
              <button 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: product.name, url: window.location.href }).catch(() => {});
                  }
                }}
                className="p-2 text-gray-500 hover:bg-[#FDE2E4] rounded-full shrink-0"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 border border-yellow-200 px-2 py-0.5 rounded-full font-bold">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{avgRating}/5</span>
              </div>
              <span className="text-gray-500 font-medium hover:underline cursor-pointer">({reviewCount} {reviewCount === 1 ? 'Review' : 'Reviews'})</span>
              <span className="w-px h-3 bg-gray-300"></span>
              <span>Sold 16</span>
              <span className="w-px h-3 bg-gray-300"></span>
              <span className="text-gray-900">In Stock</span>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-gray-800 font-bold text-2xl">৳{product.price}</span>
              <span className="text-base line-through text-gray-400">৳{product.oldPrice}</span>
              <span className="text-sm font-medium text-[#d97706]">({product.discount}% OFF)</span>
            </div>

            {/* Size */}
            {(product.sizes) && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-gray-900 text-lg">Select Size</span>
                  <button className="text-gray-800 font-medium text-sm bg-[#FDE2E4] px-2 py-1 rounded">Size Guide</button>
                </div>
                <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                  {product.sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[2.5rem] md:min-w-[3rem] h-8 md:h-10 px-2 md:px-3 text-sm md:text-base rounded border font-medium transition ${selectedSize === size ? 'border-zinc-800 text-gray-800' : 'border-gray-300 text-gray-700 hover:border-gray-400'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-4">
              <span className="font-bold text-gray-900 text-lg">Quantity</span>
              <div className="flex items-center border border-gray-300 rounded h-10">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-full flex items-center justify-center text-gray-600 hover:bg-[#FDE2E4]"
                >-</button>
                <span className="w-12 text-center font-medium border-x border-gray-300 h-full flex items-center justify-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-full flex items-center justify-center text-gray-600 hover:bg-[#FDE2E4]"
                >+</button>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex gap-4">
              <button 
                onClick={() => {
                  if (onBuyNow) {
                    onBuyNow(product, quantity, { size: selectedSize, color: selectedColor });
                  } else {
                    onAddToCart(product, quantity, { size: selectedSize, color: selectedColor }); 
                  }
                  setQuantity(1); 
                }}
                className="flex-1 bg-[#80091B] text-white border border-gray-200 font-bold rounded-lg h-12 flex items-center justify-center gap-2 hover:shadow-md transition-shadow"
              >
                <ShoppingBag className="w-5 h-5" /> Buy Now
              </button>
              <button 
                onClick={() => { onAddToCart(product, quantity, { size: selectedSize, color: selectedColor }); setQuantity(1); }}
                disabled={product.stock === 0}
                className={`flex-1 font-bold rounded-lg h-12 ${product.stock === 0 ? 'bg-gray-300 text-gray-500' : 'bg-gradient-to-r from-[#3b82f6] to-gray-100 text-black border border-[#FDE2E4] shadow-sm hover:shadow-md transition-shadow'}`}
              >
                <ShoppingCart className="w-5 h-5" /> {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          </div>

          {/* Policies & Shop */}
          <div className="p-4 bg-white flex justify-between items-start md:rounded-2xl md:shadow-sm">
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2"><RefreshCcw className="w-4 h-4" /> Return : 3 Days</div>
              <div className="flex items-center gap-2"><ArrowLeftRight className="w-4 h-4" /> Exchange : 3 Days</div>
              <div className="flex items-center gap-2"><Truck className="w-4 h-4" /> Delivery Time : 2 Days</div>
              <div className="flex items-center gap-2"><Banknote className="w-4 h-4" /> Payment : COD Available</div>
            </div>
            <div className="flex flex-col items-center gap-1 border border-gray-100 p-3 rounded-lg shadow-sm">
              <div className="flex items-center gap-2 text-gray-800 font-medium text-sm mb-1">
                <Store className="w-4 h-4" /> Shop
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-200 rounded-full overflow-hidden relative">
                  <Image referrerPolicy="no-referrer" src="https://picsum.photos/seed/shop/100/100" alt="Shop" fill className="object-cover" />
                </div>
                <span className="font-bold text-sm">Stylorix</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="p-4 bg-white md:rounded-2xl md:shadow-sm">
            <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm mb-4">
              <li><strong>Premium Quality:</strong> Meticulously crafted from the finest materials, ensuring a luxurious feel and lasting durability.</li>
              <li><strong>Elegant Design:</strong> Each piece features intricate detailing and a modern silhouette tailored to flatter every figure.</li>
              <li><strong>Comfort & Style:</strong> Designed for an active lifestyle without compromising on timeless elegance.</li>
            </ul>
            <button className="w-full bg-[#80091B] text-white border border-[#FDE2E4] shadow-sm py-2 rounded-full font-medium text-sm">See More</button>
          </div>

          {/* Ratings & Reviews */}
          <ProductReviews 
            reviews={reviews} 
            onAddReview={(review: any) => onAddReview?.(review)} 
            avgRating={avgRating} 
            reviewCount={reviewCount} 
            productName={product.name} 
          />

          {/* Similar Products */}
          <div className="p-4 bg-white md:rounded-2xl md:shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Similar Products</h3>
            <div className="grid grid-cols-2 gap-3">
              {products.slice(0, 4).map((p, i) => (
                 <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group">
                   <div className="relative aspect-[4/5] bg-[#FDE2E4]">
                     <Image referrerPolicy="no-referrer" src={p.image} alt={p.name} fill className="object-cover" />
                     <button className="absolute bottom-2 right-2 p-1.5 bg-white/80 rounded-full text-gray-800">
                       <Heart className="w-4 h-4" fill="transparent" />
                     </button>
                   </div>
                   <div className="p-2">
                     <h3 className="text-xs font-medium text-gray-800 line-clamp-1 mb-1">{p.name}</h3>
                     <div className="flex items-center gap-1">
                       <span className="text-gray-800 font-bold text-sm">৳{p.price}</span>
                       <span className="text-[10px] line-through text-gray-400">৳{p.oldPrice}</span>
                     </div>
                   </div>
                 </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 flex items-center gap-3 z-50 md:hidden">
        <button onClick={() => { onAddToCart(product, quantity, { size: selectedSize, color: selectedColor }); setQuantity(1); }} className="p-2 text-gray-600 hover:bg-[#FDE2E4] rounded-lg border border-[#ebeced] flex flex-col items-center justify-center w-12 h-12 shrink-0">
          <ShoppingCart className="w-5 h-5" />
        </button>
        <button onClick={() => window.open('mailto:shevalyofficial@gmail.com')} className="p-2 text-gray-600 hover:bg-[#FDE2E4] rounded-lg border border-[#ebeced] flex flex-col items-center justify-center w-12 h-12 shrink-0">
          <MessageCircle className="w-5 h-5" />
        </button>
        <button 
          onClick={() => {
            if (onBuyNow) {
              onBuyNow(product, quantity, { size: selectedSize, color: selectedColor });
            } else {
              onAddToCart(product, quantity, { size: selectedSize, color: selectedColor }); 
            }
            setQuantity(1); 
          }} 
          className="flex-1 bg-[#80091B] text-white border border-gray-200 font-bold rounded-lg h-12 flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-5 h-5" /> Buy Now
        </button>
        <button 
          onClick={() => { onAddToCart(product, quantity, { size: selectedSize, color: selectedColor }); setQuantity(1); }}
          disabled={product.stock === 0}
          className={`flex-1 font-bold rounded-lg h-12 ${product.stock === 0 ? 'bg-gray-300 text-gray-500' : 'bg-[#80091B] text-white border border-[#FDE2E4] shadow-sm'}`}
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

const ProductCard = ({ product, onProductClick, onAddToCart, onBuyNow, avgRating, reviewCount, isWishlisted, onToggleWishlist, hideActions = false, isFlashSale = false, reviews = {}, onAddReview }: any) => {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : null);
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : null);
  const images = product.images || [product.image];

  const handleDotClick = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation();
    setCurrentImageIdx(idx);
  };

  return (
    <>
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-md transition-all duration-300 grid grid-rows-[auto_1fr] relative hover:-translate-y-1 h-full">
        <div className="relative w-full aspect-[4/5] bg-[#FDE2E4] cursor-pointer overflow-hidden" onClick={() => onProductClick(product)}>
          <Image referrerPolicy="no-referrer" src={images[currentImageIdx]} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
          
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
            <button 
              onClick={(e) => { e.stopPropagation(); setIsQuickViewOpen(true); }}
              className="bg-white/90 backdrop-blur-sm text-gray-900 px-5 min-h-[44px] rounded-full font-bold text-sm flex items-center gap-2 hover:bg-[#5A0613] shadow-sm text-gray-900 hover:text-black transition-all shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300"
            >
              <Eye className="w-4 h-4" /> Quick View
            </button>
          </div>

          {product.stock === 0 ? (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-md z-30 uppercase tracking-wider shadow-sm">
              Out of Stock
            </div>
          ) : isFlashSale ? (
            <div className="absolute top-2 left-2 flex flex-col gap-1.5 z-30">
              <div className="bg-[#80091B] text-white border border-[#FDE2E4] shadow-sm text-[11px] font-black px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
                <Zap className="w-3 h-3 fill-black" /> -{product.discount}%
              </div>
              {product.stock <= 5 && (
                <div className="bg-[#e6e8ea] text-gray-900 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm uppercase tracking-wider">
                  Selling Fast
                </div>
              )}
            </div>
          ) : product.tags && product.tags.length > 0 ? (
            <div className="absolute top-2 left-2 flex flex-col gap-1.5 z-30">
              {product.tags.map((tag: string, idx: number) => (
                <div key={idx} className={`${tag.toLowerCase() === 'best seller' ? 'bg-amber-500' : tag.toLowerCase() === 'trending' ? 'bg-indigo-600' : 'bg-indigo-500'} text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-sm uppercase tracking-widest border border-white/20`}>
                  {tag}
                </div>
              ))}
            </div>
          ) : null}

          <button className="absolute top-2 right-2 w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full text-gray-800 hover:bg-white hover:scale-110 transition-all shadow-sm z-30" onClick={(e) => { e.stopPropagation(); onToggleWishlist(product); }}>
            <Heart className="w-4 h-4 md:w-5 md:h-5" fill={isWishlisted ? "#d4d4d8" : "transparent"} strokeWidth={2} />
          </button>
          {images.length > 1 && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-center items-center z-30">
              {images.map((_: any, idx: number) => (
                <div 
                  key={idx} 
                  onClick={(e) => handleDotClick(e, idx)}
                  className="p-2 cursor-pointer"
                >
                  <div className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIdx ? 'bg-[#e6e8ea] shadow-sm text-gray-900 w-3' : 'bg-white/70 hover:bg-white w-1.5'}`}></div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="p-3 flex flex-col h-full">
          <h3 className="text-sm font-bold text-gray-800 line-clamp-1 mb-1.5 cursor-pointer hover:text-gray-800 transition-colors" onClick={() => onProductClick(product)}>{product.name}</h3>
          {avgRating !== undefined && avgRating !== null && (
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-0.5 bg-yellow-50 text-yellow-700 border border-yellow-200 px-1.5 py-0.5 rounded-full">
                <Star className="w-3 h-3 md:w-3.5 md:h-3.5 fill-yellow-400 text-yellow-400" />
                <span className="text-[10px] md:text-[11px] font-bold leading-none">{Number(avgRating).toFixed(1)}/5</span>
              </div>
              <span className="text-[10px] md:text-xs text-gray-400 font-medium">({reviewCount})</span>
            </div>
          )}
          <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mb-2">
            <span className="text-gray-800 font-black text-base md:text-lg">৳{product.price}</span>
            <span className="text-xs font-medium line-through text-gray-400">৳{product.oldPrice}</span>
            {!isFlashSale && (
              <span className="text-[10px] md:text-xs font-bold text-white bg-[#80091B] px-1.5 py-0.5 rounded-md">-{product.discount}%</span>
            )}
          </div>

          <div className="text-[11px] text-[#d97706] font-medium flex items-center gap-1 mb-3">
             <Truck className="w-3.5 h-3.5" />
             Delivery in {product.deliveryDays || (product.name.length % 5) + 1} {((product.deliveryDays || (product.name.length % 5) + 1)) === 1 ? 'day' : 'days'}
          </div>

          {isFlashSale ? (
            <div className="mb-3 space-y-1.5">
              <div className="flex justify-between items-center text-[10px] md:text-xs font-bold">
                <span className="text-gray-800 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {product.stock <= 5 ? `Only ${product.stock} left!` : `${product.stock} available`}
                </span>
                <span className="text-gray-500">{Math.floor((product.stock / (product.stock + 15)) * 100)}% Sold</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-gray-300 to-gray-100 h-1.5 rounded-full" 
                  style={{ width: `${Math.floor((product.stock / (product.stock + 15)) * 100)}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="mb-3">
              {product.stock > 0 ? (
                product.stock <= 5 ? (
                  <span className="text-[10px] md:text-xs font-bold text-white bg-[#80091B] px-2 py-1 rounded-md flex items-center gap-1 w-fit">
                    <Clock className="w-3 h-3" /> Only {product.stock} left!
                  </span>
                ) : (
                  <span className="text-[10px] md:text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                    In Stock ({product.stock})
                  </span>
                )
              ) : (
                <span className="text-[10px] md:text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-md">
                  Out of Stock
                </span>
              )}
            </div>
          )}
          
          {!hideActions && (product.sizes || product.colors) && (
            <div className="mb-3 space-y-2">
              {product.sizes && (
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
                  {product.sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={(e) => { e.stopPropagation(); setSelectedSize(size); }}
                      className={`shrink-0 text-[10px] md:text-xs font-bold min-w-[28px] min-h-[28px] md:min-w-[32px] md:min-h-[32px] flex items-center justify-center px-1.5 md:px-2 rounded-md border transition-colors ${selectedSize === size ? 'border-zinc-800 bg-[#80091B] text-white border border-[#FDE2E4] shadow-sm' : 'border-[#ebeced] text-gray-600 hover:border-gray-300 hover:bg-[#FDE2E4]'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              )}
              {product.colors && (
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
                  {product.colors.map((color: string) => (
                    <button
                      key={color}
                      onClick={(e) => { e.stopPropagation(); setSelectedColor(color); }}
                      className={`shrink-0 text-[10px] md:text-xs font-bold min-w-[28px] min-h-[28px] md:min-w-[32px] md:min-h-[32px] flex items-center justify-center px-1.5 md:px-2 rounded-md border transition-colors ${selectedColor === color ? 'border-zinc-800 bg-[#80091B] text-white border border-[#FDE2E4] shadow-sm' : 'border-[#ebeced] text-gray-600 hover:border-gray-300 hover:bg-[#FDE2E4]'}`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {!hideActions && (
            <div className="mt-auto pt-3 grid grid-cols-1 2xl:grid-cols-2 gap-2 w-full">
              {product.stock === 0 ? (
                <button 
                  disabled
                  className="2xl:col-span-2 w-full text-xs md:text-sm min-h-[44px] rounded-md font-bold transition-all shadow-sm bg-gray-100 text-gray-400 cursor-not-allowed"
                >
                  Out of Stock
                </button>
              ) : (
                <>
                  {!isFlashSale && (
                    <div className="2xl:col-span-2 flex items-center justify-between border border-[#ebeced] rounded-md overflow-hidden bg-[#FDE2E4] h-10 w-full mb-1">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setQuantity(Math.max(1, quantity - 1)); }}
                        className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 text-gray-700 font-bold transition-colors"
                      >-</button>
                      <span className="text-xs font-bold px-2">{quantity}</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setQuantity(quantity + 1); }}
                        className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 text-gray-700 font-bold transition-colors"
                      >+</button>
                    </div>
                  )}
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      onAddToCart(product, quantity, { size: selectedSize, color: selectedColor }); 
                      setQuantity(1); 
                    }}
                    className={`text-xs md:text-sm min-h-[40px] 2xl:min-h-[44px] rounded-md font-bold transition-all shadow-sm bg-[#80091B] text-white border border-[#FDE2E4] hover:bg-[#5A0613] hover:shadow-md ${isFlashSale ? '2xl:col-span-2' : ''}`}
                  >
                    Add to Cart
                  </button>
                  <button 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      if (onBuyNow) {
                        onBuyNow(product, quantity, { size: selectedSize, color: selectedColor });
                      } else {
                        onAddToCart(product, quantity, { size: selectedSize, color: selectedColor }); 
                      }
                      setQuantity(1); 
                    }}
                    className={`text-xs md:text-sm min-h-[40px] 2xl:min-h-[44px] rounded-md font-bold transition-all shadow-sm bg-gray-900 text-white border border-gray-800 hover:bg-black hover:shadow-md ${isFlashSale ? '2xl:col-span-2' : ''}`}
                  >
                    Buy Now
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {isQuickViewOpen && (
        <div className="fixed inset-0 bg-white z-[100] overflow-y-auto animate-in fade-in duration-300" onClick={e => e.stopPropagation()}>
          <button 
            onClick={() => setIsQuickViewOpen(false)} 
            className="fixed top-4 right-4 md:top-8 md:right-8 p-3 bg-white/80 backdrop-blur-md rounded-full hover:bg-gray-100 hover:rotate-90 z-[110] transition-all shadow-md border border-gray-100"
          >
            <X className="w-6 h-6 text-gray-700" />
          </button>
          
          <div className="max-w-7xl mx-auto w-full min-h-screen flex flex-col pt-16 md:pt-24 pb-16">
            {/* Top Section: Images and Details */}
            <div className="flex flex-col lg:flex-row px-4 md:px-8 gap-12">
              {/* Left: Images */}
              <div className="lg:w-1/2 flex flex-col-reverse md:flex-row gap-4 h-fit lg:sticky lg:top-24">
                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex md:flex-col gap-3 w-full md:w-24 shrink-0 overflow-x-auto md:overflow-y-auto scrollbar-hide max-h-[600px]">
                    {images.map((img: string, idx: number) => (
                      <button 
                        key={idx} 
                        onClick={() => setCurrentImageIdx(idx)}
                        className={`relative w-20 md:w-full aspect-[4/5] shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300 ${idx === currentImageIdx ? 'border-zinc-800 ring-4 ring-zinc-50' : 'border-transparent hover:border-gray-300 opacity-70 hover:opacity-100'}`}
                      >
                        <Image referrerPolicy="no-referrer" src={img} alt={`${product.name} thumbnail ${idx + 1}`} fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
                {/* Main Image */}
                <div className="relative flex-1 aspect-[4/5] bg-[#FDE2E4] rounded-2xl overflow-hidden shadow-sm group">
                  <Image referrerPolicy="no-referrer" src={images[currentImageIdx]} alt={product.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
              </div>
              
              {/* Right: Details */}
              <div className="lg:w-1/2 flex flex-col">
                <div className="inline-block bg-[#FDE2E4] text-gray-800 font-bold px-3 py-1 rounded-full text-xs mb-4 w-fit uppercase tracking-wider">
                  {product.category || 'General'}
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">{product.name}</h2>
                
                {/* Rating, Sold, Stock, Share */}
                <div className="flex items-center flex-wrap gap-4 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-100">
                  <div className="flex items-center text-gray-800 bg-[#FDE2E4] px-3 py-1.5 rounded-full">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-gray-800 ml-1.5 font-bold">{Number(avgRating || 5).toFixed(1)}</span>
                    <span className="text-gray-500 ml-1 font-medium">({reviewCount} {reviewCount === 1 ? 'Review' : 'Reviews'})</span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span className="font-medium text-gray-700 flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500"/> Sold 7</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span className="font-medium text-gray-700 flex items-center gap-1.5"><Store className="w-4 h-4 text-gray-700"/> Stock 993</span>
                  <div className="ml-auto">
                    <button 
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({ title: product.name, url: window.location.href }).catch(() => {});
                        }
                      }}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-2 text-gray-700 font-medium"
                    >
                      <Share2 className="w-5 h-5" /> <span className="hidden sm:inline">Share</span>
                    </button>
                  </div>
                </div>
                
                {/* Price */}
                <div className="flex items-end gap-4 mb-8">
                  <span className="text-gray-800 font-black text-5xl tracking-tight">৳{product.price}</span>
                  <div className="flex flex-col pb-1">
                    <span className="text-xl font-medium line-through text-gray-400">৳{product.oldPrice}</span>
                    <span className="text-sm font-bold text-white bg-[#80091B] px-2 py-0.5 rounded-md">Save {product.discount}%</span>
                  </div>
                </div>

                {/* Variants (Size & Color) */}
                {(product.sizes || product.colors) && (
                  <div className="mb-8 space-y-6">
                    {product.sizes && (
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-bold text-gray-900">Size</span>
                          <button className="text-gray-800 text-sm font-medium hover:underline">Size Guide</button>
                        </div>
                        <div className="flex flex-wrap gap-2 md:gap-3">
                          {product.sizes.map((size: string) => (
                            <button
                              key={size}
                              onClick={() => setSelectedSize(size)}
                              className={`min-w-[36px] md:min-w-[48px] h-10 md:h-12 flex items-center justify-center px-3 md:px-4 text-sm md:text-base rounded-xl border-2 font-bold transition-all ${selectedSize === size ? 'border-zinc-800 bg-[#FDE2E4] text-gray-800' : 'border-[#ebeced] text-gray-700 hover:border-gray-300 hover:bg-[#FDE2E4]'}`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {product.colors && (
                      <div>
                        <span className="font-bold text-gray-900 block mb-3">Color: <span className="text-gray-600 font-medium ml-1">{selectedColor}</span></span>
                        <div className="flex flex-wrap gap-2 md:gap-3">
                          {product.colors.map((color: string) => (
                            <button
                              key={color}
                              onClick={() => setSelectedColor(color)}
                              className={`min-w-[36px] md:min-w-[48px] h-10 md:h-12 flex items-center justify-center px-3 md:px-4 text-sm md:text-base rounded-xl border-2 font-bold transition-all ${selectedColor === color ? 'border-zinc-800 bg-[#FDE2E4] text-gray-800' : 'border-[#ebeced] text-gray-700 hover:border-gray-300 hover:bg-[#FDE2E4]'}`}
                            >
                              {color}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Quantity */}
                <div className="flex items-center gap-6 mb-8 bg-[#FDE2E4] p-4 rounded-2xl border border-gray-100">
                  <span className="font-bold text-gray-900">Quantity</span>
                  <div className="flex items-center bg-white border border-[#ebeced] rounded-xl overflow-hidden h-12 shadow-sm">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 h-full hover:bg-[#FDE2E4] text-gray-600 font-medium transition-colors text-lg"
                    >-</button>
                    <span className="w-14 text-center font-bold text-lg border-x border-gray-100 h-full flex items-center justify-center">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 h-full hover:bg-[#FDE2E4] text-gray-600 font-medium transition-colors text-lg"
                    >+</button>
                  </div>
                </div>
                
                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
                  <button 
                    onClick={() => {
                      if (onBuyNow) {
                        onBuyNow(product, quantity, { size: selectedSize, color: selectedColor });
                      } else {
                        onAddToCart(product, quantity, { size: selectedSize, color: selectedColor }); 
                      }
                      setQuantity(1); 
                      setIsQuickViewOpen(false); 
                    }}
                    className="w-full sm:flex-1 bg-[#80091B] text-white border border-gray-200 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-[#e6e8ea]/50 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5">
                    <ShoppingBag className="w-6 h-6" /> Buy Now
                  </button>
                  <button 
                    onClick={() => { 
                      onAddToCart(product, quantity, { size: selectedSize, color: selectedColor }); 
                      setQuantity(1); 
                      setIsQuickViewOpen(false); 
                    }}
                    className="w-full sm:flex-1 bg-gradient-to-r from-[#3b82f6] to-gray-100 text-black py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-zinc-500/30 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                  >
                    <ShoppingCart className="w-6 h-6" /> Add to Cart
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onToggleWishlist(product); }}
                    className="p-4 bg-[#FDE2E4] text-gray-800 rounded-xl hover:bg-[#80091B] hover:text-white transition-colors border border-[#FDE2E4]"
                  >
                    <Heart className="w-7 h-7" fill={isWishlisted ? "#d4d4d8" : "transparent"} strokeWidth={2} />
                  </button>
                </div>
                
                {/* Shipping & Shop Info */}
                <div className="flex flex-col sm:flex-row justify-between items-stretch gap-4 bg-[#FDE2E4] p-6 rounded-2xl border border-gray-100">
                  <div className="text-sm text-gray-700 space-y-3 font-medium flex-1">
                    <div className="flex items-center gap-3"><RefreshCcw className="w-5 h-5 text-gray-800" /> Return : 3 Days</div>
                    <div className="flex items-center gap-3"><ArrowLeftRight className="w-5 h-5 text-gray-800" /> Exchange : 3 Days</div>
                    <div className="flex items-center gap-3"><Truck className="w-5 h-5 text-gray-800" /> Delivery Time : 2 Days</div>
                    <div className="flex items-center gap-3"><Banknote className="w-5 h-5 text-gray-800" /> Payment : COD Available</div>
                  </div>
                  <div className="bg-white border border-[#ebeced] rounded-xl p-5 flex flex-col items-center justify-center gap-2 min-w-[160px] shadow-sm">
                    <div className="w-12 h-12 bg-[#FDE2E4] rounded-full flex items-center justify-center mb-1">
                      <Store className="w-6 h-6 text-gray-800" />
                    </div>
                    <span className="text-xs font-bold text-gray-800 uppercase tracking-wider">Shop</span>
                    <span className="text-base font-bold text-gray-900 text-center">Oitrimart BD</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Middle Section: Tabs & Content */}
            <div className="px-4 md:px-8 mt-16">
              <div className="flex gap-8 border-b border-[#ebeced] mb-8">
                <button className="pb-4 border-b-2 border-zinc-800 font-bold text-gray-800 text-lg">Description</button>
                <button className="pb-4 font-medium text-gray-500 flex items-center gap-2 hover:text-gray-900 transition-colors text-lg">
                  Product Reviews <span className="bg-[#80091B] text-white text-xs px-2 py-0.5 rounded-full font-bold">4</span>
                </button>
              </div>
              
              <div className="flex flex-col lg:flex-row gap-12">
                {/* Left: Description Content */}
                <div className="lg:w-1/2">
                  <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Product Specifications</h3>
                    <ul className="space-y-4 text-gray-700 font-medium">
                      <li className="flex items-start gap-3 pb-4 border-b border-gray-50"><span className="w-40 shrink-0 text-gray-500">Grade</span> <span className="font-bold text-gray-900">A grade</span></li>
                      <li className="flex items-start gap-3 pb-4 border-b border-gray-50"><span className="w-40 shrink-0 text-gray-500">Type of Glasses</span> <span className="font-bold text-gray-900">UV protected</span></li>
                      <li className="flex items-start gap-3 pb-4 border-b border-gray-50"><span className="w-40 shrink-0 text-gray-500">Gender</span> <span className="font-bold text-gray-900">Unisex</span></li>
                      <li className="flex items-start gap-3 pb-4 border-b border-gray-50"><span className="w-40 shrink-0 text-gray-500">Material</span> <span className="font-bold text-gray-900">Polycarbonate</span></li>
                      <li className="flex items-start gap-3"><span className="w-40 shrink-0 text-gray-500">Prescription</span> <span className="font-bold text-gray-900">Yes</span></li>
                    </ul>
                  </div>
                </div>
                
                {/* Right: Rating & Reviews */}
                <div className="lg:w-1/2">
                  <ProductReviews 
                    reviews={reviews} 
                    onAddReview={(review: any) => onAddReview?.(review)} 
                    avgRating={avgRating} 
                    reviewCount={reviewCount} 
                    productName={product.name} 
                  />
                </div>
              </div>
            </div>
            
            {/* Bottom Section: Related Products Carousel */}
            <div className="px-4 md:px-8 mt-16 pt-12 border-t border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-gray-900">Related Products</h3>
                <button onClick={() => { document.getElementById('product-section')?.scrollIntoView({ behavior: 'smooth' }) }} className="text-gray-800 font-bold hover:underline">View All</button>
              </div>
              <div className="flex overflow-x-auto scrollbar-hide gap-4 md:gap-6 pb-4 -mx-4 px-4 md:mx-0 md:px-0">
                {products.filter(p => p.category === product.category && p.name !== product.name).slice(0, 8).map(similarProduct => (
                  <div key={similarProduct.name} className="min-w-[200px] md:min-w-[240px] bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col relative shrink-0">
                    <div className="relative aspect-[4/5] bg-[#FDE2E4] cursor-pointer" onClick={() => {
                      setIsQuickViewOpen(false);
                      setTimeout(() => onProductClick(similarProduct), 300);
                    }}>
                      <Image referrerPolicy="no-referrer" src={similarProduct.image} alt={similarProduct.name} fill className="object-cover group-hover:scale-105 transition duration-700" />
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="text-sm font-bold text-gray-800 line-clamp-2 mb-2 group-hover:text-gray-800 transition-colors cursor-pointer" onClick={() => {
                        setIsQuickViewOpen(false);
                        setTimeout(() => onProductClick(similarProduct), 300);
                      }}>{similarProduct.name}</h3>
                      <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mt-auto">
                        <span className="text-gray-800 font-black text-lg">৳{similarProduct.price}</span>
                        <span className="text-xs font-medium line-through text-gray-400">৳{similarProduct.oldPrice}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const FlashSale = ({ products, onProductClick, onAddToCart, onBuyNow, wishlist, onToggleWishlist, reviews, onAddReview }: any) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 34, seconds: 56 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashProducts = products
    .filter((p: any) => p.stock > 0)
    .slice(0, 5)
    .map((p: any, index: number) => ({
      ...p,
      discount: p.discount + 15,
      price: Math.floor(p.price * 0.85),
      stock: index === 1 ? 3 : index === 3 ? 5 : p.stock
    }));

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-sm border border-[#FDE2E4] bg-gradient-to-br from-zinc-50 via-white to-zinc-100 my-8 md:my-12">
      <div className="relative p-6 md:p-8 space-y-6 md:space-y-8">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="bg-[#e6e8ea] shadow-sm text-gray-900 p-2.5 rounded-xl shadow-md shadow-zinc-200">
                <Zap className="w-6 h-6 md:w-8 md:h-8 text-black fill-black" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                Flash Sale
              </h2>
            </div>
            <p className="text-gray-600 font-medium ml-1">Limited time deals</p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Timer */}
            <div className="flex items-center gap-3 bg-white border border-[#FDE2E4] px-5 py-3 rounded-2xl w-fit shadow-sm">
              <Timer className="w-5 h-5 text-gray-800 animate-pulse" />
              <span className="text-sm font-bold text-gray-700 uppercase tracking-wider">Ends in</span>
              <div className="flex items-center gap-1.5 text-black font-black text-lg">
                <span className="bg-[#e6e8ea] shadow-sm text-gray-900 px-2.5 py-1 rounded-lg min-w-[40px] text-center shadow-sm">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-gray-800 animate-pulse">:</span>
                <span className="bg-[#e6e8ea] shadow-sm text-gray-900 px-2.5 py-1 rounded-lg min-w-[40px] text-center shadow-sm">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-gray-800 animate-pulse">:</span>
                <span className="bg-[#e6e8ea] shadow-sm text-gray-900 px-2.5 py-1 rounded-lg min-w-[40px] text-center shadow-sm">{String(timeLeft.seconds).padStart(2, '0')}</span>
              </div>
            </div>
            
            <button onClick={() => { document.getElementById('product-section')?.scrollIntoView({ behavior: 'smooth' }) }} className="hidden md:flex items-center gap-2 text-gray-800 bg-white hover:bg-[#FDE2E4] px-4 py-2.5 rounded-xl transition-colors font-bold text-sm border border-[#ebeced] shadow-sm">
              Shop All Deals <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex md:grid md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 overflow-x-auto scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0 pb-4">
          {flashProducts.map((product: any, i: number) => (
            <div key={i} className="min-w-[260px] md:min-w-0 transform transition-transform duration-300 hover:-translate-y-2">
              <ProductCard 
                product={product}
                onProductClick={onProductClick}
                onAddToCart={onAddToCart}
                onBuyNow={onBuyNow}
                avgRating={product.rating}
                reviewCount={product.reviews}
                isWishlisted={wishlist.some((item: any) => item.name === product.name)}
                onToggleWishlist={onToggleWishlist}
                hideActions={true}
                isFlashSale={true}
                reviews={reviews}
                onAddReview={onAddReview}
              />
            </div>
          ))}
        </div>

        {/* Mobile Shop All Deals Button */}
        <div className="md:hidden flex justify-center mt-4">
          <button onClick={() => { document.getElementById('product-section')?.scrollIntoView({ behavior: 'smooth' }) }} className="flex items-center gap-2 text-gray-800 bg-white hover:bg-[#FDE2E4] px-6 py-3 rounded-xl transition-colors font-bold text-sm border border-[#ebeced] w-full justify-center shadow-sm">
            Shop All Deals <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductSection = ({ 
  onAddToCart, 
  onBuyNow,
  onProductClick, 
  reviews, 
  wishlist, 
  onToggleWishlist, 
  onAddReview,
  isLoading,
  searchQuery,
  filters
}: { 
  onAddToCart: (product: any) => void, 
  onBuyNow: (product: any) => void,
  onProductClick: (product: any) => void, 
  reviews: Record<string, any[]>, 
  wishlist: any[], 
  onToggleWishlist: (product: any) => void,
  onAddReview: (review: any) => void,
  isLoading?: boolean,
  searchQuery: string,
  filters: { category: string, maxPrice: number, minRating: number }
}) => {
  const [activeTab, setActiveTab] = useState('For You');
  const [sortBy, setSortBy] = useState('relevance');
  const tabs = ['For You', 'Topwear', 'Bottomwear', 'Footwear', 'Grooming', 'Accessories'];

  const getProductRating = (product: any) => {
    const productReviews = reviews[product.name] || [];
    return productReviews.length > 0 
      ? productReviews.reduce((acc, r) => acc + r.rating, 0) / productReviews.length
      : (product.rating || 0);
  };

  const filteredProducts = products.filter(product => {
    // Tab filter (ignore if there is a search query)
    if (!searchQuery && activeTab !== 'For You' && product.category !== activeTab) return false;
    
    // Search query filter
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) && !product.category.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    // Category filter from modal
    if (!searchQuery && filters.category !== 'All' && product.category !== filters.category) return false;
    
    // Price filter
    if (product.price > filters.maxPrice) return false;
    
    // Rating filter
    const avgRating = getProductRating(product);
      
    if (filters.minRating > 0 && avgRating < filters.minRating) return false;
    
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return getProductRating(b) - getProductRating(a);
    if (sortBy === 'delivery-fastest') {
      const deliveryA = (a as any).deliveryDays || (a.name.length % 5) + 1;
      const deliveryB = (b as any).deliveryDays || (b.name.length % 5) + 1;
      return deliveryA - deliveryB;
    }
    return 0; // relevance
  });

  return (
    <div className="space-y-4 md:space-y-8">
      <div className="sticky top-[56px] md:top-16 z-40 bg-[#e8e5df] -mx-4 px-4 sm:mx-0 sm:px-6 py-2 md:py-3 md:rounded-full flex flex-col md:flex-row items-center gap-3 shadow-sm">
        <div className="flex overflow-x-auto scrollbar-hide flex-1 justify-start md:justify-center gap-2 md:gap-4 w-full">
          {tabs.map((tab, i) => (
            <button 
              key={i} 
              onClick={() => setActiveTab(tab)}
              className={`px-5 md:px-8 py-1.5 md:py-2.5 rounded-full whitespace-nowrap text-sm md:text-base font-bold transition-all duration-300 ${
                activeTab === tab 
                  ? 'bg-[#e2dfd9] text-gray-900 shadow-inner' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="w-full md:w-auto flex justify-end">
          <select 
            className="md:w-36 px-3 py-1.5 md:py-2 rounded-full text-sm font-medium border border-[#ebeced] bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e6e8ea]"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="relevance">Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="delivery-fastest">Fastest Delivery</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 -mx-4 px-4 sm:mx-0 sm:px-0">
        {isLoading ? (
          Array.from({ length: 12 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))
        ) : sortedProducts.length > 0 ? (
          sortedProducts.map((product, i) => {
            const productReviews = reviews[product.name] || [];
            const avgRating = productReviews.length > 0 
              ? (productReviews.reduce((acc, r) => acc + r.rating, 0) / productReviews.length).toFixed(1)
              : product.rating;
            const reviewCount = productReviews.length > 0 ? productReviews.length : product.reviews;

            const isWishlisted = wishlist.some(item => item.name === product.name);

            return (
              <ProductCard 
                key={i}
                product={product}
                onProductClick={onProductClick}
                onAddToCart={onAddToCart}
                onBuyNow={onBuyNow}
                avgRating={avgRating}
                reviewCount={reviewCount}
                isWishlisted={isWishlisted}
                onToggleWishlist={onToggleWishlist}
                reviews={reviews}
                onAddReview={onAddReview}
              />
            );
          })
        ) : (
          <div className="col-span-full py-12 text-center text-gray-500">
            <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-bold text-gray-900 mb-1">No products found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};



const MobileCategoryMenu = ({ isOpen, onClose, onCategoryClick }: { isOpen: boolean, onClose: () => void, onCategoryClick: (category: string) => void }) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [expandedSubcategories, setExpandedSubcategories] = useState<string[]>([]);

  const toggleCategory = (name: string) => {
    setExpandedCategories(prev => 
      prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]
    );
  };

  const toggleSubcategory = (name: string) => {
    setExpandedSubcategories(prev => 
      prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]
    );
  };

  return (
    <div 
      className={`fixed inset-0 z-[60] flex md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50" />
      
      <div 
        className={`relative flex flex-col w-[85%] max-w-sm h-full bg-white shadow-xl transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold text-gray-900">Categories</h2>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto flex flex-col">
        <div className="flex-1">
          {hierarchicalCategories.map((category, idx) => (
            <div key={idx} className="border-b border-gray-100">
              <button 
                className="w-full flex items-center justify-between p-4 text-left hover:bg-[#80091B] hover:text-white transition-colors duration-200"
                onClick={() => toggleCategory(category.name)}
              >
                <span className="font-bold text-gray-900">{category.name}</span>
                <ChevronDown className={`w-5 h-5 text-gray-900 transition-transform duration-300 ease-in-out ${expandedCategories.includes(category.name) ? 'rotate-180' : ''}`} />
              </button>
              
              {expandedCategories.includes(category.name) && (
                <div className="bg-[#FDE2E4] px-4 py-4 space-y-2">
                  {category.subcategories.map((sub, subIdx) => (
                    <div key={subIdx} className="bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-sm transition-shadow duration-200">
                      <button 
                        className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 transition-colors duration-200"
                        onClick={() => toggleSubcategory(sub.name)}
                      >
                        <span className="font-medium text-gray-800 text-sm">{sub.name}</span>
                        <ChevronDown className={`w-4 h-4 text-gray-800 transition-transform duration-300 ease-in-out ${expandedSubcategories.includes(sub.name) ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {expandedSubcategories.includes(sub.name) && (
                        <div className="px-3 pb-3 pt-1 grid grid-cols-2 gap-2">
                          {sub.items.map((item, itemIdx) => (
                            <button key={itemIdx} onClick={() => { onCategoryClick(item); onClose(); }} className="text-xs text-gray-600 hover:text-gray-800 py-1.5 flex items-center gap-1 w-full text-left">
                              <ChevronRight className="w-3 h-3" />
                              {item}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-[#FDE2E4]/30 p-4 space-y-3 mt-auto border-t border-[#FDE2E4]">
          <button onClick={() => { onClose(); document.getElementById('product-section')?.scrollIntoView({ behavior: 'smooth' }); }} className="w-full flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-[#FDE2E4] hover:border-zinc-800 hover:shadow-sm transition-all group">
            <div className="flex items-center gap-3">
              <Headphones className="w-5 h-5 text-gray-800" />
              <span className="font-medium text-gray-800">Shevaly Helpline</span>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-800" />
          </button>
          
          <a href="mailto:shevalyofficial@gmail.com" className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-[#FDE2E4] hover:border-zinc-800 hover:shadow-sm transition-all group">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-800" />
              <span className="font-medium text-gray-800">shevalyofficial@gmail.com</span>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-800" />
          </a>
          
          <a href="tel:+8809611806424" className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-[#FDE2E4] hover:border-zinc-800 hover:shadow-sm transition-all group">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-800" />
              <span className="font-medium text-gray-800">+8809611806424</span>
            </div>
          </a>
          
          <button onClick={() => { onClose(); document.getElementById('product-section')?.scrollIntoView({ behavior: 'smooth' }); }} className="w-full flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-[#FDE2E4] hover:border-zinc-800 hover:shadow-sm transition-all group">
            <div className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5 text-gray-800" fill="#80091B" />
              <span className="font-medium text-gray-800">01907104920</span>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-800" />
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

const BottomNav = ({ cartCount, onCategoryClick, onOpenCart, onOpenProfile }: { cartCount: number, onCategoryClick: () => void, onOpenCart: () => void, onOpenProfile: () => void }) => (
  <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#f8f9fa] border-t border-[#ebeced] rounded-t-3xl px-6 py-3 flex justify-between items-center z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
    <div className="flex flex-col items-center text-gray-800 cursor-pointer group">
      <HomeIcon className="w-6 h-6 mb-1 stroke-[2.5px] group-hover:scale-110 transition-transform" />
      <span className="text-[11px] font-bold">Home</span>
    </div>
    <div className="flex flex-col items-center text-[#64748b] hover:text-gray-800 transition-colors cursor-pointer group" onClick={onCategoryClick}>
      <LayoutGrid className="w-6 h-6 mb-1 stroke-[2px] group-hover:scale-110 transition-transform" />
      <span className="text-[11px] font-medium">Category</span>
    </div>
    <div className="flex flex-col items-center text-[#64748b] hover:text-gray-800 transition-colors relative cursor-pointer group" onClick={onOpenCart}>
      <ShoppingCart className="w-6 h-6 mb-1 stroke-[2px] group-hover:scale-110 transition-transform" />
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-2 bg-[#80091B] text-white border border-[#FDE2E4] shadow-sm text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
          {cartCount}
        </span>
      )}
      <span className="text-[11px] font-medium">Cart</span>
    </div>
    <div className="flex flex-col items-center text-[#64748b] hover:text-gray-800 transition-colors cursor-pointer group" onClick={onOpenProfile}>
      <User className="w-6 h-6 mb-1 stroke-[2px] group-hover:scale-110 transition-transform" />
      <span className="text-[11px] font-medium">Profile</span>
    </div>
  </div>
);

const BecomeSellerModal = ({ isOpen, onClose, onComplete }: { isOpen: boolean, onClose: () => void, onComplete: () => void }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: 'individual',
    address: '',
    nidNumber: '',
    bankName: '',
    accountNumber: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(5);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-6">
      {[1, 2, 3, 4].map((s, i) => (
        <div key={s} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= s ? 'bg-[#80091B] text-white border border-[#FDE2E4] shadow-sm shadow-md' : 'bg-gray-100 text-gray-400'}`}>
            {s}
          </div>
          {i < 3 && (
            <div className={`w-10 sm:w-16 h-1 mx-1 transition-colors ${step > s ? 'bg-[#e6e8ea] shadow-sm text-gray-900' : 'bg-gray-100'}`} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-[80] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative">
        <div className="flex justify-between items-center p-4 border-b bg-[#FDE2E4]">
          <h2 className="font-bold text-lg text-gray-800">Become a Shevaly Seller</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-200 rounded-full transition text-gray-500"><X className="w-5 h-5"/></button>
        </div>
        
        <div className="p-6 md:p-8">
          {step > 1 && step < 5 && renderStepIndicator()}

          {step === 1 && (
            <div className="text-center space-y-5">
              <div className="w-20 h-20 bg-[#FDE2E4] text-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Store className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Start Selling on Shevaly</h3>
              <p className="text-gray-500 text-sm md:text-base px-4">
                Join thousands of sellers and reach millions of customers across Bangladesh. Grow your business with our powerful platform.
              </p>
              
              <div className="grid grid-cols-2 gap-4 text-left mt-6 mb-8">
                <div className="bg-[#FDE2E4] p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div className="font-bold text-gray-800 text-xl mb-1">0%</div>
                  <div className="text-xs text-gray-600 font-medium">Commission for first 30 days</div>
                </div>
                <div className="bg-[#FDE2E4] p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div className="font-bold text-gray-800 text-xl mb-1">24/7</div>
                  <div className="text-xs text-gray-600 font-medium">Dedicated Seller Support</div>
                </div>
              </div>

              <button onClick={() => setStep(2)} className="w-full bg-[#80091B] text-white border border-[#FDE2E4] shadow-sm py-3.5 rounded-xl font-bold hover:bg-[#5A0613] hover:shadow-lg transition shadow-md text-lg">
                Register Now
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Business Information</h3>
                <p className="text-sm text-gray-500">Tell us about your shop</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Name / Shop Name <span className="text-red-500">*</span></label>
                <input required type="text" placeholder="e.g. Fashion Hub" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e6e8ea]/20 focus:border-zinc-800 transition" value={formData.businessName} onChange={e => setFormData({...formData, businessName: e.target.value})} />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, businessType: 'individual'})}
                    className={`py-2.5 border rounded-xl text-sm font-bold transition ${formData.businessType === 'individual' ? 'border-zinc-800 bg-[#FDE2E4] text-gray-800' : 'border-[#ebeced] text-gray-600 hover:bg-[#FDE2E4]'}`}
                  >
                    Individual
                  </button>
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, businessType: 'corporate'})}
                    className={`py-2.5 border rounded-xl text-sm font-bold transition ${formData.businessType === 'corporate' ? 'border-zinc-800 bg-[#FDE2E4] text-gray-800' : 'border-[#ebeced] text-gray-600 hover:bg-[#FDE2E4]'}`}
                  >
                    Corporate
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Address <span className="text-red-500">*</span></label>
                <textarea required rows={3} placeholder="Full address for product pickup" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e6e8ea]/20 focus:border-zinc-800 transition resize-none" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
              </div>

              <div className="flex gap-3 pt-4">
                <button onClick={() => setStep(1)} className="w-1/3 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition">Back</button>
                <button onClick={() => { if(formData.businessName && formData.address) setStep(3); }} className="w-2/3 bg-[#80091B] text-white border border-[#FDE2E4] shadow-sm py-3 rounded-xl font-bold hover:bg-[#5A0613] hover:shadow-lg transition shadow-md disabled:opacity-50" disabled={!formData.businessName || !formData.address}>Continue</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Identity Verification</h3>
                <p className="text-sm text-gray-500">Upload your documents</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">NID Number <span className="text-red-500">*</span></label>
                <input required type="text" placeholder="10 or 17 digit NID" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e6e8ea]/20 focus:border-zinc-800 transition" value={formData.nidNumber} onChange={e => setFormData({...formData, nidNumber: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">NID (Front) <span className="text-red-500">*</span></label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:bg-[#FDE2E4] hover:border-zinc-800 transition group">
                    <Upload className="w-6 h-6 mx-auto text-gray-400 mb-2 group-hover:text-gray-800" />
                    <span className="text-xs text-gray-500 font-medium group-hover:text-gray-800">Upload Front</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">NID (Back) <span className="text-red-500">*</span></label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:bg-[#FDE2E4] hover:border-zinc-800 transition group">
                    <Upload className="w-6 h-6 mx-auto text-gray-400 mb-2 group-hover:text-gray-800" />
                    <span className="text-xs text-gray-500 font-medium group-hover:text-gray-800">Upload Back</span>
                  </div>
                </div>
              </div>

              {formData.businessType === 'corporate' && (
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Trade License <span className="text-red-500">*</span></label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:bg-[#FDE2E4] hover:border-zinc-800 transition flex items-center justify-center gap-2 group">
                    <Upload className="w-5 h-5 text-gray-400 group-hover:text-gray-800" />
                    <span className="text-sm text-gray-500 font-medium group-hover:text-gray-800">Upload Document</span>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button onClick={() => setStep(2)} className="w-1/3 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition">Back</button>
                <button onClick={() => { if(formData.nidNumber) setStep(4); }} className="w-2/3 bg-[#80091B] text-white border border-[#FDE2E4] shadow-sm py-3 rounded-xl font-bold hover:bg-[#5A0613] hover:shadow-lg transition shadow-md disabled:opacity-50" disabled={!formData.nidNumber}>Continue</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Bank Details</h3>
                <p className="text-sm text-gray-500">Where should we send your payments?</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name <span className="text-red-500">*</span></label>
                <input required type="text" placeholder="e.g. Dutch Bangla Bank" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e6e8ea]/20 focus:border-zinc-800 transition" value={formData.bankName} onChange={e => setFormData({...formData, bankName: e.target.value})} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account Number <span className="text-red-500">*</span></label>
                <input required type="text" placeholder="Account Number" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e6e8ea]/20 focus:border-zinc-800 transition" value={formData.accountNumber} onChange={e => setFormData({...formData, accountNumber: e.target.value})} />
              </div>

              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mt-2">
                <p className="text-xs text-gray-900 leading-relaxed">
                  By submitting this form, you agree to Shevaly&apos;s <button onClick={(e) => { e.preventDefault(); alert("Seller Terms and conditions are coming soon."); }} className="font-bold underline hover:text-gray-900">Seller Terms & Conditions</button> and <button onClick={(e) => { e.preventDefault(); alert("Privacy Policy is coming soon."); }} className="font-bold underline hover:text-gray-900">Privacy Policy</button>.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setStep(3)} className="w-1/3 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition">Back</button>
                <button type="submit" className="w-2/3 bg-[#80091B] text-white border border-[#FDE2E4] shadow-sm py-3 rounded-xl font-bold hover:bg-[#5A0613] hover:shadow-lg transition shadow-md disabled:opacity-50" disabled={!formData.bankName || !formData.accountNumber}>Submit Application</button>
              </div>
            </form>
          )}

          {step === 5 && (
            <div className="text-center space-y-5 py-4 animate-in zoom-in duration-300">
              <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Application Submitted!</h3>
              <p className="text-gray-500 text-sm md:text-base px-4">
                Thank you for applying to become a Shevaly seller. Our team will review your documents and get back to you within 24-48 hours.
              </p>
              <div className="bg-[#FDE2E4] p-4 rounded-xl border border-gray-100 text-left mt-6 mb-2 flex items-center justify-between">
                <div className="text-sm font-medium text-gray-700">Application Status:</div>
                <div className="flex items-center gap-1.5 text-amber-600 font-bold bg-amber-50 px-3 py-1 rounded-full text-sm">
                  <Clock className="w-4 h-4" /> Under Review
                </div>
              </div>
              <button onClick={() => { onComplete(); onClose(); }} className="w-full bg-[#80091B] text-white border border-[#FDE2E4] py-3.5 rounded-xl font-bold hover:bg-[#5A0613] hover:shadow-lg transition mt-4 shadow-sm text-lg">Go to Dashboard</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CartPage = ({ cart, onClose, onUpdateQuantity, onRemove }: { cart: any[], onClose: () => void, onUpdateQuantity: (item: any, quantity: number) => void, onRemove: (item: any) => void }) => {
  const cartTotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  
  return (
    <div className="fixed inset-0 bg-white z-[70] overflow-y-auto flex flex-col">
      <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center gap-3 z-10">
        <button onClick={onClose} className="p-2 -ml-2 bg-[#FDE2E4] rounded-full text-gray-600 hover:bg-gray-100">
          <ChevronRight className="w-5 h-5 rotate-180" />
        </button>
        <h2 className="font-bold text-lg flex-1">My Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)})</h2>
      </div>
      <div className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8 flex flex-col md:flex-row gap-8">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500 w-full">
            <ShoppingCart className="w-16 h-16 mb-4 text-gray-300" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
            <p className="mb-6">Looks like you haven&apos;t added anything to your cart yet.</p>
            <button onClick={onClose} className="bg-[#80091B] text-white border border-[#FDE2E4] shadow-sm px-8 py-4 rounded-xl font-bold hover:bg-[#80091B] transition shadow-md hover:shadow-lg flex items-center gap-2 text-lg">
              <ShoppingCart className="w-5 h-5" />
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="md:w-2/3 space-y-4">
              {cart.map((item, idx) => (
                <div key={idx} className="flex gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div className="w-24 h-24 relative rounded-lg overflow-hidden bg-[#FDE2E4] shrink-0">
                    <Image referrerPolicy="no-referrer" src={item.product.image} alt={item.product.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-gray-900 line-clamp-1">{item.product.name}</h3>
                        <div className="text-sm text-gray-500 mt-1">
                          {item.variants?.size && <span className="mr-3">Size: {item.variants.size}</span>}
                          {item.variants?.color && <span>Color: {item.variants.color}</span>}
                        </div>
                      </div>
                      <button onClick={() => onRemove(item)} className="p-1.5 text-gray-400 hover:text-red-500 transition rounded-full hover:bg-red-50">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="font-bold text-gray-800 text-lg">৳{item.product.price}</div>
                      <div className="flex items-center border border-[#ebeced] rounded-lg overflow-hidden h-9">
                        <button 
                          onClick={() => onUpdateQuantity(item, Math.max(1, item.quantity - 1))}
                          className="px-3 h-full bg-[#FDE2E4] hover:bg-gray-100 text-gray-600 font-medium transition"
                        >-</button>
                        <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item, item.quantity + 1)}
                          className="px-3 h-full bg-[#FDE2E4] hover:bg-gray-100 text-gray-600 font-medium transition"
                        >+</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="md:w-1/3">
              <div className="bg-[#FDE2E4] p-6 rounded-xl sticky top-24">
                <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                <div className="space-y-3 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-bold">৳{cartTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-bold">Calculated at checkout</span>
                  </div>
                </div>
                <div className="border-t border-[#ebeced] pt-4 mb-6 flex justify-between items-center">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-xl text-gray-800">৳{cartTotal}</span>
                </div>
                <button onClick={() => { document.getElementById('product-section')?.scrollIntoView({ behavior: 'smooth' }); onClose(); }} className="w-full bg-[#80091B] text-white border border-[#FDE2E4] shadow-sm py-3.5 rounded-xl font-bold text-lg hover:bg-[#80091B] transition shadow-md">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const WishlistPage = ({ wishlist, onClose, onRemove, onAddToCart }: { wishlist: any[], onClose: () => void, onRemove: (product: any) => void, onAddToCart: (product: any) => void }) => (
  <div className="fixed inset-0 bg-white z-[70] overflow-y-auto flex flex-col">
    <div className="sticky top-0 bg-white border-b px-4 py-3 flex items-center gap-3 z-10">
      <button onClick={onClose} className="p-2 -ml-2 bg-[#FDE2E4] rounded-full text-gray-600 hover:bg-gray-100">
        <ChevronRight className="w-5 h-5 rotate-180" />
      </button>
      <h2 className="font-bold text-lg flex-1">My Wishlist ({wishlist.length})</h2>
    </div>
    <div className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">
      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500">
          <Heart className="w-16 h-16 mb-4 text-gray-300" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Your wishlist is empty</h3>
          <p>Save items you like to your wishlist to buy them later.</p>
          <button onClick={onClose} className="mt-6 bg-[#80091B] text-white border border-[#FDE2E4] shadow-sm px-8 py-3 rounded-xl font-bold hover:bg-[#80091B] transition">
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
          {wishlist.map((product, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-md transition flex flex-col">
              <div className="relative aspect-[4/5] bg-[#FDE2E4]">
                <Image referrerPolicy="no-referrer" src={product.image} alt={product.name} fill className="object-cover" />
                <button className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-gray-600 hover:text-red-500 transition" onClick={() => onRemove(product)}>
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-3 flex flex-col flex-1">
                <h3 className="text-sm font-medium text-gray-800 line-clamp-1 mb-1">{product.name}</h3>
                <div className="flex items-center flex-wrap gap-x-1 gap-y-0.5 mb-3">
                  <span className="text-gray-800 font-bold text-sm md:text-base">৳{product.price}</span>
                  <span className="text-[11px] md:text-xs font-normal line-through text-gray-500">৳{product.oldPrice}</span>
                </div>
                <div className="mt-auto">
                  <button 
                    onClick={() => onAddToCart(product)}
                    className="w-full bg-[#80091B] text-white border border-[#FDE2E4] shadow-sm text-xs py-2 rounded-lg font-bold hover:bg-[#80091B] transition shadow-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

const FilterModal = ({ 
  isOpen, 
  onClose, 
  filters, 
  setFilters 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  filters: { category: string, maxPrice: number, minRating: number }, 
  setFilters: (filters: any) => void 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[80] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-6">
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-xl font-bold">Filters</h3>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
            <select 
              value={filters.category} 
              onChange={(e) => setFilters({...filters, category: e.target.value})}
              className="w-full border border-[#ebeced] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#e6e8ea]/20"
            >
              <option value="All">All Categories</option>
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Footwear">Footwear</option>
              <option value="Grooming">Grooming</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Max Price (৳ {filters.maxPrice})</label>
            <input 
              type="range" 
              min="0" 
              max="10000" 
              step="100"
              value={filters.maxPrice}
              onChange={(e) => setFilters({...filters, maxPrice: Number(e.target.value)})}
              className="w-full accent-zinc-700"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>৳ 0</span>
              <span>৳ 10,000+</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Minimum Rating</label>
            <div className="flex gap-2">
              {[0, 3, 4, 4.5].map(rating => (
                <button 
                  key={rating}
                  onClick={() => setFilters({...filters, minRating: rating})}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium border transition ${
                    filters.minRating === rating 
                      ? 'border-zinc-800 bg-[#FDE2E4] text-gray-800' 
                      : 'border-[#ebeced] text-gray-600 hover:bg-[#FDE2E4]'
                  }`}
                >
                  {rating === 0 ? 'Any' : `${rating}+ ⭐`}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="pt-4 flex gap-3">
          <button 
            onClick={() => setFilters({ category: 'All', maxPrice: 10000, minRating: 0 })}
            className="flex-1 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition"
          >
            Reset
          </button>
          <button 
            onClick={onClose}
            className="flex-1 py-3 rounded-xl font-bold text-black bg-[#e6e8ea] shadow-sm hover:bg-[#80091B] hover:text-white transition"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

const MobileStickyHeader = ({ cartCount, onOpenCart, onOpenCategoryMenu }: { cartCount: number, onOpenCart: () => void, onOpenCategoryMenu: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`md:hidden fixed top-0 left-0 right-0 bg-white shadow-md z-50 transition-transform duration-300 flex items-center justify-between px-4 py-3 ${
        isScrolled ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="flex items-center gap-3">
        <Menu className="w-6 h-6 text-gray-700 cursor-pointer" onClick={onOpenCategoryMenu} />
        <div className="flex items-center gap-2">
          <Logo className="h-10 w-auto" textClassName="text-xl font-bold tracking-tight text-gray-800" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Search className="w-6 h-6 text-gray-700" />
        <div className="relative cursor-pointer" onClick={onOpenCart}>
          <ShoppingCart className="w-6 h-6 text-gray-700" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-[#80091B] text-white border border-[#FDE2E4] shadow-sm text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const Footer = ({ onOpenTerms, onOpenSellerModal }: { onOpenTerms: () => void, onOpenSellerModal: () => void }) => {
  return (
    <footer className="bg-white border-t border-[#ebeced] pt-12 pb-24 md:pb-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Logo className="h-16 w-auto" textClassName="text-3xl font-bold text-gray-900 tracking-tight" />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Bangladesh&apos;s Favorite Online Fashion Mall<br/>
              DBID - 751626035
            </p>
            <div className="pt-2">
              <p className="text-sm font-bold text-gray-900 mb-3">Download <span className="text-gray-800">Shevaly</span> Mobile App</p>
              <div className="flex gap-3">
                <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-gray-900 rounded-lg px-3 py-2 hover:bg-[#FDE2E4] transition">
                  <Play className="w-5 h-5 fill-current" />
                  <div className="text-left">
                    <div className="text-[8px] uppercase leading-none mb-0.5">GET IT ON</div>
                    <div className="text-xs font-bold leading-none">Google Play</div>
                  </div>
                </a>
                <a href="https://apple.com/app-store" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-gray-900 rounded-lg px-3 py-2 hover:bg-[#FDE2E4] transition">
                  <Apple className="w-5 h-5 fill-current" />
                  <div className="text-left">
                    <div className="text-[8px] uppercase leading-none mb-0.5">Download on the</div>
                    <div className="text-xs font-bold leading-none">App Store</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Shevaly Policies</h3>
            <ul className="space-y-3 text-sm text-gray-600 font-medium">
              <li><button onClick={(e) => { e.preventDefault(); onOpenTerms(); }} className="hover:text-gray-800 transition">Return & Refund Policy</button></li>
              <li><button onClick={(e) => { e.preventDefault(); onOpenTerms(); }} className="hover:text-gray-800 transition">Exchange Policy</button></li>
              <li><button onClick={(e) => { e.preventDefault(); onOpenTerms(); }} className="text-gray-800 hover:underline transition">Shipping & Delivery Policy</button></li>
              <li><button onClick={(e) => { e.preventDefault(); onOpenTerms(); }} className="hover:text-gray-800 transition">Cancellation Policy</button></li>
              <li><button onClick={(e) => { e.preventDefault(); onOpenTerms(); }} className="hover:text-gray-800 transition">Privacy Policy</button></li>
              <li><button onClick={(e) => { e.preventDefault(); onOpenTerms(); }} className="hover:text-gray-800 transition">Terms & Conditions</button></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Shevaly Seller</h3>
            <ul className="space-y-3 text-sm text-gray-600 font-medium">
              <li><button onClick={(e) => { e.preventDefault(); onOpenSellerModal(); }} className="hover:text-gray-800 transition">Become A Seller</button></li>
              <li><Link href="/seller" className="hover:text-gray-800 transition">Seller Dashboard</Link></li>
              <li><Link href="/admin" className="hover:text-gray-800 transition">Admin Dashboard</Link></li>
              <li><button onClick={(e) => { e.preventDefault(); onOpenTerms(); }} className="hover:text-gray-800 transition">Seller Policy</button></li>
              <li><button onClick={(e) => { e.preventDefault(); onOpenTerms(); }} className="hover:text-gray-800 transition">Product Policy</button></li>
              <li><button onClick={(e) => { e.preventDefault(); onOpenTerms(); }} className="hover:text-gray-800 transition">Pickup & Delivery Policy</button></li>
              <li><button onClick={(e) => { e.preventDefault(); onOpenTerms(); }} className="hover:text-gray-800 transition">Seller Exchange & Return Policy</button></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Social Links</h3>
            <ul className="space-y-3 text-sm text-gray-600 font-medium">
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gray-800 transition"><Facebook className="w-5 h-5" /> Facebook</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gray-800 transition"><Instagram className="w-5 h-5" /> Instagram</a></li>
              <li><a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gray-800 transition"><Music className="w-5 h-5" /> TikTok</a></li>
              <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gray-800 transition"><Youtube className="w-5 h-5" /> YouTube</a></li>
              <li><a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gray-800 transition"><MessageCircle className="w-5 h-5" /> WhatsApp</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    addToCart, 
    updateCartQuantity, 
    removeFromCart, 
    cartCount 
  } = useCart();

  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const handleBuyNow = (product: any, quantity: number = 1, options: any = {}) => {
    addToCart(product, quantity, options);
    setSelectedProduct(null);
    setIsCartOpen(true);
  };
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('shevaly_recently_viewed');
      if (saved) {
        try {
          // eslint-disable-next-line
          setRecentlyViewed(JSON.parse(saved));
        } catch (e) {}
      }
    }
  }, []);

  const [reviews, setReviews] = useState<Record<string, any[]>>(() => {
    if (typeof window !== 'undefined') {
      const savedReviews = localStorage.getItem('shevaly_reviews');
      if (savedReviews) {
        try {
          return JSON.parse(savedReviews);
        } catch (e) {
          console.error('Failed to parse reviews', e);
        }
      }
    }
    return {};
  });
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const [sellerStatus, setSellerStatus] = useState('none');
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist
  } = useWishlist();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isAffordableOpen, setIsAffordableOpen] = useState(false);
  const [isLoadingProductDetail, setIsLoadingProductDetail] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: 'All',
    maxPrice: 10000,
    minRating: 0
  });

  useEffect(() => {
    // Simulate initial loading of products
    const timer = setTimeout(() => {
      setIsLoadingProducts(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleProductClick = (product: any) => {
    setIsLoadingProductDetail(true);
    setSelectedProduct(product);
    
    setRecentlyViewed(prev => {
      const updated = [product, ...prev.filter(p => p.name !== product.name)].slice(0, 10);
      try {
        localStorage.setItem('shevaly_recently_viewed', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    // Simulate loading product details
    setTimeout(() => {
      setIsLoadingProductDetail(false);
    }, 800);
  };

  // Wishlist logic is now handled by WishlistContext

  // Cart logic is now handled by CartContext

  const handleAddReview = (productName: string, review: any) => {
    const newReview = {
      ...review,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString().split('T')[0],
    };
    setReviews(prev => {
      const updated = {
        ...prev,
        [productName]: [...(prev[productName] || []), newReview]
      };
      localStorage.setItem('shevaly_reviews', JSON.stringify(updated));
      return updated;
    });
  };

  // cartCount is now handled by CartContext

  const handleOpenProfile = () => {
    if (user) {
      setIsProfileOpen(true);
    } else {
      setAuthMode('login');
      setIsAuthModalOpen(true);
    }
  };

  const handleCategorySelect = (category: string) => {
    // Map category string correctly if needed, or stick to literal
    setFilters(prev => ({ ...prev, category: category }));
    
    // Also clear other filters if you are browsing immediately from categories
    setSearchQuery('');
    
    setTimeout(() => {
      const el = document.getElementById('product-section');
      if (el) {
        const yOffset = -80; 
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  if (selectedProduct) {
    if (isLoadingProductDetail) {
      return <ProductDetailSkeleton onClose={() => setSelectedProduct(null)} />;
    }
    
    return (
      <ProductDetail 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={addToCart}
        onBuyNow={handleBuyNow}
        reviews={reviews[selectedProduct.name] || []}
        onAddReview={(review) => handleAddReview(selectedProduct.name, review)}
      />
    );
  }

  if (isWishlistOpen) {
    return (
      <WishlistPage 
        wishlist={wishlist} 
        onClose={() => setIsWishlistOpen(false)} 
        onRemove={toggleWishlist} 
        onAddToCart={addToCart} 
      />
    );
  }

  if (isCartOpen) {
    return (
      <CartPage 
        cart={cart} 
        onClose={() => setIsCartOpen(false)} 
        onUpdateQuantity={updateCartQuantity} 
        onRemove={removeFromCart} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f5f5] pb-24 md:pb-24 font-sans w-full relative">
      <AppPromoBanner />
      <MobileStickyHeader cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} onOpenCategoryMenu={() => setIsCategoryMenuOpen(true)} />
      <Header cart={cart} sellerStatus={sellerStatus} onOpenSellerModal={() => setIsSellerModalOpen(true)} wishlistCount={wishlist.length} onOpenWishlist={() => setIsWishlistOpen(true)} onOpenCart={() => setIsCartOpen(true)} onOpenProfile={handleOpenProfile} />
      <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} onFilterClick={() => setIsFilterModalOpen(true)} user={user} onOpenAuth={(mode) => { setAuthMode(mode); setIsAuthModalOpen(true); }} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 md:space-y-12 py-6 md:py-10">
        <Categories onCategoryClick={handleCategorySelect} />
        <Features />
        <PromoBanners />
        <Offers />
        <SingleBanner />
        <TopBrands />
        <Affordable onOpenCollection={() => setIsAffordableOpen(true)} />
        <FlashSale 
          products={products} 
          onProductClick={handleProductClick} 
          onAddToCart={addToCart} 
          onBuyNow={handleBuyNow}
          wishlist={wishlist} 
          onToggleWishlist={toggleWishlist} 
          reviews={reviews}
          onAddReview={(review: any) => review.productName ? handleAddReview(review.productName, review) : null}
        />
        <div id="product-section" className="pt-2">
          <ProductSection 
            onAddToCart={addToCart} 
            onBuyNow={handleBuyNow}
            onProductClick={handleProductClick} 
            reviews={reviews} 
            wishlist={wishlist} 
            onToggleWishlist={toggleWishlist} 
            onAddReview={(review: any) => review.productName ? handleAddReview(review.productName, review) : null}
            isLoading={isLoadingProducts} 
            searchQuery={searchQuery}
            filters={filters}
          />
        </div>

        {recentlyViewed.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-24">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-gray-900" />
              <h2 className="text-2xl md:text-3xl font-black text-gray-900">Recently Viewed</h2>
            </div>
            <div className="flex md:grid md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 pb-4">
              {recentlyViewed.slice(0, 5).map((product: any, i: number) => {
                const productReviews = reviews[product.name] || [];
                const avgRating = productReviews.length > 0 
                  ? (productReviews.reduce((acc, r) => acc + r.rating, 0) / productReviews.length).toFixed(1)
                  : product.rating;
                const reviewCount = productReviews.length > 0 ? productReviews.length : product.reviews;
                const isWishlisted = wishlist.some(item => item.name === product.name);

                return (
                  <div key={i} className="min-w-[260px] md:min-w-0">
                    <ProductCard 
                      product={product}
                      onProductClick={handleProductClick}
                      onAddToCart={addToCart}
                      onBuyNow={handleBuyNow}
                      avgRating={avgRating}
                      reviewCount={reviewCount}
                      isWishlisted={isWishlisted}
                      onToggleWishlist={toggleWishlist}
                      reviews={reviews}
                      onAddReview={(review: any) => handleAddReview(product.name, review)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
      <Footer onOpenTerms={() => setIsTermsOpen(true)} onOpenSellerModal={() => setIsSellerModalOpen(true)} />
      <BottomNav cartCount={cartCount} onCategoryClick={() => setIsCategoryMenuOpen(true)} onOpenCart={() => setIsCartOpen(true)} onOpenProfile={handleOpenProfile} />
      <MobileCategoryMenu isOpen={isCategoryMenuOpen} onClose={() => setIsCategoryMenuOpen(false)} onCategoryClick={handleCategorySelect} />
      <BecomeSellerModal isOpen={isSellerModalOpen} onClose={() => setIsSellerModalOpen(false)} onComplete={() => setSellerStatus('pending')} />
      <UserProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} user={user} sellerStatus={sellerStatus} onOpenSellerModal={() => { setIsProfileOpen(false); setIsSellerModalOpen(true); }} />
      <FilterModal isOpen={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)} filters={filters} setFilters={setFilters} />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} initialMode={authMode} />
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      <AffordableCollectionModal 
        isOpen={isAffordableOpen} 
        onClose={() => setIsAffordableOpen(false)} 
        onOpenFilters={() => setIsFilterModalOpen(true)}
        onProductClick={(p) => {
          setSelectedProduct(p);
          setIsAffordableOpen(false);
        }}
      />
    </div>
  );
}
