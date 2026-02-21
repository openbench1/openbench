"use client";

import { useTranslations } from "next-intl";
import { Upload, Brain, FileText } from "lucide-react";

const STEPS = [
  { key: "step1", icon: Upload, number: "1" },
  { key: "step2", icon: Brain, number: "2" },
  { key: "step3", icon: FileText, number: "3" },
] as const;

export function HowItWorks() {
  const t = useTranslations("howItWorks");

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
          {t("sectionTitle")}
        </h2>
        <p className="text-muted-foreground text-center mb-14 max-w-lg mx-auto">
          {t("sectionSubtitle")}
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {STEPS.map(({ key, icon: Icon, number }) => (
            <div key={key} className="text-center">
              {/* Step number + icon */}
              <div className="flex items-center justify-center mb-5">
                <div className="h-14 w-14 rounded-full bg-cyber-card border border-cyber-border flex items-center justify-center relative">
                  <Icon className="h-6 w-6 text-neon-blue" />
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-neon-green text-black text-xs font-bold flex items-center justify-center">
                    {number}
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-2">{t(key)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[280px] mx-auto">
                {t(`${key}Desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
