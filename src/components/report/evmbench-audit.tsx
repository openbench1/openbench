"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VulnerabilityCard } from "./vulnerability-card";
import { SeverityBadge } from "./severity-badge";
import type { AuditReport } from "@/lib/types";

interface EVMBenchAuditProps {
  address: string;
  chainId: string;
  isOpenSource?: boolean;
}

type AuditState =
  | { phase: "idle" }
  | { phase: "submitting" }
  | { phase: "polling"; jobId: string }
  | { phase: "completed"; report: AuditReport }
  | { phase: "failed"; error: string };

const POLL_INTERVAL = 3000;

export function EVMBenchAudit({ address, chainId }: EVMBenchAuditProps) {
  const t = useTranslations("report.evmbench");
  const [state, setState] = useState<AuditState>({ phase: "idle" });
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopPolling = useCallback(() => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => stopPolling();
  }, [stopPolling]);

  const pollStatus = useCallback(
    (jobId: string) => {
      pollingRef.current = setInterval(async () => {
        try {
          const res = await fetch(`/api/evmbench/${jobId}`);
          const data = await res.json();

          if (data.status === "completed" && data.report) {
            stopPolling();
            setState({ phase: "completed", report: data.report });
          } else if (data.status === "failed") {
            stopPolling();
            setState({ phase: "failed", error: data.error || "Analysis failed" });
          }
          // Otherwise keep polling (queued/running)
        } catch {
          stopPolling();
          setState({ phase: "failed", error: "Connection lost" });
        }
      }, POLL_INTERVAL);
    },
    [stopPolling]
  );

  const startAnalysis = useCallback(async () => {
    setState({ phase: "submitting" });
    try {
      const res = await fetch("/api/evmbench", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, chainId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setState({ phase: "failed", error: data.error || "Failed to start analysis" });
        return;
      }

      setState({ phase: "polling", jobId: data.jobId });
      pollStatus(data.jobId);
    } catch {
      setState({ phase: "failed", error: "Network error" });
    }
  }, [address, chainId, pollStatus]);

  return (
    <Card className="bg-cyber-card border-cyber-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-neon-blue/10 flex items-center justify-center">
              <Brain className="h-5 w-5 text-neon-blue" />
            </div>
            <div>
              <CardTitle className="text-lg">{t("title")}</CardTitle>
              <p className="text-sm text-muted-foreground">{t("description")}</p>
            </div>
          </div>

          {state.phase === "idle" && (
            <Button
              onClick={startAnalysis}
              className="bg-neon-blue text-black font-bold hover:bg-neon-blue/90"
            >
              <Brain className="h-4 w-4 mr-2" />
              {t("runAnalysis")}
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <AnimatePresence mode="wait">
          {/* Submitting / Polling */}
          {(state.phase === "submitting" || state.phase === "polling") && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-3 p-4 rounded-lg bg-neon-blue/5 border border-neon-blue/20"
            >
              <Loader2 className="h-5 w-5 text-neon-blue animate-spin" />
              <div>
                <p className="text-sm font-medium">{t("analyzing")}</p>
                <p className="text-xs text-muted-foreground">
                  {t("analyzingDesc")}
                </p>
              </div>
            </motion.div>
          )}

          {/* Failed */}
          {state.phase === "failed" && (
            <motion.div
              key="failed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2 p-4 rounded-lg bg-severity-critical/5 border border-severity-critical/20">
                <XCircle className="h-5 w-5 text-severity-critical shrink-0" />
                <div>
                  <p className="text-sm font-medium">{t("failed")}</p>
                  <p className="text-xs text-muted-foreground">{state.error}</p>
                </div>
              </div>
              <Button
                onClick={startAnalysis}
                variant="outline"
                size="sm"
                className="border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10"
              >
                {t("retry")}
              </Button>
            </motion.div>
          )}

          {/* Completed */}
          {state.phase === "completed" && (
            <motion.div
              key="completed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {/* Score badge */}
              <div className="flex items-center gap-3 p-4 rounded-lg bg-neon-green/5 border border-neon-green/20">
                <CheckCircle2 className="h-5 w-5 text-neon-green shrink-0" />
                <div>
                  <p className="text-sm font-medium">
                    {t("completed")} — {t("score", { score: state.report.securityScore })}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("vulnerabilitiesFound", {
                      count: state.report.vulnerabilities.length,
                    })}
                  </p>
                </div>
              </div>

              {/* Severity summary */}
              {state.report.vulnerabilities.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {(["critical", "high", "medium", "low", "info"] as const)
                    .filter((s) => state.report.severityCounts[s] > 0)
                    .map((sev) => (
                      <SeverityBadge
                        key={sev}
                        severity={sev}
                        label={`${sev}: ${state.report.severityCounts[sev]}`}
                      />
                    ))}
                </div>
              )}

              {/* Vulnerability cards */}
              {state.report.vulnerabilities.length > 0 && (
                <div className="space-y-3">
                  {state.report.vulnerabilities.map((vuln, i) => (
                    <VulnerabilityCard
                      key={vuln.id}
                      vulnerability={vuln}
                      index={i}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
