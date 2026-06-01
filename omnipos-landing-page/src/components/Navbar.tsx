import React, { useState, useEffect } from 'react';
import { Menu, X, Layers, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onNavClick: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavClick, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Beranda', id: 'beranda' },
    { label: 'Interactive Demo', id: 'demo' },
    { label: 'Fitur Unggulan', id: 'fitur' },
    { label: 'Testimoni', id: 'testimoni' },
    { label: 'Hubungi Kami', id: 'kontak' }
  ];

  const handleNav = (id: string) => {
    setIsOpen(false);
    onNavClick(id);
  };

  return (
    <nav
      id="app-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800 py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <div
            id="brand-logo"
            onClick={() => handleNav('beranda')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-neon-green flex items-center justify-center shadow-[0_0_15px_rgba(180,249,60,0.3)] transition-transform duration-300 group-hover:scale-105">
              <Layers className="w-5 h-5 text-neutral-950" />
            </div>
            <div>
              <span className="font-display font-bold text-xl text-white tracking-tight">
                Omni<span className="text-neon-green">POS</span>
              </span>
              <span className="block text-[9px] text-neutral-400 font-mono tracking-wider uppercase -mt-1 leading-none">
                NEXT-GEN SAAS
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleNav(item.id)}
                className={`font-sans text-sm font-medium transition-colors hover:text-neon-green relative py-1 ${
                  activeSection === item.id ? 'text-neon-green' : 'text-neutral-300'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-green rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              id="cta-demo-navbar"
              onClick={() => handleNav('demo')}
              className="flex items-center gap-1 bg-neon-green hover:bg-neon-hover text-neutral-950 font-sans font-bold text-sm px-4 py-2.5 rounded-full transition-all duration-200 hover:shadow-[0_0_20px_rgba(180,249,60,0.4)] hover:-translate-y-0.5 active:translate-y-0"
            >
              Coba Demo Gratis
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-neutral-950 border-b border-neutral-800 mt-3 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`nav-mob-${item.id}`}
                  onClick={() => handleNav(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-neon-soft text-neon-green font-semibold'
                      : 'text-neutral-300 hover:bg-neutral-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2">
                <button
                  id="cta-demo-navbar-mob"
                  onClick={() => handleNav('demo')}
                  className="w-full flex items-center justify-center gap-1 bg-neon-green hover:bg-neon-hover text-neutral-950 font-sans font-bold py-3 rounded-xl transition-all"
                >
                  Coba Demo Gratis
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
