import React, { useState } from 'react';
import { X, Save, Plus, Trash2, Beaker, Info, Calculator, Layers } from 'lucide-react';
import { SystemFormula, Layer } from '../types';
import { cn } from '../lib/utils';

interface SystemFormProps {
  onClose: () => void;
  onSave: (data: any) => void;
  formula?: SystemFormula | null;
}

export const SystemForm = ({ onClose, onSave, formula }: SystemFormProps) => {
  const [name, setName] = useState(formula?.name || '');
  const [description, setDescription] = useState(formula?.description || '');
  const [layers, setLayers] = useState<Partial<Layer>[]>(
    formula?.layers || [
      { id: '1', name: 'Base Coat', productType: 'Polyaspartic', coverage: 375, unitSize: 2 },
      { id: '2', name: 'Top Coat', productType: 'Polyaspartic', coverage: 375, unitSize: 2 }
    ]
  );

  const addLayer = () => {
    setLayers([...layers, { id: Date.now().toString(), name: '', productType: 'Epoxy', coverage: 0, unitSize: 1 }]);
  };

  const removeLayer = (id: string) => {
    setLayers(layers.filter(l => l.id !== id));
  };

  const updateLayer = (id: string, field: keyof Layer, value: any) => {
    setLayers(layers.map(l => l.id === id ? { ...l, [field]: value } : l));
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="px-8 py-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
          <div>
            <h2 className="text-xl font-bold tracking-tight">{formula ? 'Edit Smart System' : 'Create Smart System'}</h2>
            <p className="text-sm text-zinc-500">Define multi-layer formulas for automated quoting.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-white rounded-full transition-all border border-transparent hover:border-zinc-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-8 overflow-y-auto max-h-[75vh]">
          <div className="space-y-8">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">System Name</label>
                <input 
                  type="text" 
                  placeholder="e.g., One-Day Polyaspartic System"
                  className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900 outline-none transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Description</label>
                <input 
                  type="text" 
                  placeholder="Briefly describe this system..."
                  className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900 outline-none transition-all"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            {/* Layers Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">System Layers & Coverage</label>
                <button 
                  onClick={addLayer}
                  className="text-xs font-bold text-zinc-900 flex items-center gap-1 hover:underline"
                >
                  <Plus size={14} /> Add Layer
                </button>
              </div>

              <div className="space-y-3">
                {layers.map((layer, index) => (
                  <div key={layer.id} className="group relative bg-white border border-zinc-200 rounded-2xl p-5 hover:border-zinc-400 transition-all">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                      <div className="md:col-span-4 space-y-1.5">
                        <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Layer Name</label>
                        <input 
                          type="text"
                          value={layer.name}
                          onChange={(e) => updateLayer(layer.id!, 'name', e.target.value)}
                          className="w-full px-3 py-2 bg-zinc-50 border border-zinc-100 rounded-lg text-sm focus:ring-1 focus:ring-zinc-900 outline-none"
                        />
                      </div>
                      <div className="md:col-span-3 space-y-1.5">
                        <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Product Type</label>
                        <select 
                          value={layer.productType}
                          onChange={(e) => updateLayer(layer.id!, 'productType', e.target.value)}
                          className="w-full px-3 py-2 bg-zinc-50 border border-zinc-100 rounded-lg text-sm focus:ring-1 focus:ring-zinc-900 outline-none appearance-none"
                        >
                          <option>Epoxy</option>
                          <option>Polyaspartic</option>
                          <option>Flakes</option>
                          <option>Top Coat</option>
                        </select>
                      </div>
                      <div className="md:col-span-2 space-y-1.5">
                        <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Coverage (Sq Ft)</label>
                        <input 
                          type="number"
                          value={layer.coverage}
                          onChange={(e) => updateLayer(layer.id!, 'coverage', Number(e.target.value))}
                          className="w-full px-3 py-2 bg-zinc-50 border border-zinc-100 rounded-lg text-sm font-mono focus:ring-1 focus:ring-zinc-900 outline-none"
                        />
                      </div>
                      <div className="md:col-span-2 space-y-1.5">
                        <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Unit Size</label>
                        <input 
                          type="number"
                          value={layer.unitSize}
                          onChange={(e) => updateLayer(layer.id!, 'unitSize', Number(e.target.value))}
                          className="w-full px-3 py-2 bg-zinc-50 border border-zinc-100 rounded-lg text-sm font-mono focus:ring-1 focus:ring-zinc-900 outline-none"
                        />
                      </div>
                      <div className="md:col-span-1 flex justify-end pb-2">
                        <button 
                          onClick={() => removeLayer(layer.id!)}
                          className="p-2 text-zinc-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Calculation Preview */}
            <div className="bg-zinc-900 rounded-2xl p-6 text-white overflow-hidden relative">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <Calculator className="text-zinc-500" size={20} />
                  <span className="font-bold text-sm uppercase tracking-widest">Live Formula Preview</span>
                </div>
                <div className="space-y-4">
                  <p className="text-sm text-zinc-400">
                    Based on <span className="text-white font-mono">1,000 sq ft</span> project area:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {layers.map((layer) => (
                      <div key={layer.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                        <div className="text-[10px] text-zinc-500 font-bold uppercase mb-1">{layer.name || 'Unnamed Layer'}</div>
                        <div className="text-xl font-mono font-bold">
                          {layer.coverage && layer.unitSize ? Math.ceil((1000 / layer.coverage) * layer.unitSize) : 0} 
                          <span className="text-xs font-normal text-zinc-500 ml-1">units</span>
                        </div>
                        <div className="text-[9px] text-zinc-600 mt-1">
                          ({layer.coverage} sqft / {layer.unitSize} units)
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-zinc-50 border-t border-zinc-100 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-sm font-bold text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-all"
          >
            Cancel
          </button>
          <button 
            onClick={() => onSave({})}
            className="px-8 py-2.5 bg-zinc-900 text-white rounded-xl text-sm font-bold hover:bg-zinc-800 transition-all flex items-center gap-2 shadow-lg shadow-zinc-900/20"
          >
            <Save size={18} />
            Save System
          </button>
        </div>
      </div>
    </div>
  );
};
