import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { img } from "./loop-images";

export type Product = {
  id: string;
  name: string;
  category: "Phone Charm" | "Bag Charm" | "Keychain";
  price: number;
  color: "cherry" | "pink" | "cream" | "charcoal";
  image: string;
  hoverImage: string;
  cardBg: string;
};

export const products: Product[] = [
  {
    id: "glossy-cherry",
    name: "Glossy Cherry",
    category: "Phone Charm",
    price: 5,
    color: "cherry",
    image: img.glossyCherry,
    hoverImage: img.glossyCherryAlt,
    cardBg: "bg-secondary-container",
  },
  {
    id: "pearl-drop",
    name: "Pearl Drop",
    category: "Bag Charm",
    price: 5,
    color: "cream",
    image: img.pearlDrop,
    hoverImage: img.pearlDropAlt,
    cardBg: "bg-surface-container",
  },
  {
    id: "super-star",
    name: "Super Star",
    category: "Keychain",
    price: 5,
    color: "cherry",
    image: img.superStar,
    hoverImage: img.superStarAlt,
    cardBg: "bg-tertiary-fixed",
  },
  {
    id: "glitter-heart",
    name: "Glitter Heart",
    category: "Phone Charm",
    price: 5,
    color: "pink",
    image: img.glitterHeart,
    hoverImage: img.glitterHeartAlt,
    cardBg: "bg-secondary-fixed",
  },
];

export type CartLine = { id: string; name: string; price: number; qty: number; image?: string };

type LoopState = {
  cart: CartLine[];
  cartCount: number;
  cartTotal: number;
  addToCart: (line: Omit<CartLine, "qty">) => void;
  removeFromCart: (id: string) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

const LoopContext = createContext<LoopState | null>(null);

export function LoopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const value = useMemo<LoopState>(() => {
    return {
      cart,
      cartCount: cart.reduce((n, l) => n + l.qty, 0),
      cartTotal: cart.reduce((n, l) => n + l.qty * l.price, 0),
      addToCart: (line) =>
        setCart((prev) => {
          const found = prev.find((l) => l.id === line.id);
          if (found) return prev.map((l) => (l.id === line.id ? { ...l, qty: l.qty + 1 } : l));
          return [...prev, { ...line, qty: 1 }];
        }),
      removeFromCart: (id) => setCart((prev) => prev.filter((l) => l.id !== id)),
      favorites,
      toggleFavorite: (id) =>
        setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id])),
      isFavorite: (id) => favorites.includes(id),
    };
  }, [cart, favorites]);

  return <LoopContext.Provider value={value}>{children}</LoopContext.Provider>;
}

export function useLoop() {
  const ctx = useContext(LoopContext);
  if (!ctx) throw new Error("useLoop must be used inside LoopProvider");
  return ctx;
}
