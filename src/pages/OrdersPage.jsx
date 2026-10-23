import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/currency';

export default function OrdersPage() {
  const { showToast } = useToast();
  const [order] = useState(() => {
    try {
      const saved = localStorage.getItem('novacart_last_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const handleDownloadInvoice = () => {
    if (!order) return;
    const content = `================================================
NOVACART INDIA // TAX INVOICE
================================================
Invoice No:    INV-${order.orderId || 'OD48291829'}
Order Date:    ${order.date || 'Today'} at ${order.placedAt || 'Just now'}
Tracking No:   ${order.trackingId || 'FMPC0294819284'}
Status:        ORDER CONFIRMED

SHIPPING & BILLING ADDRESS:
Recipient:     ${order.address?.name || 'Sai Kumar'}
Address:       ${order.address?.street || 'Flat 402, Prestige Cyber Towers, 80 Feet Road'}
City, State:   ${order.address?.city || 'Bengaluru'}, ${order.address?.state || 'Karnataka'} - ${order.address?.pincode || '560034'}
Phone:         ${order.address?.phone || '+91 98765 43210'}

PAYMENT DETAILS:
Mode:          ${(order.paymentMethod || 'UPI').toUpperCase()} (Verified)
Status:        PAID

CONFIRMED ITEMS:
${(order.items || []).map((i, idx) => `${idx + 1}. ${i.product.name}
   Variant: ${i.variant || 'Standard'} | Qty: ${i.quantity} | Price: ₹${(i.product.price * i.quantity).toLocaleString('en-IN')}
   Status: CONFIRMED`).join('\n\n')}

------------------------------------------------
Items Subtotal: ₹${((order.grandTotal || 0) * 0.89).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
Integrated GST (12%): Included
Delivery Fee:   FREE
------------------------------------------------
TOTAL PAID:     ₹${(order.grandTotal || 0).toLocaleString('en-IN')}
================================================
Thank you for shopping with NovaCart India.
For support, contact support@novacart.in
================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `NovaCart_Invoice_${order.orderId || 'OD4829'}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Invoice Downloaded', 'Tax invoice downloaded successfully');
  };

  if (!order) {
    return (
      <div className="w-full max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-xl">
        <div className="max-w-md mx-auto text-center py-16 bg-surface rounded-2xl p-space-xl border border-border/40 shadow-xl">
          <div className="w-20 h-20 rounded-full bg-surface-raised flex items-center justify-center mx-auto mb-4 text-text-muted">
            <span className="material-symbols-outlined text-[36px]">receipt_long</span>
          </div>
          <h2 className="font-headline-md text-headline-md font-semibold text-text-primary">
            No Confirmed Orders Yet
          </h2>
          <p className="font-body-md text-body-md text-text-muted mt-2 mb-6">
            You don't have any confirmed orders in this session. Explore items in our catalog and place an order.
          </p>
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 bg-primary-container text-on-primary font-label-md text-label-md font-semibold px-space-lg py-3 rounded-lg hover:bg-secondary-fixed transition-colors shadow"
          >
            <span>Explore Catalog</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1440px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-md pb-space-xl">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-caption text-caption text-text-muted mb-space-md">
        <Link to="/" className="hover:text-text-primary transition-colors flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">home</span>
          <span>Home</span>
        </Link>
        <span>/</span>
        <Link to="/cart" className="hover:text-text-primary transition-colors">
          Cart
        </Link>
        <span>/</span>
        <span className="text-text-primary font-medium">Confirmed Orders</span>
      </nav>

      {/* Main Confirmed Orders Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        {/* Left Column: Confirmed Items List (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-space-md">
          {/* Header Banner: Order Confirmed Banner */}
          <div className="bg-surface rounded-2xl p-space-lg border border-border/40 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md pb-space-md border-b border-border/30">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-status-success text-black flex items-center justify-center shrink-0 font-bold shadow-md">
                  <span className="material-symbols-outlined text-[28px]">check_circle</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-caption text-[11px] uppercase tracking-wider font-semibold text-status-success bg-status-success/15 px-2 py-0.5 rounded border border-status-success/30">
                      Order Confirmed
                    </span>
                    <span className="font-caption text-caption text-text-muted">
                      {order.date || 'Today'} · {order.placedAt || 'Just now'}
                    </span>
                  </div>
                  <h1 className="font-headline-md text-headline-md text-text-primary font-bold tracking-tight">
                    Order #{order.orderId}
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownloadInvoice}
                  className="bg-surface-raised hover:bg-surface-bright text-text-primary font-label-sm text-label-sm font-semibold px-3 py-2 rounded-lg transition-colors border border-border/40 flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                  <span>Download Invoice</span>
                </button>
              </div>
            </div>

            <div className="mt-space-md p-3.5 bg-surface-container rounded-xl flex items-center justify-between border border-border/30">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-status-success text-[22px]">
                  verified
                </span>
                <span className="font-label-md text-label-md text-text-primary">
                  Payment verified via <strong className="uppercase font-semibold">{(order.paymentMethod || 'UPI')}</strong>. All {(order.items || []).length} items confirmed for processing.
                </span>
              </div>
              <span className="font-mono text-[11px] font-bold text-status-success px-2 py-0.5 rounded bg-surface border border-status-success/30 uppercase">
                Paid
              </span>
            </div>
          </div>

          {/* Confirmed Ordered Items */}
          <div className="bg-surface rounded-2xl p-space-lg border border-border/40 shadow-md">
            <div className="flex items-center justify-between mb-space-md pb-space-xs border-b border-border/30">
              <div>
                <h2 className="font-headline-sm text-headline-sm text-text-primary font-bold">
                  Confirmed Items ({(order.items || []).length})
                </h2>
                <p className="font-caption text-caption text-text-muted mt-0.5">
                  The following items have been confirmed and reserved in your order.
                </p>
              </div>
              <span className="font-caption text-[11px] font-semibold text-status-success bg-status-success/15 px-2.5 py-1 rounded border border-status-success/30">
                All Items Confirmed
              </span>
            </div>

            <div className="space-y-space-md">
              {(order.items || []).map((item, idx) => (
                <div
                  key={idx}
                  className="p-space-md bg-surface-container rounded-xl border border-border/30 flex flex-col sm:flex-row sm:items-center justify-between gap-space-md hover:border-border/60 transition-colors"
                >
                  <div className="flex items-center gap-space-md min-w-0">
                    <img
                      src={item.product?.image}
                      alt={item.product?.name}
                      className="w-18 h-22 object-cover rounded-xl bg-surface-container-lowest shrink-0 border border-border/20"
                    />
                    <div className="min-w-0">
                      <span className="font-caption text-[11px] text-text-muted uppercase tracking-wider block">
                        {item.product?.category}
                      </span>
                      <Link
                        to={`/products/${item.product?.id}`}
                        className="font-title-product text-title-product text-text-primary hover:text-primary-container font-semibold truncate block transition-colors mt-0.5"
                      >
                        {item.product?.name}
                      </Link>
                      <div className="font-caption text-caption text-text-muted mt-0.5">
                        Finish: {item.variant || 'Standard Finish'} · Quantity: <strong className="text-text-primary">{item.quantity}</strong>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="font-caption text-[11px] font-semibold text-status-success bg-surface-raised px-2 py-0.5 rounded flex items-center gap-1 border border-status-success/30">
                          <span className="material-symbols-outlined text-[13px]">check_circle</span>
                          Order Confirmed
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-left sm:text-right shrink-0">
                    <div className="font-headline-sm text-[16px] font-bold text-text-primary">
                      {formatPrice((item.product?.price || 0) * item.quantity)}
                    </div>
                    <div className="font-caption text-[11px] text-text-muted">
                      {formatPrice(item.product?.price || 0)} each
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Delivery Address & Order Total (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-space-md">
          {/* Delivery Address Card */}
          <div className="bg-surface rounded-2xl p-space-lg border border-border/40 shadow-md">
            <div className="flex items-center gap-2 mb-space-sm text-text-primary font-label-md text-label-md font-semibold">
              <span className="material-symbols-outlined text-primary-container text-[20px]">
                location_on
              </span>
              <span>Delivery Address</span>
            </div>

            <div className="p-3.5 bg-surface-container rounded-xl border border-border/30">
              <h4 className="font-label-md text-label-md font-bold text-text-primary">
                {order.address?.name || 'Sai Kumar'}
              </h4>
              <p className="font-body-md text-body-md text-text-muted mt-1 leading-relaxed">
                {order.address?.street || 'Flat 402, Prestige Cyber Towers, 80 Feet Road'}<br />
                {order.address?.landmark || 'Near Koramangala 4th Block'}<br />
                {order.address?.city || 'Bengaluru'}, {order.address?.state || 'Karnataka'} - <strong className="text-text-primary">{order.address?.pincode || '560034'}</strong>
              </p>
              <div className="mt-2.5 pt-2 border-t border-border/30 font-caption text-caption text-text-muted flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[15px]">call</span>
                <span>Phone: <strong className="text-text-primary">{order.address?.phone || '+91 98765 43210'}</strong></span>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-surface rounded-2xl p-space-lg border border-border/40 shadow-md">
            <h3 className="font-label-md text-label-md font-semibold text-text-primary mb-space-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-container text-[20px]">
                payments
              </span>
              <span>Payment Details</span>
            </h3>

            <div className="space-y-2 font-body-md text-body-md text-text-muted pb-space-sm border-b border-border/30">
              <div className="flex justify-between">
                <span>Payment Mode:</span>
                <span className="text-text-primary font-semibold uppercase">
                  {(order.paymentMethod || 'UPI')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-status-success font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">check_circle</span>
                  Paid & Confirmed
                </span>
              </div>
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="text-text-primary font-medium">
                  {formatPrice(order.grandTotal ? order.grandTotal * 0.89 : 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & GST (12%):</span>
                <span className="text-text-primary font-medium">Included</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span className="text-status-success font-semibold">FREE</span>
              </div>
            </div>

            <div className="pt-space-sm flex justify-between items-baseline">
              <span className="font-headline-sm text-headline-sm font-bold text-text-primary">
                Total Paid
              </span>
              <span className="font-headline-md text-headline-md font-bold text-primary-container">
                {formatPrice(order.grandTotal || 0)}
              </span>
            </div>
          </div>

          {/* Continue Shopping Button */}
          <Link
            to="/catalog"
            className="w-full bg-primary-container hover:bg-secondary-fixed text-on-primary font-label-md text-label-md font-bold py-3.5 px-space-lg rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
          >
            <span>Continue Shopping</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
