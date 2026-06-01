import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, Mail, MapPin, Phone, HelpCircle, ArrowRight, Table } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ContactSubmission } from '../types';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Kemitraan Lisensi POS',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);
  const [historyList, setHistoryList] = useState<ContactSubmission[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load submissions from localStorage on start
  useEffect(() => {
    const saved = localStorage.getItem('omnipos_submissions');
    if (saved) {
      try {
        setHistoryList(JSON.parse(saved));
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.name.trim()) tempErrors.name = 'Nama lengkap wajib diisi';
    if (!formData.email.trim()) {
      tempErrors.email = 'Alamat email wajib diisi';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Format email tidak valid';
    }
    if (!formData.message.trim()) {
      tempErrors.message = 'Isi pesan tidak boleh kosong';
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = 'Isi pesan minimal harus 10 karakter';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate network delay
    setTimeout(() => {
      const newSubmission: ContactSubmission = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        timestamp: new Date().toISOString()
      };

      const updated = [newSubmission, ...historyList];
      setHistoryList(updated);
      localStorage.setItem('omnipos_submissions', JSON.stringify(updated));

      setIsSubmitting(false);
      setSubmittedSuccessfully(true);
      setFormData({
        name: '',
        email: '',
        subject: 'Kemitraan Lisensi POS',
        message: ''
      });

      // Clear success alert after 5 seconds
      setTimeout(() => setSubmittedSuccessfully(false), 5000);
    }, 1200);
  };

  return (
    <section id="kontak" className="py-24 bg-white text-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Group */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-[#93c72b] uppercase bg-neutral-100 px-3.5 py-1.5 rounded-full inline-block mb-3 border border-neutral-200">
            Hubungi Konsultan Kami
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-neutral-950 tracking-tight leading-normal">
            Mari Tingkatkan Skala Usaha Anda Bersama
          </h2>
          <p className="font-sans text-neutral-550 text-sm mt-3 text-neutral-500">
            Punya pertanyaan mengenai setup hardware kasir, integrasi printer, atau harga paket enterprise? Tim ahli kami siap membantu Anda 24/7.
          </p>
        </div>

        {/* Form and Contact Info Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Column 1: Info Cards and addresses (4 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-neutral-50 rounded-3xl p-6 border border-neutral-100 flex gap-4">
              <div className="w-11 h-11 bg-neutral-900 text-white rounded-xl flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-neon-green" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-neutral-900">Email Utama</h4>
                <p className="text-xs text-neutral-500 mt-1 select-all">hello@omnipos-retail.co.id</p>
                <p className="text-xs text-neutral-400 mt-0.5">Balasan jaminan dalam jangka waktu 2 jam kerja.</p>
              </div>
            </div>

            <div className="bg-neutral-50 rounded-3xl p-6 border border-neutral-100 flex gap-4">
              <div className="w-11 h-11 bg-neutral-900 text-white rounded-xl flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-neon-green" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-neutral-900">Hubungi Hotline</h4>
                <p className="text-xs text-neutral-500 mt-1 select-all">+62 (21) 5059-4933</p>
                <p className="text-xs text-neutral-400 mt-0.5">Senin - Jumat | 09:00 - 18:00 WIB</p>
              </div>
            </div>

            <div className="bg-neutral-50 rounded-3xl p-6 border border-neutral-100 flex gap-4">
              <div className="w-11 h-11 bg-neutral-900 text-white rounded-xl flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-neon-green" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-neutral-900">Studio & Kantor Pusat</h4>
                <p className="text-xs text-neutral-500 mt-1">
                  Sudirman Central Business District (SCBD), Tower 4A, Lantai 12, Senayan, Kebayoran Baru, Jakarta Selatan.
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Modern Form Box (7 cols) */}
          <div className="lg:col-span-7 bg-neutral-50/50 rounded-3xl p-6 sm:p-8 border border-neutral-200/80 relative overflow-hidden">
            <h3 className="font-display font-semibold text-xl text-neutral-900 mb-6">Kirim Pesan Langsung</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name field */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase mb-2 tracking-wider">NAMA LENGKAP</label>
                <input
                  type="text"
                  placeholder="Contoh: Raymond Wijaya"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none transition-colors text-sm ${
                    errors.name ? 'border-rose-500 focus:border-rose-600' : 'border-neutral-200 focus:border-neutral-400'
                  }`}
                  id="form-contact-name"
                />
                {errors.name && <p className="text-rose-500 text-xs mt-1 font-medium">{errors.name}</p>}
              </div>

              {/* Email & Subject Fields in responsive row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-2 tracking-wider">ALAMAT EMAIL</label>
                  <input
                    type="email"
                    placeholder="nama@bisnisanda.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none transition-colors text-sm ${
                      errors.email ? 'border-rose-500 focus:border-rose-600' : 'border-neutral-200 focus:border-neutral-400'
                    }`}
                    id="form-contact-email"
                  />
                  {errors.email && <p className="text-rose-500 text-xs mt-1 font-medium">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 uppercase mb-2 tracking-wider">SUBJEK / TOPIK</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white focus:outline-none focus:border-neutral-400 transition-colors text-sm text-neutral-700"
                    id="form-contact-subject"
                  >
                    <option value="Kemitraan Lisensi POS">Kemitraan Lisensi POS</option>
                    <option value="Sewa Hardware & Mesin Kasir">Sewa Hardware & Mesin</option>
                    <option value="Konsultasi Enterprise Custom">Konsultasi Enterprise</option>
                    <option value="Bantuan Teknis System Down">Bantuan Teknis</option>
                  </select>
                </div>
              </div>

              {/* Message field */}
              <div>
                <label className="block text-xs font-bold text-neutral-700 uppercase mb-2 tracking-wider">PESAN ANDA</label>
                <textarea
                  rows={4}
                  placeholder="Tulis rincian kebutuhan usaha Anda, estimasi jumlah kasir, atau kendala sistem yang sedang dihadapi..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none transition-colors text-sm ${
                    errors.message ? 'border-rose-500 focus:border-rose-600' : 'border-neutral-200 focus:border-neutral-400'
                  }`}
                  id="form-contact-message"
                />
                {errors.message && <p className="text-rose-500 text-xs mt-1 font-medium">{errors.message}</p>}
              </div>

              {/* Action Submit Row */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full sm:w-auto px-6 py-3.5 rounded-xl font-display font-medium text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isSubmitting
                      ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                      : 'bg-neutral-950 hover:bg-neutral-800 text-white shadow-md'
                  }`}
                  id="btn-submit-contact"
                >
                  {isSubmitting ? (
                    <>
                      Mengirimkan...
                    </>
                  ) : (
                    <>
                      Kirim Pesan
                      <Send className="w-4 h-4 text-neon-green" />
                    </>
                  )}
                </button>

                {/* Submissions viewer toggle */}
                {historyList.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowHistory(!showHistory)}
                    className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-900 font-semibold underline underline-offset-4 cursor-pointer"
                  >
                    <Table className="w-3.5 h-3.5" />
                    {showHistory ? 'Sembunyikan' : 'Lihat'} Pesan Terkirim ({historyList.length})
                  </button>
                )}
              </div>
            </form>

            {/* In-place Submission Success Notification Box */}
            <AnimatePresence>
              {submittedSuccessfully && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="absolute inset-x-6 top-6 bottom-6 bg-white rounded-2xl flex flex-col items-center justify-center text-center p-6 border border-neutral-200 shadow-xl z-20"
                >
                  <CheckCircle className="w-14 h-14 text-emerald-500 mb-3" />
                  <h4 className="font-display font-semibold text-lg text-neutral-900">Pesan Terkirim dengan Baik!</h4>
                  <p className="text-xs text-neutral-500 mt-1 max-w-sm leading-relaxed">
                    Terima kasih telah menghubungi OmniPOS. Salinan dikonfirmasi dan disimpan di cache browser lokal Anda. Tenaga ahli kami akan membalas via email Anda dalam waktu dekat.
                  </p>
                  <button
                    onClick={() => setSubmittedSuccessfully(false)}
                    className="mt-5 text-xs text-neutral-700 hover:text-neutral-950 font-bold bg-neutral-100 hover:bg-neutral-200 py-2 px-4 rounded-xl transition-all cursor-pointer"
                  >
                    Kirim Pesan Lainnya
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Local storage dynamic logs history table for functional audit */}
        {showHistory && historyList.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-12 bg-neutral-50 rounded-3xl p-6 border border-neutral-200 overflow-hidden"
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-display font-bold text-sm tracking-tight text-neutral-900">
                Pesan Terkirim ke OmniPOS (Penyimpanan Lokal Cache)
              </h4>
              <button
                onClick={() => {
                  if (confirm('Bersihkan riwayat pesan masuk lokal?')) {
                    localStorage.removeItem('omnipos_submissions');
                    setHistoryList([]);
                  }
                }}
                className="text-[10px] text-rose-500 hover:text-rose-600 font-bold uppercase transition-colors cursor-pointer"
              >
                Hapus Semua Riwayat
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-neutral-600">
                <thead>
                  <tr className="border-b border-neutral-200 text-neutral-500 uppercase font-bold tracking-wider text-[10px] bg-neutral-100/50">
                    <th className="py-2.5 px-3">Waktu</th>
                    <th className="py-2.5 px-3">Nama</th>
                    <th className="py-2.5 px-3">Email</th>
                    <th className="py-2.5 px-3">Kategori Topik</th>
                    <th className="py-2.5 px-3">Pesan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {historyList.map((hist, index) => (
                    <tr key={index} className="hover:bg-neutral-100/30 transition-colors">
                      <td className="py-3 px-3 font-mono text-[10px] text-neutral-400 whitespace-nowrap">
                        {new Date(hist.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="py-3 px-3 font-bold text-neutral-800 whitespace-nowrap">{hist.name}</td>
                      <td className="py-3 px-3 select-all">{hist.email}</td>
                      <td className="py-3 px-3 font-semibold text-neutral-700">{hist.subject}</td>
                      <td className="py-3 px-3 text-neutral-500 whitespace-pre-line truncate max-w-xs" title={hist.message}>
                        {hist.message}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
