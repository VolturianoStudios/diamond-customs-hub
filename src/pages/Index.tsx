import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Truck, ShieldCheck } from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { CAR_BRANDS, CATEGORIES, getFeaturedProducts } from "@/data/catalog";

const Index = () => {
  const featured = getFeaturedProducts();

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-brand-black text-brand-white">
        <img
          src={heroImage}
          alt="Premium black BMW with glowing red taillights"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="container-tight relative z-10 flex min-h-[78vh] flex-col justify-end pb-16 pt-32 md:pb-24">
          <div className="max-w-2xl animate-fade-in-up">
            <p className="text-eyebrow mb-4 text-white/70">Diamond Customs</p>
            <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              Premium parts.
              <br />
              <span className="text-white/60">Engineered to stand out.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-white/70 md:text-lg">
              Curated modifications and accessories for enthusiasts who care about every detail.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="secondary" className="group">
                <Link to="/shop">
                  Shop the collection
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-transparent text-white hover:bg-white hover:text-brand-black"
              >
                <Link to="/about">Our story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-border bg-background">
        <div className="container-tight grid gap-6 py-8 sm:grid-cols-3">
          {[
            { icon: ShieldCheck, title: "Premium quality", text: "Hand-picked, road-tested parts." },
            { icon: Truck, title: "Fast shipping", text: "Dispatched within 24 hours." },
            { icon: Sparkles, title: "Built for enthusiasts", text: "By people who actually drive." },
          ].map((f) => (
            <div key={f.title} className="flex items-start gap-3">
              <f.icon className="mt-0.5 h-5 w-5" />
              <div>
                <p className="text-sm font-semibold">{f.title}</p>
                <p className="text-sm text-muted-foreground">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shop by car */}
      <section className="container-tight py-16 md:py-24">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-eyebrow mb-3">Shop by Car</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Find what fits your ride
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden text-sm font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground md:inline-flex"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {CAR_BRANDS.map((brand) => (
            <Link
              key={brand.slug}
              to={`/brand/${brand.slug}`}
              className="group flex aspect-square flex-col items-center justify-center rounded-md border border-border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant"
            >
              <span className="font-display text-xl font-semibold tracking-wide">{brand.name}</span>
              <span className="mt-2 text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                Shop →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-secondary">
        <div className="container-tight py-16 md:py-24">
          <div className="mb-10">
            <p className="text-eyebrow mb-3">Categories</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Browse the catalog
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-md border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant"
              >
                <div>
                  <h3 className="font-display text-lg font-semibold">{cat.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{cat.description}</p>
                </div>
                <span className="mt-6 inline-flex items-center text-sm font-medium uppercase tracking-wider">
                  Explore <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="container-tight py-16 md:py-24">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-eyebrow mb-3">Featured</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Customer favorites
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden text-sm font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground md:inline-flex"
          >
            View all →
          </Link>
        </div>
        <ProductGrid products={featured} emptyMessage="No featured products yet." />
      </section>

      {/* CTA */}
      <section className="bg-brand-black text-brand-white">
        <div className="container-tight grid gap-8 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="text-eyebrow mb-3 text-white/60">Bigger build?</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Custom installs at our workshop.
            </h2>
            <p className="mt-4 max-w-md text-white/70">
              From full ambient lighting builds to chrome delete and emblem swaps — we handle it all.
            </p>
          </div>
          <div className="flex items-end md:justify-end">
            <Button asChild size="lg" variant="secondary">
              <Link to="/contact">Book a consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Index;
