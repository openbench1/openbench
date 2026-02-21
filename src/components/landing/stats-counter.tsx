"use client";

import { useTranslations } from "next-intl";
import { useAnimatedCounter } from "@/hooks/use-animated-counter";
import { Shield, Bug, DollarSign, Target } from "lucide-react";

const STATS = [
  { key: "contracts", value: 500, icon: Shield, prefix: "", suffix: "+", color: "green" as const },
  { key: "vulnerabilities", value: 1200, icon: Bug, prefix: "", suffix: "+", color: "blue" as const },
  { key: "value", icon: DollarSign, prefix: "$", suffix: "M+", value: 50, color: "purple" as const },
  { key: "accuracy", icon: Target, prefix: "", suffix: "%", value: 99.7, isDecimal: true, color: "green" as const },
];

function StatItem({
  label,
  value,
  icon: Icon,
  prefix,
  suffix,
  isDecimal,
  color,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  prefix: string;
  suffix: string;
  isDecimal?: boolean;
  color: "green" | "blue" | "purple";
}) {
  const target = isDecimal ? Math.floor(value * 10) : value;
  const { count, ref } = useAnimatedCounter(target, 2000);
  const display = isDecimal
    ? `${prefix}${(count / 10).toFixed(1)}${suffix}`
    : `${prefix}${count.toLocaleString()}${suffix}`;

  const colorMap = {
    green: "text-neon-green",
    blue: "text-neon-blue",
    purple: "text-neon-purple",
  };

  const bgMap = {
    green: "bg-neon-green/10",
    blue: "bg-neon-blue/10",
    purple: "bg-neon-purple/10",
  };

  return (
    <div
      ref={ref}
      className="glass rounded-xl p-6 text-center hover:border-neon-green/20 transition-all duration-300"
    >
      <div className={`h-10 w-10 rounded-lg ${bgMap[color]} flex items-center justify-center mx-auto mb-3`}>
        <Icon className={`h-5 w-5 ${colorMap[color]}`} />
      </div>
      <div className="text-3xl sm:text-4xl font-bold text-gradient-green-blue mb-1">
        {display}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

export function StatsCounter() {
  const t = useTranslations("stats");

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((stat) => (
            <StatItem
              key={stat.key}
              label={t(stat.key)}
              value={stat.value}
              icon={stat.icon}
              prefix={stat.prefix}
              suffix={stat.suffix}
              isDecimal={"isDecimal" in stat ? stat.isDecimal : false}
              color={stat.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
