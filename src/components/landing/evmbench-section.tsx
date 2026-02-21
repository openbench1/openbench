"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Brain, ShieldCheck, Zap } from "lucide-react";

const FEATURES = [
  { key: "feature1", icon: Brain },
  { key: "feature2", icon: ShieldCheck },
  { key: "feature3", icon: Zap },
] as const;

export function EVMBenchSection() {
  const t = useTranslations("evmbench");

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-neon-blue/5 via-transparent to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-blue/30 bg-neon-blue/5 mb-6">
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
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {FEATURES.map(({ key, icon: Icon }, index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl border border-neon-blue/20 bg-neon-blue/5 hover:border-neon-blue/40 transition-all"
              >
                <div className="h-12 w-12 rounded-lg bg-neon-blue/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-6 w-6 text-neon-blue" />
                </div>
                <h3 className="font-semibold mb-2">{t(key)}</h3>
                <p className="text-sm text-muted-foreground">
                  {t(`${key}Desc`)}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Learn more link */}
          <div className="text-center">
            <a
              href="https://openai.com/index/introducing-evmbench/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-neon-blue hover:text-neon-green transition-colors text-sm font-medium"
            >
              {t("learnMore")}
              <span>&rarr;</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
