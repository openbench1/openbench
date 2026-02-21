"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code } from "lucide-react";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="container mx-auto px-6 text-center max-w-4xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 bg-white mb-8 shadow-sm">
          <span className="text-sm text-muted-foreground">
            {t("badge")}
          </span>
        </div>

        {/* Title — coevolved style: clean dark text, one word highlighted */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1] text-foreground">
          {t("title")}{" "}
          <span className="text-neon-green">{t("titleHighlight")}</span>
          <br />
          {t("titleEnd")}
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          {t("subtitle")}
        </p>

        {/* CTA Buttons — coevolved style: dark primary, outline secondary */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            asChild
            size="lg"
            className="bg-foreground text-background font-medium text-base px-8 py-6 rounded-full hover:bg-foreground/90 transition-all group"
          >
            <Link href="/scan">
              {t("cta")}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-gray-300 hover:bg-gray-50 text-base px-8 py-6 rounded-full transition-all"
          >
            <Link href="/audit">
              <Code className="mr-2 h-5 w-5 text-muted-foreground" />
              {t("ctaAudit")}
            </Link>
          </Button>
        </div>

        {/* Trusted By */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground/50">
          <span className="text-xs uppercase tracking-widest">
            {t("trustedBy")}
          </span>
          <span className="text-sm font-medium text-muted-foreground">OpenAI</span>
          <span className="text-sm font-medium text-muted-foreground">Paradigm</span>
          <span className="text-sm font-medium text-muted-foreground">Etherscan</span>
          <span className="text-sm font-medium text-muted-foreground">BSCScan</span>
          <span className="text-sm font-medium text-muted-foreground">GoPlus</span>
        </div>
      </div>
    </section>
  );
}
