import React from 'react';
import { X, Mail, Phone, MapPin, Building2, Calendar, FileText, ChevronRight, ArrowUpRight, Clock, CheckCircle2 } from 'lucide-react';
import { Installer, ProjectQuote } from '../types';
import { cn } from '../lib/utils';
import { ProjectDetails } from './ProjectDetails';

interface InstallerDetailsProps {
  installer: Installer;
  onClose: () => void;
}

// Mock project history for the installer
const mockHistory: ProjectQuote[] = [
  {
    id: 'Q-9001',
    installerId: '1',
    installerName: 'Mike Johnson',
    companyName: 'Elite Coatings Ltd.',
    email: 'mike@elitecoatings.ca',
    phone: '780-555-0123',
    location: 'Edmonton, AB',
    squareFootage: 650,
    systemType: 'Polyaspartic 1-Day',
    options: ['Full Flake', 'Non-Slip'],
    estimatedCost: 3250,
    status: 'Sent',
    createdAt: '2024-03-10T14:20:00Z',
    beforeImage: 'https://picsum.photos/seed/garage-before/800/600',
    afterImage: 'https://picsum.photos/seed/garage-after/800/600'
  },
  {
    id: 'Q-8950',
    installerId: '1',
    installerName: 'Mike Johnson',
    companyName: 'Elite Coatings Ltd.',
    email: 'mike@elitecoatings.ca',
    phone: '780-555-0123',
    location: 'Sherwood Park, AB',
    squareFootage: 400,
    systemType: 'Epoxy 2-Day',
    options: ['Solid Color'],
    estimatedCost: 1800,
    status: 'Completed',
    createdAt: '2024-03-05T09:15:00Z',
    beforeImage: 'https://picsum.photos/seed/park-before/800/600',
    afterImage: 'https://picsum.photos/seed/park-after/800/600'
  },
  {
    id: 'Q-8820',
    installerId: '1',
    installerName: 'Mike Johnson',
    companyName: 'Elite Coatings Ltd.',
    email: 'mike@elitecoatings.ca',
    phone: '780-555-0123',
    location: 'St. Albert, AB',
    squareFootage: 550,
    systemType: 'Polyaspartic 1-Day',
    options: ['Partial Flake'],
    estimatedCost: 2600,
    status: 'Pending',
    createdAt: '2024-02-28T11:45:00Z'
  }
];

export const InstallerDetails = ({ installer, onClose }: InstallerDetailsProps) => {
  const [selectedProject, setSelectedProject] = React.useState<ProjectQuote | null>(null);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm">
      {selectedProject && (
        <ProjectDetails 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-8 py-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-zinc-100 border border-zinc-200 rounded-xl flex items-center justify-center text-zinc-900 font-bold text-xl">
              {installer.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">{installer.name}</h2>
              <p className="text-sm text-zinc-500">{installer.companyName || 'Independent Installer'}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-white rounded-full transition-all border border-transparent hover:border-zinc-200"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 h-full">
            {/* Sidebar Info */}
            <div className="p-8 border-r border-zinc-100 bg-zinc-50/30 space-y-8">
              <div className="space-y-6">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Contact Details</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="text-zinc-400 mt-0.5" size={16} />
                    <div className="text-sm text-zinc-600 break-all">{installer.email}</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="text-zinc-400 mt-0.5" size={16} />
                    <div className="text-sm text-zinc-600">{installer.phone}</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="text-zinc-400 mt-0.5" size={16} />
                    <div className="text-sm text-zinc-600">{installer.location}</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="text-zinc-400 mt-0.5" size={16} />
                    <div className="text-sm text-zinc-600">Joined {new Date(installer.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-zinc-100 space-y-4">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">App Usage Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-xl border border-zinc-200">
                    <div className="text-xs text-zinc-400 mb-1">Total Quotes</div>
                    <div className="text-xl font-bold text-zinc-900">42</div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-zinc-200">
                    <div className="text-xs text-zinc-400 mb-1">Last Active</div>
                    <div className="text-sm font-bold text-zinc-900">Today</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main History Content */}
            <div className="lg:col-span-3 p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg text-zinc-900">Project History</h3>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-zinc-100 rounded text-[10px] font-bold text-zinc-500 uppercase">All Time</span>
                </div>
              </div>

              <div className="space-y-4">
                {mockHistory.map((project) => (
                  <div 
                    key={project.id} 
                    onClick={() => setSelectedProject(project)}
                    className="group bg-white border border-zinc-200 rounded-2xl p-6 hover:border-zinc-900 transition-all cursor-pointer"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-zinc-50 rounded-lg flex items-center justify-center text-zinc-400 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                          <FileText size={20} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-zinc-900">Garage Floor Reno</span>
                            <span className="text-xs text-zinc-400 font-mono">#{project.id}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-zinc-500">
                            <span className="flex items-center gap-1"><MapPin size={12} /> {project.location}</span>
                            <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(project.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right hidden sm:block">
                          <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1">Estimate</div>
                          <div className="text-sm font-bold text-zinc-900">${project.estimatedCost.toLocaleString()}</div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5",
                            project.status === 'Sent' ? "bg-blue-50 text-blue-600 border border-blue-100" :
                            project.status === 'Completed' ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                            "bg-amber-50 text-amber-600 border border-amber-100"
                          )}>
                            {project.status === 'Sent' && <ArrowUpRight size={12} />}
                            {project.status === 'Completed' && <CheckCircle2 size={12} />}
                            {project.status === 'Pending' && <Clock size={12} />}
                            {project.status === 'Sent' ? 'Sent for Estimate' : project.status}
                          </span>
                          <ChevronRight size={18} className="text-zinc-300 group-hover:text-zinc-900 transition-colors" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State / Load More */}
              <button className="w-full py-4 border-2 border-dashed border-zinc-100 rounded-2xl text-sm font-bold text-zinc-400 hover:border-zinc-200 hover:text-zinc-500 transition-all">
                View Older Projects
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-zinc-50 border-t border-zinc-100 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-sm font-bold text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
