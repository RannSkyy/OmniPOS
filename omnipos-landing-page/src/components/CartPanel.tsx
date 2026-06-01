import React, { useState } from 'react';
import { Minus, Plus, Trash2, Tag, CreditCard, Wallet, Banknote, Landmark, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartPanelProps {
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, change: number) => void;
  onRemoveItem: (index: number) => void;
  onCheckout: (paymentMethod: string, promoDiscount: number, promoCode: string) => void;
}

export default function CartPanel({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}: CartPanelProps) {
  const [selectedPromo, setSelectedPromo] = useState<'NEWUSER' | 'NONE' | 'FITSALE'>('NEWUSER');
  const [paymentMethod, setPaymentMethod] = useState<string>('Credit Card');

  // Calculates financial summary
  const subTotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Discount percentage
  const discountRate = selectedPromo === 'NEWUSER' ? 0.10 : selectedPromo === 'FITSALE' ? 0.15 : 0.0;
  const discountAmount = subTotal * discountRate;

  // Tax rate (12% as shown in screenshot)
  const taxRate = 0.12;
  const taxAmount = (subTotal - discountAmount) * taxRate;

  // Final Net total
  const totalPayment = subTotal - discountAmount + taxAmount;

  const handleCheckoutClick = () => {
    if (cartItems.length === 0) return;
    const promoCode = selectedPromo === 'NEWUSER' ? 'Promo New User (10%)' : selectedPromo === 'FITSALE' ? 'Seasonal Active Fit (15%)' : 'None';
    onCheckout(paymentMethod, discountRate, promoCode);
  };

  return (
    <div
      id="pos-cart-panel"
      className="w-full lg:w-96 bg-neutral-50/50 border-t lg:border-t-0 lg:border-l border-neutral-200 p-6 flex flex-col justify-between shrink-0 select-none"
    >
      {/* Title block */}
      <div className="mb-6">
        <h2 className="font-display font-bold text-xl text-neutral-900 tracking-tight flex items-center justify-between">
          <span>Detail Transaction</span>
          <span className="text-xs font-mono font-bold bg-neutral-900 text-white rounded-full px-2.5 py-1">
            {cartItems.reduce((sum, item) => sum + item.quantity, 0)} Items
          </span>
        </h2>
        <div className="w-12 h-1 bg-neutral-900 rounded-full mt-2"></div>
      </div>

      {/* Cart items list - scrollable container */}
      <div id="cart-items-scroller" className="flex-1 overflow-y-auto mb-6 pr-1 space-y-4 max-h-[350px] lg:max-h-none scrollbar-none">
        {cartItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2.5xl border border-dashed border-neutral-200 p-6">
            <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-3">
              <Plus className="w-6 h-6 text-neutral-400 rotate-45" />
            </div>
            <p className="text-xs font-bold text-neutral-700">Keranjang Masih Kosong</p>
            <p className="text-[11px] text-neutral-400 mt-1">
              Ketuk tombol &quot;Add to Cart&quot; pada salah satu produk di katalog untuk bertransaksi.
            </p>
          </div>
        ) : (
          cartItems.map((item, index) => (
            <div
              key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${index}`}
              id={`cart-item-row-${index}`}
              className="bg-white rounded-2xl p-3 border border-neutral-100 shadow-sm flex items-center gap-3 active:border-neutral-200 transition-all group"
            >
              {/* Thumbnail image */}
              <div className="w-14 h-14 bg-neutral-50 rounded-xl flex items-center justify-center p-1.5 shrink-0 overflow-hidden relative border border-neutral-100">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Main information & Counter controllers in row */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-1">
                  <h4 className="text-xs font-bold text-neutral-900 truncate leading-snug">
                    {item.product.name}
                  </h4>
                  <button
                    onClick={() => onRemoveItem(index)}
                    className="text-neutral-300 hover:text-rose-500 p-1 rounded-md transition-colors shrink-0"
                    title="Hapus Item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtitle details: Size, Color */}
                <div className="flex items-center gap-2 mt-0.5 mb-2 flex-wrap">
                  <span className="text-[10px] font-mono font-semibold bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded-md">
                    Size {item.selectedSize}
                  </span>
                  {item.selectedColor && (
                    <span className="text-[10px] font-sans text-neutral-400 truncate max-w-[120px]">
                      • {item.selectedColor}
                    </span>
                  )}
                </div>

                {/* Interactive numerical counter */}
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono font-bold text-neutral-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>

                  <div className="flex items-center gap-2 border border-neutral-200 rounded-lg p-0.5 bg-neutral-50">
                    <button
                      onClick={() => onUpdateQuantity(index, -1)}
                      className="p-1 text-neutral-500 hover:text-neutral-950 hover:bg-neutral-200/50 rounded transition-all cursor-pointer"
                      id={`btn-cart-dec-${index}`}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-mono font-bold px-1.5 text-neutral-800">
                      {String(item.quantity).padStart(2, '0')}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(index, 1)}
                      className="p-1 text-neutral-500 hover:text-neutral-950 hover:bg-neutral-200/50 rounded transition-all cursor-pointer"
                      id={`btn-cart-inc-${index}`}
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Promo Discount Code container block */}
      <div id="promo-code-container" className="mb-6">
        <label className="block text-[10px] uppercase font-bold tracking-widest text-neutral-500 mb-2 font-mono">
          PROMO & COUPONS
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setSelectedPromo('NEWUSER')}
            className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all cursor-pointer ${
              selectedPromo === 'NEWUSER'
                ? 'bg-neutral-950 border-neutral-950 text-white'
                : 'bg-white border-neutral-200 hover:bg-neutral-50 text-neutral-600'
            }`}
          >
            <Tag className="w-3.5 h-3.5 mb-1" />
            <span className="text-[9px] font-bold font-mono whitespace-nowrap">NEWUSER (10%)</span>
          </button>

          <button
            onClick={() => setSelectedPromo('FITSALE')}
            className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all cursor-pointer ${
              selectedPromo === 'FITSALE'
                ? 'bg-neutral-950 border-neutral-950 text-white'
                : 'bg-white border-neutral-200 hover:bg-neutral-50 text-neutral-600'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 mb-1" />
            <span className="text-[9px] font-bold font-mono whitespace-nowrap">FITSALE (15%)</span>
          </button>

          <button
            onClick={() => setSelectedPromo('NONE')}
            className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all cursor-pointer ${
              selectedPromo === 'NONE'
                ? 'bg-neutral-950 border-neutral-950 text-white'
                : 'bg-white border-neutral-200 hover:bg-neutral-50 text-neutral-400'
            }`}
          >
            <span className="text-[9px] font-bold font-mono h-[18px] flex items-center">NO PROMO</span>
          </button>
        </div>
      </div>

      {/* Recalculation math ledger board */}
      <div id="recalculate-ledger" className="bg-white rounded-2.5xl p-4 border border-neutral-100 shadow-sm space-y-2 mb-6 font-sans">
        <div className="flex justify-between items-center text-xs text-neutral-500 font-medium">
          <span>Sub-Total</span>
          <span className="font-mono text-neutral-800">${subTotal.toFixed(2)}</span>
        </div>

        {discountAmount > 0 && (
          <div className="flex justify-between items-center text-xs text-emerald-600 font-medium">
            <span className="flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" />
              Diskon ({selectedPromo === 'NEWUSER' ? '10%' : '15%'})
            </span>
            <span className="font-mono font-semibold">-${discountAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between items-center text-xs text-neutral-500 font-medium">
          <span>Tax (12%)</span>
          <span className="font-mono text-neutral-800">${taxAmount.toFixed(2)}</span>
        </div>

        <div className="border-t border-dashed border-neutral-100 pt-2.5 mt-1 select-all flex justify-between items-baseline">
          <span className="text-sm font-bold text-neutral-900">Total Payment</span>
          <span className="font-mono text-xl font-bold text-neutral-950 tracking-tight">
            ${totalPayment.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Payment methods selector tray */}
      <div id="payment-methods-selector" className="mb-6">
        <label className="block text-[10px] uppercase font-bold tracking-widest text-neutral-500 mb-2 font-mono">
          PAYMENT METHOD
        </label>
        <div className="grid grid-cols-4 gap-2">
          {[
            { id: 'Credit Card', icon: CreditCard, label: 'CC' },
            { id: 'Cash', icon: Banknote, label: 'Tunai' },
            { id: 'QRIS Scan', icon: Wallet, label: 'QRIS' },
            { id: 'Bank Transfer', icon: Landmark, label: 'Bank' }
          ].map((method) => {
            const Icon = method.icon;
            const isSelected = paymentMethod === method.id;
            return (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`flex flex-col items-center justify-center py-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-950 border-neutral-950 text-white shadow-sm'
                    : 'bg-white border-neutral-200 hover:bg-neutral-50 text-neutral-600'
                }`}
                title={method.id}
              >
                <Icon className="w-4 h-4 mb-1 text-inherit" />
                <span className="text-[9px] font-semibold whitespace-nowrap">{method.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Checkout Continue action CTA button */}
      <button
        id="btn-pos-continue"
        disabled={cartItems.length === 0}
        onClick={handleCheckoutClick}
        className={`w-full font-display font-bold uppercase tracking-wider py-4 rounded-2xl text-center text-sm transition-all shadow-md ${
          cartItems.length === 0
            ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed shadow-none'
            : 'bg-neon-green hover:bg-neon-hover text-neutral-950 hover:shadow-[0_0_20px_rgba(180,249,60,0.4)] active:scale-98 cursor-pointer'
        }`}
      >
        Continue Checkout
      </button>
    </div>
  );
}
