import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Header } from "@/components/loop/Header";
import { Footer } from "@/components/loop/Footer";
import { products, useLoop, type Product } from "@/lib/loop-store";

type ShopSearch = { q?: string };

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => {
    const q = typeof search["q"] === "string" && search["q"].length ? search["q"] : undefined;
    return q ? { q } : {};
  },
  head: () => ({
    meta: [
      { title: "Shop All Charms — LOOP" },
      {
        name: "description",
        content:
          "Discover LOOP's curated collection of phone charms, bag charms and keychains. Filter by category and color to build a look that's uniquely yours.",
      },
      { property: "og:title", content: "Shop All Charms — LOOP" },
      {
        property: "og:description",
        content: "Curated phone charms, bag charms and keychains to personalize your life.",
      },
    ],
  }),
  component: ShopAll,
});

const categories = ["All Charms", "Phone Charms", "Bag Charms", "Keychains"] as const;
const categoryMap: Record<string, Product["category"] | null> = {
  "All Charms": null,
  "Phone Charms": "Phone Charm",
  "Bag Charms": "Bag Charm",
  Keychains: "Keychain",
};

const colorSwatches = [
  { id: "cherry", label: "Cherry Red", className: "bg-primary" },
  { id: "pink", label: "Soft Pink", className: "bg-secondary-container" },
  { id: "cream", label: "White/Cream", className: "bg-surface-container-lowest" },
  { id: "charcoal", label: "Charcoal", className: "bg-tertiary" },
] as const;

function ShopAll() {
  const q = Route.useSearch()["q"];
  const navigate = useNavigate();
  const [category, setCategory] = useState<string>("All Charms");
  const [color, setColor] = useState<string | null>("cherry");
  const [sort, setSort] = useState("Featured");
  const [catOpen, setCatOpen] = useState(true);
  const [colorOpen, setColorOpen] = useState(true);

  const visible = useMemo(() => {
    let list = [...products];
    const cat = categoryMap[category];
    if (cat) list = list.filter((p) => p.category === cat);
    if (color) list = list.filter((p) => p.color === color);
    if (q) {
      const needle = q.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(needle) || p.category.toLowerCase().includes(needle),
      );
    }
    if (sort === "Price: Low to High") list.sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low") list.sort((a, b) => b.price - a.price);
    if (sort === "Newest Arrivals") list.reverse();
    return list;
  }, [category, color, q, sort]);

  return (
    <div className="min-h-screen flex flex-col text-body-md">
      <Header />
      <main className="flex-grow pt-[104px] pb-stack-lg fluid-container">
        <div className="mb-stack-lg text-center md:text-left mt-stack-md">
          <h1 className="text-display-lg text-on-surface mb-stack-sm">Shop All</h1>
          <p className="text-body-lg text-on-surface-variant max-w-2xl">
            Discover our curated collection of charms to personalize your life. Build a look that's
            uniquely yours.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-gutter">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 flex-shrink-0 space-y-stack-md">
            <div className="bg-surface-container-lowest p-stack-md rounded-[1rem] card-shadow">
              <h3
                onClick={() => setCatOpen((o) => !o)}
                className="text-headline-md text-on-surface mb-stack-sm flex justify-between items-center cursor-pointer"
              >
                Category
                <span className="material-symbols-outlined">
                  {catOpen ? "expand_more" : "chevron_right"}
                </span>
              </h3>
              {catOpen && (
                <div className="space-y-stack-sm pl-2">
                  {categories.map((c) => (
                    <label key={c} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={category === c}
                        onChange={() => setCategory(c)}
                        className="h-5 w-5 rounded accent-[#a60725]"
                      />
                      <span className="text-body-md text-on-surface group-hover:text-primary transition-colors">
                        {c}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-surface-container-lowest p-stack-md rounded-[1rem] card-shadow">
              <h3
                onClick={() => setColorOpen((o) => !o)}
                className="text-headline-md text-on-surface mb-stack-sm flex justify-between items-center cursor-pointer"
              >
                Color
                <span className="material-symbols-outlined">
                  {colorOpen ? "expand_more" : "chevron_right"}
                </span>
              </h3>
              {colorOpen && (
                <div className="flex flex-wrap gap-3">
                  {colorSwatches.map((s) => (
                    <button
                      key={s.id}
                      aria-label={s.label}
                      onClick={() => setColor((c) => (c === s.id ? null : s.id))}
                      className={`w-8 h-8 rounded-full cursor-pointer active:scale-95 transition-transform ${s.className} ${
                        color === s.id
                          ? "ring-2 ring-offset-2 ring-primary"
                          : "ring-1 ring-outline hover:ring-2 hover:ring-primary"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-stack-md flex-wrap gap-stack-sm">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-label-md text-on-surface-variant">Active:</span>
                <span className="inline-flex items-center gap-1 bg-surface-container px-3 py-1 rounded-full text-label-md text-on-surface">
                  {category}
                  {category !== "All Charms" && (
                    <span
                      onClick={() => setCategory("All Charms")}
                      className="material-symbols-outlined text-[16px] cursor-pointer hover:text-primary"
                    >
                      close
                    </span>
                  )}
                </span>
                {q && (
                  <span className="inline-flex items-center gap-1 bg-surface-container px-3 py-1 rounded-full text-label-md text-on-surface">
                    “{q}”
                    <span
                      onClick={() => navigate({ to: "/shop", search: {} })}
                      className="material-symbols-outlined text-[16px] cursor-pointer hover:text-primary"
                    >
                      close
                    </span>
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-label-md text-on-surface-variant">Sort by:</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="bg-surface border border-outline rounded-full text-body-md text-on-surface py-1 pl-4 pr-10 outline-none focus:border-primary"
                >
                  <option>Featured</option>
                  <option>Newest Arrivals</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            {visible.length === 0 ? (
              <p className="text-body-lg text-on-surface-variant py-stack-lg">
                No charms match your filters yet. Try another category or colour.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
                {visible.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}

            <div className="mt-stack-lg flex justify-center">
              <button className="bg-surface-container hover:bg-secondary-container text-primary text-label-lg px-8 py-4 rounded-full transition-colors border border-outline-variant hover:border-primary">
                Load More Charms
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleFavorite, isFavorite } = useLoop();
  const [added, setAdded] = useState(false);
  const fav = isFavorite(product.id);

  return (
    <article className="group flex flex-col gap-base">
      <div
        className={`product-image-container aspect-[4/5] ${product.cardBg} card-shadow card-hover-shadow transition-all duration-300`}
      >
        <img
          alt={product.name}
          className="img-primary w-full h-full object-cover"
          src={product.image}
        />
        <img alt={`${product.name} in use`} className="img-secondary" src={product.hoverImage} />
        <button
          aria-label="Favorite"
          onClick={() => toggleFavorite(product.id)}
          className={`absolute top-4 right-4 p-2 rounded-full bg-surface-container-lowest/80 backdrop-blur-sm transition-colors hover:scale-110 ${
            fav ? "text-primary" : "text-on-surface hover:text-primary"
          }`}
        >
          <span className={`material-symbols-outlined ${fav ? "filled" : ""}`}>favorite</span>
        </button>
        <button
          onClick={() => {
            addToCart({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
            });
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
          }}
          className={`add-to-cart-btn text-label-lg px-6 py-3 rounded-full shadow-lg transition-colors whitespace-nowrap ${
            added
              ? "bg-green-600 text-white"
              : "bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container"
          }`}
        >
          {added ? "Added ✓" : `Add to Bag - KWD ${product.price}`}
        </button>
      </div>
      <div className="flex flex-col mt-2">
        <h3 className="text-headline-md text-on-surface">{product.name}</h3>
        <p className="text-body-md text-on-surface-variant">{product.category}</p>
      </div>
    </article>
  );
}
