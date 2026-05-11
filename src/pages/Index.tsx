import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Sparkles, Truck, ShieldCheck } from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { CAR_BRANDS, CATEGORIES } from "@/data/catalog";
import { BrandLogo } from "@/components/shop/BrandLogo";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";

const Index = () => {
  const { data: featured = [], isLoading } = useShopifyProducts(undefined, 8);
  const { t } = useTranslation();

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
        <div className="container-tight relative z-10 flex min-h-[88vh] flex-col items-center pb-16 pt-20 text-center md:pt-24">
          <div className="flex flex-col items-center animate-fade-in-up">
            <h1 className="font-display text-3xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
              Diamond Customs
            </h1>
            <p className="mt-3 text-sm text-white/85 md:text-base">
              Premiumdelar designade för entusiaster.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button asChild size="lg" variant="secondary" className="w-60">
                <Link to="/shop">{t("home.shopCollection")}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-60 border-white/30 bg-transparent text-white hover:bg-white hover:text-brand-black"
              >
                <Link to="/about">{t("home.ourStory")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-border bg-background">
        <div className="container-tight grid gap-6 py-8 sm:grid-cols-3">
          {[
            { icon: ShieldCheck, title: t("home.trust.qualityTitle"), text: t("home.trust.qualityText") },
            { icon: Truck, title: t("home.trust.shippingTitle"), text: t("home.trust.shippingText") },
            { icon: Sparkles, title: t("home.trust.enthusiastsTitle"), text: t("home.trust.enthusiastsText") },
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
            <p className="text-eyebrow mb-3">{t("home.shopByCarEyebrow")}</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              {t("home.shopByCarTitle")}
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden text-sm font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground md:inline-flex"
          >
            {t("common.viewAll")} →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {CAR_BRANDS.map((brand) => (
            <Link
              key={brand.slug}
              to={`/brand/${brand.slug}`}
              className="group flex aspect-square flex-col items-center justify-center gap-3 rounded-md border border-border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant"
            >
              <BrandLogo brand={brand} size="md" />
              <span className="text-xs uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-foreground">
                {t("common.shop")} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-secondary">
        <div className="container-tight py-16 md:py-24">
          <div className="mb-10">
            <p className="text-eyebrow mb-3">{t("home.categoriesEyebrow")}</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              {t("home.categoriesTitle")}
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
                  {t("common.explore")} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
            <p className="text-eyebrow mb-3">{t("home.featuredEyebrow")}</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              {t("home.featuredTitle")}
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden text-sm font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground md:inline-flex"
          >
            {t("common.viewAll")} →
          </Link>
        </div>
        <ProductGrid products={featured} loading={isLoading} />
      </section>

      {/* CTA */}
      <section className="bg-brand-black text-brand-white">
        <div className="container-tight grid gap-8 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="text-eyebrow mb-3 text-white/60">{t("home.ctaEyebrow")}</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              {t("home.ctaTitle")}
            </h2>
            <p className="mt-4 max-w-md text-white/70">
              {t("home.ctaText")}
            </p>
          </div>
          <div className="flex items-end md:justify-end">
            <Button asChild size="lg" variant="secondary">
              <Link to="/contact">{t("home.ctaButton")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Index;
