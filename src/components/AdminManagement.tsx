import React, { useState } from 'react';
import { Plus, Shield, Search, MoreHorizontal, UserPlus, ExternalLink, Activity, X, Mail, Building2, MapPin, User } from 'lucide-react';
import { AdminAccount } from '../types';
import { cn } from '../lib/utils';

const mockAdmins: AdminAccount[] = [
  {
    id: '1',
    name: 'Robert Wilson',
    email: 'robert@edmontonepoxy.ca',
    companyName: 'Edmonton Epoxy Supplies',
    location: 'Edmonton, AB',
    subscriptionStatus: 'Active',
    createdAt: '2024-01-15T08:00:00Z',
  },
  {
    id: '2',
    name: 'Jessica Lee',
    email: 'jessica@calgarycoatings.com',
    companyName: 'Calgary Coating Center',
    location: 'Calgary, AB',
    subscriptionStatus: 'Active',
    createdAt: '2024-02-10T09:30:00Z',
  },
];

export const AdminManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companyName: '',
    location: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API
    console.log('Creating admin:', formData);
    setIsModalOpen(false);
    setFormData({ name: '', email: '', companyName: '', location: '' });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Admin Accounts</h1>
          <p className="text-zinc-500">Manage supplier accounts, subscriptions, and access levels.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-zinc-800 transition-colors"
        >
          <UserPlus size={18} />
          Create Admin
        </button>
      </div>

      {/* Create Admin Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
              <h2 className="text-lg font-bold tracking-tight">Create New Admin</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-zinc-900 hover:bg-white rounded-full transition-all border border-transparent hover:border-zinc-200"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full pl-10 pr-4 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full pl-10 pr-4 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Company Name</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                  <input
                    required
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Acme Epoxy Supplies"
                    className="w-full pl-10 pr-4 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
                  <input
                    required
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Edmonton, AB"
                    className="w-full pl-10 pr-4 py-2 text-sm bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-zinc-200 text-zinc-600 rounded-xl text-sm font-bold hover:bg-zinc-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-zinc-900 text-white rounded-xl text-sm font-bold hover:bg-zinc-800 transition-all"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Total Suppliers</div>
          <div className="text-3xl font-bold">24</div>
          <div className="mt-4 flex items-center gap-2 text-xs text-emerald-600 font-medium">
            <Activity size={14} />
            +3 this month
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Monthly Recurring Revenue</div>
          <div className="text-3xl font-bold">$4,800</div>
          <div className="mt-4 flex items-center gap-2 text-xs text-zinc-400 font-medium">
            Avg. $200/supplier
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Active Leads</div>
          <div className="text-3xl font-bold">156</div>
          <div className="mt-4 flex items-center gap-2 text-xs text-blue-600 font-medium">
            Across all regions
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
            <input 
              type="text"
              placeholder="Search admins..."
              className="w-full pl-9 pr-4 py-1.5 text-sm bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-zinc-900 outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-zinc-900">All</button>
            <button className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-zinc-900">Active</button>
            <button className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-zinc-900">Inactive</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-50 text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                <th className="px-6 py-4">Admin / Company</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Subscription</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {mockAdmins.map((admin) => (
                <tr key={admin.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-zinc-900 rounded flex items-center justify-center text-white text-xs font-bold">
                        {admin.name[0]}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{admin.name}</div>
                        <div className="text-xs text-zinc-500">{admin.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">{admin.location}</div>
                    <div className="text-xs text-zinc-500">{admin.companyName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase">
                      <div className="w-1 h-1 rounded-full bg-emerald-600"></div>
                      {admin.subscriptionStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-zinc-500">
                    {new Date(admin.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button className="p-1.5 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors" title="Login as Admin">
                        <ExternalLink size={16} />
                      </button>
                      <button className="p-1.5 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors">
                        <Shield size={16} />
                      </button>
                      <button className="p-1.5 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors">
                        <MoreHorizontal size={16} />
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
  );
};
