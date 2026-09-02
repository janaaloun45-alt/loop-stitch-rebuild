import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Header } from "@/components/loop/Header";
import { Footer } from "@/components/loop/Footer";
import { img } from "@/lib/loop-images";
import { useLoop } from "@/lib/loop-store";

export const Route = createFileRoute("/build")({
  head: () => ({
    meta: [
      { title: "Build Your LOOP — Custom Charm Builder" },
      {
        name: "description",
        content:
          "Design your own LOOP: pick a base chain, add charms and alphabet beads, and watch your custom accessory come together in real time.",
      },
      { property: "og:title", content: "Build Your LOOP — Custom Charm Builder" },
      {
        property: "og:description",
        content: "Pick a base, add charms and beads, and build an accessory that's all yours.",
      },
    ],
  }),
  component: Build,
});

const bases = [
  { id: "chunky-chain", label: "Chunky Chain", price: 24, image: img.catChains },
  { id: "beaded-strand", label: "Beaded Strand", price: 22, image: img.catCharms },
  { id: "wristlet", label: "Wristlet", price: 26, image: img.catConnectors },
];

const baseColors = [
  { id: "cherry", label: "Cherry Red", className: "bg-primary" },
  { id: "pink", label: "Soft Pink", className: "bg-secondary-container" },
  { id: "cream", label: "Cream", className: "bg-surface-container-lowest" },
  { id: "charcoal", label: "Charcoal", className: "bg-tertiary" },
];

const charms = [
  { id: "cherry", label: "Cherry", price: 8, image: img.charmCherry },
  { id: "star", label: "Star", price: 6, image: img.charmStar },
  { id: "smiley", label: "Smiley", price: 6, image: img.charmSmiley },
  { id: "heart", label: "Glitter Heart", price: 7, image: img.glitterHeart },
  { id: "pearl", label: "Pearl Drop", price: 9, image: img.pearlDrop },
];

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const steps = ["Base", "Charms", "Review"];

function Build() {
  const [step, setStep] = useState(0);
  const [base, setBase] = useState(bases[0].id);
  const [color, setColor] = useState("cherry");
  const [picked, setPicked] = useState<string[]>(["cherry"]);
  const [beads, setBeads] = useState<string[]>([]);
  const [added, setAdded] = useState(false);
  const { addToCart } = useLoop();
  const navigate = useNavigate();

  const baseObj = bases.find((b) => b.id === base)!;
  const total = useMemo(
    () =>
      baseObj.price +
      picked.reduce((n, id) => n + (charms.find((c) => c.id === id)?.price ?? 0), 0) +
      beads.length * 4,
    [baseObj, picked, beads],
  );

  const toggleCharm = (id: string) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const toggleBead = (l: string) =>
    setBeads((b) => (b.includes(l) ? b.filter((x) => x !== l) : b.length < 8 ? [...b, l] : b));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-[104px] pb-stack-lg fluid-container">
        <div className="text-center mb-stack-lg mt-stack-md">
          <h1 className="text-display-lg text-primary mb-stack-sm">Design Your LOOP</h1>
          <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Choose your base, add the charms you love, and review before you add it to your bag.
          </p>
        </div>

        {/* Steps */}
        <div className="flex justify-between items-center mb-stack-lg relative max-w-3xl mx-auto">
          <div className="absolute left-0 top-6 w-full h-1 bg-secondary-fixed rounded-full" />
          {steps.map((label, i) => (
            <button
              key={label}
              onClick={() => setStep(i)}
              className="flex flex-col items-center gap-2 bg-background px-4 relative z-10"
            >
              <span
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-headline-md ${
                  i <= step
                    ? "border-primary-container bg-secondary-fixed text-primary-container"
                    : "border-outline-variant text-on-surface-variant"
                }`}
              >
                {i + 1}
              </span>
              <span
                className={`text-label-md ${i <= step ? "text-primary" : "text-on-surface-variant"}`}
              >
                {label}
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-gutter items-start">
          {/* Options */}
          <div className="flex-1 w-full space-y-stack-md">
            {step === 0 && (
              <>
                <section>
                  <h2 className="text-headline-md text-on-surface mb-stack-sm">Choose Your Base</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {bases.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => setBase(b.id)}
                        className={`rounded-[2rem] p-3 text-left border-2 bg-surface-container-lowest transition-all ${
                          base === b.id
                            ? "border-primary-container shadow-soft"
                            : "border-transparent hover:border-outline-variant"
                        }`}
                      >
                        <div className="aspect-square rounded-[1.5rem] overflow-hidden mb-3 bg-surface-container">
                          <img src={b.image} alt={b.label} className="w-full h-full object-cover" />
                        </div>
                        <p className="text-label-lg text-on-surface">{b.label}</p>
                        <p className="text-body-md text-on-surface-variant">${b.price}</p>
                      </button>
                    ))}
                  </div>
                </section>
                <section>
                  <h2 className="text-headline-md text-on-surface mb-stack-sm">Base Color</h2>
                  <div className="flex gap-4">
                    {baseColors.map((c) => (
                      <button
                        key={c.id}
                        aria-label={c.label}
                        onClick={() => setColor(c.id)}
                        className={`w-10 h-10 rounded-full ${c.className} ${
                          color === c.id
                            ? "ring-2 ring-offset-2 ring-primary"
                            : "ring-1 ring-outline"
                        }`}
                      />
                    ))}
                  </div>
                </section>
              </>
            )}

            {step === 1 && (
              <>
                <section>
                  <h2 className="text-headline-md text-on-surface mb-stack-sm">Add Charms</h2>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                    {charms.map((c) => {
                      const on = picked.includes(c.id);
                      return (
                        <button
                          key={c.id}
                          onClick={() => toggleCharm(c.id)}
                          className={`relative aspect-square rounded-[1.5rem] overflow-hidden border-2 bg-surface-container transition-all ${
                            on ? "border-primary-container" : "border-transparent hover:border-outline-variant"
                          }`}
                        >
                          <img src={c.image} alt={c.label} className="w-full h-full object-cover" />
                          {on && (
                            <span className="absolute top-2 right-2 material-symbols-outlined text-primary filled">
                              check_circle
                            </span>
                          )}
                          <span className="absolute bottom-0 inset-x-0 bg-surface-container-lowest/85 text-label-md py-1">
                            {c.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </section>
                <section>
                  <h2 className="text-headline-md text-on-surface mb-stack-sm">
                    Alphabet Beads{" "}
                    <span className="text-body-md text-on-surface-variant">
                      ({beads.length}/8 · $4 each)
                    </span>
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {letters.map((l) => {
                      const on = beads.includes(l);
                      return (
                        <button
                          key={l}
                          onClick={() => toggleBead(l)}
                          className={`w-10 h-10 rounded-full text-label-lg transition-colors ${
                            on
                              ? "bg-primary text-on-primary"
                              : "bg-surface-container text-on-surface hover:bg-secondary-fixed"
                          }`}
                        >
                          {l}
                        </button>
                      );
                    })}
                  </div>
                </section>
              </>
            )}

            {step === 2 && (
              <section className="bg-surface-container-lowest rounded-[2rem] p-stack-md card-shadow space-y-3">
                <h2 className="text-headline-md text-on-surface mb-stack-sm">Review Your LOOP</h2>
                <Row label={`Base — ${baseObj.label} (${color})`} value={`$${baseObj.price}`} />
                {picked.map((id) => {
                  const c = charms.find((x) => x.id === id)!;
                  return <Row key={id} label={`Charm — ${c.label}`} value={`$${c.price}`} />;
                })}
                {beads.length > 0 && (
                  <Row label={`Beads — ${beads.join(" ")}`} value={`$${beads.length * 4}`} />
                )}
                <div className="border-t border-outline-variant pt-3 flex justify-between text-headline-md text-on-surface">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </section>
            )}

            <div className="flex gap-3 pt-2">
              {step > 0 && (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="btn-secondary text-label-lg px-8 py-3 rounded-full"
                >
                  Back
                </button>
              )}
              {step < 2 && (
                <button
                  onClick={() => setStep((s) => s + 1)}
                  className="btn-primary text-label-lg px-8 py-3 rounded-full"
                >
                  Continue
                </button>
              )}
            </div>
          </div>

          {/* Live preview */}
          <aside className="w-full lg:w-[420px] bg-surface-container rounded-[2rem] p-stack-md sticky top-28">
            <div className="relative aspect-square rounded-[1.5rem] overflow-hidden bg-surface-container-lowest flex items-center justify-center">
              <img
                src={baseObj.image}
                alt={`${baseObj.label} base preview`}
                className="absolute inset-0 w-full h-full object-cover opacity-90"
              />
              <span
                className={`absolute inset-0 mix-blend-multiply opacity-30 ${
                  baseColors.find((c) => c.id === color)?.className
                }`}
              />
              <div className="relative flex flex-wrap items-center justify-center gap-2 p-6">
                {picked.map((id) => {
                  const c = charms.find((x) => x.id === id)!;
                  return (
                    <img
                      key={id}
                      src={c.image}
                      alt={c.label}
                      className="w-16 h-16 rounded-full object-cover border-2 border-surface-container-lowest shadow-soft"
                    />
                  );
                })}
                {beads.map((l) => (
                  <span
                    key={l}
                    className="w-10 h-10 rounded-full bg-surface-container-lowest text-on-surface flex items-center justify-center text-label-lg shadow-soft"
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-stack-sm space-y-1">
              <p className="text-headline-md text-on-surface">Your Custom LOOP</p>
              <p className="text-body-md text-on-surface-variant">
                {baseObj.label} · {picked.length} charm{picked.length === 1 ? "" : "s"}
                {beads.length ? ` · ${beads.join("")}` : ""}
              </p>
            </div>
            <button
              onClick={() => {
                addToCart({
                  id: `custom-${base}-${color}-${picked.join("")}-${beads.join("")}`,
                  name: `Custom LOOP (${baseObj.label})`,
                  price: total,
                  image: baseObj.image,
                });
                setAdded(true);
                setTimeout(() => {
                  setAdded(false);
                  navigate({ to: "/cart" });
                }, 1200);
              }}
              className={`w-full mt-stack-sm text-label-lg py-4 rounded-full shadow-soft flex items-center justify-center gap-2 ${
                added ? "bg-green-600 text-white" : "btn-primary"
              }`}
            >
              <span>{added ? "ADDED ✓" : "ADD MY LOOP TO CART"}</span>
              <span className="opacity-80">${total}</span>
            </button>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-body-md text-on-surface-variant">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
