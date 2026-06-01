import React from 'react';
import { Shield, Zap, RefreshCw, BarChart3, Smartphone, Sparkles, ShoppingBag, Terminal } from 'lucide-react';
import { motion } from 'motion/react';

export default function Features() {
  const featuresList = [
    {
      icon: Zap,
      title: 'Kecepatan Sempurna',
      description: 'Didesain khusus dengan rendering kilat untuk transaksi mikro-detik. Kasir Anda dapat melayani ribuan pembeli tanpa hambatan lag.'
    },
    {
      icon: RefreshCw,
      title: 'Sinkronisasi Stok Instan',
      description: 'Pengurangan stok terjadi secara real-time di seluruh point of sale dan gudang pusat Anda secara simultan dengan presisi penuh.'
    },
    {
      icon: BarChart3,
      title: 'Analitik Penjualan Pintar',
      description: 'Lihat produk paling laku, tren pembelian bulanan, dan performa staff kasir langsung melalui platform visual yang interaktif.'
    },
    {
      icon: Smartphone,
      title: 'Responsif & Portabel',
      description: 'Akses dashboard kasir dari iPad, Tablet Android, handphone, maupun komputer desktop dengan kenyamanan visual yang tetap konsisten.'
    },
    {
      icon: Shield,
      title: 'Kepatuhan & Keamanan Tinggi',
      description: 'Protokol enkripsi data tingkat militer yang menjamin keamanan data transaksi pembeli dan integritas finansial bisnis Anda.'
    },
    {
      icon: Sparkles,
      title: 'Manajemen Kupon Super Fleksibel',
      description: 'Atur diskon kustom, syarat minimum pembelian, diskon persentase, kupon musiman secara tak terbatas dalam sekian klik.'
    }
  ];

  const statMetrics = [
    { value: '99.99%', label: 'Sistem Uptime' },
    { value: '$2.5B+', label: 'Volume Transaksi Tahunan' },
    { value: '15,000+', label: 'Toko Ritel Terkemuka' },
    { value: '< 2.1 detik', label: 'Rata-rata Waktu Checkout' }
  ];

  return (
    <section id="fitur" className="py-24 bg-neutral-950 text-white relative overflow-hidden">
      {/* Decorative backdrop mesh gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-soft rounded-full filter blur-[150px] opacity-40"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neutral-800 rounded-full filter blur-[130px] opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading with animation parameters in typography */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-mono font-bold tracking-widest text-neon-green uppercase bg-neon-soft px-3.5 py-1.5 rounded-full inline-block mb-3">
            Sistem Kasir Masa Depan
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            Mengapa Ritel Indonesia Memilih <span className="text-neon-green">OmniPOS</span>?
          </h2>
          <p className="font-sans text-neutral-400 text-sm sm:text-base mt-4 leading-relaxed">
            Dari kedai kopi artisanal hingga butik brand multinasional, OmniPOS menyediakan infrastruktur transaksi andal untuk percepatan ekspansi ritel Anda.
          </p>
        </div>

        {/* Feature Grid with staggered entering indices */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {featuresList.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={idx}
                className="bg-neutral-900/60 hover:bg-neutral-900 border border-neutral-800/80 hover:border-neutral-700/60 p-7 rounded-3xl transition-all duration-300 shadow-md flex flex-col items-start hover:-translate-y-1 relative group"
              >
                <div className="w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center text-neon-green mb-5 group-hover:bg-neon-green group-hover:text-neutral-950 transition-colors duration-300 shadow-inner">
                  <Icon className="w-5.5 h-5.5" />
                </div>
                <h3 className="font-display font-semibold text-lg text-white mb-2">{feat.title}</h3>
                <p className="font-sans text-sm text-neutral-400 leading-relaxed">{feat.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Metric Numbers row */}
        <div className="border border-neutral-800/80 bg-neutral-900/40 rounded-3xl p-8 sm:p-12 relative overflow-hidden backdrop-blur-sm shadow-xl">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Terminal className="w-64 h-64 text-white" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center relative z-10">
            {statMetrics.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-neon-green tracking-tight">
                  {stat.value}
                </span>
                <span className="font-sans text-xs sm:text-sm text-neutral-400 mt-2 font-medium tracking-wide">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
