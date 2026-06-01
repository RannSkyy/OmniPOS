import React from 'react';
import { motion } from 'motion/react';
import { Check, Clipboard, Printer, RefreshCw, X } from 'lucide-react';
import { CartItem } from '../types';

interface ReceiptModalProps {
  transactionId: string;
  items: CartItem[];
  subTotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: string;
  promoCode: string;
  onClose: () => void;
}

export default function ReceiptModal({
  transactionId,
  items,
  subTotal,
  tax,
  discount,
  total,
  paymentMethod,
  promoCode,
  onClose
}: ReceiptModalProps) {
  const currentLocalTime = new Date().toLocaleString('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        id="receipt-modal-container"
        className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full border border-neutral-200 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-4 right-4">
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-950 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Header Animation Circular badge */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-neon-soft text-neon-green rounded-full flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(180,249,60,0.2)]">
            <Check className="w-7 h-7" />
          </div>
          <h3 className="font-display font-bold text-xl text-neutral-900 leading-tight">Transaksi Sukses!</h3>
          <p className="text-xs text-neutral-400 mt-1">Pembayaran via {paymentMethod} Berhasil</p>
        </div>

        {/* Receipt Styled Voucher Body */}
        <div className="bg-neutral-50 rounded-2.5xl p-5 border border-neutral-100 relative">
          {/* Half circles on side for "Receipt look" */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2.5 h-5 bg-white rounded-r-full border-r border-t border-b border-neutral-200/50"></div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2.5 h-5 bg-white rounded-l-full border-l border-t border-b border-neutral-200/50"></div>

          {/* Receipt Info lines */}
          <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 pb-3 border-b border-dashed border-neutral-200 mb-3">
            <span>#{transactionId}</span>
            <span>{currentLocalTime}</span>
          </div>

          {/* Items Listing */}
          <div className="space-y-2 mb-4">
            {items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-xs text-neutral-700 font-sans">
                <span className="truncate max-w-[170px]">
                  {item.product.name}
                  <span className="text-[10px] text-neutral-400 font-mono ml-1">x{item.quantity}</span>
                </span>
                <span className="font-mono text-neutral-800">${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Financial Breakdown calculations block */}
          <div className="space-y-1 text-xs border-t border-dashed border-neutral-200 pt-3">
            <div className="flex justify-between text-neutral-500">
              <span>Sub-Total</span>
              <span className="font-mono">${subTotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>Diskon ({promoCode.includes('10%') ? '10%' : '15%'})</span>
                <span className="font-mono">-${(subTotal * discount).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-neutral-500">
              <span>Pajak (12%)</span>
              <span className="font-mono">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-neutral-905 pt-2 text-sm text-neutral-900 border-t border-dotted border-neutral-200 mt-2">
              <span>Total Selesai</span>
              <span className="font-mono text-neutral-950">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Action button row */}
        <div id="receipt-modal-actions" className="grid grid-cols-2 gap-2.5 mt-6 font-sans">
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-1.5 border border-neutral-200 hover:bg-neutral-50 text-neutral-700 text-xs font-bold py-3.5 rounded-xl transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Cetak Struk
          </button>
          <button
            onClick={onClose}
            className="flex items-center justify-center gap-1.5 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-neutral-300 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Transaksi Baru
          </button>
        </div>
      </motion.div>
    </div>
  );
}
