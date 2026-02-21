"use client";

import { useTranslations, useLocale } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScoreGauge } from "./score-gauge";
import { SeverityBadge } from "./severity-badge";
import { SEVERITY_ORDER } from "@/lib/constants";
import type { AuditReport } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface ReportSummaryProps {
  report: AuditReport;
  engine: string;
  createdAt: string;
}

export function ReportSummary({
  report,
  engine,
  createdAt,
}: ReportSummaryProps) {
  const t = useTranslations("report");
  const locale = useLocale();

  return (
    <Card className="bg-cyber-card border-cyber-border">
      <CardHeader>
        <CardTitle>{t("summary")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <ScoreGauge score={report.securityScore} />

          <div className="flex-1 space-y-3 text-sm w-full">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {t("overview.contractName")}
              </span>
              <span className="font-mono">{report.contractName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {t("overview.engine")}
              </span>
              <span className="capitalize">{engine}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {t("overview.timestamp")}
              </span>
              <span>{formatDate(createdAt, locale)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {t("overview.linesOfCode")}
              </span>
              <span>{report.linesOfCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                {t("overview.totalFindings")}
              </span>
              <span>
                {report.vulnerabilities.length +
                  report.gasOptimizations.length}
              </span>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed border-t border-cyber-border pt-4">
          {report.summary}
        </p>

        <div className="flex flex-wrap gap-2 border-t border-cyber-border pt-4">
          {SEVERITY_ORDER.map((sev) => {
            const count = report.severityCounts[sev];
            if (count === 0) return null;
            return (
              <SeverityBadge
                key={sev}
                severity={sev}
                label={`${count} ${t(`severity.${sev}`)}`}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
