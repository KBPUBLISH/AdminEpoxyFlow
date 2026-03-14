import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  ShieldCheck,
  Bell,
  Beaker
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick: () => void;
  key?: string;
}

const SidebarItem = ({ icon: Icon, label, active, onClick }: SidebarItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 w-full px-4 py-3 text-sm font-medium transition-colors rounded-lg",
      active 
        ? "bg-zinc-900 text-white" 
        : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
    )}
  >
    <Icon size={20} />
    <span>{label}</span>
  </button>
);

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: 'SUPER_ADMIN' | 'ADMIN';
}

export const Layout = ({ children, activeTab, setActiveTab, userRole }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'quotes', label: 'Project Quotes', icon: FileText },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'systems', label: 'Smart Systems', icon: Beaker },
    ...(userRole === 'SUPER_ADMIN' ? [{ id: 'admins', label: 'Admin Accounts', icon: ShieldCheck }] : []),
    { id: 'installers', label: 'Installers', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#E4E3E0] font-sans text-zinc-900">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-zinc-200 transition-transform duration-300 lg:relative lg:translate-x-0",
          !isSidebarOpen && "-translate-x-full lg:hidden"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-6">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
              <div className="w-8 h-8 bg-zinc-900 rounded flex items-center justify-center text-white">E</div>
              <span>EpoxyFlow</span>
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-widest text-zinc-400 font-semibold">
              {userRole === 'SUPER_ADMIN' ? 'Super Admin Panel' : 'Supplier Admin Panel'}
            </div>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            {navigation.map((item) => (
              <SidebarItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                active={activeTab === item.id}
                onClick={() => setActiveTab(item.id)}
              />
            ))}
          </nav>

          <div className="p-4 border-t border-zinc-100">
            <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-bottom border-zinc-200 flex items-center justify-between px-6 shrink-0">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 text-zinc-500 hover:bg-zinc-100 rounded-md"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="flex-1 flex justify-end items-center gap-4">
            <button className="p-2 text-zinc-500 hover:bg-zinc-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-zinc-200">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-semibold">John Doe</div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider">{userRole.replace('_', ' ')}</div>
              </div>
              <div className="w-10 h-10 bg-zinc-200 rounded-full flex items-center justify-center font-bold text-zinc-600">
                JD
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};
