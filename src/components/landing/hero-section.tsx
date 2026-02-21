"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Shield, ArrowRight } from "lucide-react";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-bg/50 to-cyber-bg" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-green/20 bg-neon-green/5 mb-8"
        >
          <Shield className="h-4 w-4 text-neon-green" />
          <span className="text-sm text-neon-green font-medium">
            {t("badge")}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight"
        >
          {t("title")}{" "}
          <span className="text-neon-green text-glow-green">
            {t("titleHighlight")}
          </span>
          <br />
          {t("titleEnd")}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          {t("subtitle")}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-neon-green text-black font-bold text-lg px-8 py-6 hover:shadow-neon-green transition-all duration-300"
          >
            <Link href="/scan">
              {t("cta")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-cyber-border hover:border-neon-green/50 text-lg px-8 py-6"
          >
            <Link href="/dashboard">{t("ctaSecondary")}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
