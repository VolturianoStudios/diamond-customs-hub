import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SUPPORTED_LANGUAGES } from "@/i18n";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  variant?: "ghost" | "outline";
  className?: string;
}

export const LanguageToggle = ({ variant = "ghost", className }: LanguageToggleProps) => {
  const { i18n, t } = useTranslation();
  const current = SUPPORTED_LANGUAGES.find((l) => i18n.language?.startsWith(l.code)) ?? SUPPORTED_LANGUAGES[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size="sm"
          className={cn("gap-1.5 text-xs font-medium uppercase tracking-wider", className)}
          aria-label={t("common.language")}
        >
          <Languages className="h-4 w-4" />
          {current.short}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {SUPPORTED_LANGUAGES.map((lng) => (
          <DropdownMenuItem
            key={lng.code}
            onClick={() => i18n.changeLanguage(lng.code)}
            className={cn(
              "cursor-pointer text-sm",
              current.code === lng.code && "font-semibold",
            )}
          >
            {lng.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
