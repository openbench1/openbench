"use client";

import { useTranslations, useLocale } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RiskItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ShieldCheck, AlertTriangle, XCircle } from "lucide-react";

interface RiskChecklistProps {
  items: RiskItem[];
}

const STATUS_CONFIG = {
  safe: {
    icon: ShieldCheck,
    color: "text-neon-green",
    bg: "bg-neon-green/5",
    border: "border-neon-green/20",
    label: "SAFE",
    labelZh: "安全",
  },
  warning: {
    icon: AlertTriangle,
    color: "text-severity-medium",
    bg: "bg-severity-medium/5",
    border: "border-severity-medium/20",
    label: "CAUTION",
    labelZh: "注意",
  },
  danger: {
    icon: XCircle,
    color: "text-severity-critical",
    bg: "bg-severity-critical/5",
    border: "border-severity-critical/20",
    label: "DANGER",
    labelZh: "危险",
  },
};

export function RiskChecklist({ items }: RiskChecklistProps) {
  const t = useTranslations("report");
  const locale = useLocale();

  // Sort: danger first, then warning, then safe
  const sorted = [...items].sort((a, b) => {
    const order = { danger: 0, warning: 1, safe: 2 };
    return order[a.status] - order[b.status];
  });

  const dangerCount = items.filter((i) => i.status === "danger").length;
  const warningCount = items.filter((i) => i.status === "warning").length;
  const safeCount = items.filter((i) => i.status === "safe").length;

  return (
    <Card className="bg-cyber-card border-cyber-border">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{t("securityChecks")}</span>
          <div className="flex gap-3 text-xs font-normal">
            <span className="text-severity-critical">{dangerCount} {t("dangerItems")}</span>
            <span className="text-severity-medium">{warningCount} {t("warningItems")}</span>
            <span className="text-neon-green">{safeCount} {t("safeItems")}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {sorted.map((item) => {
          const config = STATUS_CONFIG[item.status];
          const Icon = config.icon;
          const name = locale === "zh" ? item.nameZh : item.nameEn;
          const desc = locale === "zh" ? item.descriptionZh : item.descriptionEn;
          const statusLabel = locale === "zh" ? config.labelZh : config.label;

          return (
            <div
              key={item.key}
              className={cn(
                "flex items-start gap-3 p-3 rounded-lg border transition-colors",
                config.bg,
                config.border
              )}
            >
              <Icon className={cn("h-5 w-5 mt-0.5 flex-shrink-0", config.color)} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-sm">{name}</span>
                  <div className="flex items-center gap-2">
                    {item.value && (
                      <span className={cn("text-xs font-mono", config.color)}>
                        {item.value}
                      </span>
                    )}
                    <span
                      className={cn(
                        "text-xs font-bold px-2 py-0.5 rounded",
                        config.color,
                        config.bg
                      )}
                    >
                      {statusLabel}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{desc}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
