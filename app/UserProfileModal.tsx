import React, { useState } from 'react';
import { X, LogOut, Truck, Package, CheckCircle, Clock, MapPin, ChevronDown, ChevronUp, Store } from 'lucide-react';
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
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col relative shadow-2xl" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
          <button onClick={onClose} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Body */}
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-gray-50 border-r p-4 flex flex-col gap-2">
            <button 
              onClick={() => setActiveTab('profile')} 
              className={`text-left px-4 py-3 rounded-xl font-medium transition ${activeTab === 'profile' ? 'bg-[#80091B] text-white' : 'hover:bg-gray-200 text-gray-700'}`}
            >
              Profile Info
            </button>
            <button 
              onClick={() => setActiveTab('orders')} 
              className={`text-left px-4 py-3 rounded-xl font-medium transition ${activeTab === 'orders' ? 'bg-[#80091B] text-white' : 'hover:bg-gray-200 text-gray-700'}`}
            >
              Order History
            </button>
            <button 
              onClick={() => setActiveTab('addresses')} 
              className={`text-left px-4 py-3 rounded-xl font-medium transition ${activeTab === 'addresses' ? 'bg-[#80091B] text-white' : 'hover:bg-gray-200 text-gray-700'}`}
            >
              Saved Addresses
            </button>
            
            <div className="mt-auto pt-4 border-t space-y-2">
              {sellerStatus === 'verified' ? (
                <Link 
                  href="/seller"
                  onClick={onClose}
                  className="w-full flex items-center gap-2 text-left px-4 py-3 rounded-xl font-medium text-[#80091B] hover:bg-zinc-50 transition"
                >
                  <Store className="w-5 h-5" />
                  Seller Dashboard
                </Link>
              ) : (
                <button 
                  onClick={onOpenSellerModal}
                  className="w-full flex items-center gap-2 text-left px-4 py-3 rounded-xl font-medium text-[#80091B] hover:bg-zinc-50 transition"
                >
                  <Store className="w-5 h-5" />
                  {sellerStatus === 'none' ? 'Become a Seller' : 'Seller Application Pending'}
                </button>
              )}
              <Link 
                href="/admin"
                onClick={onClose}
                className="w-full flex items-center gap-2 text-left px-4 py-3 rounded-xl font-medium text-blue-600 hover:bg-blue-50 transition"
              >
                <Store className="w-5 h-5" />
                Admin Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-2 text-left px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 transition"
              >
                <LogOut className="w-5 h-5" />
                Log Out
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === 'profile' && (
              <div>
                <h3 className="text-xl font-bold mb-6">Profile Information</h3>
                <div className="bg-white border rounded-2xl p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                    <div className="text-lg font-medium text-gray-900">{user?.name || 'Not set'}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                    <div className="text-lg font-medium text-gray-900">{user?.email}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">User ID</label>
                    <div className="text-sm font-mono text-gray-500">{user?.id || user?.uid || 'Not set'}</div>
                  </div>
                  <div className="pt-4 border-t">
                    <label className="block text-sm font-medium text-gray-500 mb-1">Delivery Address</label>
                    <textarea 
                      className="w-full border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      rows={3} 
                      placeholder="Enter your delivery address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    ></textarea>
                    <button 
                      onClick={handleSaveAddress}
                      className="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                    >
                      Save Address
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'orders' && (
              <div>
                <h3 className="text-xl font-bold mb-4">Order History</h3>
                <div className="space-y-4">
                  {mockOrders.map(order => (
                    <div key={order.id} className="border rounded-xl p-4 flex flex-col gap-4 transition-all">
                      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                        <div>
                          <div className="font-bold text-lg">{order.id}</div>
                          <div className="text-sm text-gray-500">Placed on {order.date} • {order.itemsCount} items</div>
                        </div>
                        <div className="flex flex-col md:items-end gap-2">
                          <div className="font-bold text-[#80091B]">৳{order.total}</div>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-zinc-100 text-[#80091B]'}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="pt-3 border-t flex justify-between items-center">
                        <div className="text-sm">
                          <span className="text-gray-500">Est. Delivery: </span>
                          <span className="font-bold text-gray-900">{order.estimatedDelivery}</span>
                        </div>
                        <button 
                          onClick={() => setTrackingOrderId(trackingOrderId === order.id ? null : order.id)}
                          className="text-sm font-bold text-[#80091B] flex items-center gap-1 hover:underline"
                        >
                          {trackingOrderId === order.id ? 'Hide Tracking' : 'Track Order'}
                          {trackingOrderId === order.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>

                      {trackingOrderId === order.id && (
                        <div className="pt-4 pb-2 animate-in fade-in slide-in-from-top-2 duration-300">
                          <div className="relative flex justify-between mb-8">
                            {/* Connecting Line */}
                            <div className="absolute top-5 left-6 right-6 h-1 bg-gray-100 -z-10 rounded-full">
                              <div 
                                className="h-full bg-[#80091B] transition-all duration-500 rounded-full" 
                                style={{ width: `${((order.trackingSteps.length - 1) / (trackingStages.length - 1)) * 100}%` }}
                              />
                            </div>
                            
                            {/* Stages */}
                            {trackingStages.map((stage, idx) => {
                              const isCompleted = order.trackingSteps.includes(stage.id);
                              const isCurrent = order.trackingSteps[order.trackingSteps.length - 1] === stage.id;
                              const Icon = stage.icon;
                              
                              return (
                                <div key={stage.id} className="flex flex-col items-center gap-2 w-16">
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                                    isCompleted 
                                      ? 'bg-[#80091B] text-white shadow-md' 
                                      : 'bg-white border-2 border-gray-200 text-gray-300'
                                  }`}>
                                    <Icon className="w-5 h-5" />
                                  </div>
                                  <div className={`text-[10px] text-center font-medium leading-tight ${
                                    isCurrent ? 'text-[#80091B] font-bold' : isCompleted ? 'text-gray-800' : 'text-gray-400'
                                  }`}>
                                    {stage.label}
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Order Items */}
                          <div className="border-t pt-4">
                            <h4 className="font-bold text-gray-800 mb-3 text-sm">Order Items</h4>
                            <div className="space-y-3">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg">
                                  <div className="relative w-12 h-12 shrink-0">
                                    <Image referrerPolicy="no-referrer" src={item.image} alt={item.name} fill className="object-cover rounded-md border" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="font-medium text-sm text-gray-900">{item.name}</div>
                                    <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                                  </div>
                                  <div className="font-bold text-sm text-gray-900">৳{item.price}</div>
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
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Saved Addresses</h3>
                  <button className="text-sm font-bold text-[#80091B] hover:underline">+ Add New</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockAddresses.map(addr => (
                    <div key={addr.id} className="border rounded-xl p-4 relative">
                      {addr.isDefault && (
                        <span className="absolute top-4 right-4 text-[10px] bg-zinc-100 text-[#80091B] px-2 py-1 rounded-full font-bold">
                          DEFAULT
                        </span>
                      )}
                      <div className="font-bold mb-1">{addr.label}</div>
                      <div className="text-sm text-gray-600 mb-2">{addr.address}</div>
                      <div className="text-sm text-gray-500">{addr.phone}</div>
                      <div className="mt-4 flex gap-3">
                        <button className="text-sm font-medium text-[#80091B] hover:underline">Edit</button>
                        <button className="text-sm font-medium text-red-500 hover:underline">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
