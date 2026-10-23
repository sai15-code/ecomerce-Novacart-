import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { formatPrice } from '../../utils/currency';

export default function OrderSummary() {
  const {
    items,
    totalItemCount,
    distinctItemCount,
    rawSubtotal,
    discountAmount,
    discountPercent,
    standardShippingCost,
    tax,
    grandTotal,
    applyPromo,
    clearCart
  } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [inputCode, setInputCode] = useState('');
  const [promoMessage, setPromoMessage] = useState(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('checkout'); // 'checkout' | 'processing' | 'tracking'
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking' | 'cod'
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Delivery Address State (Amazon / Flipkart format)
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    name: 'Sai Kumar',
    phone: '+91 98765 43210',
    street: 'Flat 402, Prestige Cyber Towers, 80 Feet Road',
    landmark: 'Near Koramangala 4th Block',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560034'
  });

  // Dummy payment fields
  const [dummyUpiId, setDummyUpiId] = useState('saikumar@okhdfcbank');
  const [dummyCardNumber, setDummyCardNumber] = useState('4532 8920 1928 4242');
  const [dummyCardExpiry, setDummyCardExpiry] = useState('12/28');
  const [dummyCardCvv, setDummyCardCvv] = useState('789');

  // Tracking Stage: 'confirmed' | 'packed' | 'shipped' | 'out_for_delivery' | 'delivered'
  const [deliveryStage, setDeliveryStage] = useState('packed');

  const [orderTrackingData, setOrderTrackingData] = useState(() => {
    try {
      const saved = localStorage.getItem('novacart_last_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const stages = [
    { id: 'confirmed', title: 'Confirmed', icon: 'receipt_long', desc: 'Payment verified & order confirmed' },
    { id: 'packed', title: 'Packed', icon: 'inventory_2', desc: 'Item packed at Bengaluru Hub' },
    { id: 'shipped', title: 'Shipped', icon: 'local_shipping', desc: 'In transit via BlueDart Air Cargo' },
    { id: 'out_for_delivery', title: 'Out for Delivery', icon: 'electric_moped', desc: 'Out for delivery to your address' },
    { id: 'delivered', title: 'Delivered', icon: 'verified', desc: 'Delivered & OTP verified' }
  ];

  const getStageIndex = (stageId) => stages.findIndex((s) => s.id === stageId);
  const currentStageIndex = getStageIndex(deliveryStage);

  useEffect(() => {
    if (!checkoutModalOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setCheckoutModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [checkoutModalOpen]);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    const res = applyPromo(inputCode);
    setPromoMessage(res);
    if (res.success) {
      showToast('Promo Code Applied', '10% discount applied to your order');
    }
  };

  const handleCheckoutClick = () => {
    if (items.length === 0) {
      if (orderTrackingData) {
        setCheckoutStep('tracking');
        setCheckoutModalOpen(true);
        return;
      }
      showToast('Shopping Cart Empty', 'Add items to proceed to checkout');
      return;
    }
    // Directly go to clean checkout (Delivery Address + Payment Method)
    setCheckoutStep('checkout');
    setCheckoutModalOpen(true);
  };

  const handleExecutePayment = () => {
    setCheckoutStep('processing');
    setIsProcessingPayment(true);

    setTimeout(() => {
      const newOrder = {
        orderId: 'OD' + Math.floor(1000000000 + Math.random() * 9000000000),
        trackingId: 'FMPC' + Math.floor(1000000000 + Math.random() * 9000000000),
        placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        items: [...items],
        totalItemCount,
        distinctItemCount,
        grandTotal,
        paymentMethod: selectedPaymentMethod,
        address: { ...shippingAddress },
        courier: 'BlueDart Express (Air Logistics)',
        stage: 'packed'
      };

      setOrderTrackingData(newOrder);
      setDeliveryStage('packed');
      try {
        localStorage.setItem('novacart_last_order', JSON.stringify(newOrder));
      } catch (e) {
        console.error(e);
      }

      setIsProcessingPayment(false);
      setCheckoutStep('tracking');
      clearCart();
      showToast('Order Placed Successfully!', `Order #${newOrder.orderId} is confirmed`);
    }, 850);
  };

  const handleDownloadInvoice = () => {
    if (!orderTrackingData) return;
    const content = `================================================
NOVACART INDIA // TAX INVOICE
================================================
Invoice No:    INV-${orderTrackingData.orderId}
Order Date:    ${orderTrackingData.date} at ${orderTrackingData.placedAt}
Tracking No:   ${orderTrackingData.trackingId}
Courier:       BlueDart Express / Ekart Logistics

SHIPPING & BILLING ADDRESS:
Recipient:     ${orderTrackingData.address?.name || 'Sai Kumar'}
Address:       ${orderTrackingData.address?.street || 'Flat 402, Prestige Cyber Towers, 80 Feet Road'}
City, State:   ${orderTrackingData.address?.city || 'Bengaluru'}, ${orderTrackingData.address?.state || 'Karnataka'} - ${orderTrackingData.address?.pincode || '560034'}
Phone:         ${orderTrackingData.address?.phone || '+91 98765 43210'}

PAYMENT DETAILS:
Mode:          ${orderTrackingData.paymentMethod.toUpperCase()} (Verified)
Status:        PAID

ORDERED ITEMS:
${(orderTrackingData.items || []).map((i, idx) => `${idx + 1}. ${i.product.name}
   Variant: ${i.variant || 'Standard'} | Qty: ${i.quantity} | Price: ₹${(i.product.price * i.quantity).toLocaleString('en-IN')}`).join('\n\n')}

------------------------------------------------
Items Subtotal: ₹${(orderTrackingData.grandTotal * 0.89).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
Integrated GST (12%): Included
Delivery Fee:   FREE
------------------------------------------------
TOTAL PAID:     ₹${orderTrackingData.grandTotal.toLocaleString('en-IN')}
================================================
Thank you for shopping with NovaCart India.
================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `NovaCart_Tax_Invoice_${orderTrackingData.orderId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Invoice Downloaded', 'Tax invoice downloaded successfully');
  };

  const handleCopyTracking = () => {
    if (orderTrackingData?.trackingId) {
      navigator.clipboard?.writeText(orderTrackingData.trackingId);
      showToast('Tracking ID Copied', orderTrackingData.trackingId);
    }
  };

  return (
    <div className="sticky top-[92px] flex flex-col gap-space-md">
      {/* Summary Box */}
      <div className="bg-surface rounded-2xl p-space-lg shadow-xl relative flex flex-col gap-space-md border border-border/40">
        <div className="flex items-center justify-between pb-space-xs">
          <h2 className="font-headline-md text-headline-md text-text-primary tracking-tight font-semibold">
            Order Summary
          </h2>
          <span className="font-caption text-caption text-text-muted uppercase tracking-wider">
            INR (GST INCL.)
          </span>
        </div>

        {/* Cost Line Breakdown */}
        <div className="flex flex-col gap-space-sm font-body-md text-body-md">
          <div className="flex justify-between items-center text-text-muted">
            <span>Price ({totalItemCount} {totalItemCount === 1 ? 'item' : 'items'})</span>
            <span className="text-text-primary font-medium">{formatPrice(rawSubtotal)}</span>
          </div>

          {discountPercent > 0 && (
            <div className="flex justify-between items-center text-primary-container">
              <span>Promo Discount ({discountPercent}%)</span>
              <span className="font-medium">-{formatPrice(discountAmount)}</span>
            </div>
          )}

          <div className="flex justify-between items-center text-text-muted">
            <div className="flex items-center gap-1">
              <span>Delivery Charges</span>
              <span
                className="material-symbols-outlined text-[15px] cursor-help opacity-70"
                title="Free delivery on orders over ₹12,000"
              >
                info
              </span>
            </div>
            <span className="text-status-success font-medium uppercase text-label-sm">
              {standardShippingCost === 0 ? 'FREE' : formatPrice(standardShippingCost)}
            </span>
          </div>

          <div className="flex justify-between items-center text-text-muted">
            <div className="flex items-center gap-1">
              <span>Taxes & GST (12%)</span>
              <span
                className="material-symbols-outlined text-[15px] cursor-help opacity-70"
                title="Included in price"
              >
                help_outline
              </span>
            </div>
            <span className="text-text-primary font-medium">{formatPrice(tax)}</span>
          </div>
        </div>

        {/* Promo Code Form */}
        <div className="pt-space-xs">
          <label
            htmlFor="promo-code"
            className="block font-label-sm text-label-sm text-text-muted mb-1.5 uppercase tracking-wider"
          >
            Apply Promo Code
          </label>
          <form onSubmit={handleApplyPromo} className="flex gap-2">
            <input
              type="text"
              id="promo-code"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="e.g. NOVACART10"
              className="bg-surface-container rounded-lg px-space-md py-2.5 font-body-md text-body-md text-text-primary placeholder:text-text-muted placeholder:opacity-60 focus:outline-none flex-1 focus:bg-surface-raised transition-colors uppercase border border-border/40"
            />
            <button
              type="submit"
              className="bg-surface-raised hover:bg-surface-bright text-text-primary font-label-md text-label-md font-semibold px-space-md py-2.5 rounded-lg transition-colors whitespace-nowrap active:scale-95 border border-border/40"
            >
              Apply
            </button>
          </form>
          {promoMessage && (
            <p
              className={`font-caption text-caption mt-1.5 ${
                promoMessage.success ? 'text-primary-container' : 'text-status-danger'
              }`}
            >
              {promoMessage.message}
            </p>
          )}
        </div>

        {/* Subtle Divider Accent */}
        <div className="w-full h-px bg-surface-container-highest my-space-xs" />

        {/* Grand Total Row */}
        <div className="flex justify-between items-baseline">
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-text-primary font-bold">
              Total Amount
            </span>
            <span className="font-caption text-caption text-text-muted">
              Includes all taxes & delivery fees
            </span>
          </div>
          <div className="text-right">
            <span className="font-display-hero-mobile text-display-hero-mobile text-primary-container font-semibold tracking-tight">
              {formatPrice(grandTotal)}
            </span>
            <span className="block font-caption text-[11px] text-text-muted uppercase">
              INR
            </span>
          </div>
        </div>

        {/* Primary CTA Button - Goes directly to Checkout */}
        <button
          type="button"
          onClick={handleCheckoutClick}
          className="w-full bg-primary-container hover:bg-secondary-fixed text-on-primary font-label-md text-label-md font-bold py-3.5 px-space-lg rounded-xl transition-all duration-200 transform active:scale-[0.99] flex items-center justify-center gap-2 shadow-lg"
        >
          <span>Proceed to Buy · {formatPrice(grandTotal)}</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>

        {/* Existing Order Tracking Button (if an order was placed) */}
        {orderTrackingData && (
          <button
            type="button"
            onClick={() => {
              setCheckoutStep('tracking');
              setCheckoutModalOpen(true);
            }}
            className="w-full py-2.5 px-space-md rounded-xl bg-surface-raised hover:bg-surface-bright text-text-muted hover:text-text-primary font-label-sm text-label-sm font-semibold transition-colors border border-border/40 flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px] text-status-success">
              check_circle
            </span>
            <span>View Confirmed Order (#{orderTrackingData.orderId})</span>
          </button>
        )}

        {/* Amazon / Flipkart Style Safe & Secure Payment Banner */}
        <div className="bg-surface-container rounded-xl p-space-sm flex items-center gap-space-sm border border-border/40">
          <div className="w-8 h-8 rounded-full bg-status-success/20 text-status-success flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm font-semibold text-text-primary">
              Safe and Secure Payments
            </span>
            <p className="font-caption text-caption text-text-muted leading-tight">
              100% Payment Protection with Easy Returns & Instant Refunds
            </p>
          </div>
        </div>

        {/* Trust Badges & Guarantee Micro-Icons */}
        <div className="pt-space-xs flex flex-col gap-space-sm">
          <div className="flex items-center justify-between text-text-muted font-caption text-caption">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-status-success">
                lock
              </span>
              256-bit SSL Encrypted
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-text-primary">
                autorenew
              </span>
              7-Day Replacement
            </span>
          </div>

          {/* Payment Protocol Glyphs */}
          <div className="flex items-center justify-center gap-3 py-2 bg-surface-container-lowest rounded-lg opacity-85">
            <span className="font-caption text-[11px] tracking-widest font-bold text-text-muted uppercase px-1">
              UPI / GPAY
            </span>
            <span className="w-1 h-1 rounded-full bg-surface-raised" />
            <span className="font-caption text-[11px] tracking-widest font-bold text-text-muted uppercase px-1">
              CARDS
            </span>
            <span className="w-1 h-1 rounded-full bg-surface-raised" />
            <span className="font-caption text-[11px] tracking-widest font-bold text-text-muted uppercase px-1">
              NET BANKING
            </span>
            <span className="w-1 h-1 rounded-full bg-surface-raised" />
            <span className="font-caption text-[11px] tracking-widest font-bold text-text-muted uppercase px-1">
              CASH ON DELIVERY
            </span>
          </div>
        </div>
      </div>

      {/* Direct Customer Support Card */}
      <div className="p-space-md bg-surface rounded-2xl flex items-center justify-between border border-border/40 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-surface-raised flex items-center justify-center text-primary-container">
            <span className="material-symbols-outlined text-[20px]">support_agent</span>
          </div>
          <div>
            <div className="font-label-md text-label-md text-text-primary font-medium">Need Assistance?</div>
            <div className="font-caption text-caption text-text-muted">
              Connect with NovaCart Support
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => showToast('Customer Care', 'Support agent connected')}
          className="font-label-sm text-label-sm text-primary-container hover:underline font-semibold transition-colors"
        >
          Chat Now →
        </button>
      </div>

      {/* CHECKOUT & ORDER TRACKING MODAL */}
      {checkoutModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-background/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setCheckoutModalOpen(false)}
        >
          <div
            className="w-full max-w-xl bg-surface border border-border rounded-2xl p-space-lg md:p-space-xl shadow-2xl relative max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              type="button"
              onClick={() => setCheckoutModalOpen(false)}
              aria-label="Close modal"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-raised flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface-container transition-colors z-10"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>

            {/* DIRECT CHECKOUT: DELIVERY ADDRESS & PAYMENT */}
            {checkoutStep === 'checkout' && (
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-primary-container text-[22px]">
                    shopping_bag
                  </span>
                  <span className="font-caption text-caption text-primary-container uppercase tracking-wider font-semibold">
                    Secure Checkout
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-text-primary font-bold">
                  Delivery Address & Payment
                </h3>
                <p className="font-body-md text-body-md text-text-muted mt-1 leading-relaxed text-[13px]">
                  Confirm your delivery destination and select your preferred payment method.
                </p>

                {/* 1. Amazon / Flipkart Delivery Address Card */}
                <div className="mt-4 p-3.5 bg-surface-container rounded-xl border border-border/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-text-muted font-semibold flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-primary-container">
                        location_on
                      </span>
                      Delivering to:
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsEditingAddress(!isEditingAddress)}
                      className="text-primary-container hover:underline font-label-sm text-label-sm font-semibold"
                    >
                      {isEditingAddress ? 'Done' : 'Change Address'}
                    </button>
                  </div>

                  {isEditingAddress ? (
                    <div className="space-y-2 mt-2 pt-2 border-t border-border/30">
                      <div>
                        <label className="block font-caption text-caption text-text-muted mb-0.5">Full Name</label>
                        <input
                          type="text"
                          value={shippingAddress.name}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                          className="w-full bg-surface-container-lowest px-3 py-1.5 rounded font-body-md text-[13px] text-text-primary border border-border/40 focus:outline-none focus:ring-1 focus:ring-primary-container"
                        />
                      </div>
                      <div>
                        <label className="block font-caption text-caption text-text-muted mb-0.5">Flat / Building / Street</label>
                        <input
                          type="text"
                          value={shippingAddress.street}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                          className="w-full bg-surface-container-lowest px-3 py-1.5 rounded font-body-md text-[13px] text-text-primary border border-border/40 focus:outline-none focus:ring-1 focus:ring-primary-container"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block font-caption text-caption text-text-muted mb-0.5">City & State</label>
                          <input
                            type="text"
                            value={`${shippingAddress.city}, ${shippingAddress.state}`}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value.split(',')[0] || 'Bengaluru' })}
                            className="w-full bg-surface-container-lowest px-3 py-1.5 rounded font-body-md text-[13px] text-text-primary border border-border/40 focus:outline-none focus:ring-1 focus:ring-primary-container"
                          />
                        </div>
                        <div>
                          <label className="block font-caption text-caption text-text-muted mb-0.5">PIN Code</label>
                          <input
                            type="text"
                            value={shippingAddress.pincode}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, pincode: e.target.value })}
                            className="w-full bg-surface-container-lowest px-3 py-1.5 rounded font-body-md text-[13px] text-text-primary border border-border/40 focus:outline-none focus:ring-1 focus:ring-primary-container"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="font-label-md text-label-md font-bold text-text-primary">
                        {shippingAddress.name} · <span className="font-normal text-text-muted">{shippingAddress.phone}</span>
                      </div>
                      <p className="font-body-md text-[13px] text-text-muted mt-0.5 leading-snug">
                        {shippingAddress.street}, {shippingAddress.landmark}, {shippingAddress.city}, {shippingAddress.state} - <strong className="text-text-primary">{shippingAddress.pincode}</strong>
                      </p>
                    </div>
                  )}
                </div>

                {/* 2. Payment Options Selection (Amazon / Flipkart Style) */}
                <div className="mt-4">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-text-muted font-semibold block mb-2">
                    Select Payment Method:
                  </span>

                  <div className="flex flex-col gap-2">
                    {/* UPI */}
                    <label
                      onClick={() => setSelectedPaymentMethod('upi')}
                      className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                        selectedPaymentMethod === 'upi'
                          ? 'bg-surface-raised border-primary-container ring-1 ring-primary-container'
                          : 'bg-surface-container border-border/40 hover:bg-surface-raised/70'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={selectedPaymentMethod === 'upi'}
                        onChange={() => setSelectedPaymentMethod('upi')}
                        className="mt-1 text-primary-container accent-primary-container"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-label-md text-label-md font-semibold text-text-primary flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[17px] text-primary-container">
                              qr_code_2
                            </span>
                            UPI (Google Pay, PhonePe, Paytm, BHIM)
                          </span>
                          <span className="font-caption text-[10px] text-status-success font-semibold uppercase px-1.5 py-0.5 rounded bg-surface">
                            Fastest
                          </span>
                        </div>
                        <p className="font-caption text-caption text-text-muted mt-0.5">
                          Instant virtual payment address authorization
                        </p>
                        {selectedPaymentMethod === 'upi' && (
                          <div className="mt-2 pt-2 border-t border-border/30">
                            <input
                              type="text"
                              value={dummyUpiId}
                              onChange={(e) => setDummyUpiId(e.target.value)}
                              placeholder="e.g. saikumar@okhdfcbank"
                              className="w-full bg-surface-container-lowest px-3 py-1.5 rounded font-mono text-[12px] text-text-primary border border-border/40 focus:outline-none focus:ring-1 focus:ring-primary-container"
                            />
                          </div>
                        )}
                      </div>
                    </label>

                    {/* Credit / Debit Card */}
                    <label
                      onClick={() => setSelectedPaymentMethod('card')}
                      className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                        selectedPaymentMethod === 'card'
                          ? 'bg-surface-raised border-primary-container ring-1 ring-primary-container'
                          : 'bg-surface-container border-border/40 hover:bg-surface-raised/70'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={selectedPaymentMethod === 'card'}
                        onChange={() => setSelectedPaymentMethod('card')}
                        className="mt-1 text-primary-container accent-primary-container"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-label-md text-label-md font-semibold text-text-primary flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[17px] text-primary-container">
                              credit_card
                            </span>
                            Credit / Debit ATM Card (Visa, RuPay, MasterCard)
                          </span>
                        </div>
                        <p className="font-caption text-caption text-text-muted mt-0.5">
                          256-Bit SSL protected payment
                        </p>
                        {selectedPaymentMethod === 'card' && (
                          <div className="mt-2 pt-2 border-t border-border/30 space-y-2">
                            <input
                              type="text"
                              value={dummyCardNumber}
                              onChange={(e) => setDummyCardNumber(e.target.value)}
                              className="w-full bg-surface-container-lowest px-3 py-1.5 rounded font-mono text-[12px] text-text-primary border border-border/40"
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                value={dummyCardExpiry}
                                onChange={(e) => setDummyCardExpiry(e.target.value)}
                                className="w-full bg-surface-container-lowest px-3 py-1.5 rounded font-mono text-[12px] text-text-primary border border-border/40"
                              />
                              <input
                                type="password"
                                value={dummyCardCvv}
                                onChange={(e) => setDummyCardCvv(e.target.value)}
                                className="w-full bg-surface-container-lowest px-3 py-1.5 rounded font-mono text-[12px] text-text-primary border border-border/40"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </label>

                    {/* Net Banking */}
                    <label
                      onClick={() => setSelectedPaymentMethod('netbanking')}
                      className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                        selectedPaymentMethod === 'netbanking'
                          ? 'bg-surface-raised border-primary-container ring-1 ring-primary-container'
                          : 'bg-surface-container border-border/40 hover:bg-surface-raised/70'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={selectedPaymentMethod === 'netbanking'}
                        onChange={() => setSelectedPaymentMethod('netbanking')}
                        className="mt-1 text-primary-container accent-primary-container"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="font-label-md text-label-md font-semibold text-text-primary flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[17px] text-primary-container">
                            account_balance
                          </span>
                          Net Banking (HDFC, SBI, ICICI, Axis, Kotak)
                        </span>
                        <p className="font-caption text-caption text-text-muted mt-0.5">
                          Direct corporate banking portal
                        </p>
                      </div>
                    </label>

                    {/* Cash on Delivery */}
                    <label
                      onClick={() => setSelectedPaymentMethod('cod')}
                      className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                        selectedPaymentMethod === 'cod'
                          ? 'bg-surface-raised border-primary-container ring-1 ring-primary-container'
                          : 'bg-surface-container border-border/40 hover:bg-surface-raised/70'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={selectedPaymentMethod === 'cod'}
                        onChange={() => setSelectedPaymentMethod('cod')}
                        className="mt-1 text-primary-container accent-primary-container"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-label-md text-label-md font-semibold text-text-primary flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[17px] text-primary-container">
                              payments
                            </span>
                            Cash on Delivery / Pay on Delivery
                          </span>
                          <span className="font-caption text-[10px] text-status-success font-semibold uppercase px-1.5 py-0.5 rounded bg-surface">
                            Zero Advance Fee
                          </span>
                        </div>
                        <p className="font-caption text-caption text-text-muted mt-0.5">
                          Pay with cash or UPI upon package inspection at your doorstep
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Amount to Pay Banner */}
                <div className="mt-4 p-3 bg-surface-container rounded-xl flex items-center justify-between border border-border/30">
                  <div className="flex flex-col">
                    <span className="font-caption text-caption text-text-muted">Total Payable:</span>
                    <span className="font-label-md text-label-md text-text-primary font-medium">
                      {totalItemCount} items · Delivery: <span className="text-status-success font-semibold">FREE</span>
                    </span>
                  </div>
                  <span className="font-headline-sm text-headline-sm text-primary-container font-bold">
                    {formatPrice(grandTotal)}
                  </span>
                </div>

                {/* Primary Place Order CTA */}
                <div className="mt-5 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={handleExecutePayment}
                    className="w-full bg-primary-container text-on-primary font-label-md text-label-md font-bold py-3.5 rounded-xl hover:bg-secondary-fixed transition-colors shadow flex items-center justify-center gap-2 active:scale-[0.99]"
                  >
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    <span>Place Order & Pay · {formatPrice(grandTotal)}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCheckoutModalOpen(false)}
                    className="w-full py-2 text-text-muted hover:text-text-primary font-label-sm text-label-sm transition-colors text-center"
                  >
                    Cancel & Return to Cart
                  </button>
                </div>
              </div>
            )}

            {/* PROCESSING STATE */}
            {checkoutStep === 'processing' && (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary-container/20 flex items-center justify-center text-primary-container mb-4">
                  <span className="material-symbols-outlined text-[32px] animate-spin">sync</span>
                </div>
                <span className="font-caption text-caption uppercase tracking-widest text-primary-container font-mono font-semibold">
                  Securing Transaction
                </span>
                <h3 className="font-headline-md text-headline-md text-text-primary font-bold mt-1">
                  Confirming Your Order...
                </h3>
                <p className="font-body-md text-body-md text-text-muted max-w-sm mt-2">
                  Processing payment verification and allocating your package at our Bengaluru Fulfillment Center.
                </p>
              </div>
            )}

            {/* ORDER CONFIRMATION & CONFIRMED ITEMS */}
            {checkoutStep === 'tracking' && (
              <div>
                {/* 1. Payment Success & Order Confirmed Banner */}
                <div className="p-4 bg-status-success/15 border border-status-success/30 rounded-2xl flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-status-success text-black flex items-center justify-center shrink-0 font-bold shadow-md">
                      <span className="material-symbols-outlined text-[26px]">check_circle</span>
                    </div>
                    <div>
                      <div className="font-headline-sm text-[16px] font-bold text-text-primary flex items-center gap-1.5">
                        <span>Order Confirmed!</span>
                        <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
                      </div>
                      <div className="font-caption text-caption text-text-muted mt-0.5">
                        Order #{orderTrackingData?.orderId || 'OD48291829'} · Placed on {orderTrackingData?.date || 'Today'} at {orderTrackingData?.placedAt || 'Just now'}
                      </div>
                    </div>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-status-success px-2.5 py-1 rounded bg-surface border border-status-success/30 uppercase">
                    Confirmed
                  </span>
                </div>

                {/* 2. Delivery & Payment Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                  <div className="p-3 bg-surface-container rounded-xl border border-border/30">
                    <span className="font-caption text-[11px] uppercase tracking-wider text-text-muted font-semibold flex items-center gap-1 mb-1">
                      <span className="material-symbols-outlined text-[15px] text-primary-container">
                        location_on
                      </span>
                      Delivery Address:
                    </span>
                    <div className="font-label-sm text-label-sm font-bold text-text-primary">
                      {orderTrackingData?.address?.name || 'Sai Kumar'}
                    </div>
                    <p className="font-caption text-caption text-text-muted line-clamp-2 mt-0.5">
                      {orderTrackingData?.address?.street || 'Flat 402, Prestige Cyber Towers'}, {orderTrackingData?.address?.city || 'Bengaluru'} - {orderTrackingData?.address?.pincode || '560034'}
                    </p>
                  </div>

                  <div className="p-3 bg-surface-container rounded-xl border border-border/30">
                    <span className="font-caption text-[11px] uppercase tracking-wider text-text-muted font-semibold flex items-center gap-1 mb-1">
                      <span className="material-symbols-outlined text-[15px] text-primary-container">
                        payments
                      </span>
                      Payment Details:
                    </span>
                    <div className="font-label-sm text-label-sm font-bold text-text-primary uppercase">
                      {orderTrackingData?.paymentMethod || 'UPI'} · Paid
                    </div>
                    <p className="font-caption text-caption text-text-muted mt-0.5">
                      Total: <strong className="text-primary-container font-semibold">{formatPrice(orderTrackingData?.grandTotal || grandTotal)}</strong> (GST Included)
                    </p>
                  </div>
                </div>

                {/* 3. Confirmed Items List */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label-md text-label-md uppercase tracking-wider text-text-primary font-bold flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px] text-status-success">
                        inventory_2
                      </span>
                      Confirmed Items ({orderTrackingData?.items?.length || 0}):
                    </span>
                    <span className="font-caption text-[11px] font-semibold text-status-success bg-status-success/15 px-2 py-0.5 rounded border border-status-success/30">
                      All Items Confirmed
                    </span>
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {(orderTrackingData?.items || []).map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-surface-container rounded-xl border border-border/30 flex items-center justify-between gap-3 group hover:border-border/60 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={item.product?.image}
                            alt={item.product?.name}
                            className="w-14 h-16 object-cover rounded-lg bg-surface-container-lowest shrink-0 border border-border/20"
                          />
                          <div className="min-w-0">
                            <h4 className="font-label-md text-label-md text-text-primary font-semibold truncate">
                              {item.product?.name}
                            </h4>
                            <div className="font-caption text-[11px] text-text-muted truncate mt-0.5">
                              {item.variant || 'Standard'} · Quantity: <strong className="text-text-primary">{item.quantity}</strong>
                            </div>
                            <div className="mt-1 flex items-center gap-1.5">
                              <span className="font-caption text-[10px] font-semibold text-status-success bg-surface-raised px-1.5 py-0.5 rounded flex items-center gap-1">
                                <span className="material-symbols-outlined text-[12px]">check</span>
                                Order Confirmed
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="font-label-md text-label-md text-text-primary font-bold block">
                            {formatPrice((item.product?.price || 0) * item.quantity)}
                          </span>
                          <span className="font-caption text-[10px] text-text-muted">
                            {formatPrice(item.product?.price || 0)} each
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Action Buttons */}
                <div className="mt-5 flex flex-col gap-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleDownloadInvoice}
                      className="bg-surface-raised hover:bg-surface-bright text-text-primary font-label-sm text-label-sm font-semibold py-2.5 rounded-xl transition-colors border border-border/40 flex items-center justify-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                      <span>Download Invoice</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCheckoutModalOpen(false);
                        navigate('/orders');
                      }}
                      className="bg-surface-raised hover:bg-surface-bright text-text-primary font-label-sm text-label-sm font-semibold py-2.5 rounded-xl transition-colors border border-border/40 flex items-center justify-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[16px] text-primary-container">
                        receipt
                      </span>
                      <span>View Orders</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setCheckoutModalOpen(false);
                      navigate('/catalog');
                    }}
                    className="w-full bg-primary-container text-on-primary font-label-md text-label-md font-bold py-2.5 rounded-xl hover:bg-secondary-fixed transition-colors shadow flex items-center justify-center gap-1.5"
                  >
                    <span>Done & Continue Shopping</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
