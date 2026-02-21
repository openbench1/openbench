"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  const t = useTranslations("cta");

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto rounded-2xl border border-neon-green/20 bg-gradient-to-b from-neon-green/5 to-transparent p-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            {t("subtitle")}
          </p>
          <Button
            asChild
            size="lg"
            className="bg-neon-green text-black font-bold text-lg px-8 py-6 hover:shadow-neon-green transition-all duration-300"
          >
            <Link href="/scan">
              {t("button")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
