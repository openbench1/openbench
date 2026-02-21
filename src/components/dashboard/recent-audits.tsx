"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SeverityBadge } from "@/components/report/severity-badge";
import type { StoredAudit } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { Eye } from "lucide-react";

interface RecentAuditsProps {
  audits: StoredAudit[];
}

export function RecentAudits({ audits }: RecentAuditsProps) {
  const t = useTranslations("dashboard.recentAudits");
  const locale = useLocale();

  return (
    <Card className="bg-cyber-card border-cyber-border">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        {audits.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            {t("empty")}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-cyber-border">
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">
                    {t("columns.contract")}
                  </th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">
                    {t("columns.engine")}
                  </th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">
                    {t("columns.score")}
                  </th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">
                    {t("columns.findings")}
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
                {audits.map((audit) => (
                  <tr
                    key={audit.id}
                    className="border-b border-cyber-border/50 hover:bg-cyber-card-hover transition-colors"
                  >
                    <td className="py-3 px-2 font-mono text-xs">
                      {audit.report?.contractName || "Unknown"}
                    </td>
                    <td className="py-3 px-2 capitalize">{audit.engine}</td>
                    <td className="py-3 px-2">
                      {audit.report ? (
                        <span
                          className={
                            audit.report.securityScore >= 70
                              ? "text-neon-green"
                              : "text-severity-critical"
                          }
                        >
                          {audit.report.securityScore}
                        </span>
                      ) : (
                        "--"
                      )}
                    </td>
                    <td className="py-3 px-2">
                      {audit.report && (
                        <div className="flex gap-1">
                          {audit.report.severityCounts.critical > 0 && (
                            <SeverityBadge
                              severity="critical"
                              label={String(
                                audit.report.severityCounts.critical
                              )}
                            />
                          )}
                          {audit.report.severityCounts.high > 0 && (
                            <SeverityBadge
                              severity="high"
                              label={String(audit.report.severityCounts.high)}
                            />
                          )}
                          {audit.report.severityCounts.medium > 0 && (
                            <SeverityBadge
                              severity="medium"
                              label={String(
                                audit.report.severityCounts.medium
                              )}
                            />
                          )}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-2 text-muted-foreground text-xs">
                      {formatDate(audit.createdAt, locale)}
                    </td>
                    <td className="py-3 px-2 text-right">
                      {audit.report && (
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="text-neon-green hover:text-neon-green"
                        >
                          <Link href={`/report/${audit.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
