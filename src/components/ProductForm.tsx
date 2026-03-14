import React from 'react';
import { X, Save, Info, Calculator, Package, DollarSign, Layers } from 'lucide-react';
import { Category } from '../types';
import { cn } from '../lib/utils';

interface ProductFormProps {
  category: Category | null;
  onClose: () => void;
  onSave: (data: any) => void;
}

export const ProductForm = ({ category, onClose, onSave }: ProductFormProps) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="px-8 py-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Add New Product</h2>
            <p className="text-sm text-zinc-500">
              Adding to <span className="text-zinc-900 font-semibold">{category?.name || 'General Inventory'}</span>
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-white rounded-full transition-all border border-transparent hover:border-zinc-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-8 overflow-y-auto max-h-[70vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Basic Info */}
            <div className="space-y-6 md:col-span-2">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Product Name</label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-300" size={18} />
                  <input 
                    type="text" 
                    placeholder="e.g., High-Gloss Base Resin"
                    className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Description</label>
                <textarea 
                  rows={3}
                  placeholder="Describe the product use case and technical properties..."
                  className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900 outline-none transition-all resize-none"
                />
              </div>
            </div>

            {/* Pricing & Units */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Price Per Unit</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-300" size={18} />
                <input 
                  type="number" 
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Unit Type</label>
              <select className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-zinc-900 outline-none transition-all appearance-none cursor-pointer">
                <option>Gallon</option>
                <option>Pound (lb)</option>
                <option>Container</option>
                <option>Box</option>
              </select>
            </div>

            {/* Info Note */}
            <div className="md:col-span-2 p-6 bg-zinc-50 border border-zinc-100 rounded-2xl flex gap-4">
              <div className="p-2 bg-white rounded-lg border border-zinc-200 h-fit">
                <Info size={18} className="text-zinc-400" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-zinc-900">Pricing Strategy</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Enter the base cost for this product. Coverage rates and application rules are defined separately in the 
                  <span className="text-zinc-900 font-medium"> Smart Systems</span> section to allow for different application methods.
                </p>
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
            Cancel
          </button>
          <button 
            onClick={() => onSave({})}
            className="px-8 py-2.5 bg-zinc-900 text-white rounded-xl text-sm font-bold hover:bg-zinc-800 transition-all flex items-center gap-2 shadow-lg shadow-zinc-900/20"
          >
            <Save size={18} />
            Save Product
          </button>
        </div>
      </div>
    </div>
  );
};
