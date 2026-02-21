"use client";

import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddressInputProps {
  value: string;
  onChange: (value: string) => void;
  isValid: boolean;
}

export function AddressInput({ value, onChange, isValid }: AddressInputProps) {
  const t = useTranslations("scan");

  const hasInput = value.length > 0;
  const showError = hasInput && !isValid;

  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        <Search className="h-5 w-5 text-muted-foreground" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value.trim())}
        placeholder={t("placeholder")}
        spellCheck={false}
        className={cn(
          "w-full h-14 pl-12 pr-4 rounded-xl bg-cyber-card border text-base font-mono",
          "placeholder:text-muted-foreground/50 placeholder:font-sans placeholder:text-sm",
          "focus:outline-none focus:ring-2 transition-all duration-200",
          showError
            ? "border-severity-critical focus:ring-severity-critical/30"
            : hasInput && isValid
            ? "border-neon-green/50 focus:ring-neon-green/30"
            : "border-cyber-border focus:ring-neon-green/30"
        )}
      />
      {showError && (
        <p className="absolute -bottom-6 left-0 text-xs text-severity-critical">
          {t("invalidAddress")}
        </p>
      )}
    </div>
  );
}
