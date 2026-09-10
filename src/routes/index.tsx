import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/loop/Header";
import { Footer } from "@/components/loop/Footer";
import { img } from "@/lib/loop-images";
import { useLoop } from "@/lib/loop-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LOOP — Your Things. Your Style. Your LOOP." },
      {
        name: "description",
        content:
          "LOOP makes customizable phone charms, bag charms and keychains. Mix, match and loop to build accessories that are completely yours.",
      },
      { property: "og:title", content: "LOOP — Your Things. Your Style. Your LOOP." },
      {
        property: "og:description",
        content:
          "Customizable modular accessories. Build your LOOP with charms, chains and alphabet beads.",
      },
    ],
  }),
  component: Home,
});

const trending = [
  { id: "cherry-loop", name: "Cherry LOOP", price: 5, image: img.cherryLoop },
  { id: "pearl-loop", name: "Pearl LOOP", price: 5, image: img.pearlLoop },
];

function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background">
      <Header />
      <DesktopHome />
      <MobileHome />
      <Footer />
    </div>
  );
}

/* ---------------- Desktop ---------------- */

function DesktopHome() {
  return (
    <main className="hidden md:block pt-24 pb-stack-lg">
      {/* Hero */}
      <section className="max-w-container-max mx-auto px-margin-desktop py-stack-lg flex flex-col md:flex-row items-center gap-gutter">
        <div className="flex-1 space-y-stack-md">
          <h1 className="text-display-lg text-primary tracking-tight">
            YOUR THINGS.
            <br />
            YOUR STYLE.
            <br />
            YOUR LOOP.
          </h1>
          <p className="text-body-lg text-on-surface-variant max-w-md">
            Create accessories that are completely yours. Mix, match, and loop to express your
            unique vibe.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              to="/build"
              className="btn-primary text-label-lg px-8 py-4 rounded-full shadow-soft hover:shadow-hover inline-block"
            >
              BUILD YOUR LOOP
            </Link>
            <Link
              to="/shop"
              className="btn-secondary text-label-lg px-8 py-4 rounded-full inline-block"
            >
              SHOP THE DROP
            </Link>
          </div>
        </div>
        <div className="flex-1 relative h-[500px] w-full rounded-[3rem] overflow-hidden shadow-soft">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            alt="Colorful phone charms and bag charms arranged on a soft cream background"
            src={img.heroDesktop}
          />
        </div>
      </section>

      {/* Trending Loops */}
      <section className="max-w-container-max mx-auto px-margin-desktop py-stack-lg">
        <div className="flex justify-between items-end mb-stack-md">
          <h2 className="text-display-sm text-primary">Trending Loops</h2>
          <Link
            to="/shop"
            className="text-label-lg text-primary hover:underline underline-offset-4 decoration-2"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {trending.map((p) => (
            <TrendingCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Build Your LOOP */}
      <section className="bg-surface-container-low py-stack-lg mt-stack-lg">
        <div className="max-w-container-max mx-auto px-margin-desktop">
          <div className="text-center mb-stack-lg max-w-2xl mx-auto">
            <h2 className="text-display-sm text-primary mb-4">Build Your LOOP</h2>
            <p className="text-body-lg text-on-surface-variant">
              Customize every detail. Choose your base, pick your colors, and add charms that
              scream 'you'.
            </p>
          </div>
          <BuilderTeaserPanel />
        </div>
      </section>
    </main>
  );
}

function TrendingCard({
  product,
}: {
  product: { id: string; name: string; price: number; image: string };
}) {
  const { addToCart, toggleFavorite, isFavorite } = useLoop();
  const [added, setAdded] = useState(false);
  const fav = isFavorite(product.id);

  return (
    <div className="bg-surface-container-lowest rounded-[2rem] p-4 shadow-soft hover:shadow-hover transition-shadow group relative">
      <button
        aria-label="Favorite"
        onClick={() => toggleFavorite(product.id)}
        className={`absolute top-6 right-6 z-10 transition-colors ${
          fav ? "text-primary" : "text-outline-variant hover:text-primary"
        }`}
      >
        <span className={`material-symbols-outlined text-2xl ${fav ? "filled" : ""}`}>
          favorite
        </span>
      </button>
      <div className="bg-surface-container-low h-64 rounded-[2rem] mb-4 overflow-hidden relative">
        <img
          className="w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-500"
          alt={product.name}
          src={product.image}
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-headline-md text-on-surface">{product.name}</h3>
        <p className="text-body-md text-on-surface-variant">KWD {product.price.toFixed(2)}</p>
        <button
          onClick={() => {
            addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
          }}
          className={`w-full text-label-lg py-3 rounded-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity ${
            added ? "bg-green-600 text-white" : "btn-primary"
          }`}
        >
          {added ? "Added ✓" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

const teaserCharms = [
  { id: "heart", label: "Heart", icon: "favorite" },
  { id: "star", label: "Star", icon: "star" },
  { id: "smiley", label: "Smiley", icon: "sentiment_satisfied" },
];

function BuilderTeaserPanel() {
  const [selected, setSelected] = useState<string[]>(["smiley"]);
  const { addToCart } = useLoop();
  const [added, setAdded] = useState(false);
  const total = 24 + selected.length * 8;

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));

  return (
    <div className="bg-surface-container-lowest rounded-[3rem] p-8 shadow-soft">
      {/* Progress Steps */}
      <div className="flex justify-between items-center mb-12 relative">
        <div className="absolute left-0 top-1/2 w-full h-1 bg-secondary-fixed -translate-y-1/2 rounded-full" />
        {["Base", "Charms", "Review"].map((label, i) => (
          <div
            key={label}
            className="flex flex-col items-center gap-2 bg-surface-container-lowest px-4 relative z-10"
          >
            <div
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-headline-md ${
                i === 0
                  ? "border-primary-container bg-secondary-fixed text-primary-container"
                  : "border-outline-variant text-on-surface-variant bg-surface-container-lowest"
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`text-label-md ${i === 0 ? "text-primary" : "text-on-surface-variant"}`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-gutter">
        <div className="flex-1 space-y-8">
          <div>
            <h3 className="text-headline-md text-on-surface mb-4">Select Charms</h3>
            <div className="grid grid-cols-4 gap-4">
              {teaserCharms.map((c) => {
                const on = selected.includes(c.id);
                return (
                  <button
                    key={c.id}
                    onClick={() => toggle(c.id)}
                    className={`aspect-square rounded-[2rem] flex flex-col items-center justify-center gap-2 relative border-2 transition-all ${
                      on
                        ? "border-primary-container bg-secondary-fixed"
                        : "border-transparent bg-surface-container hover:bg-secondary-fixed"
                    }`}
                  >
                    {on && (
                      <span className="absolute top-2 right-2 material-symbols-outlined text-primary text-sm filled">
                        check_circle
                      </span>
                    )}
                    <span className="material-symbols-outlined text-3xl text-primary">
                      {c.icon}
                    </span>
                    <span className={`text-label-md ${on ? "text-primary" : ""}`}>{c.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 bg-surface-container rounded-[2rem] flex items-center justify-center min-h-[400px] relative overflow-hidden">
          <div className="flex flex-col items-center gap-4 pb-24">
            <img
              src={img.builderPreview}
              alt="Preview of your custom LOOP"
              className="w-64 h-64 object-contain drop-shadow-2xl"
            />
            <p className="text-body-md text-on-surface-variant">
              {selected.length
                ? `${selected.map((s) => teaserCharms.find((c) => c.id === s)?.label).join(" · ")}`
                : "Preview rendering..."}
            </p>
          </div>
          <div className="absolute bottom-6 w-full px-6">
            <button
              onClick={() => {
                addToCart({ id: `custom-${selected.join("-") || "base"}`, name: "Custom LOOP", price: total });
                setAdded(true);
                setTimeout(() => setAdded(false), 2000);
              }}
              className={`w-full text-label-lg py-4 rounded-full shadow-soft hover:shadow-hover flex items-center justify-center gap-2 ${
                added ? "bg-green-600 text-white" : "btn-primary"
              }`}
            >
              <span>{added ? "ADDED ✓" : "ADD MY LOOP TO CART"}</span>
              <span className="text-body-md opacity-80">${total.toFixed(2)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Mobile ---------------- */

const categories = [
  { label: "Chains", image: img.catChains },
  { label: "Charms", image: img.catCharms },
  { label: "Connectors", image: img.catConnectors },
];

function MobileHome() {
  return (
    <main className="md:hidden flex-grow pt-16 flex flex-col gap-stack-lg pb-stack-lg">
      {/* Hero */}
      <section className="relative w-full overflow-hidden min-h-[85vh] flex flex-col items-center justify-center pt-8 px-margin-mobile text-center">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#FFF5F7] to-background opacity-80" />
        <div className="relative w-full max-w-sm mx-auto mb-8 animate-float">
          <div className="w-64 h-64 mx-auto rounded-full bg-secondary-fixed opacity-40 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl -z-10" />
          <img
            className="w-full h-auto object-cover rounded-[2.5rem] shadow-soft-lg"
            alt="Model wearing colorful chunky chain necklaces with charms"
            src={img.heroMobile}
          />
        </div>
        <div className="flex flex-col items-center gap-stack-sm w-full max-w-md mx-auto z-10">
          <span className="text-label-lg text-primary uppercase tracking-widest bg-primary-fixed/50 px-4 py-1.5 rounded-full inline-block">
            New Drop
          </span>
          <h1 className="text-[2.5rem] leading-[1.1] tracking-tight text-on-surface mb-2 font-bold">
            Stack It. <br />
            <span className="text-primary italic font-serif relative inline-block">
              Flaunt It.
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-secondary-fixed-dim"
                preserveAspectRatio="none"
                viewBox="0 0 100 20"
              >
                <path
                  d="M0,10 Q50,20 100,10"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="4"
                />
              </svg>
            </span>
          </h1>
          <p className="text-body-md text-on-surface-variant mb-6 px-4">
            Create your unique statement piece with our interchangeable modular jewelry system.
          </p>
          <div className="flex flex-col w-full gap-3 px-4">
            <Link
              to="/build"
              className="w-full bg-primary text-on-primary text-label-lg py-4 px-8 rounded-full shadow-soft hover:shadow-soft-lg active:scale-95 transition-all duration-300"
            >
              Build Your LOOP
            </Link>
            <Link
              to="/shop"
              className="w-full bg-surface text-primary border-2 border-outline-variant text-label-lg py-3.5 px-8 rounded-full active:scale-95 transition-all duration-300"
            >
              Shop Pre-Made
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="w-full px-margin-mobile">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-headline-lg-mobile text-on-surface">Categories</h2>
        </div>
        <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-4 -mx-margin-mobile px-margin-mobile snap-x snap-mandatory">
          {categories.map((c) => (
            <Link
              key={c.label}
              to="/shop"
              className="snap-start flex-none w-[45%] aspect-[4/5] relative rounded-2xl overflow-hidden group"
            >
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt={c.label}
                src={c.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-lg font-semibold leading-tight mb-1">{c.label}</h3>
              </div>
            </Link>
          ))}
          <div className="snap-start flex-none w-2" />
        </div>
      </section>

      {/* Builder Teaser */}
      <section className="w-full px-margin-mobile py-stack-md">
        <div className="bg-secondary-fixed/40 rounded-3xl p-6 relative overflow-hidden flex flex-col items-center text-center">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-fixed rounded-full blur-2xl opacity-50 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary-container rounded-full blur-xl opacity-60 translate-y-1/3 -translate-x-1/3" />
          <span
            className="material-symbols-outlined text-primary text-4xl mb-3 relative z-10 filled"
          >
            auto_awesome
          </span>
          <h2 className="text-headline-lg-mobile text-on-surface mb-2 relative z-10">
            Make It Yours
          </h2>
          <p className="text-body-md text-on-surface-variant mb-6 max-w-[280px] relative z-10">
            Start with a base chain, add your favorite charms, and snap it together.
          </p>
          <div className="flex items-center justify-center gap-2 mb-6 relative z-10">
            {["link", "favorite", "check_circle"].map((icon, i) => (
              <div key={icon} className="flex items-center gap-2">
                {i > 0 && <div className="w-6 h-[2px] bg-outline-variant" />}
                <div className="w-12 h-12 rounded-full bg-surface shadow-sm border border-outline-variant flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined">{icon}</span>
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/build"
            className="w-full max-w-[240px] bg-primary text-on-primary text-label-lg py-3 px-6 rounded-full shadow-soft active:scale-95 transition-all duration-300 relative z-10"
          >
            Launch Builder
          </Link>
        </div>
      </section>
    </main>
  );
}
