import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { img } from "@/lib/loop-images";
import { useLoop } from "@/lib/loop-store";

const navLinks = [
  { label: "Home", to: "/" as const },
  { label: "Shop", to: "/shop" as const },
  { label: "Build Your LOOP", to: "/build" as const },
  { label: "New Drops", to: "/shop" as const },
  { label: "About", to: "/about" as const },
];

export function Header() {
  const { cartCount, favorites } = useLoop();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearchOpen(false);
    setMenuOpen(false);
    navigate({ to: "/shop", search: { q: query || undefined } });
  }

  return (
    <header className="glass-header fixed top-0 w-full z-50 shadow-sm transition-all duration-300">
      {/* Desktop */}
      <div className="hidden md:flex justify-between items-center h-20 px-margin-desktop max-w-container-max mx-auto">
        <Link to="/" className="flex items-center">
          <img src={img.logo} alt="LOOP Logo" className="h-8 w-auto object-contain" />
        </Link>
        <nav className="flex items-center gap-8">
          {navLinks.map((l, i) => (
            <Link
              key={i}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="text-label-lg text-on-surface-variant hover:text-primary transition-colors duration-300 pb-1 border-b-2 border-transparent data-[status=active]:text-primary data-[status=active]:font-bold data-[status=active]:border-primary"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-stack-sm text-primary">
          <button
            aria-label="Search"
            onClick={() => setSearchOpen((s) => !s)}
            className="p-2 rounded-full hover:bg-surface-variant hover:scale-105 active:scale-95 transition-transform duration-200"
          >
            <span className="material-symbols-outlined">search</span>
          </button>
          <Link
            to="/shop"
            aria-label="Favorites"
            className="p-2 rounded-full hover:bg-surface-variant hover:scale-105 active:scale-95 transition-transform duration-200 relative"
          >
            <span className={`material-symbols-outlined ${favorites.length ? "filled" : ""}`}>
              favorite
            </span>
          </Link>
          <Link
            to="/cart"
            aria-label="Cart"
            className="p-2 rounded-full hover:bg-surface-variant hover:scale-105 active:scale-95 transition-transform duration-200 relative"
          >
            <span className="material-symbols-outlined">shopping_bag</span>
            <span className="absolute top-1 right-1 bg-primary text-on-primary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden justify-between items-center px-margin-mobile h-16 w-full relative">
        <button
          aria-label="Menu"
          onClick={() => setMenuOpen((s) => !s)}
          className="p-2 -ml-2 text-primary hover:opacity-80 transition-opacity"
        >
          <span className="material-symbols-outlined text-3xl font-light">
            {menuOpen ? "close" : "menu"}
          </span>
        </button>
        <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1">
          <img src={img.logo} alt="LOOP Logo" className="h-8 w-auto object-contain" />
        </Link>
        <div className="flex items-center gap-2">
          <button
            aria-label="Search"
            onClick={() => setSearchOpen((s) => !s)}
            className="p-2 text-primary hover:opacity-80 transition-opacity"
          >
            <span className="material-symbols-outlined text-2xl font-light">search</span>
          </button>
          <Link
            to="/cart"
            aria-label="Shopping Bag"
            className="p-2 -mr-2 text-primary hover:opacity-80 transition-opacity relative group"
          >
            <span className="material-symbols-outlined text-2xl font-light">shopping_bag</span>
            <span className="absolute top-1.5 right-1.5 bg-primary text-on-primary text-[10px] w-4 h-4 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
              {cartCount}
            </span>
          </Link>
        </div>
      </div>

      {searchOpen && (
        <form
          onSubmit={submitSearch}
          className="border-t border-outline-variant/30 bg-surface px-margin-mobile md:px-margin-desktop py-3 max-w-container-max mx-auto flex items-center gap-3"
        >
          <span className="material-symbols-outlined text-on-surface-variant">search</span>
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search charms..."
            className="flex-grow bg-transparent outline-none text-body-md text-on-surface placeholder:text-on-surface/50 py-1"
          />
          <button
            type="submit"
            className="btn-primary text-label-lg px-5 py-2 rounded-full"
          >
            Search
          </button>
        </form>
      )}

      {menuOpen && (
        <nav className="md:hidden border-t border-outline-variant/30 bg-surface px-margin-mobile py-4 flex flex-col">
          {navLinks.map((l, i) => (
            <Link
              key={i}
              to={l.to}
              onClick={() => setMenuOpen(false)}
              className="py-3 text-label-lg text-on-surface hover:text-primary transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
