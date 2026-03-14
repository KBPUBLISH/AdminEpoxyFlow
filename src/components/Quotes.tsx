import React, { useState } from 'react';
import { Search, Filter, Download, ExternalLink, Mail, Phone, MapPin, Building2, FileText } from 'lucide-react';
import { ProjectQuote } from '../types';
import { cn } from '../lib/utils';

const mockQuotes: ProjectQuote[] = [
  {
    id: '1',
    installerId: 'inst1',
    installerName: 'Mike Johnson',
    companyName: 'Elite Coatings Ltd.',
    email: 'mike@elitecoatings.ca',
    phone: '780-555-0123',
    location: 'Edmonton, AB',
    squareFootage: 500,
    systemType: 'Epoxy 2-Day',
    options: ['Flakes'],
    estimatedCost: 2450.00,
    status: 'Pending',
    createdAt: '2024-03-12T10:30:00Z',
  },
  {
    id: '2',
    installerId: 'inst2',
    installerName: 'Sarah Smith',
    companyName: 'Modern Floors',
    email: 'sarah@modernfloors.com',
    phone: '403-555-0987',
    location: 'Calgary, AB',
    squareFootage: 1200,
    systemType: 'Metallic',
    options: ['Silver Pigment'],
    estimatedCost: 8900.00,
    status: 'Sent',
    createdAt: '2024-03-11T14:20:00Z',
  },
];

export const Quotes = () => {
  const [selectedQuote, setSelectedQuote] = useState<ProjectQuote | null>(null);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Project Quotes</h1>
          <p className="text-zinc-500">Manage incoming leads and project estimates from installers.</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-white border border-zinc-200 px-4 py-2 rounded-lg font-medium hover:bg-zinc-50 transition-colors">
          <Download size={18} />
          Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-4">
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input 
                type="text"
                placeholder="Search quotes, installers..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-zinc-900 outline-none"
              />
            </div>
            <button className="px-4 py-2 bg-white border border-zinc-200 rounded-lg text-zinc-600 hover:bg-zinc-50 transition-colors">
              <Filter size={18} />
            </button>
          </div>

          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-zinc-50 text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                  <th className="px-6 py-4">Installer / Company</th>
                  <th className="px-6 py-4">System</th>
                  <th className="px-6 py-4">Estimate</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {mockQuotes.map((quote) => (
                  <tr 
                    key={quote.id} 
                    onClick={() => setSelectedQuote(quote)}
                    className={cn(
                      "hover:bg-zinc-50 transition-colors cursor-pointer",
                      selectedQuote?.id === quote.id && "bg-zinc-50"
                    )}
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-sm">{quote.installerName}</div>
                      <div className="text-xs text-zinc-500">{quote.companyName}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">{quote.systemType}</div>
                      <div className="text-[10px] text-zinc-400">{quote.squareFootage} sq ft</div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold">${quote.estimatedCost.toLocaleString()}</td>
                    <td className="px-6 py-4 text-xs text-zinc-500">
                      {new Date(quote.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase",
                        quote.status === 'Pending' ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
                      )}>
                        {quote.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          {selectedQuote ? (
            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden sticky top-6">
              <div className="p-6 border-b border-zinc-100">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-lg">Quote Details</h3>
                  <button className="text-zinc-400 hover:text-zinc-900">
                    <ExternalLink size={18} />
                  </button>
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center font-bold text-zinc-600">
                    {selectedQuote.installerName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-bold">{selectedQuote.installerName}</div>
                    <div className="text-xs text-zinc-500">{selectedQuote.companyName}</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-zinc-600">
                    <Mail size={16} className="text-zinc-400" />
                    {selectedQuote.email}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-600">
                    <Phone size={16} className="text-zinc-400" />
                    {selectedQuote.phone}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-600">
                    <MapPin size={16} className="text-zinc-400" />
                    {selectedQuote.location}
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <div className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest mb-3">Project Specs</div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-500">System</span>
                      <span className="font-bold">{selectedQuote.systemType}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-500">Area</span>
                      <span className="font-bold">{selectedQuote.squareFootage} sq ft</span>
                    </div>
                  </div>
                </div>

                {selectedQuote.systemType === 'Metallic' && (
                  <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100">
                    <div className="text-[10px] text-zinc-900 uppercase font-bold tracking-widest mb-3 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-900"></div>
                      Smart Material Breakdown
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Base Coat (500sq/3gal)</span>
                        <span className="font-mono font-bold">{Math.ceil((selectedQuote.squareFootage / 500) * 3)} gal</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Design Coat (60sq/3gal)</span>
                        <span className="font-mono font-bold">{Math.ceil((selectedQuote.squareFootage / 60) * 3)} gal</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Metallic Pigment</span>
                        <span className="font-mono font-bold">{Math.ceil(selectedQuote.squareFootage / 30)} units</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-zinc-100">
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-bold">Total Estimate</span>
                    <span className="text-2xl font-bold text-zinc-900">${selectedQuote.estimatedCost.toLocaleString()}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="bg-zinc-900 text-white py-2 rounded-lg text-sm font-bold hover:bg-zinc-800 transition-colors">
                      Approve Quote
                    </button>
                    <button className="border border-zinc-200 py-2 rounded-lg text-sm font-bold hover:bg-zinc-50 transition-colors">
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-zinc-200 border-dashed p-12 text-center flex flex-col items-center justify-center text-zinc-400">
              <FileText size={48} className="mb-4 opacity-20" />
              <p className="text-sm font-medium">Select a quote to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
