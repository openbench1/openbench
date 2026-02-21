"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, Code } from "lucide-react";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16">
      {/* Very subtle top gradient — barely visible */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,212,255,0.06),transparent_60%)]" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyber-card border border-cyber-border mb-8">
          <span className="text-sm text-muted-foreground">
            {t("badge")}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
          {t("title")}{" "}
          <span className="text-gradient-green-blue">
            {t("titleHighlight")}
          </span>
          <br />
          {t("titleEnd")}
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          {t("subtitle")}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            asChild
            size="lg"
            className="bg-neon-green text-black font-bold text-base px-8 py-6 hover:bg-neon-green/90 transition-all group"
          >
            <Link href="/scan">
              <Shield className="mr-2 h-5 w-5" />
              {t("cta")}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-cyber-border hover:border-muted-foreground/30 hover:bg-cyber-card text-base px-8 py-6 transition-all"
          >
            <Link href="/audit">
              <Code className="mr-2 h-5 w-5 text-neon-blue" />
              {t("ctaAudit")}
            </Link>
          </Button>
        </div>

        {/* Trusted By logos row */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground/50">
          <span className="text-xs uppercase tracking-widest">
            {t("trustedBy")}
          </span>
          <span className="text-sm font-medium text-muted-foreground/70">OpenAI</span>
          <span className="text-sm font-medium text-muted-foreground/70">Paradigm</span>
          <span className="text-sm font-medium text-muted-foreground/70">Etherscan</span>
          <span className="text-sm font-medium text-muted-foreground/70">BSCScan</span>
          <span className="text-sm font-medium text-muted-foreground/70">GoPlus</span>
        </div>
      </div>
    </section>
  );
}
