import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowDownCircle,
  ArrowUp,
  Layers,
  Sparkles,
  ShoppingBag,
  Heart,
  ChevronRight,
  TrendingUp,
  CheckCircle,
  MessageSquare
} from 'lucide-react';
import { INITIAL_PRODUCTS, TESTIMONIALS } from './data';
import { Product, CartItem, Transaction } from './types';

// Importing Custom Layout Subcomponents
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import PosWorkspace from './components/PosWorkspace';
import CartPanel from './components/CartPanel';
import Features from './components/Features';
import ContactForm from './components/ContactForm';
import ReceiptModal from './components/ReceiptModal';

export default function App() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeLayoutTab, setActiveLayoutTab] = useState<string>('pos'); // Current tab in the left sidebar
  const [activeSection, setActiveSection] = useState<string>('beranda'); // Current scroll-section for header
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  // Checkout Receipt success modal values
  const [activeReceipt, setActiveReceipt] = useState<{
    id: string;
    items: CartItem[];
    subTotal: number;
    tax: number;
    discount: number;
    total: number;
    paymentMethod: string;
    promoCode: string;
  } | null>(null);

  // Track dynamic scroll boundaries to show/hide "Back to Top" button
  useEffect(() => {
    const handleScroll = () => {
      // Show/Hide back-to-top
      setShowBackToTop(window.scrollY > 400);

      // Section high-lighting boundaries calculation
      const sections = ['beranda', 'demo', 'fitur', 'testimoni', 'kontak'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Jump scroll to specific anchor elements
  const scrollToSection = (sectionId: string) => {
    const dest = document.getElementById(sectionId);
    if (dest) {
      dest.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // Add Item safely to POS Shopping Cart
  const handleAddToCart = (product: Product, selectedSize: number, selectedColor: string) => {
    // Check if item has enough stock in state
    if (product.stock <= 0) {
      alert('Maaf, stok produk sudah habis terjual!');
      return;
    }

    setCart((prevCart) => {
      // Evaluate if identical item (same size & same color) already exists
      const existingIdx = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
      );

      if (existingIdx > -1) {
        const updated = [...prevCart];
        // Ensure quantity doesn't exceed available stock
        if (updated[existingIdx].quantity < product.stock) {
          updated[existingIdx].quantity += 1;
        } else {
          alert(`Maksimal kuantitas adalah batas sisa stok (${product.stock} items).`);
        }
        return updated;
      } else {
        // Create new item entry
        return [
          ...prevCart,
          {
            product,
            quantity: 1,
            selectedSize,
            selectedColor
          }
        ];
      }
    });
  };

  // Safe manual adjustments of quantities in billing cart
  const handleUpdateQuantity = (index: number, change: number) => {
    setCart((prevCart) => {
      const updated = [...prevCart];
      const targetItem = updated[index];
      const maxAvailableStock = targetItem.product.stock;

      const newQty = targetItem.quantity + change;

      if (newQty <= 0) {
        // Remove item if adjusted below zero
        updated.splice(index, 1);
      } else if (newQty > maxAvailableStock) {
        alert(`Maksimal kuantitas dibatasi oleh sisa stok gudang (${maxAvailableStock} items).`);
      } else {
        targetItem.quantity = newQty;
      }
      return updated;
    });
  };

  // Clearing specific index directly
  const handleRemoveItem = (index: number) => {
    setCart((prevCart) => {
      const updated = [...prevCart];
      updated.splice(index, 1);
      return updated;
    });
  };

  // Simulated transaction logic
  const handleCheckout = (paymentMethod: string, promoDiscount: number, promoCode: string) => {
    if (cart.length === 0) return;

    // 1. Calculate transaction receipts financials
    const subTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const discountAmount = subTotal * promoDiscount;
    const taxAmount = (subTotal - discountAmount) * 0.12; // 12% tax rate
    const totalPayment = subTotal - discountAmount + taxAmount;

    // Generate unique random Transaction identifier
    const randId = 'TRX-' + Math.floor(100000 + Math.random() * 900000);

    // 2. Safely deplete actual product stock in React State representing durable POS logic!
    setProducts((prevProducts) => {
      return prevProducts.map((p) => {
        // Find if this product ID is anywhere in the checkout cart
        const cartItemsForProduct = cart.filter((item) => item.product.id === p.id);
        const totalQtyDeducted = cartItemsForProduct.reduce((sum, item) => sum + item.quantity, 0);

        if (totalQtyDeducted > 0) {
          return {
            ...p,
            stock: Math.max(0, p.stock - totalQtyDeducted)
          };
        }
        return p;
      });
    });

    // 3. Mount Receipt modal popup with cost records
    setActiveReceipt({
      id: randId,
      items: cart,
      subTotal,
      tax: taxAmount,
      discount: discountAmount,
      total: totalPayment,
      paymentMethod,
      promoCode
    });

    // 4. Empty local cart setup
    setCart([]);
  };

  // Pre-seed some default items in the cart on first view to match the image of the user!
  // In the image, there is "Nike V2K Run New" (Size 42) and "Phantom and Ba..." (Size 42) in the cart.
  useEffect(() => {
    // Find initial items
    const socksItem = INITIAL_PRODUCTS.find((p) => p.id === 'nike-v2k-run-new');
    const phantomItem = INITIAL_PRODUCTS.find((p) => p.id === 'nike-zoom-phantom-flyknit');

    if (socksItem && phantomItem) {
      setCart([
        {
          product: socksItem,
          quantity: 1,
          selectedSize: 42,
          selectedColor: 'White/Black'
        },
        {
          product: phantomItem,
          quantity: 1,
          selectedSize: 42,
          selectedColor: 'Cocoa Brown/Gold'
        }
      ]);
    }
  }, []);

  return (
    <div id="omnipos-landing-app" className="min-h-screen bg-neutral-950 text-neutral-100 font-sans antialiased overflow-x-hidden selection:bg-neon-green selection:text-neutral-900">
      
      {/* Navbar Section */}
      <Navbar onNavClick={scrollToSection} activeSection={activeSection} />

      {/* Hero Section */}
      <header
        id="beranda"
        className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden flex flex-col items-center justify-center min-h-[90vh]"
      >
        {/* Dynamic mesh graphics */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-4/5 h-[400px] bg-neon-soft rounded-full filter blur-[140px] opacity-40"></div>
        <div className="absolute top-1/3 left-10 w-72 h-72 bg-emerald-500/10 rounded-full filter blur-[100px] opacity-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">
          
          {/* Top Pill Highlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-1.5 bg-neutral-900/80 border border-neutral-800 rounded-full py-1.5 px-4 mb-6 hover:border-neutral-700 transition-colors cursor-pointer"
            onClick={() => scrollToSection('fitur')}
          >
            <Sparkles className="w-3.5 h-3.5 text-neon-green" />
            <span className="text-[11px] font-bold text-neutral-300 font-mono tracking-wider uppercase">
              OMNIPOS V2.4 RILIS UTAMA
            </span>
            <ChevronRight className="w-3 h-3 text-neutral-500" />
          </motion.div>

          {/* Majestic Header title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-bold text-4xl sm:text-5xl lg:text-7xl text-white tracking-tight leading-[1.1] max-w-4xl"
          >
            Inovasi Kasir Ritel <br />
            Lebih Cepat & <span className="text-neon-green relative">
              Sangat Presisi
              <span className="absolute left-0 right-0 bottom-1 sm:bottom-2 h-1.5 bg-neon-green/30 rounded-full"></span>
            </span>
          </motion.h1>

          {/* Subtitle wording */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-sans text-neutral-400 text-sm sm:text-base lg:text-lg max-w-2xl mt-6 leading-relaxed"
          >
            Kelola transaksi ritel, kontrol inventaris sepatu/apparel secara terpusat, dan tingkatkan conversion kasir Anda lewat visual dashboard POS termodern di Indonesia.
          </motion.p>

          {/* CTA Action block buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-10 w-full sm:w-auto"
          >
            <button
              id="hero-btn-demo"
              onClick={() => scrollToSection('demo')}
              className="w-full sm:w-auto flex items-center justify-center gap-1 bg-neon-green hover:bg-neon-hover text-neutral-950 font-sans font-bold text-sm py-4 px-8 rounded-2xl transition-all duration-200 hover:shadow-[0_0_25px_rgba(180,249,60,0.5)] hover:-translate-y-0.5"
            >
              Coba Interactive Demo
              <ArrowDownCircle className="w-4 h-4 ml-1 animate-bounce" />
            </button>
            <button
              id="hero-btn-contact"
              onClick={() => scrollToSection('kontak')}
              className="w-full sm:w-auto flex items-center justify-center gap-1 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white font-sans font-bold text-sm py-4 px-8 rounded-2xl transition-all duration-200"
            >
              Hubungi Konsultan Ritel
            </button>
          </motion.div>

          {/* Scroll down prompt */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-neutral-500 flex flex-col items-center gap-1 select-none text-[11px] font-mono">
            <span>SCROLL DOWN</span>
            <div className="w-0.5 h-6 bg-gradient-to-b from-neon-green to-transparent rounded"></div>
          </div>
        </div>
      </header>

      {/* Main Sandbox Interactive POS Terminal Section */}
      <section
        id="demo"
        className="py-24 bg-neutral-100 text-neutral-900 border-y border-neutral-200 relative"
      >
        <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section titles */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold tracking-widest text-[#93c72b] uppercase bg-white border border-neutral-200 px-3.5 py-1.5 rounded-full inline-block mb-3">
              KLAIM TRANSAKSI KASIR ANDA
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-950 tracking-tight leading-snug">
              Interactive POS Workspace
            </h2>
            <p className="font-sans text-xs sm:text-sm text-neutral-500 mt-2 leading-relaxed">
              Silakan berinteraksi langsung dengan replika terminal kasir OmniPOS di bawah ini. Cari produk, sesuaikan ukuran/warna sepatu, masukkan diskon promo, dan selesaikan checkout untuk mencetak struk.
            </p>
          </div>

          {/* Device Mockup outer frame representing the layout of the user's reference image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            id="device-mockup-frame"
            className="bg-neutral-950 rounded-[35px] p-2.5 sm:p-3.5 shadow-2xl border-4 border-neutral-800 relative overflow-hidden"
          >
            {/* Device interior shine bar */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

            {/* Main Flex-Layout: Sidebar + Main POS Area + Detail Billing Sidebar */}
            <div className="bg-white rounded-[26px] overflow-hidden flex flex-col lg:flex-row h-auto lg:h-[750px]">
              
              {/* Left POS Sidebar Menu */}
              <Sidebar activeTab={activeLayoutTab} setActiveTab={setActiveLayoutTab} />

              <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden">
                {activeLayoutTab === 'pos' ? (
                  <>
                    {/* Central Area: Product grid searching and listings */}
                    <PosWorkspace
                      products={products}
                      onAddToCart={handleAddToCart}
                      cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
                    />

                    {/* Right Area: Detail Transaction and billing math summary */}
                    <CartPanel
                      cartItems={cart}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemoveItem={handleRemoveItem}
                      onCheckout={handleCheckout}
                    />
                  </>
                ) : (
                  // Other placeholder views in the sidebar to avoid "tech larping" and provide actual feedback functionality!
                  <div className="flex-1 bg-white p-8 overflow-y-auto flex flex-col items-center justify-center text-center max-w-xl mx-auto h-[500px] lg:h-auto">
                    <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-4 animate-pulse">
                      <Layers className="w-8 h-8" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-neutral-900">Modul Tab &quot;{activeLayoutTab}&quot; Terkunci</h3>
                    <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                      Layanan ini adalah demonstrasi interaktif khusus halaman utama. Pada sistem produksi, modul ini terhubung penuh ke database ERP gudang Anda. Hubungi kami untuk rincian sistem produksi sesungguhnya!
                    </p>
                    <button
                      onClick={() => setActiveLayoutTab('pos')}
                      className="mt-5 bg-neutral-950 hover:bg-neutral-800 text-white font-sans text-xs font-bold py-2.5 px-5 rounded-xl transition-all cursor-pointer"
                    >
                      Kembali ke Terminal POS
                    </button>
                  </div>
                )}
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* SaaS Feature Highlights Section */}
      <Features />

      {/* Customer Testimonials Section */}
      <section id="testimoni" className="py-24 bg-neutral-50 text-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Titles */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-[#93c72b] uppercase bg-white border border-neutral-200 px-3.5 py-1.5 rounded-full inline-block mb-3">
              Cerita Klien Kami
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-950 tracking-tight leading-snug">
              Direkomendasikan oleh Pemilik Bisnis
            </h2>
            <p className="font-sans text-xs sm:text-sm text-neutral-500 mt-2">
              Bagaimana OmniPOS mentransformasi kecepatan rantai ritel di berbagai kota besar Indonesia.
            </p>
          </div>

          {/* Testimonials bento-grid card layouts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((test) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-white border border-neutral-200/80 p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 relative flex flex-col justify-between"
              >
                {/* Comment quote bubble */}
                <div>
                  {/* Rating Stars mock */}
                  <div className="flex gap-1 mb-5 text-amber-500">
                    <span className="text-lg">★</span>
                    <span className="text-lg">★</span>
                    <span className="text-lg">★</span>
                    <span className="text-lg">★</span>
                    <span className="text-lg">★</span>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed italic">
                    &ldquo;{test.comment}&rdquo;
                  </p>
                </div>

                {/* Profile row */}
                <div className="flex items-center gap-3.5 mt-8 border-t border-neutral-100 pt-5">
                  <img
                    src={test.avatar}
                    alt={test.name}
                    className="w-10 h-10 rounded-full object-cover border border-neutral-200"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900 leading-none">{test.name}</h4>
                    <span className="text-[10px] text-neutral-400 mt-1 block leading-none font-medium">{test.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Onboarding & Contact Form Section */}
      <ContactForm />

      {/* Sleek Footer */}
      <footer className="bg-neutral-950 border-t border-neutral-900 py-12 text-neutral-500 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-8 border-b border-neutral-900">
            {/* Logo Group */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                <Layers className="w-4 h-4 text-neon-green" />
              </div>
              <span className="font-display font-bold text-base text-white tracking-tight">
                Omni<span className="text-neon-green">POS</span>
              </span>
            </div>

            {/* Quick Links Row */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-xs font-medium">
              <button onClick={() => scrollToSection('beranda')} className="hover:text-white transition-colors cursor-pointer">Kembali ke Atas</button>
              <button onClick={() => scrollToSection('demo')} className="hover:text-white transition-colors cursor-pointer">Interactive POS Demo</button>
              <button onClick={() => scrollToSection('fitur')} className="hover:text-white transition-colors cursor-pointer">Fitur Unggulan</button>
              <button onClick={() => scrollToSection('kontak')} className="hover:text-white transition-colors cursor-pointer">Kontak Hubung</button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 text-[11px] font-mono leading-none">
            <p>© {new Date().getFullYear()} OmniPOS Retail Indonesia. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Made with <Heart className="w-3.5 h-3.5 text-rose-500" /> in Jakarta
            </p>
          </div>
        </div>
      </footer>

      {/* Back to Top Floating Button Container */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            id="back-to-top"
            onClick={() => scrollToSection('beranda')}
            title="Kembali ke Atas Halaman"
            className="fixed bottom-6 right-6 z-40 bg-neon-green hover:bg-neon-hover text-neutral-950 w-11 h-11 rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-transform duration-200 active:scale-95 border border-neon-hover hover:scale-105"
          >
            <ArrowUp className="w-5 h-5 stroke-[2.5]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Receipt Modal Overlay Popup */}
      <AnimatePresence>
        {activeReceipt && (
          <ReceiptModal
            transactionId={activeReceipt.id}
            items={activeReceipt.items}
            subTotal={activeReceipt.subTotal}
            tax={activeReceipt.tax}
            discount={activeReceipt.discount}
            total={activeReceipt.total}
            paymentMethod={activeReceipt.paymentMethod}
            promoCode={activeReceipt.promoCode}
            onClose={() => setActiveReceipt(null)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
