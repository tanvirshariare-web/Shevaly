'use client';

import { useState } from 'react';
import { Users, User, Store, ShoppingBag, DollarSign, Settings, LayoutDashboard, Menu, X, Bell, ChevronRight, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { title: 'Total Revenue', value: '৳ 45,231', icon: DollarSign, color: 'bg-emerald-100 text-emerald-600' },
    { title: 'Total Users', value: '1,234', icon: Users, color: 'bg-blue-100 text-blue-600' },
    { title: 'Active Sellers', value: '56', icon: Store, color: 'bg-purple-100 text-purple-600' },
    { title: 'Total Orders', value: '892', icon: ShoppingBag, color: 'bg-orange-100 text-orange-600' },
  ];

  const pendingSellers = [
    { id: 1, name: 'Fashion Hub', owner: 'Rahim Uddin', date: '2023-10-24', status: 'Pending' },
    { id: 2, name: 'Tech Gadgets BD', owner: 'Karim Hasan', date: '2023-10-25', status: 'Pending' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`bg-white border-r border-gray-200 transition-all duration-300 z-20 ${isSidebarOpen ? 'w-64' : 'w-20'} fixed md:relative h-screen flex flex-col`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          {isSidebarOpen && (
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#d4d4d8] rounded-lg flex items-center justify-center text-black font-bold text-xl">H</div>
              <span className="font-bold text-xl text-gray-900">Admin</span>
            </Link>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {[
            { id: 'overview', name: 'Overview', icon: LayoutDashboard },
            { id: 'users', name: 'Users', icon: Users },
            { id: 'sellers', name: 'Sellers', icon: Store },
            { id: 'orders', name: 'Orders', icon: ShoppingBag },
            { id: 'settings', name: 'Settings', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${activeTab === item.id ? 'bg-zinc-50 text-[#d4d4d8] font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-[#d4d4d8]' : 'text-gray-400'}`} />
              {isSidebarOpen && <span>{item.name}</span>}
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <Link href="/" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors ${!isSidebarOpen && 'justify-center'}`}>
            <X className="w-5 h-5 text-gray-400" />
            {isSidebarOpen && <span>Exit Dashboard</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-10">
          <h1 className="text-xl font-bold text-gray-800 capitalize">{activeTab}</h1>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-500 relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border border-gray-300">
              <User className="w-5 h-5 text-gray-500" />
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

              {/* Pending Seller Approvals */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-bold text-gray-800">Pending Seller Approvals</h2>
                  <button className="text-sm text-[#d4d4d8] font-medium hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-200">
                        <th className="px-6 py-3 font-medium">Business Name</th>
                        <th className="px-6 py-3 font-medium">Owner</th>
                        <th className="px-6 py-3 font-medium">Date Applied</th>
                        <th className="px-6 py-3 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {pendingSellers.map((seller) => (
                        <tr key={seller.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-gray-900">{seller.name}</td>
                          <td className="px-6 py-4 text-gray-600">{seller.owner}</td>
                          <td className="px-6 py-4 text-gray-600">{seller.date}</td>
                          <td className="px-6 py-4 text-right space-x-2">
                            <button className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Approve">
                              <CheckCircle className="w-5 h-5" />
                            </button>
                            <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Reject">
                              <XCircle className="w-5 h-5" />
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

          {activeTab === 'sellers' && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-800">Manage Sellers</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-sm border-b border-gray-200">
                      <th className="px-6 py-3 font-medium">Business Name</th>
                      <th className="px-6 py-3 font-medium">Owner</th>
                      <th className="px-6 py-3 font-medium">Status</th>
                      <th className="px-6 py-3 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[
                      { id: 101, name: 'Electro World', owner: 'John Doe', status: 'Active' },
                      { id: 102, name: 'Trendy Fashion', owner: 'Jane Smith', status: 'Active' },
                      { id: 103, name: 'Home Essentials', owner: 'Bob Johnson', status: 'Banned' },
                    ].map((seller) => (
                      <tr key={seller.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900">{seller.name}</td>
                        <td className="px-6 py-4 text-gray-600">{seller.owner}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${seller.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                            {seller.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          {seller.status === 'Active' ? (
                            <button className="px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-200">
                              Ban Seller
                            </button>
                          ) : (
                            <button className="px-3 py-1.5 text-sm font-medium text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200">
                              Unban Seller
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab !== 'overview' && activeTab !== 'sellers' && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8 text-gray-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2 capitalize">{activeTab} Management</h2>
              <p className="text-gray-500 max-w-md mx-auto">This section is currently under development. You will be able to manage {activeTab} here soon.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
