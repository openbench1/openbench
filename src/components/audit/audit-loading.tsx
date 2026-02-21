"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Shield, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const STEPS = ["parsing", "patterns", "logic", "gas", "report"] as const;

export function AuditLoading() {
  const t = useTranslations("audit.loading");
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 3000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 3;
      });
    }, 200);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-20 gap-8">
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="relative"
      >
        <Shield className="h-20 w-20 text-neon-green" />
        <Loader2 className="absolute inset-0 h-20 w-20 animate-spin text-neon-green/30" />
      </motion.div>

      <h3 className="text-2xl font-bold text-neon-green">{t("title")}</h3>

      <div className="w-full max-w-md">
        <Progress value={progress} className="h-2" />
      </div>

      <div className="flex flex-col gap-2 w-full max-w-md">
        {STEPS.map((step, index) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: index <= currentStep ? 1 : 0.3,
              x: 0,
            }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3"
          >
            <div
              className={cn(
                "h-2 w-2 rounded-full",
                index < currentStep
                  ? "bg-neon-green"
                  : index === currentStep
                  ? "bg-neon-green animate-pulse"
                  : "bg-cyber-border"
              )}
            />
            <span
              className={cn(
                "text-sm font-mono",
                index <= currentStep
                  ? "text-neon-green"
                  : "text-muted-foreground"
              )}
            >
              {t(`steps.${step}`)}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
