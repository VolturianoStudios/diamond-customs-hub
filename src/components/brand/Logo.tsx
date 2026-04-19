import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
}

export const Logo = ({ className = "", variant = "dark" }: LogoProps) => {
  const color = variant === "light" ? "text-brand-white" : "text-brand-black";
  return (
    <Link to="/" className={`group inline-flex items-center gap-2 ${className}`} aria-label="Diamond Customs — Home">
      <span className={`relative inline-flex h-7 w-7 items-center justify-center ${color}`}>
        <svg viewBox="0 0 32 32" className="h-full w-full" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M16 2 L30 14 L16 30 L2 14 Z" />
          <path d="M9 14 L16 7 L23 14" opacity="0.6" />
          <path d="M9 14 L16 22 L23 14" opacity="0.4" />
        </svg>
      </span>
      <span className={`font-display text-base font-semibold tracking-[0.18em] ${color}`}>
        DIAMOND<span className="font-light text-muted-foreground">CUSTOMS</span>
      </span>
    </Link>
  );
};
