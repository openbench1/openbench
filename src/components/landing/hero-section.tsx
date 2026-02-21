"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Shield, ArrowRight, Code, Sparkles } from "lucide-react";

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Floating orbs */}
      <div className="orb orb-green w-[400px] h-[400px] top-[10%] left-[10%]" />
      <div
        className="orb orb-blue w-[350px] h-[350px] bottom-[15%] right-[10%]"
        style={{ animationDelay: "-7s" }}
      />
      <div
        className="orb orb-purple w-[250px] h-[250px] top-[60%] left-[50%]"
        style={{ animationDelay: "-14s", opacity: 0.08 }}
      />

      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-bg/50 to-cyber-bg" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass mb-8"
        >
          <Sparkles className="h-4 w-4 text-neon-green" />
          <span className="text-sm text-neon-green font-medium">
            {t("badge")}
          </span>
        </motion.div>

        {/* Title with gradient text */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight"
        >
          {t("title")}{" "}
          <span className="text-gradient-green-blue">
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
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t("subtitle")}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Button
            asChild
            size="lg"
            className="bg-neon-green text-black font-bold text-lg px-8 py-6 hover:shadow-neon-green transition-all duration-300 group"
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
            className="border-neon-blue/30 hover:border-neon-blue/60 hover:bg-neon-blue/5 text-lg px-8 py-6 transition-all duration-300"
          >
            <Link href="/audit">
              <Code className="mr-2 h-5 w-5 text-neon-blue" />
              {t("ctaAudit")}
            </Link>
          </Button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground/60"
        >
          <span className="text-xs uppercase tracking-wider">
            {t("trustedBy")}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold text-muted-foreground/80">OpenAI</span>
          </div>
          <span className="text-muted-foreground/30">|</span>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold text-muted-foreground/80">Paradigm</span>
          </div>
          <span className="text-muted-foreground/30">|</span>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold text-muted-foreground/80">Etherscan</span>
          </div>
          <span className="text-muted-foreground/30">|</span>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold text-muted-foreground/80">BSCScan</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
