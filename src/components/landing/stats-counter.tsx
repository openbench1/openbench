"use client";

import { useTranslations } from "next-intl";
import { useAnimatedCounter } from "@/hooks/use-animated-counter";
import { Shield, Bug, DollarSign, Target } from "lucide-react";

const STATS = [
  { key: "contracts", value: 500, icon: Shield, prefix: "", suffix: "+" },
  { key: "vulnerabilities", value: 1200, icon: Bug, prefix: "", suffix: "+" },
  { key: "value", icon: DollarSign, prefix: "$", suffix: "M+", value: 50 },
  { key: "accuracy", icon: Target, prefix: "", suffix: "%", value: 99.7, isDecimal: true },
] as const;

function StatItem({
  label,
  value,
  icon: Icon,
  prefix,
  suffix,
  isDecimal,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  prefix: string;
  suffix: string;
  isDecimal?: boolean;
}) {
  const target = isDecimal ? Math.floor(value * 10) : value;
  const { count, ref } = useAnimatedCounter(target, 2000);
  const display = isDecimal
    ? `${prefix}${(count / 10).toFixed(1)}${suffix}`
    : `${prefix}${count.toLocaleString()}${suffix}`;

  return (
    <div ref={ref} className="text-center">
      <div className="flex justify-center mb-2">
        <Icon className="h-6 w-6 text-neon-green" />
      </div>
      <div className="text-3xl sm:text-4xl font-bold text-glow-green mb-1">
        {display}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

export function StatsCounter() {
  const t = useTranslations("stats");

  return (
    <section className="py-20 border-y border-cyber-border bg-cyber-card/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <StatItem
              key={stat.key}
              label={t(stat.key)}
              value={stat.value}
              icon={stat.icon}
              prefix={stat.prefix}
              suffix={stat.suffix}
              isDecimal={"isDecimal" in stat ? stat.isDecimal : false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
