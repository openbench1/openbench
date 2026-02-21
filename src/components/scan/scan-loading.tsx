"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Shield, Loader2 } from "lucide-react";

export function ScanLoading() {
  const t = useTranslations("scan");

  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6">
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="relative"
      >
        <Shield className="h-16 w-16 text-neon-green" />
        <Loader2 className="absolute inset-0 h-16 w-16 animate-spin text-neon-green/30" />
      </motion.div>
      <h3 className="text-xl font-bold text-neon-green">
        {t("scanning")}
      </h3>
      <p className="text-sm text-muted-foreground">{t("scanningDesc")}</p>
    </div>
  );
}
