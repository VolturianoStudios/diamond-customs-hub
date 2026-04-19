import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import { toast } from "sonner";

const Checkout = () => {
  const { detailed, subtotal, itemCount, clear } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const shipping = subtotal >= 1500 ? 0 : 99;
  const total = subtotal + shipping;

  if (itemCount === 0) {
    return (
      <SiteLayout>
        <PageHeader eyebrow="Checkout" title="Nothing to check out" />
        <section className="container-tight py-16 text-center">
          <Button asChild size="lg">
            <Link to="/shop">Browse products</Link>
          </Button>
        </section>
      </SiteLayout>
    );
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Placeholder: integrate Lovable Cloud + payments later.
    setTimeout(() => {
      toast.success("Order placed! (demo)");
      clear();
      navigate("/");
    }, 800);
  };

  return (
    <SiteLayout>
      <PageHeader eyebrow="Checkout" title="Complete your order" />

      <section className="container-tight grid gap-12 py-12 lg:grid-cols-[1fr_400px]">
        <form onSubmit={handleSubmit} className="space-y-8">
          <fieldset className="space-y-4">
            <legend className="font-display text-lg font-semibold">Contact</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="email" label="Email" type="email" required />
              <Field id="phone" label="Phone" type="tel" />
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="font-display text-lg font-semibold">Shipping address</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="firstName" label="First name" required />
              <Field id="lastName" label="Last name" required />
              <Field id="address" label="Street address" required className="sm:col-span-2" />
              <Field id="postal" label="Postal code" required />
              <Field id="city" label="City" required />
              <Field id="country" label="Country" defaultValue="Sweden" required className="sm:col-span-2" />
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="font-display text-lg font-semibold">Payment</legend>
            <div className="rounded-md border border-dashed border-border bg-secondary p-6 text-center text-sm text-muted-foreground">
              Payment integration is not connected yet. This is a frontend skeleton.
            </div>
          </fieldset>

          <Button type="submit" size="lg" className="w-full" disabled={submitting}>
            {submitting ? "Placing order…" : `Place order — ${formatPrice(total)}`}
          </Button>
        </form>

        <aside className="h-fit rounded-md border border-border bg-card p-6">
          <h2 className="font-display text-lg font-semibold">Your order</h2>
          <Separator className="my-4" />
          <ul className="space-y-3 text-sm">
            {detailed.map(({ product, quantity, lineTotal }) => (
              <li key={product.id} className="flex justify-between gap-4">
                <span className="text-muted-foreground">
                  {product.name} <span className="text-xs">× {quantity}</span>
                </span>
                <span>{formatPrice(lineTotal, product.currency)}</span>
              </li>
            ))}
          </ul>
          <Separator className="my-4" />
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
            </div>
          </dl>
          <Separator className="my-4" />
          <div className="flex justify-between font-display text-base font-semibold">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </aside>
      </section>
    </SiteLayout>
  );
};

const Field = ({
  id,
  label,
  type = "text",
  required,
  defaultValue,
  className,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  className?: string;
}) => (
  <div className={className}>
    <Label htmlFor={id} className="mb-2 block text-xs font-medium uppercase tracking-wider">
      {label}
    </Label>
    <Input id={id} name={id} type={type} required={required} defaultValue={defaultValue} />
  </div>
);

export default Checkout;
