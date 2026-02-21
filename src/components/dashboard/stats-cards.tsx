"use client";

import { useTranslations, useLocale } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import type { DashboardStats } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { BarChart3, AlertTriangle, Shield, Clock } from "lucide-react";

interface StatsCardsProps {
  stats: DashboardStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const t = useTranslations("dashboard.stats");
  const locale = useLocale();

  const items = [
    {
      key: "totalScans",
      value: stats.totalScans.toLocaleString(),
      icon: BarChart3,
      color: "text-neon-blue",
    },
    {
      key: "dangerTokens",
      value: stats.dangerTokens.toLocaleString(),
      icon: AlertTriangle,
      color: "text-severity-critical",
    },
    {
      key: "safeTokens",
      value: stats.safeTokens.toLocaleString(),
      icon: Shield,
      color: "text-neon-green",
    },
    {
      key: "lastScan",
      value: stats.lastScanDate
        ? formatDate(stats.lastScanDate, locale)
        : "--",
      icon: Clock,
      color: "text-neon-purple",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map(({ key, value, icon: Icon, color }) => (
        <Card key={key} className="bg-cyber-card border-cyber-border">
          <CardContent className="p-4 flex items-center gap-4">
            <div
              className={`h-10 w-10 rounded-lg bg-cyber-bg flex items-center justify-center ${color}`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{t(key)}</p>
              <p className="text-lg font-bold">{value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
