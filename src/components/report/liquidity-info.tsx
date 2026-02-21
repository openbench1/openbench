"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LiquidityInfo as LiquidityInfoType } from "@/lib/types";
import { Droplets, Lock, Unlock } from "lucide-react";
import { cn } from "@/lib/utils";

interface LiquidityInfoProps {
  liquidity: LiquidityInfoType;
}

export function LiquidityInfoCard({ liquidity }: LiquidityInfoProps) {
  const t = useTranslations("report.liquidity");

  return (
    <Card className="bg-cyber-card border-cyber-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Droplets className="h-5 w-5 text-neon-blue" />
          {t("title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* LP Lock Status */}
        <div
          className={cn(
            "flex items-center gap-3 p-4 rounded-lg border",
            liquidity.isLpLocked
              ? "bg-neon-green/5 border-neon-green/20"
              : "bg-severity-critical/5 border-severity-critical/20"
          )}
        >
          {liquidity.isLpLocked ? (
            <Lock className="h-6 w-6 text-neon-green" />
          ) : (
            <Unlock className="h-6 w-6 text-severity-critical" />
          )}
          <div>
            <p className="font-semibold text-sm">
              {liquidity.isLpLocked ? t("locked") : t("unlocked")}
            </p>
            <p className="text-xs text-muted-foreground">
              {liquidity.isLpLocked
                ? t("lockedDesc", { percent: liquidity.lpLockPercent || "?" })
                : t("unlockedDesc")}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2 text-sm">
          {liquidity.dexName && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("dex")}</span>
              <span>{liquidity.dexName}</span>
            </div>
          )}
          {liquidity.liquidity && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("totalLiquidity")}</span>
              <span className="text-neon-green font-mono">
                ${parseFloat(liquidity.liquidity).toLocaleString()}
              </span>
            </div>
          )}
          {liquidity.lpLockPercent && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("lockPercent")}</span>
              <span>{liquidity.lpLockPercent}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
