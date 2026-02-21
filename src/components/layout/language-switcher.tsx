"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "zh" : "en";
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <button
      onClick={toggleLocale}
      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-neon-green transition-colors px-2 py-1 rounded-md border border-cyber-border hover:border-neon-green/30"
    >
      <Globe className="h-4 w-4" />
      <span>{locale === "en" ? "中文" : "EN"}</span>
    </button>
  );
}
