/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Inventory } from './components/Inventory';
import { Quotes } from './components/Quotes';
import { SystemFormulas } from './components/SystemFormulas';
import { AdminManagement } from './components/AdminManagement';
import { Installers } from './components/Installers';
import { UserRole } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userRole, setUserRole] = useState<UserRole>('SUPER_ADMIN');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'inventory':
        return <Inventory />;
      case 'systems':
        return <SystemFormulas />;
      case 'quotes':
        return <Quotes />;
      case 'admins':
        return userRole === 'SUPER_ADMIN' ? <AdminManagement /> : <Dashboard />;
      case 'installers':
        return <Installers />;
      case 'settings':
        return (
          <div className="max-w-2xl bg-white p-8 rounded-xl border border-zinc-200 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2 uppercase tracking-wider">Switch Role (Demo Only)</label>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setUserRole('SUPER_ADMIN')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${userRole === 'SUPER_ADMIN' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'}`}
                  >
                    Super Admin
                  </button>
                  <button 
                    onClick={() => setUserRole('ADMIN')}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${userRole === 'ADMIN' ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'}`}
                  >
                    Supplier Admin
                  </button>
                </div>
              </div>
              <div className="pt-6 border-t border-zinc-100">
                <button className="bg-zinc-900 text-white px-6 py-2 rounded-lg font-bold hover:bg-zinc-800 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} userRole={userRole}>
      {renderContent()}
    </Layout>
  );
}

