"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
] as const;

export function FeatureCards() {
  const t = useTranslations("features");

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t("sectionTitle")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t("sectionSubtitle")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(({ key, icon: Icon, href }, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link href={href} className="block h-full">
                <Card className="bg-cyber-card border-cyber-border hover:border-neon-green/30 transition-all duration-300 h-full group cursor-pointer">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-neon-green/10 flex items-center justify-center mb-3 group-hover:bg-neon-green/20 transition-colors">
                      <Icon className="h-6 w-6 text-neon-green" />
                    </div>
                    <CardTitle className="text-lg">{t(key)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(`${key}Desc`)}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
