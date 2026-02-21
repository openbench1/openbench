"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { HolderInfo } from "@/lib/types";
import { Users, AlertTriangle, Lock } from "lucide-react";

interface HolderAnalysisProps {
  holders: HolderInfo[];
}

export function HolderAnalysis({ holders }: HolderAnalysisProps) {
  const t = useTranslations("report.holders");

  if (holders.length === 0) return null;

  const whales = holders.filter((h) => parseFloat(h.percent) > 5);

  return (
    <Card className="bg-cyber-card border-cyber-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-neon-blue" />
          {t("title")}
        </CardTitle>
        {whales.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-severity-medium">
            <AlertTriangle className="h-3.5 w-3.5" />
            {t("whaleWarning", { count: whales.length })}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cyber-border">
                <th className="text-left py-2 px-2 text-muted-foreground font-medium text-xs">
                  #
                </th>
                <th className="text-left py-2 px-2 text-muted-foreground font-medium text-xs">
                  {t("address")}
                </th>
                <th className="text-right py-2 px-2 text-muted-foreground font-medium text-xs">
                  {t("percent")}
                </th>
                <th className="text-right py-2 px-2 text-muted-foreground font-medium text-xs">
                  {t("tags")}
                </th>
              </tr>
            </thead>
            <tbody>
              {holders.map((holder, i) => {
                const pct = parseFloat(holder.percent);
                const isWhale = pct > 5;

                return (
                  <tr
                    key={holder.address}
                    className="border-b border-cyber-border/50"
                  >
                    <td className="py-2 px-2 text-muted-foreground">{i + 1}</td>
                    <td className="py-2 px-2 font-mono text-xs">
                      {holder.address.slice(0, 8)}...{holder.address.slice(-6)}
                    </td>
                    <td
                      className={`py-2 px-2 text-right font-mono ${
                        isWhale ? "text-severity-medium font-bold" : ""
                      }`}
                    >
                      {holder.percent}
                    </td>
                    <td className="py-2 px-2 text-right">
                      <div className="flex justify-end gap-1">
                        {holder.isLocked && (
                          <Badge
                            variant="outline"
                            className="text-neon-green border-neon-green/30 text-[10px] px-1.5"
                          >
                            <Lock className="h-2.5 w-2.5 mr-0.5" />
                            Locked
                          </Badge>
                        )}
                        {holder.isContract && (
                          <Badge
                            variant="outline"
                            className="text-neon-blue border-neon-blue/30 text-[10px] px-1.5"
                          >
                            Contract
                          </Badge>
                        )}
                        {holder.tag && (
                          <Badge
                            variant="outline"
                            className="text-muted-foreground text-[10px] px-1.5"
                          >
                            {holder.tag}
                          </Badge>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
