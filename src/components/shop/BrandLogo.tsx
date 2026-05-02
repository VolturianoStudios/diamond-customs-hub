import { CarBrand } from "@/data/types";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  brand: CarBrand;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const BrandLogo = ({ brand, className, size = "md" }: BrandLogoProps) => {
  const sizeClasses = {
    sm: "h-12 w-12",
    md: "h-24 w-24 md:h-32 md:w-32",
    lg: "h-32 w-32 md:h-48 md:w-48",
  };

  const imageSizes = {
    sm: "48px",
    md: "(max-width: 768px) 96px, 128px",
    lg: "(max-width: 768px) 128px, 192px",
  };

  return (
    <div className={cn("relative flex items-center justify-center", sizeClasses[size], className)}>
      <img
        src={brand.logo.optimized}
        srcSet={`${brand.logo.thumb} 256w, ${brand.logo.optimized} 640w, ${brand.logo.original} 1280w`}
        sizes={imageSizes[size]}
        alt={`${brand.name} logo`}
        className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
    </div>
  );
};
