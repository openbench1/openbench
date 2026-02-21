"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { FileDown, Share2, PlusCircle, Check } from "lucide-react";

interface ReportHeaderProps {
  contractName: string;
}

export function ReportHeader({ contractName }: ReportHeaderProps) {
  const t = useTranslations("report");
  const [shared, setShared] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: `${contractName} - Security Audit`, url });
        return;
      } catch {
        // fallback
      }
    }
    await navigator.clipboard.writeText(url);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground mt-1 font-mono">{contractName}</p>
      </div>
      <div className="flex gap-3">
        <Button
          variant="outline"
          size="sm"
          className="border-cyber-border hover:border-neon-blue"
        >
          <FileDown className="h-4 w-4 mr-1.5" />
          {t("actions.download")}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-cyber-border hover:border-neon-blue"
          onClick={handleShare}
        >
          {shared ? (
            <Check className="h-4 w-4 mr-1.5 text-neon-green" />
          ) : (
            <Share2 className="h-4 w-4 mr-1.5" />
          )}
          {t("actions.share")}
        </Button>
        <Button
          asChild
          size="sm"
          className="bg-neon-green text-black font-semibold"
        >
          <Link href="/audit">
            <PlusCircle className="h-4 w-4 mr-1.5" />
            {t("actions.newAudit")}
          </Link>
        </Button>
      </div>
    </div>
  );
}
