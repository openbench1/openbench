"use client";

import { useTranslations } from "next-intl";
import { Brain, ShieldCheck, Zap, ExternalLink } from "lucide-react";

const FEATURES = [
  { key: "feature1", icon: Brain },
  { key: "feature2", icon: ShieldCheck },
  { key: "feature3", icon: Zap },
] as const;

export function EVMBenchSection() {
  const t = useTranslations("evmbench");

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <span className="text-sm text-neon-blue font-medium">
                {t("subtitle")}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
              {t("title")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid sm:grid-cols-3 gap-5 mb-10">
            {FEATURES.map(({ key, icon: Icon }) => (
              <div
                key={key}
                className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-gray-100/80 transition-all duration-200"
              >
                <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-5 w-5 text-neon-blue" />
                </div>
                <h3 className="font-semibold mb-2 text-foreground">{t(key)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`${key}Desc`)}
                </p>
              </div>
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
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
