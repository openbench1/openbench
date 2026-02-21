"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Upload, Brain, FileText } from "lucide-react";

const STEPS = [
  { key: "step1", icon: Upload, number: "01" },
  { key: "step2", icon: Brain, number: "02" },
  { key: "step3", icon: FileText, number: "03" },
] as const;

export function HowItWorks() {
  const t = useTranslations("howItWorks");

  return (
    <section className="py-20 bg-cyber-card/30 border-y border-cyber-border">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">
          {t("sectionTitle")}
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {STEPS.map(({ key, icon: Icon, number }, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              className="text-center relative"
            >
              {/* Step number */}
              <div className="text-6xl font-bold text-neon-green/10 absolute -top-4 left-1/2 -translate-x-1/2">
                {number}
              </div>

              {/* Icon */}
              <div className="relative z-10 h-16 w-16 rounded-full bg-neon-green/10 border border-neon-green/30 flex items-center justify-center mx-auto mb-6">
                <Icon className="h-7 w-7 text-neon-green" />
              </div>

              <h3 className="text-xl font-semibold mb-3">{t(key)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(`${key}Desc`)}
              </p>

              {/* Connector line (not on last item) */}
              {index < 2 && (
                <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-gradient-to-r from-neon-green/30 to-neon-green/5" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
