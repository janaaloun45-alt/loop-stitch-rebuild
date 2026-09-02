import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/loop/Header";
import { Footer } from "@/components/loop/Footer";
import { useLoop } from "@/lib/loop-store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag — LOOP" },
      {
        name: "description",
        content: "Review the charms and custom LOOPs in your bag before checking out.",
      },
      { property: "og:title", content: "Your Bag — LOOP" },
      { property: "og:description", content: "Review your LOOP charms before checkout." },
    ],
  }),
  component: Cart,
});

function Cart() {
  const { cart, cartTotal, removeFromCart } = useLoop();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-[104px] pb-stack-lg fluid-container">
        <h1 className="text-display-lg text-primary mt-stack-md mb-stack-lg">Your Bag</h1>

        {cart.length === 0 ? (
          <div className="text-center py-stack-lg space-y-stack-sm">
            <p className="text-body-lg text-on-surface-variant">Your bag is empty for now.</p>
            <Link to="/shop" className="btn-primary text-label-lg px-8 py-4 rounded-full inline-block">
              Shop All Charms
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-gutter items-start">
            <ul className="flex-1 w-full space-y-4">
              {cart.map((line) => (
                <li
                  key={line.id}
                  className="flex items-center gap-4 bg-surface-container-lowest rounded-[1.5rem] p-4 card-shadow"
                >
                  <div className="w-20 h-20 rounded-[1rem] overflow-hidden bg-surface-container flex-shrink-0">
                    {line.image && (
                      <img src={line.image} alt={line.name} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-headline-md text-on-surface">{line.name}</p>
                    <p className="text-body-md text-on-surface-variant">
                      Qty {line.qty} · ${line.price}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(line.id)}
                    aria-label={`Remove ${line.name}`}
                    className="text-on-surface-variant hover:text-primary"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </li>
              ))}
            </ul>
            <aside className="w-full lg:w-96 bg-surface-container rounded-[2rem] p-stack-md space-y-4">
              <h2 className="text-headline-md text-on-surface">Order Summary</h2>
              <div className="flex justify-between text-body-md text-on-surface-variant">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-body-md text-on-surface-variant">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t border-outline-variant pt-4 flex justify-between text-headline-md text-on-surface">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <button className="btn-primary w-full text-label-lg py-4 rounded-full shadow-soft">
                Checkout
              </button>
              <Link
                to="/shop"
                className="block text-center text-label-lg text-primary hover:underline underline-offset-4"
              >
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
