import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/loop/Header";
import { Footer } from "@/components/loop/Footer";
import { img } from "@/lib/loop-images";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About LOOP — Modular Accessories" },
      {
        name: "description",
        content:
          "LOOP is a modular accessories studio making phone charms, bag charms and keychains you can mix, match and rebuild whenever your mood changes.",
      },
      { property: "og:title", content: "About LOOP — Modular Accessories" },
      {
        property: "og:description",
        content: "The studio behind LOOP's mix-and-match charms, chains and keychains.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-[104px] pb-stack-lg fluid-container">
        <section className="mt-stack-md grid gap-gutter lg:grid-cols-2 items-center">
          <div className="space-y-stack-sm">
            <h1 className="text-display-lg text-primary">About LOOP</h1>
            <p className="text-body-lg text-on-surface-variant">
              LOOP started with one simple idea: your accessories should change as often as you do.
              Every chain, charm and connector we make snaps together, so a bag charm today can be a
              phone charm tomorrow.
            </p>
            <p className="text-body-md text-on-surface-variant">
              We design in small batches, obsess over glossy finishes and soft pinks, and build
              everything around a modular system that grows with your collection.
            </p>
            <Link
              to="/build"
              className="btn-primary text-label-lg px-8 py-4 rounded-full inline-block shadow-soft"
            >
              Build Your LOOP
            </Link>
          </div>
          <div className="rounded-[3rem] overflow-hidden card-shadow">
            <img
              src={img.heroDesktop}
              alt="An assortment of LOOP charms and chains laid out on cream fabric"
              className="w-full h-full object-cover"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
