import { FormEvent } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Contact = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you shortly. (demo)");
    e.currentTarget.reset();
  };

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch."
        description="Questions about products, custom installs, or wholesale? Drop us a line."
      />

      <section className="container-tight grid gap-12 py-16 lg:grid-cols-[1fr_360px]">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="name" className="mb-2 block text-xs font-medium uppercase tracking-wider">
                Name
              </Label>
              <Input id="name" required />
            </div>
            <div>
              <Label htmlFor="email" className="mb-2 block text-xs font-medium uppercase tracking-wider">
                Email
              </Label>
              <Input id="email" type="email" required />
            </div>
          </div>
          <div>
            <Label htmlFor="subject" className="mb-2 block text-xs font-medium uppercase tracking-wider">
              Subject
            </Label>
            <Input id="subject" />
          </div>
          <div>
            <Label htmlFor="message" className="mb-2 block text-xs font-medium uppercase tracking-wider">
              Message
            </Label>
            <Textarea id="message" rows={6} required />
          </div>
          <Button type="submit" size="lg">
            Send message
          </Button>
        </form>

        <aside className="space-y-6 rounded-md border border-border bg-card p-6">
          <ContactRow icon={Mail} label="Email" value="hello@diamondcustoms.se" />
          <ContactRow icon={Phone} label="Phone" value="+46 70 000 00 00" />
          <ContactRow icon={MapPin} label="Workshop" value="Gothenburg, Sweden" />
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
