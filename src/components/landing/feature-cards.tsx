"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ScanSearch,
  Zap,
  Globe,
  Wrench,
  FileCheck,
  Brain,
} from "lucide-react";

const FEATURES = [
  { key: "scan", icon: ScanSearch, href: "/scan" },
  { key: "realtime", icon: Zap, href: "/scan" },
  { key: "multichain", icon: Globe, href: "/scan" },
  { key: "fix", icon: Wrench, href: "/scan" },
  { key: "compliance", icon: FileCheck, href: "/scan" },
  { key: "monitor", icon: Brain, href: "/audit" },
];

export function FeatureCards() {
  const t = useTranslations("features");

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t("sectionTitle")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("sectionSubtitle")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map(({ key, icon: Icon, href }) => (
            <Link key={key} href={href} className="block group">
              <div className="bg-cyber-card border border-cyber-border rounded-xl p-6 h-full hover:border-cyber-border-hover hover:bg-cyber-card-hover transition-all duration-200">
                <Icon className="h-6 w-6 text-neon-blue mb-4" />
                <h3 className="text-base font-semibold mb-2 group-hover:text-neon-green transition-colors">
                  {t(key)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`${key}Desc`)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
