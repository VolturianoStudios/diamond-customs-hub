import { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  children?: ReactNode;
}

export const PageHeader = ({ eyebrow, title, description, align = "left", children }: PageHeaderProps) => {
  return (
    <section className="border-b border-border bg-secondary">
      <div
        className={`container-tight py-14 md:py-20 ${
          align === "center" ? "text-center" : ""
        }`}
      >
        {eyebrow && <p className="text-eyebrow mb-3">{eyebrow}</p>}
        <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p
            className={`mt-4 max-w-2xl text-base text-muted-foreground md:text-lg ${
              align === "center" ? "mx-auto" : ""
            }`}
          >
            {description}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
};
