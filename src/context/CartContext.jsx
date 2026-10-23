import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';

const CartContext = createContext(null);
const STORAGE_KEY = 'novacart_cart_state_inr_v2';

const INITIAL_CART = [
  {
    product: PRODUCTS[0], // Aether Pro (₹31,990)
    quantity: 1,
    variant: 'Obsidian Black · USB-C Gen 3'
  },
  {
    product: PRODUCTS[1], // Chronos Titanium (₹45,500)
    quantity: 1,
    variant: 'Slate Dial · 40mm Grade 5 Titanium'
  },
  {
    product: PRODUCTS[3], // Lumik Pen (₹9,990)
    quantity: 2,
    variant: 'Brushed Natural Brass · Schmidt G2'
  }
];

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const validated = parsed.filter(i => i && i.product && i.product.id && typeof i.quantity === 'number' && i.quantity >= 1);
          if (validated.length > 0 || parsed.length === 0) {
            return validated;
          }
        }
      }
      return INITIAL_CART;
    } catch {
      return INITIAL_CART;
    }
  });

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const addToCart = (product, quantity = 1, variant = null) => {
    const cleanQty = Math.max(1, Number(quantity) || 1);
    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(i => i.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + cleanQty
        };
        return updated;
      }
      return [...prevItems, { product, quantity: cleanQty, variant: variant || 'Standard Studio Finish' }];
    });
  };

  const updateQuantity = (productId, delta) => {
    setItems(prevItems => {
      return prevItems.map(item => {
        if (item.product.id === productId) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      });
    });
  };

  const setQuantity = (productId, quantity) => {
    const validQty = Math.max(1, Number(quantity) || 1);
    setItems(prevItems => {
      return prevItems.map(item => {
        if (item.product.id === productId) {
          return { ...item, quantity: validQty };
        }
        return item;
      });
    });
  };

  const removeFromCart = (productId) => {
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const applyPromo = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'ARCHIVE-2025' || clean === 'NOVACART10') {
      setPromoCode(clean);
      setDiscountPercent(10);
      return { success: true, message: '10% Archive Privilege Applied' };
    }
    return { success: false, message: 'Invalid or expired archive voucher' };
  };

  // Totals calculations
  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const distinctItemCount = items.length;
  const rawSubtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((rawSubtotal * discountPercent) / 100);
  const subtotal = Math.max(0, rawSubtotal - discountAmount);

  // Free standard express shipping over ₹12,000
  const STANDARD_FREE_THRESHOLD = 12000;
  const isFreeStandardShipping = subtotal >= STANDARD_FREE_THRESHOLD || subtotal === 0;
  const standardShippingCost = isFreeStandardShipping ? 0 : 499;

  // Priority express delivery tier: ₹99,000
  const EXPRESS_TIER = 99000;
  const expressRemaining = Math.max(0, EXPRESS_TIER - subtotal);
  const expressProgressPercent = Math.min(100, Math.round((subtotal / EXPRESS_TIER) * 100));

  // Taxes (Estimated GST ~12% on luxury hardware)
  const tax = subtotal > 0 ? Math.round(subtotal * 0.12) : 0;
  const grandTotal = subtotal + standardShippingCost + tax;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        setQuantity,
        removeFromCart,
        clearCart,
        totalItemCount,
        distinctItemCount,
        subtotal,
        rawSubtotal,
        discountPercent,
        discountAmount,
        promoCode,
        applyPromo,
        standardShippingCost,
        isFreeStandardShipping,
        STANDARD_FREE_THRESHOLD,
        EXPRESS_TIER,
        expressRemaining,
        expressProgressPercent,
        tax,
        grandTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
