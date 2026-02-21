"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
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
  { key: "scan", icon: ScanSearch, href: "/scan", color: "green" as const },
  { key: "realtime", icon: Zap, href: "/scan", color: "blue" as const },
  { key: "multichain", icon: Globe, href: "/scan", color: "purple" as const },
  { key: "fix", icon: Wrench, href: "/scan", color: "green" as const },
  { key: "compliance", icon: FileCheck, href: "/scan", color: "blue" as const },
  { key: "monitor", icon: Brain, href: "/audit", color: "green" as const },
];

const colorStyles = {
  green: {
    icon: "text-neon-green",
    bg: "icon-gradient-green",
    border: "group-hover:border-neon-green/30",
    glow: "group-hover:shadow-[0_0_30px_rgba(0,255,65,0.08)]",
  },
  blue: {
    icon: "text-neon-blue",
    bg: "icon-gradient-blue",
    border: "group-hover:border-neon-blue/30",
    glow: "group-hover:shadow-[0_0_30px_rgba(0,212,255,0.08)]",
  },
  purple: {
    icon: "text-neon-purple",
    bg: "bg-neon-purple/10",
    border: "group-hover:border-neon-purple/30",
    glow: "group-hover:shadow-[0_0_30px_rgba(179,71,217,0.08)]",
  },
};

export function FeatureCards() {
  const t = useTranslations("features");

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {t("sectionTitle")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("sectionSubtitle")}
            </p>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ key, icon: Icon, href, color }, index) => {
            const styles = colorStyles[color];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Link href={href} className="block h-full group">
                  <div
                    className={`glass rounded-xl p-6 h-full transition-all duration-300 ${styles.border} ${styles.glow}`}
                  >
                    <div
                      className={`h-12 w-12 rounded-xl ${styles.bg} flex items-center justify-center mb-4`}
                    >
                      <Icon className={`h-6 w-6 ${styles.icon}`} />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-neon-green transition-colors">
                      {t(key)}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {t(`${key}Desc`)}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground/50 group-hover:text-neon-green/60 transition-colors">
                      <ArrowRight className="h-3 w-3" />
                      <span>{key === "monitor" ? "Audit" : "Scan"}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
