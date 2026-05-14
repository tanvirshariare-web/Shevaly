'use client';

import { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  Percent, 
  Users, 
  Store, 
  ShoppingBag, 
  Settings, 
  LogOut, 
  Bell, 
  User, 
  Search,
  MessageCircle,
  Menu,
  X,
  DollarSign
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const overviewStats = [
  { title: 'Total Revenue', value: 'BDT 6047', icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { title: 'Total Users', value: '5', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
  { title: 'Active Sellers', value: '1', icon: Store, color: 'text-purple-500', bg: 'bg-purple-50' },
  { title: 'Total Orders', value: '3', icon: ShoppingBag, color: 'text-orange-500', bg: 'bg-orange-50' }
];

const recentOrders = [
  { id: 'HV-1001', customer: 'Ahmed Ali', date: '2026-05-08', amount: 'BDT 2068', status: 'Delivered', statusColor: 'bg-emerald-50 text-emerald-600' },
  { id: 'HV-1002', customer: 'Sadia Islam', date: '2026-05-08', amount: 'BDT 1499', status: 'Processing', statusColor: 'bg-purple-50 text-purple-600' },
  { id: 'HV-1003', customer: 'Hasan Mahmud', date: '2026-05-07', amount: 'BDT 2480', status: 'Shipped', statusColor: 'bg-blue-50 text-blue-600' }
];

const lowStockProducts = [
  { name: 'Slim Fit Denim Jeans', category: 'Bottomwear', stock: 0, statusColor: 'bg-red-50 text-red-600' },
  { name: 'Classic Leather Loafers', category: 'Footwear', stock: 5, statusColor: 'bg-orange-50 text-orange-600' }
];

const pendingSellers = [
  { name: 'Fashion Hub', owner: 'Rahim Uddin', date: '2026-05-08' },
  { name: 'Tech Gadgets BD', owner: 'Karim Hasan', date: '2026-05-07' }
];

const usersData = [
  { id: 1, name: 'Ahmed Ali', email: 'ahmed@example.com', phone: '01700000001', role: 'Customer', roleStyle: 'bg-blue-50 text-blue-600', orders: 5, spent: 'BDT 12450', status: 'Active', isBlocked: false },
  { id: 2, name: 'Sadia Islam', email: 'sadia@example.com', phone: '01800000002', role: 'Customer', roleStyle: 'bg-blue-50 text-blue-600', orders: 2, spent: 'BDT 3890', status: 'Active', isBlocked: false },
  { id: 3, name: 'Rahim Uddin', email: 'rahim@fashionhub.com', phone: '01711111111', role: 'Seller', roleStyle: 'bg-purple-50 text-purple-600', orders: 0, spent: 'BDT 0', status: 'Active', isBlocked: false },
  { id: 4, name: 'Test Blocked User', email: 'blocked@example.com', phone: '01555555555', role: 'Customer', roleStyle: 'bg-blue-50 text-blue-600', orders: 1, spent: 'BDT 599', status: 'Blocked', isBlocked: true },
  { id: 5, name: 'Hevaly Admin', email: 'admin@hevaly.com', phone: '01600000000', role: 'Admin', roleStyle: 'bg-gray-900 text-white', orders: 0, spent: 'BDT 0', status: 'Active', isBlocked: false }
];

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');

  const navigation = [
    { name: 'Overview', icon: LayoutDashboard },
    { name: 'Products', icon: Package },
    { name: 'Categories', icon: Tags },
    { name: 'Offers', icon: Percent },
    { name: 'Users', icon: Users },
    { name: 'Sellers', icon: Store },
    { name: 'Orders', icon: ShoppingBag },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex text-gray-800 font-sans">
      {/* Sidebar */}
      <aside className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 z-20 fixed md:relative h-screen ${isSidebarOpen ? 'w-64' : 'w-0 md:w-20'} overflow-hidden shrink-0`}>
        <div className="h-16 flex items-center px-4 border-b border-gray-100 shrink-0">
          <Link href="/" className="flex items-center gap-2 overflow-hidden mx-auto md:mx-0 min-w-max">
            <div className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center text-gray-900 font-black text-xl shrink-0">H</div>
            <span className={`font-bold text-xl text-gray-900 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden md:block'}`}>Admin</span>
          </Link>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = activeTab === item.name;
            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${isActive ? 'bg-gray-100 text-gray-900 font-bold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium'}`}
                title={!isSidebarOpen ? item.name : undefined}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                <span className={`whitespace-nowrap transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden md:block'}`}>{item.name}</span>
              </button>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-gray-100 shrink-0">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors font-medium">
            <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">N</div>
            <span className={`whitespace-nowrap transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden md:block'}`}>Exit Dashboard</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden h-screen relative">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-8 z-10 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1.5 hover:bg-gray-100 rounded-md text-gray-500 md:hidden">
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">{activeTab}</h1>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <button className="text-gray-400 hover:text-gray-600 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-400 rounded-full border-2 border-white translate-x-1/2 -translate-y-1/2"></span>
            </button>
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden border border-gray-200">
              <User className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto w-full">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            {activeTab === 'Overview' && (
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  {overviewStats.map((stat, i) => (
                    <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg} ${stat.color} shrink-0`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 mb-0.5">{stat.title}</p>
                        <p className="text-xl sm:text-2xl font-bold text-gray-900 leading-none">{stat.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Recent Orders */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden lg:col-span-2">
                    <div className="p-5 sm:px-6 border-b border-gray-50 flex justify-between items-center bg-white sticky top-0">
                      <h2 className="text-base font-bold text-gray-900">Recent Orders</h2>
                      <button className="text-sm text-gray-600 font-medium hover:text-gray-900">View All</button>
                    </div>
                    <div className="divide-y divide-gray-50">
                      {recentOrders.map((order, i) => (
                        <div key={i} className="p-5 sm:px-6 flex justify-between items-center hover:bg-gray-50/50 transition-colors">
                          <div>
                            <div className="font-bold text-gray-900 mb-1">{order.id}</div>
                            <div className="text-sm text-gray-500 font-medium">{order.customer} / {order.date}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-gray-900 mb-1.5">{order.amount}</div>
                            <span className={`px-2.5 py-1 text-xs font-bold rounded-md ${order.statusColor}`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Low Stock */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full lg:h-auto">
                    <div className="p-5 sm:px-6 border-b border-gray-50 flex justify-between items-center bg-white sticky top-0">
                      <h2 className="text-base font-bold text-gray-900">Low Stock Products</h2>
                      <button className="text-sm text-gray-600 font-medium hover:text-gray-900">Manage</button>
                    </div>
                    <div className="divide-y divide-gray-50 flex-1 overflow-y-auto min-h-[300px]">
                      {lowStockProducts.map((product, i) => (
                        <div key={i} className="p-5 sm:px-6 flex justify-between items-center hover:bg-gray-50/50 transition-colors">
                          <div>
                            <div className="font-bold text-gray-900 text-sm mb-1">{product.name}</div>
                            <div className="text-xs text-gray-500 font-medium">{product.category}</div>
                          </div>
                          <span className={`px-2 py-0.5 text-xs font-bold rounded-md whitespace-nowrap ${product.statusColor}`}>
                            Stock {product.stock}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pending Sellers */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-5 sm:px-6 border-b border-gray-50 flex justify-between items-center bg-white sticky top-0">
                    <h2 className="text-base font-bold text-gray-900">Pending Seller Approvals</h2>
                    <button className="text-sm text-gray-600 font-medium hover:text-gray-900">View All</button>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {pendingSellers.map((seller, i) => (
                      <div key={i} className="p-5 sm:px-6 flex justify-between items-center hover:bg-gray-50/50 transition-colors">
                        <div>
                          <div className="font-bold text-gray-900 mb-1">{seller.name}</div>
                          <div className="text-sm text-gray-500 font-medium">{seller.owner} / Applied {seller.date}</div>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-4 py-1.5 text-sm font-bold text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">Approve</button>
                          <button className="px-4 py-1.5 text-sm font-bold text-red-700 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">Reject</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Users' && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text" 
                      placeholder="Search name, email, phone" 
                      className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400 transition-all text-gray-900 placeholder-gray-400"
                    />
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <select className="flex-1 sm:flex-none border border-gray-200 bg-white text-gray-700 text-sm rounded-lg px-3 py-2 outline-none focus:border-gray-400 cursor-pointer">
                      <option>All Roles</option>
                      <option>Customer</option>
                      <option>Seller</option>
                      <option>Admin</option>
                    </select>
                    <select className="flex-1 sm:flex-none border border-gray-200 bg-white text-gray-700 text-sm rounded-lg px-3 py-2 outline-none focus:border-gray-400 cursor-pointer">
                      <option>All Status</option>
                      <option>Active</option>
                      <option>Blocked</option>
                    </select>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                      <tr className="bg-gray-50/50 text-gray-500 font-medium text-sm border-b border-gray-100">
                        <th className="px-6 py-4 font-medium max-w-[200px]">User</th>
                        <th className="px-6 py-4 font-medium">Phone</th>
                        <th className="px-6 py-4 font-medium">Role</th>
                        <th className="px-6 py-4 font-medium">Activity</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-sm">
                      {usersData.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4 max-w-[200px]">
                            <div className="font-bold text-gray-900 mb-0.5 truncate">{user.name}</div>
                            <div className="text-gray-500 truncate">{user.email}</div>
                          </td>
                          <td className="px-6 py-4 text-gray-700 whitespace-nowrap">{user.phone}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full ${user.roleStyle}`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-900 font-medium">{user.orders} orders</div>
                            <div className="text-gray-500 text-xs">{user.spent}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2.5 py-1 text-[11px] font-bold rounded-md ${user.isBlocked ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                            <button className="px-3 py-1.5 text-xs font-bold text-gray-700 border border-gray-200 bg-white rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors">
                              View
                            </button>
                            {user.role !== 'Admin' && (
                              <button className={`px-3 py-1.5 text-xs font-bold border rounded-lg transition-colors ${user.isBlocked ? 'text-emerald-700 border-emerald-100 bg-emerald-50 hover:bg-emerald-100' : 'text-red-700 border-red-100 bg-red-50 hover:bg-red-100'}`}>
                                {user.isBlocked ? 'Unblock' : 'Block'}
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

            {activeTab !== 'Overview' && activeTab !== 'Users' && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center h-[500px] flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gray-100">
                  <LayoutDashboard className="w-8 h-8 text-gray-400" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{activeTab}</h2>
                <p className="text-gray-500 max-w-sm mx-auto">More features for the {activeTab} section are coming soon in the next update.</p>
              </div>
            )}
          </div>
        </div>

        {/* Floating Chat Button */}
        <button className="absolute bottom-6 right-6 w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:bg-gray-300 transition-colors z-50">
          <MessageCircle className="w-6 h-6 text-gray-700" />
        </button>
      </main>
    </div>
  );
}

