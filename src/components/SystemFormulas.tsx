import React, { useState } from 'react';
import { Plus, Settings2, Layers, Info, ChevronRight, Calculator, Beaker } from 'lucide-react';
import { SystemFormula } from '../types';
import { cn } from '../lib/utils';
import { SystemForm } from './SystemForm';

const mockFormulas: SystemFormula[] = [
  {
    id: 'sys1',
    name: 'Metallic System',
    description: 'High-gloss artistic flooring system with metallic pigments.',
    adminId: 'global',
    layers: [
      { id: 'l1', name: 'Base Coat (Epoxy)', productType: 'Epoxy', coverage: 500, unitSize: 3 },
      { id: 'l2', name: 'Metallic Design Coat', productType: 'Epoxy', coverage: 60, unitSize: 3 },
      { id: 'l3', name: 'Metallic Pigment', productType: 'Metallic Pigment', coverage: 30, unitSize: 1 },
      { id: 'l4', name: 'Urethane Top Coat', productType: 'Top Coat', coverage: 500, unitSize: 1, isOptional: true },
    ]
  },
  {
    id: 'sys2',
    name: 'Epoxy 2-Day Flake',
    description: 'Traditional double-broadcast or full-broadcast flake system.',
    adminId: 'global',
    layers: [
      { id: 'l5', name: 'Primer/Base Coat', productType: 'Epoxy', coverage: 250, unitSize: 3 },
      { id: 'l6', name: 'Flake Broadcast', productType: 'Flakes', coverage: 12.5, unitSize: 1 },
      { id: 'l7', name: 'Polyaspartic Top Coat', productType: 'Polyaspartic', coverage: 120, unitSize: 1 },
    ]
  }
];

export const SystemFormulas = () => {
  const [selectedFormula, setSelectedFormula] = useState<SystemFormula | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  return (
    <div className="space-y-8">
      {isCreating && (
        <SystemForm 
          onClose={() => setIsCreating(false)} 
          onSave={() => setIsCreating(false)} 
        />
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Smart Systems</h1>
          <p className="text-zinc-500">Define multi-layer formulas and coverage rules for automated quoting.</p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="inline-flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-zinc-800 transition-colors"
        >
          <Plus size={18} />
          Create System
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* System List */}
        <div className="lg:col-span-1 space-y-4">
          {mockFormulas.map((formula) => (
            <div 
              key={formula.id}
              onClick={() => setSelectedFormula(formula)}
              className={cn(
                "p-5 rounded-xl border transition-all cursor-pointer group",
                selectedFormula?.id === formula.id 
                  ? "bg-white border-zinc-900 shadow-md" 
                  : "bg-white border-zinc-200 hover:border-zinc-400"
              )}
            >
              <div className="flex justify-between items-start mb-3">
                <div className={cn(
                  "p-2 rounded-lg transition-colors",
                  selectedFormula?.id === formula.id ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-600"
                )}>
                  <Beaker size={20} />
                </div>
                <ChevronRight size={18} className={cn(
                  "text-zinc-300 group-hover:text-zinc-900 transition-colors",
                  selectedFormula?.id === formula.id && "text-zinc-900"
                )} />
              </div>
              <h3 className="font-bold text-lg mb-1">{formula.name}</h3>
              <p className="text-zinc-500 text-sm line-clamp-2">{formula.description}</p>
            </div>
          ))}
        </div>

        {/* System Details / Editor */}
        <div className="lg:col-span-2">
          {selectedFormula ? (
            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-xl">{selectedFormula.name}</h3>
                  <p className="text-sm text-zinc-500">System Configuration & Layers</p>
                </div>
                <button className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors">
                  <Settings2 size={20} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest">System Layers</div>
                  {selectedFormula.layers.map((layer, index) => (
                    <div key={layer.id} className="flex items-center gap-4 p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                      <div className="w-8 h-8 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-xs font-bold text-zinc-400">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm">{layer.name}</span>
                          {layer.isOptional && (
                            <span className="text-[10px] bg-zinc-200 text-zinc-600 px-1.5 py-0.5 rounded font-bold uppercase">Optional</span>
                          )}
                        </div>
                        <div className="text-xs text-zinc-500">{layer.productType}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold">
                          {layer.coverage} <span className="text-zinc-400 font-normal">sq ft</span>
                        </div>
                        <div className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest">
                          Per {layer.unitSize} Units
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-zinc-100">
                  <div className="bg-zinc-900 rounded-xl p-6 text-white">
                    <div className="flex items-center gap-3 mb-4">
                      <Calculator className="text-zinc-400" size={20} />
                      <span className="font-bold">Smart Calculation Logic</span>
                    </div>
                    <div className="text-sm text-zinc-400 space-y-3">
                      <p>
                        When an installer enters <span className="text-white font-mono">500 sq ft</span> for a <span className="text-white font-medium">{selectedFormula.name}</span>:
                      </p>
                      <ul className="space-y-2 list-disc list-inside">
                        {selectedFormula.layers.map(layer => (
                          <li key={layer.id}>
                            {layer.name}: <span className="text-white font-mono">
                              {Math.ceil((500 / layer.coverage) * layer.unitSize)}
                            </span> units required
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-zinc-200 border-dashed p-20 text-center flex flex-col items-center justify-center text-zinc-400">
              <Layers size={48} className="mb-4 opacity-20" />
              <p className="text-lg font-medium">Select a system to view its smart formula</p>
              <p className="text-sm max-w-xs mt-2">Smart systems automatically calculate product requirements based on project square footage.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
