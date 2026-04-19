import { FormEvent } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Contact = () => {
  const { t } = useTranslation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success(t("contact.sent"));
    e.currentTarget.reset();
  };

  return (
    <SiteLayout>
      <PageHeader
        eyebrow={t("contact.eyebrow")}
        title={t("contact.title")}
        description={t("contact.description")}
      />

      <section className="container-tight grid gap-12 py-16 lg:grid-cols-[1fr_360px]">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="name" className="mb-2 block text-xs font-medium uppercase tracking-wider">
                {t("contact.name")}
              </Label>
              <Input id="name" required />
            </div>
            <div>
              <Label htmlFor="email" className="mb-2 block text-xs font-medium uppercase tracking-wider">
                {t("contact.email")}
              </Label>
              <Input id="email" type="email" required />
            </div>
          </div>
          <div>
            <Label htmlFor="subject" className="mb-2 block text-xs font-medium uppercase tracking-wider">
              {t("contact.subject")}
            </Label>
            <Input id="subject" />
          </div>
          <div>
            <Label htmlFor="message" className="mb-2 block text-xs font-medium uppercase tracking-wider">
              {t("contact.message")}
            </Label>
            <Textarea id="message" rows={6} required />
          </div>
          <Button type="submit" size="lg">
            {t("contact.send")}
          </Button>
        </form>

        <aside className="space-y-6 rounded-md border border-border bg-card p-6">
          <ContactRow icon={Mail} label={t("contact.emailLabel")} value="hello@diamondcustoms.se" />
          <ContactRow icon={Phone} label={t("contact.phoneLabel")} value="+46 70 000 00 00" />
          <ContactRow icon={MapPin} label={t("contact.workshopLabel")} value={t("contact.workshopValue")} />
        </aside>
      </section>
    </SiteLayout>
  );
};

const ContactRow = ({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) => (
  <div className="flex items-start gap-3">
    <Icon className="mt-0.5 h-5 w-5 text-muted-foreground" />
    <div>
      <p className="text-eyebrow">{label}</p>
      <p className="text-sm">{value}</p>
    </div>
  </div>
);

export default Contact;
