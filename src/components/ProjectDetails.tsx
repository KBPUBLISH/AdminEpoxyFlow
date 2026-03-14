import React from 'react';
import { X, MapPin, User, Calendar, Ruler, Layers, DollarSign, Mail, Phone, ExternalLink, FileText, Calculator, Image as ImageIcon } from 'lucide-react';
import { ProjectQuote } from '../types';
import { cn } from '../lib/utils';

interface ProjectDetailsProps {
  project: ProjectQuote;
  onClose: () => void;
}

export const ProjectDetails = ({ project, onClose }: ProjectDetailsProps) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-8 py-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center text-white">
              <FileText size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">Project Quote Details</h2>
              <p className="text-sm text-zinc-500">ID: {project.id}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-white rounded-full transition-all border border-transparent hover:border-zinc-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Status & Summary */}
              <div className="flex flex-wrap items-center gap-4">
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest",
                  project.status === 'Pending' ? "bg-amber-50 text-amber-600 border border-amber-100" :
                  project.status === 'Sent' ? "bg-blue-50 text-blue-600 border border-blue-100" :
                  "bg-emerald-50 text-emerald-600 border border-emerald-100"
                )}>
                  {project.status}
                </span>
                <div className="flex items-center gap-2 text-zinc-500 text-sm">
                  <Calendar size={14} />
                  {new Date(project.createdAt).toLocaleDateString()}
                </div>
              </div>

              {/* Visualization Section */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                  <ImageIcon size={14} />
                  Project Visualization
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="relative aspect-video bg-zinc-100 rounded-xl overflow-hidden border border-zinc-200">
                      {project.beforeImage ? (
                        <img 
                          src={project.beforeImage} 
                          alt="Before" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400">
                          <ImageIcon size={24} className="mb-2 opacity-20" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">No Before Image</span>
                        </div>
                      )}
                      <div className="absolute top-3 left-3 px-2 py-1 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold rounded uppercase tracking-widest">
                        Before
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="relative aspect-video bg-zinc-100 rounded-xl overflow-hidden border border-zinc-200">
                      {project.afterImage ? (
                        <img 
                          src={project.afterImage} 
                          alt="After" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400">
                          <ImageIcon size={24} className="mb-2 opacity-20" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">No After Image</span>
                        </div>
                      )}
                      <div className="absolute top-3 left-3 px-2 py-1 bg-zinc-900 text-white text-[10px] font-bold rounded uppercase tracking-widest">
                        After (Visualized)
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Location & Area</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="text-zinc-400 mt-0.5" size={18} />
                      <div>
                        <div className="text-sm font-bold text-zinc-900">{project.location}</div>
                        <div className="text-xs text-zinc-500">Project Site</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Ruler className="text-zinc-400 mt-0.5" size={18} />
                      <div>
                        <div className="text-sm font-bold text-zinc-900">{project.squareFootage} sq ft</div>
                        <div className="text-xs text-zinc-500">Total Surface Area</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">System Selection</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Layers className="text-zinc-400 mt-0.5" size={18} />
                      <div>
                        <div className="text-sm font-bold text-zinc-900">{project.systemType}</div>
                        <div className="text-xs text-zinc-500">Selected Smart System</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.options.map((option, i) => (
                        <span key={i} className="px-2 py-1 bg-zinc-100 rounded text-[10px] font-bold text-zinc-600 uppercase">
                          {option}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Material Breakdown */}
              <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100">
                <h3 className="font-bold text-zinc-900 mb-4 flex items-center gap-2">
                  <Calculator size={18} className="text-zinc-400" />
                  Material Breakdown
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    {project.systemType === 'Polyaspartic 1-Day' && (
                      <>
                        <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-zinc-100">
                          <span className="text-sm text-zinc-500">Base Coat (Polyaspartic)</span>
                          <span className="font-mono font-bold text-zinc-900">{(project.squareFootage / 150).toFixed(1)} Gallons</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-zinc-100">
                          <span className="text-sm text-zinc-500">Decorative Flakes</span>
                          <span className="font-mono font-bold text-zinc-900">{(project.squareFootage / 8).toFixed(1)} Lbs</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-zinc-100">
                          <span className="text-sm text-zinc-500">Top Coat (Polyaspartic)</span>
                          <span className="font-mono font-bold text-zinc-900">{(project.squareFootage / 125).toFixed(1)} Gallons</span>
                        </div>
                      </>
                    )}
                    {project.systemType === 'Epoxy 2-Day' && (
                      <>
                        <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-zinc-100">
                          <span className="text-sm text-zinc-500">Primer / Base Coat (Epoxy)</span>
                          <span className="font-mono font-bold text-zinc-900">{(project.squareFootage / 180).toFixed(1)} Gallons</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-zinc-100">
                          <span className="text-sm text-zinc-500">Decorative Flakes</span>
                          <span className="font-mono font-bold text-zinc-900">{(project.squareFootage / 8).toFixed(1)} Lbs</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-zinc-100">
                          <span className="text-sm text-zinc-500">Top Coat (Polyaspartic)</span>
                          <span className="font-mono font-bold text-zinc-900">{(project.squareFootage / 150).toFixed(1)} Gallons</span>
                        </div>
                      </>
                    )}
                    {project.systemType === 'Metallic' && (
                      <>
                        <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-zinc-100">
                          <span className="text-sm text-zinc-500">Primer (Black/White)</span>
                          <span className="font-mono font-bold text-zinc-900">{(project.squareFootage / 200).toFixed(1)} Gallons</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-zinc-100">
                          <span className="text-sm text-zinc-500">Metallic Base (Epoxy)</span>
                          <span className="font-mono font-bold text-zinc-900">{(project.squareFootage / 50).toFixed(1)} Gallons</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-zinc-100">
                          <span className="text-sm text-zinc-500">Metallic Pigment</span>
                          <span className="font-mono font-bold text-zinc-900">{(project.squareFootage / 100).toFixed(1)} Oz</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white rounded-xl border border-zinc-100">
                          <span className="text-sm text-zinc-500">Top Coat (Urethane)</span>
                          <span className="font-mono font-bold text-zinc-900">{(project.squareFootage / 300).toFixed(1)} Gallons</span>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="pt-4 border-t border-zinc-200 flex justify-between items-center">
                    <div>
                      <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-1 text-right">Total Estimated Cost</div>
                      <div className="text-2xl font-bold text-zinc-900">${project.estimatedCost.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-8">
              <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-4">Installer Info</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white border border-zinc-200 rounded-full flex items-center justify-center text-zinc-400 font-bold">
                      {project.installerName.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-zinc-900">{project.installerName}</div>
                      <div className="text-xs text-zinc-500">{project.companyName || 'Independent Installer'}</div>
                    </div>
                  </div>
                  <div className="space-y-2 pt-4 border-t border-zinc-200">
                    <a href={`mailto:${project.email}`} className="flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-900 transition-colors">
                      <Mail size={14} />
                      {project.email}
                    </a>
                    <a href={`tel:${project.phone}`} className="flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-900 transition-colors">
                      <Phone size={14} />
                      {project.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Actions</h3>
                <div className="grid grid-cols-1 gap-2">
                  <button className="w-full flex flex-col items-center justify-center gap-1 px-4 py-3 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 transition-all group">
                    <div className="flex items-center gap-2 text-sm font-bold">
                      <Mail size={16} /> Send Quote Notification
                    </div>
                    <span className="text-[9px] text-zinc-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Notifies installer that supplier has sent the professional quote
                    </span>
                  </button>
                </div>
              </div>
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
