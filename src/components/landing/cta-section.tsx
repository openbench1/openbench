"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Shield } from "lucide-react";

export function CTASection() {
  const t = useTranslations("cta");

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative text-center max-w-3xl mx-auto rounded-2xl glass p-12 sm:p-16"
        >
          {/* Gradient border effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neon-green/10 via-transparent to-neon-blue/10 pointer-events-none" />

          {/* Orbs */}
          <div className="orb orb-green w-[200px] h-[200px] -top-[50px] -left-[50px]" style={{ opacity: 0.1, filter: "blur(60px)" }} />
          <div className="orb orb-blue w-[200px] h-[200px] -bottom-[50px] -right-[50px]" style={{ opacity: 0.1, filter: "blur(60px)" }} />

          <div className="relative z-10">
            <Shield className="h-10 w-10 text-neon-green mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {t("title")}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
              {t("subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-neon-green text-black font-bold text-lg px-8 py-6 hover:shadow-neon-green transition-all duration-300 group"
              >
                <Link href="/scan">
                  {t("button")}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-neon-blue/30 hover:border-neon-blue/60 hover:bg-neon-blue/5 text-lg px-8 py-6"
              >
                <Link href="/audit">
                  {t("buttonAudit")}
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
