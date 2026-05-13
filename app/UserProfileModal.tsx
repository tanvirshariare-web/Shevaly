import React, { useState } from 'react';
import { X, LogOut, Truck, Package, CheckCircle, Clock, MapPin, ChevronDown, ChevronUp, Store, Edit2, Shield, Map } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import Image from 'next/image';
import Link from 'next/link';

const trackingStages = [
  { id: 'placed', label: 'Order Placed', icon: Package },
  { id: 'processing', label: 'Processing', icon: Clock },
  { id: 'shipped', label: 'Shipped', icon: Truck },
  { id: 'out_for_delivery', label: 'Out for Delivery', icon: MapPin },
  { id: 'delivered', label: 'Delivered', icon: CheckCircle },
];

const UserProfileModal = ({ isOpen, onClose, user, sellerStatus, onOpenSellerModal }: { isOpen: boolean, onClose: () => void, user?: any, sellerStatus?: string, onOpenSellerModal?: () => void }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [trackingOrderId, setTrackingOrderId] = useState<string | null>(null);
  const [address, setAddress] = useState('');
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);

  const handleSaveAddress = () => {
    // Basic save simulation
    alert('Address saved!');
  };

  const mockOrders = [
    { 
      id: '#ORD-73829', 
      date: 'Oct 12, 2025', 
      total: 4500, 
      status: 'Delivered', 
      itemsCount: 3, 
      items: [
        { id: 1, name: 'Genuine Leather Wallet', quantity: 1, price: 870, image: 'https://picsum.photos/seed/wallet/200/200' },
        { id: 2, name: 'Gym Duffle Bag', quantity: 2, price: 1499, image: 'https://picsum.photos/seed/bag/200/200' }
      ],
      estimatedDelivery: 'Oct 15, 2025', 
      trackingSteps: ['placed', 'processing', 'shipped', 'out_for_delivery', 'delivered'] 
    },
    { 
      id: '#ORD-84920', 
      date: 'Nov 05, 2025', 
      total: 1250, 
      status: 'Shipped', 
      itemsCount: 1, 
      items: [
        { id: 3, name: 'Classic White Sneakers', quantity: 1, price: 1250, image: 'https://picsum.photos/seed/sneakers/200/200' }
      ],
      estimatedDelivery: 'Nov 10, 2025', 
      trackingSteps: ['placed', 'processing', 'shipped'] 
    },
    { 
      id: '#ORD-95031', 
      date: 'Nov 08, 2025', 
      total: 3200, 
      status: 'Processing', 
      itemsCount: 2, 
      items: [
        { id: 4, name: 'Wireless Earbuds', quantity: 1, price: 2500, image: 'https://picsum.photos/seed/earbuds/200/200' },
        { id: 5, name: 'Phone Case', quantity: 1, price: 700, image: 'https://picsum.photos/seed/case/200/200' }
      ],
      estimatedDelivery: 'Nov 14, 2025', 
      trackingSteps: ['placed', 'processing'] 
    },
  ];

  const mockAddresses = [
    { id: 1, label: 'Home', address: 'House 12, Road 5, Dhanmondi, Dhaka', phone: '+880 1711-223344', isDefault: true },
    { id: 2, label: 'Office', address: 'Level 4, Tech Park, Banani, Dhaka', phone: '+880 1822-334455', isDefault: false },
  ];

  if (!isOpen) return null;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onClose();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in transition-all duration-300 md:p-4" onClick={onClose}>
      <div 
        className="bg-[#fcfbf9] rounded-none md:rounded-[32px] w-full max-w-5xl h-[100dvh] md:h-[85vh] overflow-hidden flex flex-col relative shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] animate-in slide-in-from-bottom-4 zoom-in-95" 
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-8 py-5 border-b border-gray-200 flex justify-between items-center bg-white shrink-0">
          <h2 className="text-3xl tracking-tight text-gray-900" style={{ fontFamily: 'var(--font-serif)' }}>Account <span className="italic text-gray-500">Dashboard</span></h2>
          <button onClick={onClose} className="p-2.5 bg-gray-50 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Body */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-full md:w-72 bg-white border-r border-gray-100 p-6 flex flex-col gap-2 shrink-0 overflow-y-auto">
            <div className="mb-8 flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-[#80091B] to-[#b31429] rounded-full flex items-center justify-center text-white text-xl font-bold font-serif shadow-sm">
                {(user?.name || user?.email || 'U').charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="font-medium text-gray-900 truncate">{user?.name || 'Customer'}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>

            <nav className="space-y-1">
              <button 
                onClick={() => setActiveTab('profile')} 
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-medium transition-all duration-200 ${
                  activeTab === 'profile' 
                  ? 'bg-zinc-900 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Shield className="w-4 h-4" />
                Profile Information
              </button>
              <button 
                onClick={() => setActiveTab('orders')} 
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-medium transition-all duration-200 ${
                  activeTab === 'orders' 
                  ? 'bg-zinc-900 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Package className="w-4 h-4" />
                Order History
              </button>
              <button 
                onClick={() => setActiveTab('addresses')} 
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-medium transition-all duration-200 ${
                  activeTab === 'addresses' 
                  ? 'bg-zinc-900 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Map className="w-4 h-4" />
                Saved Addresses
              </button>
            </nav>
            
            <div className="mt-auto pt-6 border-t border-gray-100 space-y-1 relative">
              {sellerStatus === 'verified' ? (
                <Link 
                  href="/seller"
                  onClick={onClose}
                  className="w-full flex items-center gap-3 justify-center px-4 py-3.5 rounded-2xl font-medium text-[#80091B] bg-[#FDE2E4] hover:bg-[#ebd5d7] transition-colors"
                >
                  <Store className="w-4 h-4" />
                  Seller Dashboard
                </Link>
              ) : (
                <button 
                  onClick={onOpenSellerModal}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-2xl font-medium text-[#80091B] bg-[#FDE2E4]/80 hover:bg-[#FDE2E4] transition-colors"
                >
                  <Store className="w-4 h-4" />
                  {sellerStatus === 'none' ? 'Become a Seller' : 'Seller Application Pending'}
                </button>
              )}
              <Link 
                href="/admin"
                onClick={onClose}
                className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-2xl font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <Store className="w-4 h-4" />
                Admin Dashboard
              </Link>
              <button 
                onClick={() => setShowSignOutConfirm(true)}
                className="w-full flex items-center justify-center gap-3 px-4 py-3.5 mt-2 rounded-2xl font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 p-8 md:p-10 overflow-y-auto bg-[#faf9f6]">
            {activeTab === 'profile' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl">
                <h3 className="text-2xl font-bold mb-8 text-gray-900" style={{ fontFamily: 'var(--font-serif)' }}>Personal Details</h3>
                <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-wider font-semibold text-gray-400">Full Name</label>
                      <div className="text-base font-medium text-gray-900">{user?.name || 'Not provided'}</div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] uppercase tracking-wider font-semibold text-gray-400">Email Address</label>
                      <div className="text-base font-medium text-gray-900">{user?.email}</div>
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <label className="text-[11px] uppercase tracking-wider font-semibold text-gray-400">User ID</label>
                      <div className="text-sm font-mono text-gray-500 bg-gray-50 p-2 rounded-lg inline-block border">{user?.id || user?.uid || 'Not set'}</div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100 mt-6">
                    <label className="text-[11px] uppercase tracking-wider font-semibold text-gray-400 block mb-3">Quick Delivery Address</label>
                    <textarea 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all resize-none" 
                      rows={3} 
                      placeholder="Enter your default delivery address..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    ></textarea>
                    <div className="flex justify-end mt-4">
                      <button 
                        onClick={handleSaveAddress}
                        className="bg-zinc-900 hover:bg-black text-white text-sm font-medium py-2.5 px-6 rounded-full transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Save Address
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'orders' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold mb-6 text-gray-900" style={{ fontFamily: 'var(--font-serif)' }}>Order History</h3>
                <div className="space-y-6">
                  {mockOrders.map(order => (
                    <div key={order.id} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col gap-5 transition-all hover:shadow-md">
                      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-bold text-lg text-gray-900 tracking-tight">{order.id}</span>
                            <span className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full font-bold ${order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' : order.status === 'Processing' ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-200' : 'bg-blue-50 text-blue-700 ring-1 ring-blue-200'}`}>
                              {order.status}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500">Placed on <span className="font-medium text-gray-700">{order.date}</span> • {order.itemsCount} items</div>
                        </div>
                        <div className="flex flex-col md:items-end gap-1">
                          <div className="text-[11px] uppercase tracking-wider font-semibold text-gray-400">Total Amount</div>
                          <div className="font-bold text-xl text-gray-900">৳{order.total.toLocaleString()}</div>
                        </div>
                      </div>
                      
                      <div className="pt-5 border-t border-gray-100 flex justify-between items-center bg-gray-50/50 -mx-6 -mb-6 px-6 py-4 rounded-b-3xl">
                        <div className="text-sm">
                          <span className="text-gray-500">Est. Delivery: </span>
                          <span className="font-semibold text-gray-900">{order.estimatedDelivery}</span>
                        </div>
                        <button 
                          onClick={() => setTrackingOrderId(trackingOrderId === order.id ? null : order.id)}
                          className="text-sm font-bold text-zinc-900 flex items-center gap-1.5 hover:text-[#80091B] transition-colors"
                        >
                          {trackingOrderId === order.id ? 'Close Details' : 'View Details'}
                          {trackingOrderId === order.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>

                      {trackingOrderId === order.id && (
                        <div className="pt-8 pb-2 animate-in fade-in slide-in-from-top-2 duration-300">
                          <div className="relative flex justify-between mb-10 px-2 lg:px-8">
                            {/* Connecting Line */}
                            <div className="absolute top-5 left-8 right-8 lg:left-14 lg:right-14 h-1 bg-gray-100 -z-10 rounded-full">
                              <div 
                                className="h-full bg-zinc-900 transition-all duration-700 ease-out rounded-full shadow-[0_0_10px_rgba(0,0,0,0.2)]" 
                                style={{ width: `${((order.trackingSteps.length - 1) / (trackingStages.length - 1)) * 100}%` }}
                              />
                            </div>
                            
                            {/* Stages */}
                            {trackingStages.map((stage, idx) => {
                              const isCompleted = order.trackingSteps.includes(stage.id);
                              const isCurrent = order.trackingSteps[order.trackingSteps.length - 1] === stage.id;
                              const Icon = stage.icon;
                              
                              return (
                                <div key={stage.id} className="flex flex-col items-center gap-3 w-16">
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                                    isCurrent ? 'bg-zinc-900 text-white shadow-lg scale-110' :
                                    isCompleted 
                                      ? 'bg-zinc-800 text-white shadow-md' 
                                      : 'bg-white border-2 border-gray-200 text-gray-300'
                                  }`}>
                                    <Icon className={`w-4 h-4 ${isCurrent ? 'text-white' : ''}`} />
                                  </div>
                                  <div className={`text-[10px] text-center font-medium leading-tight ${
                                    isCurrent ? 'text-zinc-900 font-bold' : isCompleted ? 'text-gray-700' : 'text-gray-400'
                                  }`}>
                                    {stage.label}
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Order Items */}
                          <div className="bg-gray-50 rounded-2xl p-4 md:p-6 border border-gray-100">
                            <h4 className="font-bold text-gray-900 mb-4 text-sm tracking-tight">Items in this order</h4>
                            <div className="space-y-4">
                              {order.items.map((item, i) => (
                                <div key={item.id} className={`flex items-center gap-4 ${i !== order.items.length - 1 ? 'pb-4 border-b border-gray-200/60' : ''}`}>
                                  <div className="relative w-16 h-16 shrink-0 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                    <Image referrerPolicy="no-referrer" src={item.image} alt={item.name} fill className="object-cover" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="font-medium text-sm text-gray-900 mb-1">{item.name}</div>
                                    <div className="text-xs text-gray-500">Qty: <span className="font-medium">{item.quantity}</span></div>
                                  </div>
                                  <div className="font-bold text-sm text-gray-900">৳{(item.price * item.quantity).toLocaleString()}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'addresses' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-serif)' }}>Saved Addresses</h3>
                  <button className="text-sm font-semibold text-white bg-zinc-900 hover:bg-black px-4 py-2 rounded-full transition-colors shadow-sm">
                    + Add New
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {mockAddresses.map(addr => (
                    <div key={addr.id} className="bg-white border border-gray-100 rounded-3xl p-6 relative shadow-sm hover:shadow-md transition-shadow group">
                      {addr.isDefault && (
                        <span className="absolute top-6 right-6 text-[9px] bg-zinc-900 text-white px-2.5 py-1 rounded-full font-bold tracking-wider">
                          DEFAULT
                        </span>
                      )}
                      <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-500 border border-gray-100">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div className="font-bold text-lg mb-1.5 text-gray-900">{addr.label}</div>
                      <div className="text-sm text-gray-600 mb-3 leading-relaxed min-h-[40px]">{addr.address}</div>
                      <div className="text-sm font-medium text-gray-700 bg-gray-50 inline-block px-3 py-1.5 rounded-lg border border-gray-100">{addr.phone}</div>
                      <div className="mt-6 flex gap-2">
                        <button className="flex-1 flex justify-center items-center gap-1.5 text-xs font-bold text-gray-700 bg-gray-50 hover:bg-gray-100 py-2 rounded-xl border border-gray-200 transition-colors">
                          <Edit2 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button className="flex-1 flex justify-center items-center gap-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 py-2 rounded-xl transition-colors">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {showSignOutConfirm && (
          <div className="absolute inset-0 z-[110] flex items-center justify-center bg-black/20 backdrop-blur-sm animate-in fade-in" onClick={() => setShowSignOutConfirm(false)}>
            <div className="bg-white p-6 rounded-3xl shadow-xl w-80 flex flex-col items-center animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-4">
                <LogOut className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif text-center">Sign Out</h3>
              <p className="text-gray-500 text-center text-sm mb-6 leading-relaxed">Are you sure you want to sign out of your account?</p>
              <div className="w-full flex gap-3">
                <button 
                  className="flex-1 py-3 overflow-hidden rounded-xl text-gray-700 font-medium hover:bg-gray-100 transition-colors"
                  onClick={() => setShowSignOutConfirm(false)}
                >
                  Cancel
                </button>
                <button 
                  className="flex-1 py-3 rounded-xl text-white bg-red-600 font-medium hover:bg-red-700 transition-colors shadow-sm"
                  onClick={handleLogout}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfileModal;
