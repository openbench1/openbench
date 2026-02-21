"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Brain, ShieldCheck, Zap, ExternalLink } from "lucide-react";

const FEATURES = [
  { key: "feature1", icon: Brain, color: "blue" as const },
  { key: "feature2", icon: ShieldCheck, color: "green" as const },
  { key: "feature3", icon: Zap, color: "purple" as const },
] as const;

const colorMap = {
  blue: { icon: "text-neon-blue", bg: "icon-gradient-blue", ring: "ring-neon-blue/20" },
  green: { icon: "text-neon-green", bg: "icon-gradient-green", ring: "ring-neon-green/20" },
  purple: { icon: "text-neon-purple", bg: "bg-neon-purple/10", ring: "ring-neon-purple/20" },
};

export function EVMBenchSection() {
  const t = useTranslations("evmbench");

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-neon-blue/5 via-transparent to-transparent" />
      <div className="orb orb-blue w-[300px] h-[300px] top-[20%] right-[5%]" style={{ opacity: 0.08 }} />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6">
              <span className="text-sm text-neon-blue font-semibold">
                {t("subtitle")}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {t("title")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid sm:grid-cols-3 gap-5 mb-10">
            {FEATURES.map(({ key, icon: Icon, color }, index) => {
              const styles = colorMap[color];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="glass rounded-xl p-6 text-center hover:border-neon-blue/20 transition-all duration-300"
                >
                  <div className={`h-14 w-14 rounded-xl ${styles.bg} flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`h-7 w-7 ${styles.icon}`} />
                  </div>
                  <h3 className="font-semibold mb-2 text-lg">{t(key)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(`${key}Desc`)}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Learn more link */}
          <div className="text-center">
            <a
              href="https://openai.com/index/introducing-evmbench/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-neon-blue hover:text-neon-green transition-colors text-sm font-medium glass rounded-full px-5 py-2.5"
            >
              {t("learnMore")}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
