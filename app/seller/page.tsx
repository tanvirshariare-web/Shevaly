'use client';

import { useState } from 'react';
import { Package, ShoppingBag, DollarSign, Settings, LayoutDashboard, Menu, X, Bell, Plus, Edit, Trash2, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function SellerDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { title: 'Total Sales', value: '৳ 12,450', icon: DollarSign, color: 'bg-emerald-100 text-emerald-600' },
    { title: 'Active Orders', value: '14', icon: ShoppingBag, color: 'bg-blue-100 text-blue-600' },
    { title: 'Total Products', value: '45', icon: Package, color: 'bg-purple-100 text-purple-600' },
    { title: 'Store Rating', value: '4.8/5', icon: TrendingUp, color: 'bg-orange-100 text-orange-600' },
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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`bg-[#1e293b] text-black transition-all duration-300 z-20 ${isSidebarOpen ? 'w-64' : 'w-20'} fixed md:relative h-screen flex flex-col`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          {isSidebarOpen && (
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[#1e293b] font-bold text-xl">S</div>
              <span className="font-bold text-xl">Seller Hub</span>
            </Link>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/10 rounded-lg text-gray-300">
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
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
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${activeTab === item.id ? 'bg-[#d4d4d8] text-black font-medium' : 'text-gray-300 hover:bg-white/10'}`}
            >
              <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-black' : 'text-gray-400'}`} />
              {isSidebarOpen && <span>{item.name}</span>}
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <Link href="/" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-white/10 transition-colors ${!isSidebarOpen && 'justify-center'}`}>
            <X className="w-5 h-5 text-gray-400" />
            {isSidebarOpen && <span>Exit to Store</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-10">
          <h1 className="text-xl font-bold text-gray-800 capitalize">{activeTab.replace('-', ' ')}</h1>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-500 relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-[#1e293b] rounded-full flex items-center justify-center text-black font-bold">
                M
              </div>
              <span className="font-medium text-sm text-gray-700 hidden sm:block">My Store</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-800">Recent Orders</h2>
                    <button className="text-sm text-[#d4d4d8] font-medium hover:underline" onClick={() => setActiveTab('orders')}>View All</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                          <th className="px-6 py-3 font-medium">Order ID</th>
                          <th className="px-6 py-3 font-medium">Product</th>
                          <th className="px-6 py-3 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {recentOrders.map((order, i) => (
                          <tr key={i} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 font-medium text-gray-900 text-sm">{order.id}</td>
                            <td className="px-6 py-4 text-gray-600 text-sm">{order.product}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                order.status === 'Shipped' ? 'bg-emerald-100 text-emerald-700' :
                                order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                                'bg-orange-100 text-orange-700'
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

                {/* Quick Actions */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => setActiveTab('products')} className="p-4 border border-gray-200 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-[#d4d4d8] hover:bg-zinc-50 transition-colors group">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                        <Plus className="w-5 h-5 text-gray-600 group-hover:text-[#d4d4d8]" />
                      </div>
                      <span className="font-medium text-gray-700 group-hover:text-[#d4d4d8]">Add Product</span>
                    </button>
                    <button onClick={() => setActiveTab('orders')} className="p-4 border border-gray-200 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-[#d4d4d8] hover:bg-zinc-50 transition-colors group">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                        <ShoppingBag className="w-5 h-5 text-gray-600 group-hover:text-[#d4d4d8]" />
                      </div>
                      <span className="font-medium text-gray-700 group-hover:text-[#d4d4d8]">Manage Orders</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-800">My Products</h2>
                <button className="bg-[#d4d4d8] text-black px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-zinc-600 transition-colors">
                  <Plus className="w-4 h-4" /> Add New Product
                </button>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-200">
                        <th className="px-6 py-3 font-medium">Product Name</th>
                        <th className="px-6 py-3 font-medium">Price</th>
                        <th className="px-6 py-3 font-medium">Stock</th>
                        <th className="px-6 py-3 font-medium">Status</th>
                        <th className="px-6 py-3 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {myProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                          <td className="px-6 py-4 text-gray-600">{product.price}</td>
                          <td className="px-6 py-4 text-gray-600">{product.stock}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${product.stock > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                              {product.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                              <Trash2 className="w-4 h-4" />
                            </button>
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
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8 text-gray-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2 capitalize">{activeTab} Management</h2>
              <p className="text-gray-500 max-w-md mx-auto">This section is currently under development. You will be able to manage your {activeTab} here soon.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
