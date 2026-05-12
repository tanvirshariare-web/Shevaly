'use client';

import { useState } from 'react';
import { Package, ShoppingBag, DollarSign, Settings, LayoutDashboard, Menu, X, Bell, Plus, Edit, Trash2, TrendingUp, Store, Activity, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

export default function SellerDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { title: 'Total Sales', value: '৳ 12,450', icon: DollarSign, trend: '+14.5%', trendUp: true },
    { title: 'Active Orders', value: '14', icon: ShoppingBag, trend: '+2', trendUp: true },
    { title: 'Total Products', value: '45', icon: Package, trend: 'Stock ok', trendUp: true },
    { title: 'Store Rating', value: '4.8/5', icon: TrendingUp, trend: 'Top 10%', trendUp: true },
  ];

  const recentOrders = [
    { id: '#ORD-001', product: 'Premium Cotton T-Shirt', customer: 'Ahmed Ali', amount: '৳ 450', status: 'Processing' },
    { id: '#ORD-002', product: 'Slim Fit Denim Jeans', customer: 'Sadia Islam', amount: '৳ 1250', status: 'Shipped' },
    { id: '#ORD-003', product: 'Leather Wallet', customer: 'Hasan Mahmud', amount: '৳ 850', status: 'Pending' },
  ];

  const myProducts = [
    { id: 1, name: 'Premium Cotton T-Shirt', price: '৳ 450', stock: 120, status: 'Active' },
    { id: 2, name: 'Slim Fit Denim Jeans', price: '৳ 1250', stock: 45, status: 'Active' },
    { id: 3, name: 'Leather Wallet', price: '৳ 850', stock: 0, status: 'Out of Stock' },
  ];

  return (
    <div className="min-h-screen bg-[#faf9f6] flex font-sans text-gray-900">
      {/* Sidebar */}
      <aside className={`bg-white border-r border-gray-200 transition-all duration-300 z-20 ${isSidebarOpen ? 'w-64' : 'w-20'} fixed md:relative h-screen flex flex-col`}>
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-100">
          {isSidebarOpen && (
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center text-white font-serif text-xl shadow-sm">
                S
              </div>
              <span className="font-bold text-xl tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>Seller Hub</span>
            </Link>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-50 rounded-full text-gray-400 hover:text-gray-900 transition-colors">
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {[
            { id: 'overview', name: 'Overview', icon: LayoutDashboard },
            { id: 'products', name: 'My Products', icon: Package },
            { id: 'orders', name: 'Orders', icon: ShoppingBag },
            { id: 'earnings', name: 'Earnings', icon: DollarSign },
            { id: 'settings', name: 'Store Settings', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200 group ${activeTab === item.id ? 'bg-zinc-900 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}`} />
              {isSidebarOpen && <span className="font-medium text-sm">{item.name}</span>}
            </button>
          ))}
        </nav>
        
        <div className="p-6 border-t border-gray-100 mt-auto">
          <Link href="/" className={`flex items-center gap-4 px-4 py-3 rounded-2xl text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors font-medium text-sm ${!isSidebarOpen && 'justify-center'}`}>
            <Store className="w-5 h-5 opacity-70" />
            {isSidebarOpen && <span>Exit to Storefront</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden h-screen overflow-y-auto">
        {/* Header */}
        <header className="h-20 bg-[#faf9f6]/80 backdrop-blur-md sticky top-0 flex items-center justify-between px-8 z-10">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>{activeTab.replace('-', ' ')}</h1>
          <div className="flex items-center gap-6">
            <button className="relative text-gray-400 hover:text-gray-900 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#faf9f6]"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
              <div className="w-10 h-10 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm">
                JS
              </div>
              <div className="hidden sm:block">
                <div className="font-semibold text-sm text-gray-900 leading-tight">Jane&apos;s Store</div>
                <div className="text-xs text-gray-500">Verified Seller</div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8 pb-20">
          <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === 'overview' && (
              <>
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between h-40 group hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                          <stat.icon className="w-5 h-5 group-hover:text-white text-gray-600 transition-colors" />
                        </div>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${stat.trendUp ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                          {stat.trend}
                        </span>
                      </div>
                      <div>
                        <p className="text-[11px] uppercase tracking-wider font-semibold text-gray-400 mb-1">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-900 tracking-tight">{stat.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Recent Orders - Takes up 2 columns */}
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden lg:col-span-2 flex flex-col">
                    <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
                      <h2 className="text-xl font-bold text-gray-900 tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>Recent Orders</h2>
                      <button className="text-sm font-semibold text-zinc-900 hover:text-black hover:underline" onClick={() => setActiveTab('orders')}>View All</button>
                    </div>
                    <div className="overflow-x-auto flex-1">
                      <table className="w-full text-left border-collapse min-w-[500px]">
                        <thead>
                          <tr className="bg-gray-50/50 text-gray-400 text-[11px] uppercase tracking-wider font-semibold border-b border-gray-100">
                            <th className="px-8 py-4">Order ID</th>
                            <th className="px-8 py-4">Product</th>
                            <th className="px-8 py-4">Customer</th>
                            <th className="px-8 py-4">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {recentOrders.map((order, i) => (
                            <tr key={i} className="hover:bg-gray-50/50 transition-colors group">
                              <td className="px-8 py-5 font-medium text-gray-900 text-sm whitespace-nowrap">{order.id}</td>
                              <td className="px-8 py-5 text-gray-600 text-sm">{order.product}</td>
                              <td className="px-8 py-5 text-gray-500 text-sm">{order.customer}</td>
                              <td className="px-8 py-5">
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                  order.status === 'Shipped' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100' :
                                  order.status === 'Processing' ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-100' :
                                  'bg-amber-50 text-amber-700 ring-1 ring-amber-100'
                                }`}>
                                  {order.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Quick Actions & Store Health */}
                  <div className="space-y-8">
                    <div className="bg-zinc-900 rounded-3xl shadow-sm p-8 text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-6 opacity-10">
                        <Activity className="w-24 h-24" />
                      </div>
                      <h2 className="text-xl font-bold mb-2 tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>Store Health</h2>
                      <p className="text-zinc-400 text-sm mb-6 leading-relaxed">Your store is performing excellently. Keep up the good work to maintain your Top Seller status.</p>
                      <Link href="/seller" className="inline-block bg-white text-zinc-900 font-semibold px-5 py-2.5 rounded-full text-sm hover:bg-gray-100 transition-colors">
                        View Analytics
                      </Link>
                    </div>

                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                      <h2 className="text-[11px] uppercase tracking-wider font-semibold text-gray-400 mb-5">Quick Actions</h2>
                      <div className="space-y-3">
                        <button onClick={() => setActiveTab('products')} className="w-full p-4 border border-gray-200 rounded-2xl flex items-center gap-4 hover:border-zinc-300 hover:bg-gray-50 transition-colors group">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-white border border-transparent group-hover:border-gray-200 transition-all">
                            <Plus className="w-4 h-4 text-gray-700" />
                          </div>
                          <span className="font-semibold text-sm text-gray-800">Add New Product</span>
                        </button>
                        <button onClick={() => setActiveTab('orders')} className="w-full p-4 border border-gray-200 rounded-2xl flex items-center gap-4 hover:border-zinc-300 hover:bg-gray-50 transition-colors group">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-white border border-transparent group-hover:border-gray-200 transition-all">
                            <ShoppingBag className="w-4 h-4 text-gray-700" />
                          </div>
                          <span className="font-semibold text-sm text-gray-800">Manage Orders</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'products' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h2 className="text-2xl font-bold text-gray-900 tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>My Products</h2>
                  <button className="bg-zinc-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-black transition-colors shadow-sm w-max">
                    <Plus className="w-4 h-4" /> Add New Product
                  </button>
                </div>
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                      <thead>
                        <tr className="bg-gray-50/50 text-gray-400 text-[11px] uppercase tracking-wider font-semibold border-b border-gray-100">
                          <th className="px-8 py-4">Product</th>
                          <th className="px-8 py-4">Price</th>
                          <th className="px-8 py-4">Stock</th>
                          <th className="px-8 py-4">Status</th>
                          <th className="px-8 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {myProducts.map((product) => (
                          <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-8 py-6">
                              <div className="font-medium text-gray-900 text-sm">{product.name}</div>
                              <div className="text-gray-400 text-xs mt-1">ID: PRD-{product.id}</div>
                            </td>
                            <td className="px-8 py-6 font-semibold text-gray-900">{product.price}</td>
                            <td className="px-8 py-6">
                              <span className={`font-mono text-sm px-2 py-1 bg-gray-100 rounded-md ${product.stock === 0 ? 'text-red-600' : 'text-gray-700'}`}>{product.stock}</span>
                            </td>
                            <td className="px-8 py-6">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${product.stock > 0 ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100' : 'bg-red-50 text-red-700 ring-1 ring-red-100'}`}>
                                {product.status}
                              </span>
                            </td>
                            <td className="px-8 py-6 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button className="p-2 text-gray-400 hover:text-zinc-900 hover:bg-gray-100 rounded-xl transition-colors" title="Edit">
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors" title="Delete">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-gray-400 hover:text-zinc-600 hover:bg-gray-100 rounded-xl transition-colors sm:hidden">
                                  <MoreHorizontal className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {['orders', 'earnings', 'settings'].includes(activeTab) && (
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center max-w-2xl mx-auto mt-10">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Settings className="w-8 h-8 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3 capitalize tracking-tight" style={{ fontFamily: 'var(--font-serif)' }}>{activeTab} Management</h2>
                <p className="text-gray-500 max-w-md mx-auto leading-relaxed">This section is currently under development. You will be able to manage your {activeTab} here soon.</p>
                <button 
                  onClick={() => setActiveTab('overview')}
                  className="mt-8 bg-zinc-900 text-white font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-black transition-colors"
                >
                  Return to Overview
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
