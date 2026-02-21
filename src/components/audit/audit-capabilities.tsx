"use client";

import { useTranslations } from "next-intl";
import {
  ShieldAlert,
  Lock,
  Zap,
  Bug,
  Eye,
  Gauge,
  FileCode2,
  Coins,
  Image,
  Landmark,
  ArrowUpDown,
  Settings,
  Upload,
  Brain,
  FileText,
} from "lucide-react";

const VULNERABILITY_CATEGORIES = [
  { key: "reentrancy", icon: ShieldAlert, color: "text-severity-critical" },
  { key: "accessControl", icon: Lock, color: "text-severity-high" },
  { key: "flashLoan", icon: Zap, color: "text-neon-blue" },
  { key: "logicErrors", icon: Bug, color: "text-severity-medium" },
  { key: "frontRunning", icon: Eye, color: "text-neon-purple" },
  { key: "gasOptimization", icon: Gauge, color: "text-neon-green" },
] as const;

const SUPPORTED_CONTRACTS = [
  { key: "erc20", icon: Coins },
  { key: "erc721", icon: Image },
  { key: "defi", icon: ArrowUpDown },
  { key: "proxy", icon: Settings },
  { key: "governance", icon: Landmark },
  { key: "custom", icon: FileCode2 },
] as const;

const WORKFLOW_STEPS = [
  { key: "step1", icon: Upload, color: "text-neon-green" },
  { key: "step2", icon: Brain, color: "text-neon-blue" },
  { key: "step3", icon: FileText, color: "text-neon-green" },
] as const;

export function AuditCapabilities() {
  const t = useTranslations("audit.capabilities");

  return (
    <div className="space-y-10">
      {/* How it works - workflow steps */}
      <div>
        <h2 className="text-xl font-semibold mb-6 text-center">{t("howTitle")}</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {WORKFLOW_STEPS.map(({ key, icon: Icon, color }, index) => (
            <div
              key={key}
              className="glass rounded-xl p-5 text-center relative"
            >
              <div className="flex items-center justify-center mb-3">
                <div className="h-10 w-10 rounded-lg icon-gradient-green flex items-center justify-center relative">
                  <Icon className={`h-5 w-5 ${color}`} />
                  <div className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-neon-green/20 border border-neon-green/40 flex items-center justify-center">
                    <span className="text-[9px] font-bold text-neon-green">{index + 1}</span>
                  </div>
                </div>
              </div>
              <h3 className="font-medium text-sm mb-1">{t(`workflow.${key}`)}</h3>
              <p className="text-xs text-muted-foreground">{t(`workflow.${key}Desc`)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Vulnerability Detection */}
      <div>
        <h2 className="text-xl font-semibold mb-4">{t("detectTitle")}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {VULNERABILITY_CATEGORIES.map(({ key, icon: Icon, color }) => (
            <div
              key={key}
              className="glass rounded-lg p-3 flex items-start gap-3 hover:border-neon-green/20 transition-all"
            >
              <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${color}`} />
              <div>
                <p className="text-sm font-medium">{t(`detect.${key}`)}</p>
                <p className="text-xs text-muted-foreground">
                  {t(`detect.${key}Desc`)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3 text-center">{t("detectMore")}</p>
      </div>

      {/* Supported Contract Types */}
      <div>
        <h2 className="text-xl font-semibold mb-4">{t("contractsTitle")}</h2>
        <div className="flex flex-wrap gap-2">
          {SUPPORTED_CONTRACTS.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass text-sm hover:border-neon-green/20 transition-all"
            >
              <Icon className="h-3.5 w-3.5 text-neon-green" />
              <span>{t(`contracts.${key}`)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
