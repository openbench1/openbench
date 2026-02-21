"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Construction, ArrowLeft } from "lucide-react";

interface ComingSoonProps {
  titleKey: string;
  descKey: string;
}

export function ComingSoon({ titleKey, descKey }: ComingSoonProps) {
  const t = useTranslations("comingSoon");

  return (
    <div className="container mx-auto px-4 py-32 max-w-xl text-center">
      <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-muted mb-6">
        <Construction className="h-8 w-8 text-muted-foreground" />
      </div>
      <h1 className="text-3xl font-bold mb-3">{t(titleKey)}</h1>
      <p className="text-muted-foreground text-lg mb-8">{t(descKey)}</p>
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm text-muted-foreground mb-8">
        {t("badge")}
      </div>
      <div className="flex justify-center">
        <Button asChild variant="outline" size="sm">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("backHome")}
          </Link>
        </Button>
      </div>
    </div>
  );
}
