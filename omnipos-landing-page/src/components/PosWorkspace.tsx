import React, { useState, useMemo } from 'react';
import { Search, Settings, Bell, Plus, ShoppingCart, Info, Star } from 'lucide-react';
import { Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface PosWorkspaceProps {
  products: Product[];
  onAddToCart: (product: Product, size: number, color: string) => void;
  cartCount: number;
}

export default function PosWorkspace({ products, onAddToCart, cartCount }: PosWorkspaceProps) {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Shoes' | 'Clothing' | 'Others Product'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductForConfig, setSelectedProductForConfig] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<number>(42);
  const [selectedColor, setSelectedColor] = useState<string>('');

  // Count metrics for categories
  const categoryCounts = useMemo(() => {
    const counts = {
      All: products.length,
      Shoes: products.filter(p => p.category === 'Shoes').length,
      Clothing: products.filter(p => p.category === 'Clothing').length,
      Others: products.filter(p => p.category === 'Others Product').length
    };
    return counts;
  }, [products]);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory =
        activeCategory === 'All' ||
        (activeCategory === 'Others Product' && product.category === 'Others Product') ||
        product.category === activeCategory;

      const matchSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery, products]);

  // Launch quick selection or add directly
  const handleAddClick = (product: Product) => {
    setSelectedProductForConfig(product);
    setSelectedSize(product.sizeOptions ? product.sizeOptions[2] || 42 : 42);
    setSelectedColor(product.colors ? product.colors[0] : 'Standard');
  };

  const confirmAddToCart = () => {
    if (selectedProductForConfig) {
      onAddToCart(selectedProductForConfig, selectedSize, selectedColor);
      setSelectedProductForConfig(null);
    }
  };

  return (
    <div id="pos-workspace-panel" className="flex-1 bg-white p-4 sm:p-6 lg:p-8 overflow-y-auto">
      {/* Title & Static Header Area resembling screenshot */}
      <div id="pos-header" className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="font-display font-seven font-bold text-2.5xl sm:text-3xl text-neutral-950 tracking-tight leading-none">
            Create Transaction
          </h1>
          <p className="text-xs text-neutral-500 font-sans mt-1">
            Standard POS terminal • Kasir Aktif
          </p>
        </div>

        {/* Header Right Accessory Controls */}
        <div id="pos-header-actions" className="flex items-center gap-3 w-full sm:w-auto self-stretch sm:self-auto justify-end">
          {/* Mock Avatars List */}
          <div className="flex -space-x-2 mr-2 select-none items-center">
            <div className="relative group/avatar cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80"
                alt="Kasir 1"
                className="w-8 h-8 rounded-full object-cover border-2 border-white ring-2 ring-emerald-400"
              />
              <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-emerald-500"></span>
            </div>
            <div className="relative group/avatar cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80"
                alt="Kasir 2"
                className="w-8 h-8 rounded-full object-cover border-2 border-white"
              />
            </div>
            <div className="relative group/avatar cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&h=100&q=80"
                alt="Kasir 3"
                className="w-8 h-8 rounded-full object-cover border-2 border-white"
              />
            </div>
          </div>

          {/* Alert button */}
          <button id="noti-badge" className="p-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl transition-colors relative cursor-pointer">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full"></span>
          </button>

          {/* Quick Settings Gear */}
          <button id="settings-badge" className="p-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl transition-colors cursor-pointer">
            <Settings className="w-5 h-5" />
          </button>

          {/* + New Account button */}
          <button
            id="btn-new-account"
            className="flex items-center gap-1.5 bg-neutral-950 hover:bg-neutral-800 text-white font-sans font-semibold text-xs py-2 px-3 sm:px-4 rounded-xl transition-all shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Account</span>
          </button>
        </div>
      </div>

      {/* Filter Categories Pill Row & Search Field */}
      <div id="filter-search-container" className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        
        {/* Responsive Horizontal Scroll of Pill Selectors */}
        <div id="category-pills" className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto scrollbar-none">
          <button
            id="tab-cat-all"
            onClick={() => setActiveCategory('All')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-sans text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
              activeCategory === 'All'
                ? 'bg-neutral-950 border-neutral-950 text-white shadow-sm'
                : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            <span>All Product</span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full ${
                activeCategory === 'All' ? 'bg-neon-green text-neutral-950 font-bold' : 'bg-neutral-100 text-neutral-500 font-semibold'
              }`}
            >
              320
            </span>
          </button>

          <button
            id="tab-cat-shoes"
            onClick={() => setActiveCategory('Shoes')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-sans text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
              activeCategory === 'Shoes'
                ? 'bg-neutral-950 border-neutral-950 text-white shadow-sm'
                : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            <span>Shoes</span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full ${
                activeCategory === 'Shoes' ? 'bg-neon-green text-neutral-950 font-bold' : 'bg-neutral-100 text-neutral-500 font-semibold'
              }`}
            >
              182
            </span>
          </button>

          <button
            id="tab-cat-clothing"
            onClick={() => setActiveCategory('Clothing')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-sans text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
              activeCategory === 'Clothing'
                ? 'bg-neutral-950 border-neutral-950 text-white shadow-sm'
                : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            <span>Clothing</span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full ${
                activeCategory === 'Clothing' ? 'bg-neon-green text-neutral-950 font-bold' : 'bg-neutral-100 text-neutral-500 font-semibold'
              }`}
            >
              78
            </span>
          </button>

          <button
            id="tab-cat-others"
            onClick={() => setActiveCategory('Others Product')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-sans text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
              activeCategory === 'Others Product'
                ? 'bg-neutral-950 border-neutral-950 text-white shadow-sm'
                : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'
            }`}
          >
            <span>Others Product</span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full ${
                activeCategory === 'Others Product' ? 'bg-neon-green text-neutral-950 font-bold' : 'bg-neutral-100 text-neutral-500 font-semibold'
              }`}
            >
              60
            </span>
          </button>
        </div>

        {/* Unified Search Input bar matching exact screenshot design look */}
        <div id="search-input-wrapper" className="relative w-full lg:w-72">
          <input
            id="input-product-search"
            type="text"
            placeholder="Cari produk Nike..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-50 border border-neutral-200 hover:border-neutral-300 focus:border-neutral-400 focus:outline-none rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium text-neutral-800 transition-colors placeholder-neutral-400"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
        </div>
      </div>

      {/* Grid of Product Cards */}
      <div id="product-grid" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              key={product.id}
              id={`product-card-${product.id}`}
              className="group border border-neutral-100/80 rounded-2.5xl p-4 bg-neutral-50/40 hover:bg-white hover:shadow-2xl hover:shadow-neutral-200/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Capsule Header with stock indicators */}
                <div className="flex justify-between items-center mb-4">
                  <span className="inline-block bg-neutral-950 text-white font-mono font-medium text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {product.stock} Stock
                  </span>
                  
                  {/* Category Stamp Badge */}
                  <span className="text-[10px] text-neutral-400 font-semibold font-mono tracking-wider uppercase">
                    {product.category}
                  </span>
                </div>

                {/* Soft Light Card Area for clean Product Display cutout */}
                <div className="w-full h-44 rounded-2xl bg-neutral-100/60 p-4 mb-4 flex items-center justify-center overflow-hidden transition-colors group-hover:bg-neutral-100 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain object-center scale-95 transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Overlaid Detail Quick Info marker */}
                  <div className="absolute top-2 right-2 flex gap-1 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={() => handleAddClick(product)}
                      title="Lihat Detail Produk"
                      className="p-1.5 bg-white text-neutral-700 hover:text-neutral-950 rounded-lg shadow-md hover:bg-neutral-50"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Name, Info & Specs Description */}
                <h3 className="font-display font-bold text-base text-neutral-900 group-hover:text-neutral-950 transition-colors select-all">
                  {product.name}
                </h3>
                <p className="font-sans text-xs text-neutral-500 mt-1.5 mb-4 line-clamp-2 select-none leading-relaxed h-8">
                  {product.description}
                </p>
              </div>

              {/* Bottom footer Price column and button action */}
              <div className="flex items-center justify-between pt-1 font-sans border-t border-dotted border-neutral-100">
                <span className="font-mono text-base font-bold text-neutral-950 tracking-tight">
                  ${product.price.toFixed(2)}
                </span>

                <button
                  id={`btn-add-cart-${product.id}`}
                  onClick={() => handleAddClick(product)}
                  className="flex items-center gap-1 border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 text-neutral-700 font-sans font-bold text-xs py-1.5 px-3.5 rounded-full transition-all group-active:scale-95 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-neutral-500" />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* No matching results state */}
      {filteredProducts.length === 0 && (
        <div id="no-products-found" className="text-center py-20 bg-neutral-50/50 rounded-3xl border border-dashed border-neutral-200 max-w-lg mx-auto mt-6">
          <ShoppingCart className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
          <p className="text-sm font-semibold text-neutral-800">Tidak ada produk ditemukan</p>
          <p className="text-xs text-neutral-400 mt-1 px-4">
            Coba bersihkan filter pencarian atau gunakan tab kategori lainnya.
          </p>
          <button
            onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
            className="mt-4 text-xs font-bold text-neutral-700 hover:text-neutral-950 hover:underline cursor-pointer"
          >
            Reset Semua Filter
          </button>
        </div>
      )}

      {/* Configuration modal drawer for custom sizing and color option select */}
      <AnimatePresence>
        {selectedProductForConfig && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              id="details-config-modal"
              className="bg-white rounded-3xl p-6 max-w-md w-full border border-neutral-200 shadow-2xl relative"
            >
              {/* Product header info */}
              <div className="flex gap-4 mb-5 border-b border-neutral-100 pb-4">
                <div className="w-20 h-20 bg-neutral-100 rounded-2xl flex items-center justify-center overflow-hidden shrink-0">
                  <img src={selectedProductForConfig.image} alt={selectedProductForConfig.name} className="max-h-full max-w-full object-contain" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mb-1">
                    {selectedProductForConfig.category}
                  </span>
                  <h4 className="font-display font-bold text-lg text-neutral-900 leading-snug">{selectedProductForConfig.name}</h4>
                  <p className="font-mono text-sm font-bold text-neutral-950 mt-0.5">${selectedProductForConfig.price.toFixed(2)}</p>
                </div>
              </div>

              {/* Description block */}
              <p className="text-xs text-neutral-500 leading-relaxed mb-5">
                {selectedProductForConfig.description}
              </p>

              {/* Size Select Option */}
              {selectedProductForConfig.sizeOptions && (
                <div className="mb-5">
                  <label className="block text-xs font-bold text-neutral-700 mb-2 uppercase tracking-wide">PILIH UKURAN (SIZE)</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedProductForConfig.sizeOptions.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-10 h-10 rounded-xl font-mono text-xs font-bold border transition-all cursor-pointer ${
                          selectedSize === size
                            ? 'bg-neutral-950 border-neutral-950 text-white shadow-sm'
                            : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection Accent option */}
              {selectedProductForConfig.colors && (
                <div className="mb-6">
                  <label className="block text-xs font-bold text-neutral-700 mb-2 uppercase tracking-wide">PILIH WARNA / VARIASI</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedProductForConfig.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`text-xs px-3.5 py-2 rounded-xl font-medium border transition-all cursor-pointer ${
                          selectedColor === color
                            ? 'bg-neutral-950 border-neutral-950 text-white'
                            : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Button confirmation footer row */}
              <div className="flex gap-2.5">
                <button
                  id="btn-config-cancel"
                  onClick={() => setSelectedProductForConfig(null)}
                  className="flex-1 border border-neutral-200 hover:bg-neutral-50 text-neutral-700 text-xs font-bold py-3 rounded-xl transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  id="btn-config-confirm"
                  onClick={confirmAddToCart}
                  className="flex-1 bg-neon-green hover:bg-neon-hover text-neutral-950 text-xs font-bold py-3 rounded-xl transition-all hover:shadow-[0_0_15px_rgba(180,249,60,0.4)] cursor-pointer"
                >
                  Tambahkan Produk
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
