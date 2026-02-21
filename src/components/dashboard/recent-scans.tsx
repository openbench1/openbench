"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ScanResult } from "@/lib/types";
import { getChainById } from "@/lib/chains";
import { formatDate } from "@/lib/utils";
import { Eye } from "lucide-react";

interface RecentScansProps {
  scans: ScanResult[];
}

export function RecentScans({ scans }: RecentScansProps) {
  const t = useTranslations("dashboard.recentScans");
  const locale = useLocale();

  return (
    <Card className="bg-cyber-card border-cyber-border">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        {scans.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            {t("empty")}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-cyber-border">
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">
                    {t("columns.token")}
                  </th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">
                    {t("columns.chain")}
                  </th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">
                    {t("columns.score")}
                  </th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">
                    {t("columns.status")}
                  </th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">
                    {t("columns.date")}
                  </th>
                  <th className="text-right py-3 px-2 text-muted-foreground font-medium">
                    {t("columns.actions")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {scans.map((scan) => {
                  const chain = getChainById(scan.chainId);
                  const isDanger = scan.isHoneypot || scan.safetyScore < 40;
                  const isSafe = scan.safetyScore >= 70;

                  return (
                    <tr
                      key={scan.id}
                      className="border-b border-cyber-border/50 hover:bg-cyber-card-hover transition-colors"
                    >
                      <td className="py-3 px-2">
                        <div>
                          <span className="font-medium text-sm">
                            {scan.tokenInfo.name || "Unknown"}
                          </span>
                          <span className="text-muted-foreground text-xs ml-2">
                            ${scan.tokenInfo.symbol}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <span>{chain?.icon} {chain?.shortName}</span>
                      </td>
                      <td className="py-3 px-2">
                        <span
                          className={
                            isSafe
                              ? "text-neon-green font-bold"
                              : isDanger
                              ? "text-severity-critical font-bold"
                              : "text-severity-medium font-bold"
                          }
                        >
                          {scan.safetyScore}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        {scan.isHoneypot ? (
                          <span className="text-severity-critical text-xs font-bold">
                            HONEYPOT
                          </span>
                        ) : isSafe ? (
                          <span className="text-neon-green text-xs">Safe</span>
                        ) : (
                          <span className="text-severity-medium text-xs">
                            Caution
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-2 text-muted-foreground text-xs">
                        {formatDate(scan.createdAt, locale)}
                      </td>
                      <td className="py-3 px-2 text-right">
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="text-neon-green hover:text-neon-green"
                        >
                          <Link href={`/report/${scan.chainId}/${scan.address}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
