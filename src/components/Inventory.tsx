import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Info, 
  Folder, 
  ChevronRight, 
  ArrowLeft,
  FileText,
  Layers,
  Image as ImageIcon
} from 'lucide-react';
import { Product, Category } from '../types';
import { cn } from '../lib/utils';
import { ProductForm } from './ProductForm';

const mockCategories: Category[] = [
  { id: 'cat1', name: 'Epoxy Systems', type: 'Epoxy', adminId: 'global', description: 'Base resins and primers for multi-day systems.' },
  { id: 'cat2', name: 'Polyaspartic', type: 'Polyaspartic', adminId: 'global', description: 'Fast-cure top coats and one-day systems.' },
  { id: 'cat3', name: 'Decorative Flakes', type: 'Flakes', adminId: 'global', description: 'Full broadcast flake options.' },
  { id: 'cat4', name: 'Metallic Pigments', type: 'Metallic Pigment', adminId: 'global', description: 'Vibrant pigments for artistic floors.' },
  { id: 'cat5', name: 'Top Coats', type: 'Top Coat', adminId: 'global', description: 'Final protective layers.' },
];

const mockProducts: Product[] = [
  { id: '1', categoryId: 'cat1', name: 'Base Epoxy Resin (Clear)', unit: 'gallon', pricePerUnit: 45, description: 'High-quality base resin for metallic systems', adminId: 'global', imageUrl: 'https://picsum.photos/seed/epoxy1/400/400' },
  { id: '2', categoryId: 'cat1', name: 'Base Epoxy Resin (Grey)', unit: 'gallon', pricePerUnit: 48, description: 'Pigmented base resin for solid color systems', adminId: 'global', imageUrl: 'https://picsum.photos/seed/epoxy2/400/400' },
  { id: '3', categoryId: 'cat2', name: 'Polyaspartic 85% Solids', unit: 'gallon', pricePerUnit: 85, description: 'UV resistant fast-cure top coat', adminId: 'global', imageUrl: 'https://picsum.photos/seed/poly1/400/400' },
  { id: '4', categoryId: 'cat4', name: 'Silver Metallic Pigment', unit: 'container', pricePerUnit: 15, description: 'Premium metallic pigment for 3-gallon kits', adminId: 'global', imageUrl: 'https://picsum.photos/seed/pigment1/400/400' },
  { id: '5', categoryId: 'cat4', name: 'Ocean Blue Pigment', unit: 'container', pricePerUnit: 18, description: 'Deep blue metallic pigment', adminId: 'global', imageUrl: 'https://picsum.photos/seed/pigment2/400/400' },
  { id: '6', categoryId: 'cat3', name: 'Grey Flakes (40lb)', unit: 'box', pricePerUnit: 120, description: 'Standard decorative flakes', adminId: 'global', imageUrl: 'https://picsum.photos/seed/flakes1/400/400' },
  { id: '7', categoryId: 'cat3', name: 'Blue Marble Flakes (40lb)', unit: 'box', pricePerUnit: 135, description: 'Premium decorative flakes', adminId: 'global', imageUrl: 'https://picsum.photos/seed/flakes2/400/400' },
];

export const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const filteredCategories = mockCategories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProducts = mockProducts.filter(prod => 
    prod.categoryId === selectedCategory?.id &&
    prod.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {isAddingProduct && (
        <ProductForm 
          category={selectedCategory} 
          onClose={() => setIsAddingProduct(false)} 
          onSave={() => setIsAddingProduct(false)} 
        />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-zinc-500 mb-2">
            <button 
              onClick={() => setSelectedCategory(null)}
              className={cn("hover:text-zinc-900 transition-colors", selectedCategory && "font-medium")}
            >
              Inventory
            </button>
            {selectedCategory && (
              <>
                <ChevronRight size={14} />
                <span className="text-zinc-900 font-bold">{selectedCategory.name}</span>
              </>
            )}
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            {selectedCategory ? selectedCategory.name : 'Product Categories'}
          </h1>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsAddingProduct(true)}
            className="inline-flex items-center gap-2 bg-white border border-zinc-200 text-zinc-900 px-4 py-2 rounded-lg font-medium hover:bg-zinc-50 transition-colors"
          >
            <Plus size={18} />
            {selectedCategory ? 'Add Product' : 'New Category'}
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <input 
            type="text"
            placeholder={selectedCategory ? `Search in ${selectedCategory.name}...` : "Search categories..."}
            className="w-full pl-10 pr-4 py-2 bg-white border border-zinc-200 rounded-lg focus:ring-2 focus:ring-zinc-900 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Grid View */}
      {!selectedCategory ? (
        // Categories View (Folders)
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => {
            const productCount = mockProducts.filter(p => p.categoryId === category.id).length;
            return (
              <div 
                key={category.id} 
                onClick={() => {
                  setSelectedCategory(category);
                  setSearchTerm('');
                }}
                className="bg-white rounded-xl border border-zinc-200 shadow-sm hover:shadow-md hover:border-zinc-300 transition-all cursor-pointer group"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center text-zinc-600 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                      <Folder size={24} />
                    </div>
                    <button className="text-zinc-400 hover:text-zinc-900">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                  <p className="text-zinc-500 text-sm mb-4 line-clamp-2">{category.description}</p>
                  <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-widest">
                    <Layers size={14} />
                    {productCount} Products
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // Products View (Inside Folder)
        <div className="space-y-6">
          <button 
            onClick={() => setSelectedCategory(null)}
            className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Categories
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden group">
                {/* Product Image */}
                <div className="aspect-video bg-zinc-100 relative overflow-hidden">
                  {product.imageUrl ? (
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-300">
                      <ImageIcon size={32} />
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 rounded bg-white/90 backdrop-blur-sm text-zinc-900 text-[10px] font-bold uppercase tracking-wider shadow-sm">
                      {selectedCategory.type}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg line-clamp-1">{product.name}</h3>
                    <button className="text-zinc-400 hover:text-zinc-900 transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                  
                  <p className="text-zinc-500 text-sm mb-4 line-clamp-2 min-h-[40px]">{product.description}</p>
                  
                  <div className="pt-4 border-t border-zinc-100">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest mb-1">Price Per Unit</div>
                        <div className="text-xl font-bold text-zinc-900">${product.pricePerUnit.toFixed(2)}</div>
                      </div>
                      <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest bg-zinc-50 px-2 py-1 rounded border border-zinc-100">
                        {product.unit}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-3 bg-zinc-50 border-t border-zinc-100 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex gap-4">
                    <button className="text-zinc-500 hover:text-zinc-900 flex items-center gap-1 text-xs font-medium">
                      <Edit2 size={14} /> Edit
                    </button>
                    <button className="text-red-500 hover:text-red-700 flex items-center gap-1 text-xs font-medium">
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                  <button className="text-zinc-400 hover:text-zinc-900">
                    <Info size={16} />
                  </button>
                </div>
              </div>
            ))}
            
            {/* Add New Product Card */}
            <button 
              onClick={() => setIsAddingProduct(true)}
              className="border-2 border-dashed border-zinc-200 rounded-xl p-6 flex flex-col items-center justify-center text-zinc-400 hover:border-zinc-900 hover:text-zinc-900 transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-zinc-50 flex items-center justify-center mb-3 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                <Plus size={24} />
              </div>
              <span className="font-bold text-sm">Add New Product</span>
              <span className="text-xs mt-1">to {selectedCategory.name}</span>
            </button>
          </div>
        </div>
      )}

      {/* Info Section */}
      <div className="bg-zinc-900 text-white p-8 rounded-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Category-Based Estimations</h2>
          <p className="text-zinc-400 max-w-2xl mb-6">
            Organizing your inventory into folders allows for better management of bulk uploads. 
            Each product within a category maintains its own unique coverage specs and pricing, which are used to generate real-time quotes for installers.
          </p>
          <div className="flex gap-4">
            <button className="bg-white text-zinc-900 px-6 py-2 rounded-lg font-bold hover:bg-zinc-100 transition-colors">
              Manage Formulas
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      </div>
    </div>
  );
};
