"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  const t = useTranslations("cta");

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto bg-cyber-card border border-cyber-border rounded-2xl p-12 sm:p-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t("title")}
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            {t("subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-neon-green text-black font-bold text-base px-8 py-6 hover:bg-neon-green/90 transition-all group"
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
              className="border-cyber-border hover:border-muted-foreground/30 hover:bg-cyber-card-hover text-base px-8 py-6"
            >
              <Link href="/audit">
                {t("buttonAudit")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
