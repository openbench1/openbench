"use client";

import { useTranslations } from "next-intl";
import type { AIEngine } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Brain, Sparkles } from "lucide-react";

interface EngineSelectorProps {
  value: AIEngine;
  onChange: (engine: AIEngine) => void;
}

export function EngineSelector({ value, onChange }: EngineSelectorProps) {
  const t = useTranslations("audit.engine");

  const options: { id: AIEngine; icon: typeof Brain; nameKey: string; descKey: string }[] = [
    { id: "claude", icon: Brain, nameKey: "claude", descKey: "claudeDesc" },
    { id: "openai", icon: Sparkles, nameKey: "openai", descKey: "openaiDesc" },
  ];

  return (
    <div>
      <label className="text-sm font-medium text-muted-foreground mb-3 block">
        {t("label")}
      </label>
      <div className="grid grid-cols-2 gap-4">
        {options.map(({ id, icon: Icon, nameKey, descKey }) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={cn(
              "flex flex-col items-start gap-2 p-4 rounded-lg border transition-all duration-200 text-left",
              value === id
                ? "border-neon-green bg-neon-green/5 shadow-neon-green"
                : "border-cyber-border bg-cyber-card hover:border-cyber-border-hover"
            )}
          >
            <div className="flex items-center gap-2">
              <Icon
                className={cn(
                  "h-5 w-5",
                  value === id ? "text-neon-green" : "text-muted-foreground"
                )}
              />
              <span className="font-semibold text-sm">{t(nameKey)}</span>
            </div>
            <span className="text-xs text-muted-foreground">
              {t(descKey)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
