"use client";

import { useTranslations } from "next-intl";
import { ScoreGauge } from "./score-gauge";
import { Shield, AlertTriangle, XCircle } from "lucide-react";

interface SafetyScoreProps {
  score: number;
  isHoneypot: boolean;
}

export function SafetyScore({ score, isHoneypot }: SafetyScoreProps) {
  const t = useTranslations("report.safety");

  const getLabel = () => {
    if (isHoneypot) return { text: t("honeypot"), color: "text-severity-critical", Icon: XCircle };
    if (score >= 80) return { text: t("safe"), color: "text-neon-green", Icon: Shield };
    if (score >= 50) return { text: t("caution"), color: "text-severity-medium", Icon: AlertTriangle };
    return { text: t("danger"), color: "text-severity-critical", Icon: AlertTriangle };
  };

  const { text, color, Icon } = getLabel();

  return (
    <div className="flex flex-col items-center gap-3">
      <ScoreGauge score={isHoneypot ? 0 : score} />
      <div className={`flex items-center gap-2 ${color} font-bold text-lg`}>
        <Icon className="h-5 w-5" />
        <span>{text}</span>
      </div>
    </div>
  );
}
