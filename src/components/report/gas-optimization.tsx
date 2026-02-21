"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { SeverityBadge } from "./severity-badge";
import type { GasOptimization as GasOptType } from "@/lib/types";
import { Zap, MapPin, Wrench } from "lucide-react";

interface GasOptimizationProps {
  optimizations: GasOptType[];
}

export function GasOptimizationSection({
  optimizations,
}: GasOptimizationProps) {
  const t = useTranslations("report");

  if (optimizations.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Zap className="h-5 w-5 text-neon-green" />
        {t("gasOptimization")}
      </h2>
      <div className="space-y-3">
        {optimizations.map((opt) => (
          <Card key={opt.id} className="bg-cyber-card border-severity-gas/20">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-muted-foreground">
                    {opt.id}
                  </span>
                  <span className="font-semibold text-sm">{opt.title}</span>
                </div>
                <SeverityBadge severity="gas" />
              </div>
              <p className="text-sm text-muted-foreground">
                {opt.description}
              </p>
              <div className="flex items-center gap-2 text-xs">
                <MapPin className="h-3 w-3 text-neon-blue" />
                <code className="text-neon-blue font-mono">{opt.location}</code>
                {opt.estimatedSavings && (
                  <span className="text-neon-green ml-auto">
                    {opt.estimatedSavings}
                  </span>
                )}
              </div>
              <div className="bg-neon-green/5 border border-neon-green/10 rounded p-2">
                <div className="flex items-center gap-1 text-xs text-neon-green mb-1">
                  <Wrench className="h-3 w-3" />
                  Recommendation
                </div>
                <p className="text-xs text-muted-foreground">
                  {opt.recommendation}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
