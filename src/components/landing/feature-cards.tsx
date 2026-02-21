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
  ArrowRight,
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
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            {t("sectionTitle")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("sectionSubtitle")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ key, icon: Icon, href }) => (
            <Link key={key} href={href} className="block group">
              <div className="bg-white border border-gray-100 rounded-2xl p-6 h-full shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-neon-green" />
                </div>
                <h3 className="text-base font-semibold mb-2 text-foreground group-hover:text-neon-green transition-colors">
                  {t(key)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {t(`${key}Desc`)}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-neon-green opacity-0 group-hover:opacity-100 transition-opacity">
                  {key === "monitor" ? "Audit" : "Scan"}
                  <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
