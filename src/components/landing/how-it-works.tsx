"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Upload, Brain, FileText, ChevronRight } from "lucide-react";

const STEPS = [
  { key: "step1", icon: Upload, number: "01", color: "green" as const },
  { key: "step2", icon: Brain, number: "02", color: "blue" as const },
  { key: "step3", icon: FileText, number: "03", color: "green" as const },
] as const;

export function HowItWorks() {
  const t = useTranslations("howItWorks");

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Subtle bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-card/30 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            {t("sectionTitle")}
          </h2>
          <p className="text-muted-foreground text-center mb-16 max-w-lg mx-auto">
            {t("sectionSubtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto relative">
          {/* Connecting lines (desktop only) */}
          <div className="hidden md:block absolute top-16 left-[calc(33.333%-12px)] w-[calc(33.333%+24px)] h-px bg-gradient-to-r from-neon-green/30 via-neon-blue/30 to-neon-green/30" />
          <div className="hidden md:block absolute top-16 left-[calc(66.666%-12px)] w-[calc(33.333%+24px)] h-px bg-gradient-to-r from-neon-blue/30 via-neon-green/30 to-neon-green/30" />

          {STEPS.map(({ key, icon: Icon, number, color }, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              className="text-center relative"
            >
              {/* Step circle */}
              <div className="relative z-10 mx-auto mb-6">
                <div className={`h-16 w-16 rounded-2xl glass flex items-center justify-center mx-auto relative ${
                  color === "green" ? "hover:border-neon-green/30" : "hover:border-neon-blue/30"
                } transition-all`}>
                  <Icon className={`h-7 w-7 ${color === "green" ? "text-neon-green" : "text-neon-blue"}`} />
                  {/* Step number badge */}
                  <div className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-neon-green/20 border border-neon-green/40 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-neon-green">{number}</span>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3">{t(key)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[280px] mx-auto">
                {t(`${key}Desc`)}
              </p>

              {/* Arrow connector for mobile */}
              {index < 2 && (
                <div className="md:hidden flex justify-center my-4">
                  <ChevronRight className="h-5 w-5 text-neon-green/30 rotate-90" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
