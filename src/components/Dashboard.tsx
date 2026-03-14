import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { TrendingUp, Users, FileText, DollarSign, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';
import { ProjectQuote } from '../types';
import { ProjectDetails } from './ProjectDetails';

const mockProjects: ProjectQuote[] = [
  {
    id: 'Q-8291',
    installerId: 'inst1',
    installerName: 'John Smith',
    companyName: 'Elite Coatings',
    email: 'john@elitecoatings.com',
    phone: '(555) 123-4567',
    location: 'Edmonton, AB',
    squareFootage: 500,
    systemType: 'Polyaspartic 1-Day',
    options: ['Grey Flakes', 'Non-Slip'],
    estimatedCost: 2450,
    status: 'Pending',
    createdAt: '2024-03-12T10:00:00Z',
    beforeImage: 'https://picsum.photos/seed/garage-before/800/600',
    afterImage: 'https://picsum.photos/seed/garage-after/800/600'
  },
  {
    id: 'Q-8292',
    installerId: 'inst2',
    installerName: 'Sarah Miller',
    companyName: 'Miller Floors',
    email: 'sarah@millerfloors.com',
    phone: '(555) 987-6543',
    location: 'Calgary, AB',
    squareFootage: 1200,
    systemType: 'Metallic',
    options: ['Silver Metallic', 'High Gloss'],
    estimatedCost: 5800,
    status: 'Sent',
    createdAt: '2024-03-11T14:30:00Z',
    beforeImage: 'https://picsum.photos/seed/calgary-before/800/600',
    afterImage: 'https://picsum.photos/seed/calgary-after/800/600'
  },
  {
    id: 'Q-8293',
    installerId: 'inst3',
    installerName: 'Mike Johnson',
    companyName: 'Johnson & Sons',
    email: 'mike@johnsonfloors.com',
    phone: '(555) 456-7890',
    location: 'Vancouver, BC',
    squareFootage: 800,
    systemType: 'Epoxy 2-Day',
    options: ['Blue Flakes'],
    estimatedCost: 3200,
    status: 'Completed',
    createdAt: '2024-03-10T09:15:00Z'
  },
  {
    id: 'Q-8294',
    installerId: 'inst4',
    installerName: 'David Wilson',
    companyName: 'Wilson Industrial',
    email: 'david@wilsonind.com',
    phone: '(555) 222-3333',
    location: 'Toronto, ON',
    squareFootage: 2500,
    systemType: 'Epoxy 2-Day',
    options: ['Safety Yellow', 'Heavy Duty'],
    estimatedCost: 12500,
    status: 'Pending',
    createdAt: '2024-03-09T16:45:00Z'
  },
  {
    id: 'Q-8295',
    installerId: 'inst1',
    installerName: 'John Smith',
    companyName: 'Elite Coatings',
    email: 'john@elitecoatings.com',
    phone: '(555) 123-4567',
    location: 'St. Albert, AB',
    squareFootage: 450,
    systemType: 'Polyaspartic 1-Day',
    options: ['Tan Flakes'],
    estimatedCost: 2100,
    status: 'Sent',
    createdAt: '2024-03-08T11:20:00Z'
  }
];

const data = [
  { name: 'Jan', quotes: 40, revenue: 2400 },
  { name: 'Feb', quotes: 30, revenue: 1398 },
  { name: 'Mar', quotes: 20, revenue: 9800 },
  { name: 'Apr', quotes: 27, revenue: 3908 },
  { name: 'May', quotes: 18, revenue: 4800 },
  { name: 'Jun', quotes: 23, revenue: 3800 },
  { name: 'Jul', quotes: 34, revenue: 4300 },
];

const StatCard = ({ title, value, change, icon: Icon, trend }: any) => (
  <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-zinc-100 rounded-lg text-zinc-900">
        <Icon size={20} />
      </div>
      <div className={cn(
        "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
        trend === 'up' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
      )}>
        {trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
        {change}%
      </div>
    </div>
    <div>
      <div className="text-zinc-500 text-sm font-medium mb-1">{title}</div>
      <div className="text-2xl font-bold tracking-tight">{value}</div>
    </div>
  </div>
);

import { cn } from '../lib/utils';

export const Dashboard = () => {
  const [selectedProject, setSelectedProject] = React.useState<ProjectQuote | null>(null);

  return (
    <div className="space-y-8">
      {selectedProject && (
        <ProjectDetails 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}

      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard Overview</h1>
        <p className="text-zinc-500">Welcome back. Here's what's happening with EpoxyFlow today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Quotes" 
          value="1,284" 
          change="12.5" 
          icon={FileText} 
          trend="up" 
        />
        <StatCard 
          title="Active Installers" 
          value="452" 
          change="8.2" 
          icon={Users} 
          trend="up" 
        />
        <StatCard 
          title="Estimated Revenue" 
          value="$245,000" 
          change="4.1" 
          icon={DollarSign} 
          trend="down" 
        />
        <StatCard 
          title="Conversion Rate" 
          value="24.5%" 
          change="2.4" 
          icon={TrendingUp} 
          trend="up" 
        />
      </div>

      {/* Priority: Pending Estimates Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
            <Clock className="text-blue-600" size={20} />
            Pending Estimates
            <span className="ml-2 px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full border border-blue-100">
              {mockProjects.filter(p => p.status === 'Sent').length} ACTION REQUIRED
            </span>
          </h2>
          <button className="text-sm font-medium text-zinc-500 hover:text-zinc-900">View all pending</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProjects.filter(p => p.status === 'Sent').map((project) => (
            <div 
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="bg-white p-6 rounded-2xl border-2 border-blue-50 shadow-sm hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-3">
                <ArrowUpRight size={16} className="text-zinc-300 group-hover:text-blue-600 transition-colors" />
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-bold">
                  {project.installerName.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-zinc-900">{project.installerName}</div>
                  <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{project.companyName}</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">Project</div>
                    <div className="text-sm font-bold text-zinc-900">Garage Reno</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">Estimate</div>
                    <div className="text-sm font-bold text-blue-600">${project.estimatedCost.toLocaleString()}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 pt-3 border-t border-zinc-50">
                  <span className="px-2 py-0.5 bg-zinc-100 rounded text-[10px] font-bold text-zinc-600 uppercase">
                    {project.systemType}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-medium">
                    {project.squareFootage} sq ft
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Quote Volume</h3>
            <select className="text-sm border-zinc-200 rounded-md focus:ring-zinc-900">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorQuotes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#18181b" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#18181b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#71717a'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#71717a'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="quotes" stroke="#18181b" strokeWidth={2} fillOpacity={1} fill="url(#colorQuotes)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Revenue Projection</h3>
            <div className="flex gap-2">
              <div className="flex items-center gap-1 text-xs text-zinc-500">
                <div className="w-2 h-2 rounded-full bg-zinc-900"></div>
                Actual
              </div>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#71717a'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#71717a'}} />
                <Tooltip 
                   contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="revenue" fill="#18181b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
          <h3 className="font-bold text-lg">Recent Project Quotes</h3>
          <button className="text-sm font-medium text-zinc-500 hover:text-zinc-900">View all</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-50 text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                <th className="px-6 py-4">Project</th>
                <th className="px-6 py-4">Installer</th>
                <th className="px-6 py-4">System</th>
                <th className="px-6 py-4">Sq Ft</th>
                <th className="px-6 py-4">Estimate</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {mockProjects.map((project) => (
                <tr 
                  key={project.id} 
                  onClick={() => setSelectedProject(project)}
                  className="hover:bg-zinc-50 transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-4">
                    <div className="font-bold text-sm text-zinc-900 group-hover:text-zinc-900 transition-colors">Garage Reno</div>
                    <div className="text-xs text-zinc-500">{project.location}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-zinc-700">{project.companyName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-zinc-100 text-zinc-700 text-[10px] font-bold uppercase tracking-wider">
                      {project.systemType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-zinc-600">{project.squareFootage} sq ft</td>
                  <td className="px-6 py-4 text-sm font-bold text-zinc-900">${project.estimatedCost.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest",
                      project.status === 'Pending' ? "text-amber-600" :
                      project.status === 'Sent' ? "text-blue-600" :
                      "text-emerald-600"
                    )}>
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        project.status === 'Pending' ? "bg-amber-600" :
                        project.status === 'Sent' ? "bg-blue-600" :
                        "bg-emerald-600"
                      )}></div>
                      {project.status}
                    </span>
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
