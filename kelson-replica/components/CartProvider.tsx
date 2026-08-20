"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type CartItem = { id: string; name: string; price: number; quantity: number };
type CartContextValue = { items: CartItem[]; addItem: (item: Omit<CartItem, "quantity">) => void; removeItem: (id: string) => void; updateQuantity: (id: string, quantity: number) => void; clear: () => void; subtotal: number; count: number };

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("kelson-cart");
      if (saved) setItems(JSON.parse(saved));
    } catch {
      localStorage.removeItem("kelson-cart");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("kelson-cart", JSON.stringify(items));
  }, [items]);

  const value = useMemo(() => ({
    items,
    addItem: (item: Omit<CartItem, "quantity">) => setItems((current) => {
      const existing = current.find((entry) => entry.id === item.id);
      return existing
        ? current.map((entry) => entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry)
        : [...current, { ...item, quantity: 1 }];
    }),
    removeItem: (id: string) => setItems((current) => current.filter((item) => item.id !== id)),
    updateQuantity: (id: string, quantity: number) => setItems((current) => current.map((item) => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)),
    clear: () => setItems([]),
    subtotal: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    count: items.reduce((sum, item) => sum + item.quantity, 0),
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
