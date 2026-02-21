"use client";

import { useTranslations } from "next-intl";
import { useAnimatedCounter } from "@/hooks/use-animated-counter";

const STATS = [
  { key: "contracts", value: 500, prefix: "", suffix: "+" },
  { key: "vulnerabilities", value: 1200, prefix: "", suffix: "+" },
  { key: "value", prefix: "$", suffix: "M+", value: 50 },
  { key: "accuracy", prefix: "", suffix: "%", value: 99.7, isDecimal: true },
];

function StatItem({
  label,
  value,
  prefix,
  suffix,
  isDecimal,
}: {
  label: string;
  value: number;
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
    <div ref={ref} className="text-center py-6 px-4">
      <div className="text-3xl sm:text-4xl font-bold text-foreground mb-1">
        {display}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

export function StatsCounter() {
  const t = useTranslations("stats");

  return (
    <section className="py-12">
      <div className="container mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-100">
            {STATS.map((stat) => (
              <StatItem
                key={stat.key}
                label={t(stat.key)}
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                isDecimal={"isDecimal" in stat ? stat.isDecimal : false}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
