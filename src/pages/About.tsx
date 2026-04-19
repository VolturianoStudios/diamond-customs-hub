import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";

const About = () => {
  const { t } = useTranslation();

  return (
    <SiteLayout>
      <PageHeader
        eyebrow={t("about.eyebrow")}
        title={t("about.title")}
        description={t("about.description")}
      />

      <section className="container-tight grid gap-12 py-16 md:grid-cols-2 md:py-24">
        <div className="space-y-4">
          <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            {t("about.qualityTitle")}
          </h2>
          <p className="text-muted-foreground">{t("about.qualityText")}</p>
        </div>
        <div className="space-y-4">
          <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            {t("about.enthusiastsTitle")}
          </h2>
          <p className="text-muted-foreground">{t("about.enthusiastsText")}</p>
        </div>
      </section>

      <section className="bg-brand-black py-16 text-brand-white md:py-24">
        <div className="container-tight grid gap-8 md:grid-cols-3">
          {[
            { n: "500+", label: t("about.stat1") },
            { n: "5", label: t("about.stat2") },
            { n: "24h", label: t("about.stat3") },
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
          {t("about.ctaTitle")}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">{t("about.ctaText")}</p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link to="/shop">{t("about.shopBtn")}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/contact">{t("about.contactBtn")}</Link>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
};

export default About;
