import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="About"
        title="Built for those who notice the details."
        description="Diamond Customs is a curation of premium modifications and accessories — selected, tested and stocked by people who actually drive."
      />

      <section className="container-tight grid gap-12 py-16 md:grid-cols-2 md:py-24">
        <div className="space-y-4">
          <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            Quality, first.
          </h2>
          <p className="text-muted-foreground">
            Every part in our store is hand-picked. We don't list anything we wouldn't fit on our own
            cars. From flush badges to full ambient lighting installs, the bar is the same: it has to
            look like it came from the factory — only better.
          </p>
        </div>
        <div className="space-y-4">
          <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            Built for enthusiasts.
          </h2>
          <p className="text-muted-foreground">
            We started Diamond Customs because the modification scene needed a place that takes both
            taste and quality seriously. Whether you're after a single emblem or a complete cabin
            transformation, we've got you covered.
          </p>
        </div>
      </section>

      <section className="bg-brand-black py-16 text-brand-white md:py-24">
        <div className="container-tight grid gap-8 md:grid-cols-3">
          {[
            { n: "500+", label: "Customer builds (goal 2026)" },
            { n: "5", label: "Premium brands stocked" },
            { n: "24h", label: "Average dispatch time" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display text-5xl font-semibold tracking-tight md:text-6xl">
                {s.n}
              </div>
              <p className="mt-2 text-sm text-white/60">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-tight py-16 text-center md:py-24">
        <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
          Ready to build?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Browse the collection or reach out to discuss a custom install.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link to="/shop">Shop the collection</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/contact">Contact us</Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
};

export default About;
