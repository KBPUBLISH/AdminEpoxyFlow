import React from 'react';
import { Search, Filter, Mail, Phone, MapPin, Building2, Calendar } from 'lucide-react';
import { Installer } from '../types';
import { InstallerDetails } from './InstallerDetails';

const mockInstallers: Installer[] = [
  {
    id: '1',
    name: 'Mike Johnson',
    email: 'mike@elitecoatings.ca',
    phone: '780-555-0123',
    companyName: 'Elite Coatings Ltd.',
    location: 'Edmonton, AB',
    createdAt: '2024-01-20T10:00:00Z',
  },
  {
    id: '2',
    name: 'Sarah Smith',
    email: 'sarah@modernfloors.com',
    phone: '403-555-0987',
    companyName: 'Modern Floors',
    location: 'Calgary, AB',
    createdAt: '2024-02-15T11:30:00Z',
  },
];

export const Installers = () => {
  const [selectedInstaller, setSelectedInstaller] = React.useState<Installer | null>(null);

  return (
    <div className="space-y-8">
      {selectedInstaller && (
        <InstallerDetails 
          installer={selectedInstaller} 
          onClose={() => setSelectedInstaller(null)} 
        />
      )}
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Registered Installers</h1>
        <p className="text-zinc-500">View and manage installers using the EpoxyFlow mobile application.</p>
      </div>

      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-zinc-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
            <input 
              type="text"
              placeholder="Search installers..."
              className="w-full pl-9 pr-4 py-1.5 text-sm bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-zinc-900 outline-none"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-50 text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                <th className="px-6 py-4">Installer</th>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {mockInstallers.map((installer) => (
                <tr 
                  key={installer.id} 
                  onClick={() => setSelectedInstaller(installer)}
                  className="hover:bg-zinc-50 transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-4">
                    <div className="font-bold text-sm text-zinc-900 group-hover:text-zinc-900 transition-colors">{installer.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Building2 size={14} className="text-zinc-400" />
                      {installer.companyName || 'Independent'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-zinc-600">
                        <Mail size={12} className="text-zinc-400" />
                        {installer.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-zinc-600">
                        <Phone size={12} className="text-zinc-400" />
                        {installer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin size={14} className="text-zinc-400" />
                      {installer.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-zinc-500">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-zinc-400" />
                      {new Date(installer.createdAt).toLocaleDateString()}
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
