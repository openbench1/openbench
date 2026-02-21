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
} from "lucide-react";

const VULNERABILITY_CATEGORIES = [
  { key: "reentrancy", icon: ShieldAlert },
  { key: "accessControl", icon: Lock },
  { key: "flashLoan", icon: Zap },
  { key: "logicErrors", icon: Bug },
  { key: "frontRunning", icon: Eye },
  { key: "gasOptimization", icon: Gauge },
] as const;

const SUPPORTED_CONTRACTS = [
  { key: "erc20", icon: Coins },
  { key: "erc721", icon: Image },
  { key: "defi", icon: ArrowUpDown },
  { key: "proxy", icon: Settings },
  { key: "governance", icon: Landmark },
  { key: "custom", icon: FileCode2 },
] as const;

export function AuditCapabilities() {
  const t = useTranslations("audit.capabilities");

  return (
    <div className="mb-10 space-y-8">
      {/* How it works */}
      <div className="bg-cyber-card border border-cyber-border rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-2">{t("howTitle")}</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t("howDesc")}
        </p>
      </div>

      {/* Vulnerability Detection */}
      <div>
        <h2 className="text-lg font-semibold mb-4">{t("detectTitle")}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {VULNERABILITY_CATEGORIES.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="flex items-start gap-3 p-3 rounded-lg bg-cyber-card border border-cyber-border"
            >
              <Icon className="h-4 w-4 text-neon-green mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium">{t(`detect.${key}`)}</p>
                <p className="text-xs text-muted-foreground">
                  {t(`detect.${key}Desc`)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2">{t("detectMore")}</p>
      </div>

      {/* Supported Contract Types */}
      <div>
        <h2 className="text-lg font-semibold mb-4">{t("contractsTitle")}</h2>
        <div className="flex flex-wrap gap-2">
          {SUPPORTED_CONTRACTS.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyber-border bg-cyber-card text-sm"
            >
              <Icon className="h-3.5 w-3.5 text-neon-green" />
              {t(`contracts.${key}`)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
